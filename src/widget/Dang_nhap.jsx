import React, { useState, useEffect } from 'react'
import '../style/widget_style/Form.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import authAPI from '../service/authAPI'
import { login } from '../reducer/authReducer'

const Dang_nhap = () => {
    let {auth} = useSelector(state => state.authReducer)
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
    const [Index, setIndex] = useState(0)
    const [Err, setErr] = useState("")


    const log = async (values) => {
        setErr("Loading ...")

        let x = await authAPI.login({ taiKhoan: values.taiKhoan, matKhau: values.matKhau })

        if (!x[0]) {
            setErr(x[1].data)
            return
        }
        localStorage.setItem("accessToken", JSON.stringify(x[1].accessToken))
        let z = await authAPI.information()

        dispatch(login({ auth: z[1] }))
        setErr("Đăng nhập thành công!")

    }
    if(auth){
        
        return <Navigate to="/deploy/tai-khoan" replace={true} /> 
    }
    if(!auth){
            return (
                <div className='form py-lg-5 mt-2 col-12 col-md-6 col-lg-5 mx-auto'>
                <form className="p-3" onSubmit={handleSubmit(log)}>
                    <p className='title mb-3'>Đăng nhập</p>
                    Tài khoản : <input type="text" placeholder='tài khoản'
                        {...register("taiKhoan", { required: true })} />

                    Mật khẩu :  <input type="text" placeholder='mật khẩu'
                        {...register("matKhau", { required: true })} />
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

                    <div className="mt-2 d-flex">
                        <button type='submit' className='me-4'>
                            đăng nhập
                        </button>
                        <p onClick={() => navigate("/deploy/dang-ky")}
                        className='second mt-2'>hoặc đăng ký</p>
                    </div>

                </form>
            </div>
        )

    }
}

export default Dang_nhap
