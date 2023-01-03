import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import coursesAPI from '../../service/coursesAPI'
import authAPI from '../../service/authAPI'
import { Tab, Tabs } from 'react-bootstrap'
import '../../style/widget_style/ChiTiet_KH.scss'
import { login } from '../../reducer/authReducer'

const ChiTiet_KH = () => {
    let { auth } = useSelector(state => state.authReducer)
    const [Course, setCourse] = useState()
    const [Ghidanh, setGhidanh] = useState(0)
    const [Err, setErr] = useState()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let {maKhoaHoc} = useParams()

    useEffect(() => {
        (async () => {
            let x = await coursesAPI.get_course_Detail(maKhoaHoc)

            if (!auth) {
                setGhidanh(2)
                setCourse(x[1])
                return
            }
            let z = auth.chiTietKhoaHocGhiDanh.find(c => c.maKhoaHoc == maKhoaHoc)
            z ? setGhidanh(1) : setGhidanh(0)

            setCourse(x[1])
        })()
    }, [auth])

    const dangky = async () => {
        setErr("Loading ...")
        let x = await authAPI.dang_ky({ maKhoaHoc: Course.maKhoaHoc, taiKhoan: auth.taiKhoan })


        if (!x[0]) {
            setErr(x[1].data)
            return
        }

        let z = await authAPI.information()
        dispatch(login({ auth: z[1] }))
        setErr(x[1])

    }

    const huydangky = async () => {
        setErr("Loading ...")
        let x = await authAPI.huy_dang_ky({ maKhoaHoc: Course.maKhoaHoc, taiKhoan: auth.taiKhoan })


        if (!x[0]) {
            setErr(x[1].data)
            return
        }

        let z = await authAPI.information()
        dispatch(login({ auth: z[1] }))
        setErr(x[1])

    }


    if (Course) {
        return (
            <div className='ChiTiet_KH py-lg-3'>
                <div className="container py-2">
                    <p className='back' onClick={() => navigate(-1)}>
                        <i className="fas fa-angle-left"></i> quay lại</p>

                    <div className="title">
                        <p>{Course.tenKhoaHoc}</p>
                    </div>
                    <div className="d-md-flex">
                        <img src={Course.hinhAnh} className="col-12 col-md-6" />
                        <div className="col-12 col-md-6 ps-4">
                            <div className="bill p-3 col-12">


                                <div className="list">
                                    <div className="bb d-flex">
                                        <p className="col-7">học phí</p>

                                        <span className='col-5 text-end'>0 đ</span>
                                    </div>
                                    <div className="bb d-flex">
                                        <p className='col-7'>ngôn ngữ</p>

                                        <span className='col-5 text-end'>tiếng việt</span>
                                    </div>
                                    <div className="bb d-flex">
                                        <p className='col-7'>thời lượng</p>

                                        <span className='col-5 text-end'>20 giờ</span>
                                    </div>
                                    <div className="bb d-flex">
                                        <p className='col-7'>chứng nhận</p>

                                        <span className='col-5 text-end'>
                                            <i className="fa fa-check "></i>
                                        </span>
                                    </div>

                                </div>

                                <div className="d-flex mt-4 justify-content-between">
                                    <p className=''>
                                        {Err}
                                    </p>
                                    {
                                        Ghidanh == 1 ?
                                            <button onClick={huydangky}
                                                className='col-5 p-2 ms-auto'>
                                                hủy ghi danh
                                            </button> :
                                            Ghidanh == 0 ?
                                                <button onClick={dangky}
                                                    className='col-5 p-2 ms-auto'>
                                                    ghi danh
                                                </button> :
                                                Ghidanh == 2 ?
                                                    <button className='col-12 p-2'>
                                                        cần tài khoản mới ghi danh được
                                                    </button> : ""
                                    }
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="body my-4 col-12 col-lg-8">


                        <div className="">
                            <Tabs defaultActiveKey="khoahoc" transition={false}>
                                <Tab eventKey="khoahoc" title="thông tin">
                                    <div className="p-3">
                                        <ul>
                                            <li>Danh mục : {Course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</li>
                                            <li className='d-flex'>
                                                Đánh giá :
                                                <div className="">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                            </li>
                                            <li>Học viên : {Course.soLuongHocVien}</li>
                                            <li>Lượt xem : {Course.luotXem}</li>
                                            <li>Ngày tạo : {Course.ngayTao}</li>
                                            <li>Mô tả : {Course.moTa} Lorem ipsum, dolor sit amet consectetur adipisicing
                                                elit. Sequi reiciendis libero esse animi. Facilis, pariatur!</li>


                                        </ul>
                                        <div className="auth p-2 d-flex my-3">
                                            <i className="far fa-user-circle fa-3x"></i>
                                            <div className="ms-4">

                                                <p>Người tạo khóa học :</p>
                                                <p>{Course.nguoiTao.tenLoaiNguoiDung}
                                                    - {Course.nguoiTao.taiKhoan}</p>
                                            </div>


                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="binhluan" title="bình luận">
                                    <div className="p-3">
                                        <div className="comment mb-3 d-flex justify-content-between">
                                            <div className="icon">
                                                <i className="far fa-user-circle fa-3x"></i>
                                            </div>
                                            <div className="box p-2 col-10">
                                                <p className='g'>học viên</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.  tenetur!</p>
                                            </div>
                                        </div>
                                        <div className="comment mb-3 d-flex justify-content-between">
                                            <div className="icon">
                                                <i className="far fa-user-circle fa-3x"></i>
                                            </div>
                                            <div className="box p-2 col-10">
                                                <p className='g'>học viên</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.  tenetur!</p>
                                            </div>
                                        </div>

                                        <div className="area">
                                            viết bình luận
                                            <textarea className='p-2' ></textarea>
                                            <div className="d-flex">

                                                <button className='ms-auto px-4 p-2'>
                                                    đăng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>

                        </div>



                    </div>
                </div>
            </div>
        )

    }
}

export default ChiTiet_KH
