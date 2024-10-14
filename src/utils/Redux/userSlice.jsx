import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user : null,
    isAuthenticated : false
}

const userAuth = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserInfo(state,action){
            state.user= action.payload
        },
        setUserAuthInfo(state){
            state.isAuthenticated = true
        },
        logoutUserInfo(state){
            state.user =null
            state.isAuthenticated = false;
            localStorage.removeItem('accessTokenuserKey');      
        }
    }
})

export const {setUserInfo , setUserAuthInfo ,logoutUserInfo} =userAuth.actions;
export default userAuth.reducer
