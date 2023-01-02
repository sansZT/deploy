import React, { useState, useEffect } from 'react'
import '../../style/Tai_Khoan.scss'
import GV_usersAPI from '../../service/GV_usersAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setup_User } from '../../reducer/usersReducer'
import { useForm } from 'react-hook-form'



const User_manager = () => {
    let { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
        defaultValues: {
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            soDT: "",
            maLoaiNguoiDung: "",
            maNhom: "GP03",
            email: "",
        },

    })

    let { register: registerS, handleSubmit: handleSubmitS } = useForm({
        defaultValues: {
            taiKhoan: ""
        }
    })



    let { All_user } = useSelector(state => state.usersReducer)
    let { auth } = useSelector(state => state.authReducer)
    let dispatch = useDispatch()
    const [Users, setUsers] = useState(All_user)
    const [Search, setSearch] = useState()
    const [Index, setIndex] = useState(0)
    const [Err, setErr] = useState()


    useEffect(() => {
        (async () => {
            if (!Search) {
                setUsers(All_user)
                return
            }

            if (Search) {
                let x = await GV_usersAPI.get_user_Search(Search)
                setUsers(x[1])

            }

        })()
    }, [All_user, Search])

    useEffect(() => {
        (async () => {
            reset()
            setErr()
        })()
    }, [Index])

    const del = async (tk) => {
        setErr("loading ...")
        let x = await GV_usersAPI.delete_user(tk)
        if (!x[0]) {
            setErr(x[1].data)
            return
        }

        let z = await GV_usersAPI.get_user_All()
        dispatch(setup_User(z[1]))
        setErr(x[1])

    }

    const search = async (value) => {
        setSearch(value.taiKhoan)
    }

    const create = async (values) => {
        setErr("loading ...")
  

        let x = await GV_usersAPI.add_user(values)

        if (!x[0]) {
            setErr(x[1].data)

            return
        }

        let z = await GV_usersAPI.get_user_All()

        dispatch(setup_User(z[1]))
        setErr("thêm người dùng thành công!")

    }

    const edit = async (taiKhoan) => {
        setIndex(1)
        let x = await GV_usersAPI.get_user_Search(taiKhoan)
        let arr = ["taiKhoan", "matKhau", "hoTen", "maLoaiNguoiDung", "email"]
        arr.map(n => setValue(n, x[1][0][n]))
        setValue("soDT", x[1][0]["soDt"])

    }

    const update = async (values) => {
        setErr("loading ...")


        let x = await GV_usersAPI.update_user(values)

        if (!x[0]) {
            setErr(x[1].data)
            return
        }

        let z = await GV_usersAPI.get_user_All()
        dispatch(setup_User(z[1]))
        setErr("cập nhật thành công")
    }


    if (Index == 0) {
        return (
            <div className='user_manager'>
                <p className="title text-center">quản lý người dùng</p>
                <div className="my-5">
                    <button onClick={() => setIndex(2)}
                        className='button'>
                        thêm người dùng
                    </button>
                    <div className="user_table mt-3">
                        <form onSubmit={handleSubmitS(search)}
                            className="m-3 mb-4 search_bar d-flex justify-content-between">
                            <input {...registerS("taiKhoan")}
                                type="text" className='col-8' placeholder='tên tài khoản' />
                            <button className='col-3'>
                                tìm
                            </button>
                        </form>
                        <p className='mx-3'>{Err}</p>
                        <div className="box p-3">
                            {
                                Users.map((u, index) => {
                                    if (u.taiKhoan != auth.taiKhoan && u.taiKhoan != "dustin201") {
                                        return (
                                            <div key={index + 1} className='item pt-3 d-flex justify-content-between'>
                                                <p>
                                                    {u.taiKhoan}

                                                </p>
                                                <div className="d-flex justify-content-between ">
                                                    <button onClick={() => edit(u.taiKhoan)}>
                                                        <i className="fas fa-edit   me-4  "></i>

                                                    </button>
                                                    <button onClick={() => del(u.taiKhoan)}>
                                                        <i className="fas fa-trash "></i>

                                                    </button>

                                                </div>
                                            </div>
                                        )

                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div >
        )

    }

    if (Index == 1) {
        return (
            <div className='user_manager'>
                <p className="title text-center">quản lý người dùng</p>
                <div className="my-5">
                    <div className="user_table mt-3 p-3">
                        <div className="title text-center mb-5">chỉnh sửa tài khoản </div>

                        <form onSubmit={handleSubmit(update)}>
                            tài khoản :
                            <input {...register("taiKhoan", { required: true })} type="text" disabled />
                            mật khẩu :
                            <input {...register("matKhau", { required: true })} type="text" />
                            họ tên :
                            <input {...register("hoTen", { required: true })} type="text" />

                            số điện thoại :
                            <input {...register("soDT", { required: true })} type="number" />

                            email :
                            <input {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: ` Email kiểu gì đây ???`
                                }
                            })} type="text" />


                            loại người dùng :
                            <br />
                            <input value="HV" {...register("maLoaiNguoiDung", { required: true })}
                                type="radio" className='' /> Học viên
                            <br />
                            <input value="GV" {...register("maLoaiNguoiDung", { required: true })}
                                type="radio" className='' /> Giáo vụ


                            <p className='my-3'>
                                {
                                    errors.hoTen || errors.matKhau || errors.soDT || errors.taiKhoan || errors.maLoaiNguoiDung ?
                                        "Cứ điền đại cho có đi! " :
                                        errors.email ?
                                            errors.email.message :
                                            Err
                                }
                            </p>
                            <div className="action d-flex justify-content-between">
                                <button type='submit'>
                                    cập nhật
                                </button>
                                <button onClick={() => setIndex(0)} type='button'>
                                    hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    if (Index == 2) {
        return (
            <div className='user_manager'>
                <p className="title text-center">quản lý người dùng</p>
                <div className="my-5">
                    <div className="user_table mt-3 p-3">
                        <div className="title text-center mb-5">thêm người dùng</div>

                        <form onSubmit={handleSubmit(create)}>
                            tài khoản :
                            <input {...register("taiKhoan", { required: true })} type="text" />
                            mật khẩu :
                            <input {...register("matKhau", { required: true })} type="text" />
                            họ tên :
                            <input {...register("hoTen", { required: true })} type="text" />

                            số điện thoại :
                            <input {...register("soDT", { required: true })} type="number" />

                            email :
                            <input {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: ` Email kiểu gì đây ???`
                                }
                            })} type="text" />


                            loại người dùng :
                            <br />
                            <input value="HV" {...register("maLoaiNguoiDung", { required: true })}
                                type="radio" className='' /> Học viên
                            <br />
                            <input value="GV" {...register("maLoaiNguoiDung", { required: true })}
                                type="radio" className='' /> Giáo vụ


                            <p className='my-3'>
                                {
                                    errors.hoTen || errors.matKhau || errors.soDT || errors.taiKhoan || errors.maLoaiNguoiDung ?
                                        "Cứ điền đại cho có đi! " :
                                        errors.email ?
                                            errors.email.message :
                                            Err
                                }
                            </p>
                            <div className="action d-flex justify-content-between">
                                <button type='submit'>
                                    thêm người dùng
                                </button>
                                <button onClick={() => setIndex(0)} type='button'>
                                    hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default User_manager
