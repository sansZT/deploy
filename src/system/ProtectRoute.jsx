import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, createBrowserRouter, useNavigate } from 'react-router-dom'
import Form_ThongTin from '../widget/Form_ThongTin'
import Hoc_Vien from '../layout/tai_khoan/Hoc_Vien'
import User_manager from '../layout/tai_khoan/User_manager'
import Course_Detail from '../layout/tai_khoan/Course_Detail'
import Ghi_Danh_manager from '../layout/tai_khoan/Ghi_Danh_manager'
import Course_manager from '../layout/tai_khoan/Course_manager'
import Tai_Khoan from '../layout/tai_khoan/Tai_Khoan'



const ProtectRoute = () => {
    let { auth } = useSelector(state => state.authReducer)
    let navigate = useNavigate()

    if (!auth) {
        navigate("/")
        return
    }
    

    let router = createBrowserRouter([
        {path: "tai-khoan", element: <Tai_Khoan/>, children: [

            {path: "thong-tin-ca-nhan", element: <Form_ThongTin/>},
            {path: "khoa-hoc-da-ghi-danh", element: <Hoc_Vien />},
            {path: "quan-ly-khoa-hoc", element: <Course_manager />},
            {path: "quan-ly-nguoi-dung", element: <User_manager />},
            {path: "quan-ly-khoa-hoc/:chitiet", element:<Course_Detail />},
            {path: "quan-ly-ghi-danh", element: <Ghi_Danh_manager />}
        ]}
    ])
    
        

}

export default ProtectRoute