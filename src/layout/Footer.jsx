import React from 'react'
import '../style/Footer_Navbar.scss'
import { useNavigate } from 'react-router-dom'


const Footer = () => {
    let navigate = useNavigate()
    return (
        <div className='Footer'>
            <div className="container py-3">
                <div className="d-flex justify-content-between">
                    <div className="col-6">
                        <p className='h'>Giới thiệu</p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, odit.
                        </p>
                    </div>
                    <div className="col-5">
                        <p className='h'>Tất cả trang</p>
                        <button onClick={() => navigate("/deploy/")}>
                            - Trang chủ
                        </button>
                        <button onClick={() => navigate("/deploy/tai-khoan")}>
                            - Tài khoản
                        </button>
                        <button onClick={() => navigate("/deploy/lien-lac")}>
                            - liên lạc
                        </button>
                    </div>

                </div>

                <div className="media text-center mt-2 pt-2">
                    <i className="fab fa-twitter "></i>
                    <i className="fab fa-facebook-f "></i>
                    <i className="fab fa-youtube  "></i>
                    <i className="fab fa-instagram "></i>
                </div>

            </div>
        </div>
    )
}

export default Footer