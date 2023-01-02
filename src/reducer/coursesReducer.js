import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    All_Course: [],
    DanhMuc: []
}

const coursesReducer = createSlice({
    name: "coursesReducer",
    initialState,
    reducers: {
        setup_Course: (state, {payload}) => {
            return {...state, All_Course: [...payload]}
        },

        setup_DanhMuc: (state, {payload}) => {
            return {...state, DanhMuc: payload}
        }
    }
});

export const { setup_Course, setup_DanhMuc } = coursesReducer.actions

export default coursesReducer.reducer