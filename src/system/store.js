import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../reducer/authReducer'
import coursesReducer from '../reducer/coursesReducer'
import usersReducer from '../reducer/usersReducer'




const store = configureStore({
    reducer: {
        authReducer,
        coursesReducer,
        usersReducer
    }
})


export default store