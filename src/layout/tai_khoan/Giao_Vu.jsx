import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../style/Tai_Khoan.scss'
import Hoc_Vien from './Hoc_Vien'
import { Tab, Tabs } from 'react-bootstrap'
import Course_manager from './Course_manager'

const Giao_Vu = () => {
    let { auth } = useSelector(state => state.authReducer)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const [Index, setIndex] = useState(0)
    let choice = ["all","khoá học đã ghi danh", "khóa học của tôi", "quản lý người dùng"]


    return (
        <div className='Giao_Vu'>

            
                

        </div>
    )
}

export default Giao_Vu
