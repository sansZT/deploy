import React, { useEffect, useState } from 'react'
import '../../style/Tai_Khoan.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import GV_coursesAPI from '../../service/GV_coursesAPI'
import { setup_Course } from '../../reducer/coursesReducer'
import coursesAPI from '../../service/coursesAPI'


const Course_Detail = () => {
    let path = useParams()
    let { auth } = useSelector(state => state.authReducer)
    let { All_Course, DanhMuc } = useSelector(state => state.coursesReducer)
    let dipatch = useDispatch()
    let navigate = useNavigate()
    const [IndexC, setIndexC] = useState(0)
    const [Err, setErr] = useState("")
    const [Course, setCourse] = useState()
    const [Img, setImg] = useState()

    let { setValue,getValues, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            maKhoaHoc: "",
            biDanh: "",
            tenKhoaHoc: "",
            moTa: "",
            luotXem: "",
            danhGia: 10,
            hinhAnh: "",
            maNhom: "GP03",
            ngayTao: "",
            maDanhMucKhoaHoc: "",
            taiKhoanNguoiTao: ""
        }
    })

    useEffect(() => {
        (async () => {
            let x = await coursesAPI.get_course_Detail(path.chitiet)
            let time = x[1].ngayTao.split("/")

            setCourse(x[1])
            setImg(x[1].hinhAnh)

            let z = ["maKhoaHoc", "biDanh", "tenKhoaHoc", "moTa", "luotXem", "hinhAnh",]
            z.map((n) => setValue(n, x[1][n]))

            setValue("maDanhMucKhoaHoc", x[1].danhMucKhoaHoc.maDanhMucKhoahoc)
            setValue("taiKhoanNguoiTao", x[1].nguoiTao.taiKhoan)
            setValue("ngayTao", `${time[2]}-${time[1]}-${time[0]}`)

        })()
    }, [All_Course])

    useEffect(() => {
        (async() => {
            setErr("")
        })()
    }, [IndexC])



    const updateHinh = async (values) => {
        let File = values.hinhAnh
        let frm = new FormData()

        frm.append("file", File)
        frm.append("tenKhoaHoc", values.tenKhoaHoc)

        let x = await GV_coursesAPI.upload_img(frm)

    }

    const update = async (values) => {
        let [File] = document.querySelector(".img").files
        if(File){
            let vl = {...values, hinhAnh: File.name}

            let x = await GV_coursesAPI.update_course(vl)

            if(!x[0]){
                setErr(x[1].data)
                return
            }

            updateHinh({...vl,hinhAnh: File})

            let xz = await coursesAPI.get_course_All()
            dipatch(setup_Course(xz[1]))

            setErr("c???p nh???t th??nh c??ng")

        }
        if(!File){
            let vl = {...values}
            let x = await GV_coursesAPI.update_course(vl)

            if(!x[0]){
                setErr(x[1].data)
                return
            }

            let xz = await coursesAPI.get_course_All()
            dipatch(setup_Course(xz[1]))

            setErr("c???p nh???t th??nh c??ng")
        }


    }

    const del = async (mkh) => {
        setErr("loading ...")
        let x = await GV_coursesAPI.delete_course(mkh)

        if(!x[0]){
            setErr(x[1].data)
            return 
        }
        let z = await coursesAPI.get_course_All()
        dipatch(setup_Course(z[1]))
        navigate("/deploy/tai-khoan/quan-ly-khoa-hoc")
        

    }




    if (IndexC == 0 && Course) {
        return (
            <div className='Course_manager '>
                <p className='title text-center mb-5'>
                    qu???n l?? kh??a h???c
                </p>
                <div className="my_course col-12 p-3  mx-auto ">
                    <p className='title text-center mb-4'>
                        {Course.tenKhoaHoc}
                    </p>
                    <div className="input">

                        <div className="">
                            m?? kh??a h???c :
                            <p>{Course.maKhoaHoc}</p>
                        </div>
                        <div className="">
                            t??n kh??a h???c :
                            <p>{Course.tenKhoaHoc}</p>
                        </div>
                        <div className="">
                            b?? danh :
                            <p>{Course.biDanh}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col-5">
                                l?????t xem :
                                <p>{Course.luotXem}</p>
                            </div>
                            <div className="col-6">
                                ng??y t???o :
                                <p>{Course.ngayTao}</p>
                            </div>
                        </div>
                        <div className="">
                            danh m???c :
                            <p>{Course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
                        </div>
                        <div className="">
                            m?? t??? :
                            <p>{Course.moTa}</p>
                        </div>
                        <div className="col-12  mb-5 ">
                            h??nh ???nh :
                            <img src={Course.hinhAnh} className="img-fluid" />
                        </div>
                    </div>
                    <p>{Err}</p>
                    <div className="action d-flex mt-4 justify-content-between">
                        <button onClick={() => setIndexC(1)}>
                            ch???nh s???a
                        </button>
                        <button onClick={() => del(Course.maKhoaHoc)}>
                            x??a
                        </button>
                    </div>
                </div>





            </div>
        )
    }


    if (IndexC == 1) {
        return (
            <div className='Course_manager'>
                <p className='title text-center mb-5'>
                    qu???n l?? kh??a h???c
                </p>

                <form onSubmit={handleSubmit(update
                )}
                    className="my_course col-12 p-3   mx-auto  ">
                    <p className='title mb-4 text-center'>ch???nh s???a {Course.tenKhoaHoc}</p>
                    <div className="">
                        m?? kh??a h???c : <input type="text" className='col-12' disabled
                            {...register("maKhoaHoc", { required: true })} />

                    </div>
                    <div className="">
                        t??n kh??a h???c : <input type="text" className='col-12' 
                            {...register("tenKhoaHoc", { required: true })} />

                    </div>
                    <div className="">
                        b?? danh : <input type="text" className='col-12'
                            {...register("biDanh", { required: true })} />

                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="col-5">
                            l?????t xem : <input type="number" className='col-12'
                                {...register("luotXem", { required: true })} />
                        </div>
                        <div className="col-6">
                            ng??y t???o :
                            <input type="date" className='col-12'
                                {...register("ngayTao", { required: true })} />
                        </div>

                    </div>
                    <div className="">
                        danh m???c : <select className='col-12'
                            {...register("maDanhMucKhoaHoc", { required: true })}>
                            {
                                DanhMuc.map((d, index) => {
                                    return <option key={index + 1} value={d.maDanhMuc} >
                                        {d.tenDanhMuc}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="">
                        m?? t??? :
                        <textarea className='col-12'
                            {...register("moTa", { required: true })}>

                        </textarea>
                    </div>
                    <div className="">
                        ???nh kh??a h???c : gi??? nguy??n ???nh c?? ho???c
                        
                        <input
                         type="file" className='col-12 img'/>
                    </div>

                    <p>
                        {
                            (errors.luotXem || errors.maDanhMucKhoaHoc ||
                                errors.maKhoaHoc || errors.moTa || errors.tenKhoaHoc ||
                                errors.ngayTao) ?
                                "?????ng c?? b??? tr???ng " :
                                errors.hinhAnh ?
                                    "ch??a c?? ???nh k??a :v" : Err
                        }
                    </p>


                    <div className="action d-flex mt-4">
                        <button type='submit'>
                            c???p nh???t
                        </button>
                        <button onClick={() => setIndexC(0)}
                            type='button' className='ms-auto'>
                            h???y
                        </button>
                    </div>
                </form>
            </div>
        )
    }

}



export default Course_Detail