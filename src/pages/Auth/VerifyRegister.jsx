import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthAxios } from "../../utils/api/baseUrl";
import emailVerify from "../../assets/emailVerify.png";
import { verifyotpApi, resendApi } from "../../utils/api/api";
import { useDispatch } from "react-redux";
import { setUserInfo, setUserAuthInfo } from "../../utils/Redux/userSlice";
import Swal from "sweetalert2";

export default function RegisterVerify() {
  const location = useLocation();
  const { userData, responseOtp } = location.state || {};

  const [otpError, setOtpError] = useState("");

  const [timer, setTimer] = useState(30);
  const [resotp, setResotp] = useState(responseOtp);
  const [otpExpired, setOtpExpired] = useState(false);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const disPatch = useDispatch();

  const handleOtpChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }

      setOtp(newOtp);
    } else {
      setOtpError("Please enter a valid number.");
    }
  };

  const handleBackspace = (value, index) => {
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    setResotp(responseOtp);
  }, [responseOtp]);

  useEffect(() => {
    if (otpError) {
      const timer = setTimeout(() => {
        setOtpError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [otpError]);

  useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtpExpired(true);
      setResotp("");
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const handleResend = async () => {
    try {
      const res = await AuthAxios.post(resendApi, userData);
      if (res.data.success) {
        setResotp(res.data.otp);
        setOtp(["", "", "", ""]);
        setTimer(40);
        setOtpExpired(false);
      } else {
        toast.error(res.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!otp.join("")) {
        setOtpError("Please enter an OTP");
        return;
      }

      const res = await AuthAxios.post(verifyotpApi, {
        userData: userData,
        otp: resotp,
        enteredotp: otp.join(""),
      });

      console.log(res, "response");

      const accessToken = res.data.accessToken;

      if (res.data.success && accessToken) {
        localStorage.setItem("accessTokenuserKey", accessToken);
        disPatch(setUserInfo(res.data.user));

        await Swal.fire({
          title: "Success!",
          text: res.data.message || "OTP verified successfully.",
          icon: "success",
          confirmButtonText: "OK",
          background: "#edf2fb",
          customClass: {
            popup: " shadow-lg rounded-lg p-6",
            title: "text-2xl font-semibold text-gray-800",
            content: "text-lg text-gray-600",
            confirmButton:
              "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded",
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/home", { replace: true });
          }
        });

        setOtp(["", "", "", ""]);
        setTimer("");
        setOtpExpired(false);
        disPatch(setUserAuthInfo());
      } else {
        setOtpError(res.data.message || "Failed to verify OTP");
        setOtp(["", "", "", ""]);
      }
    } catch (error) {
      if (error.response) {
        setOtpError(error.response.data.message || "Server error occurred.");
        console.error(
          "Server error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        toast.error("Network error. Please try again later.", {
          autoClose: 2000,
          closeButton: true,
        });
      } else {
        console.error("Unexpected error:", error.message, error);
      }

      setOtp(["", "", "", ""]);
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100">
      <div className="max-w-lg py-8 pt-24 mx-auto px-4 sm:px-8">
        <div className="space-y-7">
          <div className="mt-[-4rem] text-center space-y-3">
            <h1 className="text-xl text-teal-600">Verify your Mail</h1>
            <p className="text-gray-500">
              Have an account?{" "}
              <Link
                to={"/auth/login"}
                className="text-teal-500 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
          <div className="py-8 px-4 sm:px-10 bg-white shadow-md rounded-xl border border-gray-200">
            <div className="flex flex-col items-center mb-8">
              <img
                src={emailVerify}
                alt="Email Verification"
                className="h-36 w-48"
              />
              {!otpExpired ? (
                <>
                  <p className="mt-2 text-gray-500">
                    Enter the <strong>OTP</strong> sent to your email
                  </p>
                  <p
                    className={`mt-2 ${
                      timer < 10 ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <strong>0:{timer.toString().padStart(2, "0")}</strong>
                  </p>
                </>
              ) : (
                <p className="mt-2 text-gray-500">
                  OTP expired, please resend OTP
                </p>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-center pb-4">Enter OTP</label>
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        className={`border border-gray-500 rounded-md p-2 w-10 text-center ${
                          otpError ? "border-red-300" : "border-gray-200"
                        }`}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            handleBackspace(e.target.value, index);
                          }
                        }}
                        disabled={otpExpired}
                      />
                    ))}
                  </div>
                </div>
                {otpError && (
                  <p className="text-red-500 text-center">{otpError}</p>
                )}
              </div>
              <div className="space-y-6">
                <button
                  className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-800"
                  onClick={otpExpired ? handleResend : handleVerifyOtp}
                >
                  {otpExpired ? "Resend OTP" : "Verify OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
