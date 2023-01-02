import React, { useEffect, useState } from 'react'
import '../../style/Tai_Khoan.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import GV_coursesAPI from '../../service/GV_coursesAPI'
import { setup_Course } from '../../reducer/coursesReducer'
import coursesAPI from '../../service/coursesAPI'

const Course_manager = () => {
    let { auth } = useSelector(state => state.authReducer)
    let { DanhMuc } = useSelector(state => state.coursesReducer)
    let { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            maKhoaHoc: "",
            tenKhoaHoc: "",
            biDanh: "",
            moTa: "",
            luotXem: "",
            danhGia: 10,
            hinhAnh: "",
            maNhom: "GP03",
            ngayTao: "",
            maDanhMucKhoaHoc: "",
            taiKhoanNguoiTao: auth.taiKhoan,
        }
    })
    let { All_Course } = useSelector(state => state.coursesReducer)
    let dipatch = useDispatch()
    let navigate = useNavigate()

    const [Index, setIndex] = useState(0)
    const [Err, setErr] = useState("")
    const [C, setC] = useState([])

    useEffect(() => {
        (async () => {
            let x = All_Course.filter(c => c.nguoiTao.taiKhoan == auth.taiKhoan)

            setC(x)
        })()
    }, [All_Course])

    const Create = async (values) => {
        setErr("loading . . .")
        let [File] = values.hinhAnh

        let z = { ...values, hinhAnh: File.name }

        let x = await GV_coursesAPI.add_course(z)

        if (!x[0]) {
            setErr(x[1].data)
            return
        }
        UpdateHinh(values)
        setErr("thêm khóa học thành công")
        let xz = await coursesAPI.get_course_All()
        dipatch(setup_Course(xz[1]))




    }

    const UpdateHinh = async (values) => {
        let [File] = values.hinhAnh
        let frm = new FormData()

        frm.append("file", File)
        frm.append("tenKhoaHoc", values.tenKhoaHoc)


        let x = await GV_coursesAPI.upload_img(frm)


    }

    if (Index == 0) {

        return (
            <div className='Course_manager'>
                <p className='title text-center mb-5'>
                    quản lý khóa học
                </p>

                {
                    C.length == 0 ?
                        <div className="my_course my-4">

                            <div className="nocourse text-center p-3">
                                <div className="mx-auto">

                                    <div className="text">
                                        <i className="fas fa-book fa-3x  "></i>

                                    </div>
                                    <p className='my-2'>hiện bạn không có bất kỳ khóa học nào<br /> </p>
                                    <button onClick={() => setIndex(1)}>
                                        thêm khóa học
                                    </button>
                                </div>

                            </div>
                        </div>
                        :
                        <div className=' p-3  my-4'>
                            <div className="action">
                                <button onClick={() => setIndex(1)}>
                                    thêm khóa học
                                </button>
                            </div>
                            <div className="my_course p-3 my-4">
                                {
                                    C.map((c, index) => {
                                        return <div className='item col-12 p-2 mb-3 mx-auto d-flex' key={index + 1}>
                                            <div className="col-5">
                                                <img src={c.hinhAnh} className="col-12" />

                                            </div>
                                            <div className="col-6 ps-3">
                                                <p className='mb-2'>{c.tenKhoaHoc}</p>
                                                <button onClick={() => navigate(c.maKhoaHoc)}>
                                                    chi tiết
                                                </button>

                                            </div>
                                        </div>
                                    })

                                }
                            </div>
                        </div>
                }
            </div>

        )
    }

    if (Index == 1) {
        return (
            <div className='Course_manager'>
                <p className='title text-center mb-5'>
                    quản lý khóa học
                </p>

                <form onSubmit={handleSubmit(Create)}
                    className="my_course p-3 ">
                    <p className='title mb-4 text-center'>thêm khóa học</p>
                    <div className="">
                        tên khóa học : <input type="text" className='col-12'
                            {...register("tenKhoaHoc", { required: true })} />

                    </div>
                    <div className="">
                        mã khóa học : <input type="text" className='col-12'
                            {...register("maKhoaHoc", { required: true })} />

                    </div>
                    <div className="">
                        bí danh : <input type="text" className='col-12'
                            {...register("biDanh", { required: true })} />

                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="col-5">
                            lượt xem : <input type="number" className='col-12'
                                {...register("luotXem", { required: true })} />
                        </div>
                        <div className="col-6">
                            ngày tạo :
                            <input type="date" className='col-12'
                                {...register("ngayTao", { required: true })} />
                        </div>

                    </div>
                    <div className="">
                        danh mục : <select className='col-12'
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
                        mô tả :
                        <textarea className='col-12'
                            {...register("moTa", { required: true })}>

                        </textarea>
                    </div>
                    <div className="">
                        ảnh khóa học :
                        <input type="file" className='col-12'
                            {...register("hinhAnh", { required: true })} />
                    </div>

                    <p>
                        {
                            (errors.luotXem || errors.maDanhMucKhoaHoc ||
                                errors.maKhoaHoc || errors.moTa || errors.tenKhoaHoc ||
                                errors.ngayTao) ?
                                "đừng có bỏ trống " :
                                errors.hinhAnh ?
                                    "chưa có ảnh kìa :v" : Err
                        }
                    </p>


                    <div className="action d-flex mt-4">
                        <button type='submit'>
                            thêm khóa học
                        </button>
                        <button onClick={() => setIndex(0)}
                            type='button' className='ms-auto'>
                            hủy
                        </button>
                    </div>
                </form>

            </div>
        )
    }



}

export default Course_manager
