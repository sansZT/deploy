import React, { useState, useEffect } from 'react'
import '../style/widget_style/Form.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import authAPI from '../service/authAPI'
import { login, logout } from '../reducer/authReducer'

const Form_ThongTin = () => {
    let { auth } = useSelector(state => state.authReducer)
    let { register, reset, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            maNhom: "GP03",
            taiKhoan: auth.taiKhoan,
            hoTen: auth.hoTen,
            maLoaiNguoiDung: auth.maLoaiNguoiDung,
            soDT: auth.soDT,
            matKhau: auth.matKhau,
            email: auth.email
        },

    })
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const [Index, setIndex] = useState(0)
    const [Err, setErr] = useState("")


    const changeIndex = () => {
        Index ? setIndex(0) : setIndex(1)
        setErr("")
        reset()
    }

    const update = async (values) => {
        let x = await authAPI.edit_information(values)

        if (!x[0]) {
            setErr(x[1].auth)
            return
        }

        let z = await authAPI.information()

        dispatch(login({ auth: z[1] }))
        setErr("cập nhật thành công")
    }

    const log_out = () => {
        navigate("/")
        dispatch(logout())
    }




    if (Index == 0) {
        return (
            <div className='form-edit p-3' >
                <div className="container">

                    <div className="title mb-3">Thông tin cá nhân</div>




                    <div className="input mb-4">
                        Tài khoản :
                        <p>{auth.taiKhoan}</p>
                        Họ tên :
                        <p>{auth.hoTen}</p>
                        Số điện thoại :
                        <p>{auth.soDT}</p>
                        Mật khẩu :
                        <p>{auth.matKhau}</p>
                        Email:
                        <p>{auth.email}</p>
                        Người dùng : {auth.maLoaiNguoiDung == "GV" ? "Giáo vụ" : "Học viên"}
                        
                    </div>

                    <button className='my-3 col-12' onClick={changeIndex}>
                        chỉnh sửa
                    </button>

                </div>

            </div>
        )
    }

    if (Index == 1) {
        return (
            <div className='form-edit p-3' >
                <div className="container">

                    <div className="title mb-3">
                        Chỉnh sửa thông tin
                    </div>

                    <form className="  " onSubmit={handleSubmit(update)}>
                        <p className='bb'></p>
                        Tài khoản : <input type="text" {...register("taiKhoan", { required: true })} disabled />
                        Họ tên :  <input type="text" {...register("hoTen", { required: true })} />
                        Mật khẩu :  <input type="text" {...register("matKhau", { required: true })} />
                        Số điện thoại :  <input type="number" {...register("soDT", { required: true })} />
                        Email : <input type="text" {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: ` Email kiểu gì đây ???`
                            }
                        })} />
                        Người dùng :  <br />
                        <div className="d-flex">
                            <input type="radio" value="GV" {...register("maLoaiNguoiDung", { required: true })} /> Giáo vụ

                        </div>
                        <div className="d-flex">
                            <input type="radio" value="HV" {...register("maLoaiNguoiDung", { required: true })} /> Học viên

                        </div>
                        <div className="err py-2 col-12 ">
                            <p>
                                {
                                    errors.hoTen || errors.matKhau || errors.soDT ?
                                        "Cứ điền đại cho có đi! " :
                                        errors.email ?
                                            errors.email.message :
                                            Err
                                }

                            </p>
                        </div>

                        <div className="icon mt-2 d-flex">
                            <button type='submit' className='col-5'>
                                cập nhật
                            </button>
                            <button type='button' className='col-4 ms-auto'
                                onClick={changeIndex}>
                                hủy
                            </button>
                        </div>

                    </form>

                </div>

            </div>

        )
    }
}

export default Form_ThongTin
