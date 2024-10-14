import axios from "axios";
import { config } from "../../config/config";
import { store } from "../Redux/store";
import { logoutUserInfo } from "../Redux/userSlice";
import { refreshApi } from "./api";
import { AuthAxios } from "./baseUrl";
const Base_Api = config.API

const createAxiosInstance = (baseURL , accessTokenKey , logoutAction)=>{
    const instance = axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      instance.interceptors.request.use(
        (config) => {
          const accessToken = localStorage.getItem(accessTokenKey);
          if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
         
          return config;
        },
        (error) => Promise.reject(error)
      );

      instance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

          if (error.response && error.response.status === 401 && !originalRequest._retry ) {
            originalRequest._retry = true;
            try {
              const response = await AuthAxios.post(refreshApi);
             
    
              const { accessToken } = response.data;

              localStorage.setItem(accessTokenKey, accessToken);

              originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
              return instance(originalRequest);
            } catch (err) {
              store.dispatch(logoutAction());
              return Promise.reject(err);
            }
          }
    
          if (!error.response) {
            console.error('Network error or no response received:', error.message);
          } else {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
          }
    
          return Promise.reject(error);
        }
      );
    
      return instance;
}

export const userAxiosInstance = createAxiosInstance(Base_Api,'accessTokenuserKey',logoutUserInfo)