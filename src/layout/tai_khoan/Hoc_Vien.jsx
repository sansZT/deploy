import React from 'react'
import '../../style/Tai_Khoan.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Hoc_Vien = () => {
    let { auth } = useSelector(state => state.authReducer)
    let navigate = useNavigate()

    if (auth.chiTietKhoaHocGhiDanh.length == 0) {
        return (
            <div className='Hoc_Vien'>
                <div className="nocourse text-center p-3">
                    <div className="mx-auto">

                        <div className="text">
                            <i className="fas fa-book fa-3x  "></i>

                        </div>
                        <p className='my-2'>hiện không có khóa học nào đã <br /> ghi danh</p>
                        <button onClick={() => navigate("/")}>
                            thêm khóa học
                        </button>
                    </div>

                </div>
            </div>
        )
    }

    if (auth.chiTietKhoaHocGhiDanh.length != 0) {
        return (
            <div className='Hoc_Vien'>
                <div className="course_table p-3">
                    <p className='title text-center'>khóa học đã ghi danh
                        [ {auth.chiTietKhoaHocGhiDanh.length} ]</p>
                    <div className="mt-4">
                        {
                            auth.chiTietKhoaHocGhiDanh.map((c, index) => {
                                return <div className='item col-12 p-2 mx-auto my-3 d-flex' key={index + 1}>
                                    <div className="col-6">
                                        <img src={c.hinhAnh} className="col-12" />

                                    </div>
                                    <div className="col-5 ps-2">
                                        <p className='mb-2'>{c.tenKhoaHoc}</p>
                                        <button onClick={() => navigate(`/${c.maKhoaHoc}`)}>
                                            chi tiết
                                        </button>
                                    </div>

                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Hoc_Vien
