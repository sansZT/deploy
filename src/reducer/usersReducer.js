import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    All_user: []
}

const usersReducer = createSlice({
    name: "usersReducer",
    initialState,
    reducers: {
        setup_User: (state, {payload}) => {
            return {All_user: payload}
        }
    }
});

export const { setup_User } = usersReducer.actions

export default usersReducer.reducer