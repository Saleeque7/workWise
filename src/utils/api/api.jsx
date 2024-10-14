import { config } from "../../config/config";

const baseUrl = config.API
const userApi = `${baseUrl}/user`

export const signupApi = `${baseUrl}/signup`
export const refreshApi = `${baseUrl}/refresh`
export const resendApi = `${baseUrl}/resend`
export const verifyotpApi = `${baseUrl}/verify`
export const LogininApi = `${baseUrl}/login`

export const addTaskApi = `${userApi}/addTask`
export const notificationkApi = `${userApi}/notification`
export const browseTaskApi = `${userApi}/browseTask`
export const joinTaskApi = `${userApi}/joinTask`
export const leaveTaskApi = `${userApi}/leaveTask`
export const editmemberStatusTaskApi = `${userApi}/editTaskStatus`
export const removeMemberApi = `${userApi}/removeMember`
export const editTaskApi = `${userApi}/editTask`
export const dashboardApi = `${userApi}/browseData`