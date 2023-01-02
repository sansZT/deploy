import React, { useState, useEffect } from 'react'
import '../style/widget_style/Form.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate, Navigate } from 'react-router-dom'
import authAPI from '../service/authAPI'
import { login } from '../reducer/authReducer'

const Dang_ky = () => {
    let { auth } = useSelector(state => state.authReducer)

    let { register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            maNhom: "GP03",
            taiKhoan: "",
            hoTen: "",
            maLoaiNguoiDung: "",
            soDT: "",
            matKhau: "",
            email: ""
        }
    })
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const [Err, setErr] = useState("")


    const regis = async (values) => {
        setErr("Loading ...")

        let x = await authAPI.register(values)

        if (!x[0]) {
            setErr(x[1].data)
            return
        }

        let a = await authAPI.login({ taiKhoan: values.taiKhoan, matKhau: values.matKhau })
        localStorage.setItem("accessToken", JSON.stringify(a[1].accessToken))
        let z = await authAPI.information()


        dispatch(login({ auth: z[1] }))
        setErr("Đang ký tài khoản thành công")

    }

    if(auth){
        
        return <Navigate to="/tai-khoan" replace={true} /> 
    }

    if(!auth){
        return (
            <div className='form pb-5'>
                <form className="p-3" onSubmit={handleSubmit(regis)}>
                    <p className=' mb-3 title'>Đăng ký tài khoản</p>
                    Tài khoản : <input type="text" {...register("taiKhoan", { required: true })} />
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
    
    
                    <div className="err py-2 col-12 ">
                        <p>
                            {
                                errors.hoTen || errors.matKhau || errors.soDT || errors.taiKhoan ?
                                    "Cứ điền đại cho có đi! " :
                                    errors.email ?
                                        errors.email.message :
                                        Err
                            }
    
                        </p>
                    </div>
    
                    <div className="icon mt-3 d-flex">
                        <button type='submit' className='me-4'>
                            đăng ký
                        </button>
                        <p onClick={() => navigate("/dang-nhap")}
                            className='second mt-2'>hoặc đăng nhập</p>
                    </div>
                </form>
            </div>
        )

    }



}

export default Dang_ky
