import React, { useState, useEffect } from 'react'
import authAPI from '../../service/authAPI.js'
import '../../style/Tai_Khoan.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import Hoc_Vien from './Hoc_Vien.jsx'
import { logout } from '../../reducer/authReducer.js'
import GV_usersAPI from '../../service/GV_usersAPI.js'

const Ghi_Danh_manager = () => {
    let { All_Course } = useSelector(state => state.coursesReducer)
    let { All_user } = useSelector(state => state.usersReducer)
    let dispatch = useDispatch()
    const [IndexC, setIndexC] = useState(0)
    const [Users, setUsers] = useState([])
    const [Err, setErr] = useState("")
    const [C, setC] = useState()
    const [T, setT] = useState(-1)

    useEffect(() => {
        (async () => {
            if (T == -1 || !C) {
                return
            }
            setUsers([])
            setErr("loading ...")
            if (T == 0) {
                let x = await GV_usersAPI.not_Join_user({ maKhoaHoc: C.maKhoaHoc })
                setUsers(x[1])

                if (x[1].length == 0) {
                    setErr("không có người dùng nào chưa ghi danh")
                    return
                }
                setErr("")
                return

            }

            if (T == 1) {
                let x = await GV_usersAPI.wait_Join_user({ maKhoaHoc: C.maKhoaHoc })
                setUsers(x[1])
      
                if (x[1].length == 0) {
                    setErr("không có người dùng nào đang chờ xét duyệt")
                    return
                }

                setErr("")
            }

            if (T == 2) {
                let x = await GV_usersAPI.already_Join_user({ maKhoaHoc: C.maKhoaHoc })
                setUsers(x[1])
     
                if (x[1].length == 0) {
                    setErr("không có người dùng nào đã ghi danh")
                    return
                }

                setErr("")
            }


        })()
    }, [T, C])

    const choseC = (c) => {
        setC(c)
        setIndexC(2)
    }

    const refesh = (taiKhoan) => {
        let z = Users.filter(u => u.taiKhoan != taiKhoan)
        setUsers(z)
    }

    const ghidanh = async (taiKhoan) => {
        setErr("loading ...")
        let x = await GV_usersAPI.dangky({ maKhoaHoc: C.maKhoaHoc, taiKhoan: taiKhoan })

        setErr(x[1])
        if (x[0]) {
            refesh(taiKhoan)
        }



    }

    const huyghidanh = async (taiKhoan) => {
        setErr("loading ...")
        let x = await GV_usersAPI.huyghidanh({ maKhoaHoc: C.maKhoaHoc, taiKhoan: taiKhoan })
      
        setErr(x[1])
        if (x[0]) {
            refesh(taiKhoan)
        }

    }


    const xetduyet = async (taiKhoan) => {
        setErr("loading ...")
        let x = await GV_usersAPI.ghidanh({ maKhoaHoc: C.maKhoaHoc, taiKhoan: taiKhoan })
        
        setErr(x[1])
        if (x[0]) {
            refesh(taiKhoan)

        }


    }




    return (
        <div className='ghidanh_manager'>
            <p className="title text-center">quản lý ghi danh</p>
            <div className="my-5">
                <div className="box p-3">
                    <div className="action">
                        <button className={T == 2 ? "active col-12" : " col-12"}
                            onClick={() => setT(2)}>
                            người dùng đã ghi danh khóa học
                        </button>
                        <button className={T == 1 ? "active col-12 my-3" : "my-3 col-12"}
                            onClick={() => setT(1)}>
                            người dùng đang chờ xét duyệt
                        </button>
                        <button className={T == 0 ? "active col-12" : " col-12"}
                            onClick={() => setT(0)}>
                            người dùng chưa ghi danh khóa học
                        </button>

                    </div>
                    {
                        IndexC == 0 ?
                            <div className='box mt-4 p-3 text-center'>
                                <button className='button' onClick={() => setIndexC(1)}>
                                    chọn khóa học
                                </button>
                            </div>
                            : IndexC == 1 ?
                                <div className='mt-5'>
                                    <p className='title my-4 text-center'>chọn khóa học</p>
                                    {
                                        All_Course.map((c, index) => {
                                            return <div onClick={() => choseC(c)}
                                                className='item col-12 p-2 mb-3 mx-auto d-flex' key={index + 1}>
                                                <div className="col-5">
                                                    <img src={c.hinhAnh} className="col-12" />

                                                </div>
                                                <div className="col-6 ps-3">
                                                    <p className='mb-2'>{c.tenKhoaHoc}</p>

                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                                : IndexC == 2 && C ?
                                    <div className='itemC p-2 mt-4 mx-auto d-flex'>
                                        <div className="col-5">
                                            <img src={C.hinhAnh} className="col-12" />

                                        </div>
                                        <div className="col-6 ps-3">
                                            <p className='mb-2'>{C.tenKhoaHoc}</p>
                                            <button onClick={() => setIndexC(1)}>
                                                đổi
                                            </button>
                                        </div>
                                    </div>
                                    : ""
                    }

                </div>


                {
                    Users.length != 0 && T == 0 ?
                        <div className="">
                            <p className='my-3'>{Err}</p>
                            <div className="boxTK my-4 p-3">
                                {
                                    Users.map((u, index) => {
                                        return <div key={index + 1} className="itemTK d-flex justify-content-between mt-3">
                                            <p>{u.taiKhoan}</p>
                                            <button onClick={() => ghidanh(u.taiKhoan)}>
                                                ghi danh
                                            </button>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        :
                        Users.length != 0 && T == 1 ?
                            <div className="">
                                <p className='my-3'>{Err}</p>
                                <div className="boxTK my-4 p-3">
                                    {

                                        Users.map((u, index) => {
                                            return <div key={index + 1} className="itemTK d-flex justify-content-between mt-3">
                                                <p>{u.taiKhoan}</p>
                                                <button onClick={() => xetduyet(u.taiKhoan)}>
                                                    xét duyệt
                                                </button>
                                            </div>
                                        })

                                    }
                                </div>
                            </div>
                            :
                            Users.length != 0 && T == 2 ?
                                <div className="">
                                    <p className='my-3'>{Err}</p>

                                    <div className="boxTK my-4 p-3">
                                        {

                                            Users.map((u, index) => {
                                                return <div key={index + 1} className="itemTK d-flex justify-content-between mt-3">
                                                    <p>{u.taiKhoan}</p>
                                                    <button onClick={() => huyghidanh(u.taiKhoan)}>
                                                        hủy ghi danh
                                                    </button>
                                                </div>
                                            })

                                        }
                                    </div>
                                </div>
                                : Users.length == 0 && C && T != -1 ?
                                <p className='my-3'>{Err}</p> : ""


                }
            </div>
        </div>

    )

}

export default Ghi_Danh_manager