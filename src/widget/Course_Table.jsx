import React from 'react'
import '../style/Course_Table.scss'
import { useNavigate } from 'react-router-dom'

const Course_Table = ({ data }) => {
    let navigate = useNavigate()


    if (!data) {
        return
    }

    return (
        <div className='course_show py-4 d-flex'>
            {
                data.map((c, index) => {
                    return <div key={index + 1} className="item mx-auto p-4 col-lg-6 col-12">
                        <div className="box d-md-flex p-md-2 col-11 mx-auto">
                            <div className="col-12 col-md-5">
                                <img src={c.hinhAnh} className="img-fluid" />

                            </div>

                            <div className="body px-3">
                                <p className='title'>{c.tenKhoaHoc}</p>
                                <p className='desc'>Lorem ipsum dolor sit amet consectetur ...</p>
                                <p className="date">{c.ngayTao}</p>

                                <button className='col-6 col-md-6 my-2'
                                onClick={() => navigate(`/${c.maKhoaHoc}`)}>
                                    chi tiết
                                </button>
                            </div>

                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Course_Table
