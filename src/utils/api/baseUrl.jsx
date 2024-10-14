import { config } from "../../config/config";
import axios from "axios";

const baseUrl = config.API;
const user_baseUrl =`${config.API}/user`

const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL, 
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const AuthAxios = createAxiosInstance(baseUrl);
export const userAxios = createAxiosInstance(user_baseUrl);
