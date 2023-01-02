import React, { useEffect, useState } from 'react'
import '../../style/Trang_Chu.scss'
import { Carousel } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Course_Table from '../../widget/Course_Table'


const Trang_Chu = () => {
    let { DanhMuc, All_Course } = useSelector(state => state.coursesReducer)
    const [Index, setIndex] = useState(0)
    const [Data, setData] = useState(All_Course)


    useEffect(() => {
        (async () => {
            if (Index != 0) {
                let x = All_Course.filter((c) => {
                    return c.danhMucKhoaHoc.maDanhMucKhoahoc == DanhMuc[Index - 1].maDanhMuc
                })
  
                setData(x)
            }

        })()
    }, [Index])


    const changeIndex = (x) => {
        if (x) {
            if (Index + 1 <= DanhMuc.length) {
                setIndex(Index + 1)

            }
            if (Index + 1 > DanhMuc.length) {
                setIndex(0)
            }
        }
        if (!x) {
            if (Index - 1 >= 0) {
                setIndex(Index - 1)
            }
            if (Index - 1 < 0) {
                setIndex(DanhMuc.length)
            }
        }

    }


    if (!Data || !All_Course) {
        return
    }

    return (
        <div className='Trang_Chu pb-5'>
            <div className="banner py-5">
                <div className="container">
                    <p className='text-center banner_title'>
                        Simple Elearning
                        <br />
                        <span>
                            demo
                            <br /> <i className="fas fa-angle-down fa-1x mt-2  "></i>
                        </span>
                    </p>
                </div>

            </div>
            <div className="category">
                <div className="background px-4">
                    <div className="option d-flex justify-content-around">
                        <div className="left" onClick={() => changeIndex(false)}>
                            <i className="fas fa-angle-left fa-2x  "></i>
                        </div>
                        <div className="box col-7 py-3 px-2 text-center">
                            <p>
                                {
                                    [{ maDanhMuc: "", tenDanhMuc: "tất cả khóa học" }, ...DanhMuc][Index].tenDanhMuc

                                }
                            </p>

                        </div>
                        <div className="right" onClick={() => changeIndex(true)}>
                            <i className="fas fa-angle-right fa-2x  "></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="course py-5">
                <div className="container">

                    <p className='title px-3'>Khóa học</p>
                    <div className="show ">
                        {
                            Index == 0 ?
                                <Course_Table data={All_Course} /> :
                                !Data[0] ?
                                    <p className='notfound p-3'>Danh mục này không có khóa học :v</p> :
                                    <Course_Table data={Data} />
                        }

                    </div>
                </div>
            </div>
            <div className="reviews ">
                <div className="container">
                    <p className='title text-center'>Đánh giá của học viên</p>
                    <div className="content py-4">
                        {
                            ["A", "B", "C"].map((u, index) => {
                                return <div key={index + 1}  className='p-2 col-12 col-md-6'>

                                    <div className="review  p-3">
                                        <div className=" d-flex pb-3">
                                            <div className="icon">
                                                <i className="far fa-user-circle fa-3x"></i>
                                            </div>
                                            <div className="px-3">
                                                <p className='tk'>Nguyễn Văn {u}</p>
                                                <p className='hv'>Học viên</p>
                                            </div>

                                        </div>
                                        <div className="comment">
                                            <div className="vote">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                            <p>Lorem ipsum amet consectetur adipisicing elit. Perferendis, et!</p>
                                        </div>

                                    </div>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Trang_Chu
