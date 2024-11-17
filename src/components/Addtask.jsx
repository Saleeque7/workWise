import React, { useState } from "react";
import { Transition } from "./Transition";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { userAxiosInstance } from "../utils/api/PrivateAxios";
import { addTaskApi, notificationkApi } from "../utils/api/api";
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AddTask() {
  const user = useSelector((state) => state.persisted.user.user);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  // const [dueDate, setDueDate] = useState("");
  const [overview, setOverview] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };
  const validate = () => {
    const newError = {};
    if (!title.trim()) newError.title = "Fields cannot be empty";
    if (!selectedItem) newError.selectedItem = "Please select an item";
    // if (!dueDate) {
    //   newError.dueDate = "Date is required.";
    // } else {
    //   const selectedDate = new Date(dueDate);
    //   const currentDate = new Date();
    //   currentDate.setHours(0, 0, 0, 0);

    //   if (selectedDate <= currentDate) {
    //     newError.dueDate = "The selected date must be in the future.";
    //   }
    // }
    if (!overview) newError.overview = "complete the field";

    setError(newError);

    setTimeout(() => {
      setError({});
    }, 2000);

    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const taskData = {
          title,
          selectedItem,
          overview,
        };
        const res = await userAxiosInstance.post(addTaskApi, taskData);
        console.log(res.data, "response");
        if (res.data && res.data.success) {
          toast.success(res.data?.message, {
            transition: Slide,
            autoClose: 1500,
          });
          const notificationdata = {
            userId:user._id,
            taskId:res.data.task,
            message:`${user.username} created a new task name ${title}`
          }

          const result = await userAxiosInstance.post(notificationkApi,notificationdata)
          if(!result.data){
            toast.error("An error occurred while adding the task.", {
              transition: Slide,
              autoClose: 2000,
            });
          }
   

          setTitle("");
          setSelectedItem("");
          setOverview("");

          setTimeout(() => {
            navigate("/home/my_tasks");
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error in submitting form", error);

      toast.error("An error occurred while adding the task.", {
        transition: Slide,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Transition>
        <div className="px-2 sm:px-10 pt-2">
          <h2 className="text-2xl font-bold text-center mb-4">Add New Task</h2>
          <div
            className="mx-5 sm:mx-10 mb-5 text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate(-1)}
          >
            Go back
          </div>
          <div className="border-2 border-borderColor m-5 sm:m-10 rounded-xl p-5 sm:p-10 flex min-h-[50vh] bg-white">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full sm:w-1/2 pt-2">
                    <label className="block text-lg font-semibold mb-2">
                      Task Title<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={"Enter title"}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full py-1.5 px-2 rounded-md border border-borderColor font-poppins font-medium text-sm outline-none bg-transparent"
                    />
                    {error.title && (
                      <div className="text-red-500 text-sm mt-1">
                        {error.title}
                      </div>
                    )}
                  </div>
                  <div className="w-full sm:w-1/2 pt-2">
                    <label className="block text-lg font-semibold mb-2">
                      Priority<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div
                        onClick={toggleDropdown}
                        className="flex items-center justify-between border border-borderColor rounded-md p-1 cursor-pointer"
                      >
                        <span
                          className={`${
                            selectedItem ? "text-black" : "text-gray-500"
                          } ml-2`}
                        >
                          {selectedItem || "Select"}
                        </span>
                        {isOpen ? (
                          <IoMdArrowDropupCircle className="text-xl" />
                        ) : (
                          <IoMdArrowDropdownCircle className="text-xl" />
                        )}
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            className="absolute z-10 w-full bg-gray-100 border border-gray-300 rounded-lg mt-1 shadow-md"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div
                              onClick={() => handleItemClick("Low")}
                              className="p-3 hover:bg-gray-100 cursor-pointer"
                            >
                              Low
                            </div>
                            <div
                              onClick={() => handleItemClick("Medium")}
                              className="p-3 hover:bg-gray-100 cursor-pointer"
                            >
                              Medium
                            </div>
                            <div
                              onClick={() => handleItemClick("High")}
                              className="p-3 hover:bg-gray-100 cursor-pointer"
                            >
                              High
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {error.selectedItem && (
                      <div className="text-red-500 text-sm mt-1">
                        {error.selectedItem}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="mb-6">
                <div className="w-1/2 pt-2 ">
                  <label className="block text-lg font-semibold mb-2">
                    Duration<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full py-1.5 px-2 rounded-md border border-borderColor font-poppins font-medium text-sm outline-none bg-transparent"
                  />
                  {error.dueDate && (
                    <div className="text-red-500 text-sm mt-1">
                      {error.dueDate}
                    </div>
                  )}
                </div>
              </div> */}
              <div className="mb-6">
                <div className="pt-2">
                  <label className="block text-lg font-semibold mb-2">
                    Overview<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Enter overview"
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    className="w-full py-1.5 px-2 rounded-md border border-borderColor font-poppins font-medium text-sm outline-none bg-transparent h-32 resize-none"
                  />
                  {error.overview && (
                    <div className="text-red-500 text-sm mt-1">
                      {error.overview}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-white text-taskButton font-semibold py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </>
  );
}
