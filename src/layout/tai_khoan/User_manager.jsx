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
            setErr("")
        })()
    }, [Index])

    const del = async (tk) => {
        setErr("loading ...")
        let x = await GV_usersAPI.delete_user(tk)
        console.log(x);
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
        setErr("th??m ng?????i d??ng th??nh c??ng!")

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
        setErr("c???p nh???t th??nh c??ng")
    }


    if (Index == 0) {
        return (
            <div className='user_manager mx-auto col-lg-12'>
                <p className="title text-center">qu???n l?? ng?????i d??ng</p>
                <div className="my-5 ">
                    <button onClick={() => setIndex(2)}
                        className='button'>
                        th??m ng?????i d??ng
                    </button>
                    <div className="user_table mt-3 ">
                        <form onSubmit={handleSubmitS(search)}
                            className="m-3 mb-4 search_bar d-flex justify-content-between">
                            <input {...registerS("taiKhoan")}
                                type="text" className='col-8' placeholder='t??n t??i kho???n' />
                            <button className='col-3'>
                                t??m
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
                <p className="title text-center">qu???n l?? ng?????i d??ng</p>
                <div className="my-5">
                    <div className="user_table mt-3 p-3 mx-auto">
                        <div className="title text-center mb-5">ch???nh s???a t??i kho???n </div>

                        <form onSubmit={handleSubmit(update)}>
                            t??i kho???n :
                            <input {...register("taiKhoan", { required: true })} type="text" disabled />
                            m???t kh???u :
                            <input {...register("matKhau", { required: true })} type="text" />
                            h??? t??n :
                            <input {...register("hoTen", { required: true })} type="text" />

                            s??? ??i???n tho???i :
                            <input {...register("soDT", { required: true })} type="number" />

                            email :
                            <input {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: ` Email ki???u g?? ????y ???`
                                }
                            })} type="text" />


                            lo???i ng?????i d??ng :
                            <br />
                            <input value="HV" {...register("maLoaiNguoiDung", { required: true })}
                                type="radio" className='' /> H???c vi??n
                            <br />
                            <input value="GV" {...register("maLoaiNguoiDung", { required: true })}
                                type="radio" className='' /> Gi??o v???


                            <p className='my-3'>
                                {
                                    errors.hoTen || errors.matKhau || errors.soDT || errors.taiKhoan || errors.maLoaiNguoiDung ?
                                        "C??? ??i???n ?????i cho c?? ??i! " :
                                        errors.email ?
                                            errors.email.message :
                                            Err
                                }
                            </p>
                            <div className="action d-flex justify-content-between">
                                <button type='submit'>
                                    c???p nh???t
                                </button>
                                <button onClick={() => setIndex(0)} type='button'>
                                    h???y
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
                <p className="title text-center">qu???n l?? ng?????i d??ng</p>
                <div className="my-5">
                    <div className="user_table mt-3 p-3 mx-auto">
                        <div className="title text-center mb-5">th??m ng?????i d??ng</div>

                        <form onSubmit={handleSubmit(create)}>
                            t??i kho???n :
                            <input {...register("taiKhoan", { required: true })} type="text" />
                            m???t kh???u :
                            <input {...register("matKhau", { required: true })} type="text" />
                            h??? t??n :
                            <input {...register("hoTen", { required: true })} type="text" />

                            s??? ??i???n tho???i :
                            <input {...register("soDT", { required: true })} type="number" />

                            email :
                            <input {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: ` Email ki???u g?? ????y ???`
                                }
                            })} type="text" />


                            lo???i ng?????i d??ng :
                            <br />
                            <input value="HV" {...register("maLoaiNguoiDung", { required: true })}
                                type="radio" className='' /> H???c vi??n
                            <br />
                            <input value="GV" {...register("maLoaiNguoiDung", { required: true })}
                                type="radio" className='' /> Gi??o v???


                            <p className='my-3'>
                                {
                                    errors.hoTen || errors.matKhau || errors.soDT || errors.taiKhoan || errors.maLoaiNguoiDung ?
                                        "C??? ??i???n ?????i cho c?? ??i! " :
                                        errors.email ?
                                            errors.email.message :
                                            Err
                                }
                            </p>
                            <div className="action d-flex justify-content-between">
                                <button type='submit'>
                                    th??m ng?????i d??ng
                                </button>
                                <button onClick={() => setIndex(0)} type='button'>
                                    h???y
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
