import { config } from "../../config/config";

const baseUrl = config.API
const userApi = `${baseUrl}/user`

export const signupApi = `${baseUrl}/signup`
export const refreshApi = `${baseUrl}/refresh`
export const resendApi = `${baseUrl}/resend`
export const verifyotpApi = `${baseUrl}/verify`
export const LogininApi = `${baseUrl}/login`

export const addTaskApi = `${userApi}/task`
export const notificationkApi = `${userApi}/notification`
export const browseTaskApi = `${userApi}/task`
export const joinTaskApi = `${userApi}/task/join`
export const leaveTaskApi = `${userApi}/task/leave`
export const editmemberStatusTaskApi = `${userApi}/task/editStatus`
export const removeMemberApi = `${userApi}/task/remove`
export const editTaskApi = `${userApi}/task/edit`
export const dashboardApi = `${userApi}/browseData`
export const mytaskApi = `${userApi}/task/my_task`
export const deletetaskApi = `${userApi}/task`