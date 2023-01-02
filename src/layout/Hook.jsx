import React, { useEffect } from 'react'
import authAPI from '../service/authAPI'
import courseAPI from '../service/coursesAPI'
import GV_usersAPI from '../service/GV_usersAPI'
import GV_coursesAPI from '../service/GV_coursesAPI'
import { setup_Course, setup_DanhMuc } from '../reducer/coursesReducer'
import { logout, login } from '../reducer/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setup_User } from '../reducer/usersReducer'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const Hook = () => {
    let path = useLocation().pathname
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let {auth} = useSelector(state => state.authReducer)

    useEffect(() => {
        (async() => {
            let course = await courseAPI.get_course_All()
            let danhmuc = await courseAPI.get_DanhMuc()
            let user = await GV_usersAPI.get_user_All()



            dispatch(setup_DanhMuc(danhmuc[1]))
            dispatch(setup_Course(course[1]))
            dispatch(setup_User(user[1]))
        })()
    }, [])

    return <div></div>

}

export default Hook


