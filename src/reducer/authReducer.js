import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    auth: JSON.parse(localStorage.getItem("auth")) || null,
}

const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        login: (state, {payload}) => {
            localStorage.setItem("auth", JSON.stringify(payload.auth))
            return {...payload}
        },

        logout: (state, action) => {
            localStorage.clear()

            return {auth: null}
        }


    }
});

export const { login, logout } = authReducer.actions

export default authReducer.reducer