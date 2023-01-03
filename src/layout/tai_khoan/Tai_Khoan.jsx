import React, { useState, useEffect } from 'react'
import authAPI from '../../service/authAPI.js'
import '../../style/Tai_Khoan.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'
import Hoc_Vien from './Hoc_Vien.jsx'
import { logout } from '../../reducer/authReducer.js'


const Tai_Khoan = () => {
    let { auth } = useSelector(state => state.authReducer)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const logOut = () => {
        navigate("/deploy/")
        dispatch(logout())
    }

    if (!auth) {

        return <Navigate to="/deploy/tai-khoan" replace={true} />
    }

    if (auth) {
        return (
            <div className='Tai_Khoan'>
                <div className="container py-4 d-lg-flex">
                    <div className="p-3 tk-box col-12 col-lg-6">
                        <div className="d-flex box">

                            <i className="far fa-user-circle fa-3x me-2"></i>
                            <div className="m-1">

                                <p className='title'>{auth.taiKhoan}</p>
                                <p className='gray'>
                                    {
                                        auth.maLoaiNguoiDung == "GV" ?
                                            "Giáo vụ" : "Học viên"
                                    }
                                </p>
                            </div>

                        </div>
                        {
                            auth.maLoaiNguoiDung == "GV" ?
                                <div className="">
                                    <div className="opt">
                                        <button className='to col-12 p-3 my-4'
                                            onClick={() => navigate("khoa-hoc-da-ghi-danh")}>
                                            <p className='title'>khóa học đã ghi danh</p>
                                            <i className="fas fa-check-circle fa-2x   "></i>
                                        </button>

                                        <button className='to col-12 p-3 my-4'
                                            onClick={() => navigate("quan-ly-khoa-hoc")}>
                                            <p className='title'>quản lý khóa học</p>
                                            <i className="fas fa-book fa-2x   "></i>
                                        </button>

                                        <button className='to col-12 p-3 my-4'
                                            onClick={() => navigate("quan-ly-nguoi-dung")}>
                                            <p className='title'>quản lý người dùng</p>
                                            <i className="fas fa-users fa-2x"></i>
                                        </button>

                                        <button className='to col-12 p-3 my-4'
                                            onClick={() => navigate("quan-ly-ghi-danh")}>
                                            <p className='title'>quản lý ghi danh</p>
                                            <i className="fas fa-check-double fa-2x   "></i>
                                        </button>

                                    </div>
                                    <div className="button mt-5 d-flex justify-content-between">
                                        <button onClick={() => navigate("thong-tin-ca-nhan")}>
                                            thông tin cá nhân
                                        </button>
                                        <button onClick={logOut}>
                                            đăng xuất
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="opt">

                                    <button className='to col-12 p-3 my-4'
                                        onClick={() => navigate("khoa-hoc-da-ghi-danh")}>
                                        <p className='title'>khóa học đã ghi danh</p>
                                        <i className="fas fa-users fa-2x"></i>
                                    </button>
                                    <div className="button mt-4 d-flex justify-content-between">
                                        <button onClick={() => navigate("thong-tin-ca-nhan")}>
                                            thông tin cá nhân
                                        </button>
                                        <button onClick={logOut}>
                                            đăng xuất
                                        </button>
                                    </div>
                                </div>

                        }

                    </div>

                    <div className=" my-5 my-lg-0 col-lg-6 ps-lg-5 py-3">
                        <Outlet/>

                    </div>
                </div>
            </div>
        )
    }



}

export default Tai_Khoan