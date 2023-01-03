import React from 'react'
import { Navbar } from 'react-bootstrap'
import '../style/Footer_Navbar.scss'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Nav_Bar = () => {
  let navigate = useNavigate()
  let location = useLocation()
  let { auth } = useSelector(state => state.authReducer)

  return (
    <div className='Nav_Bar'>
      <Navbar collapseOnSelect fixed='top' expand="false" >
        <div className="container p-2 ">


          <Navbar.Brand onClick={() => navigate("/deploy/")}>
            <h2>Simple Elearn</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar_collapse'>
            <i className="fas fa-bars "></i>

          </Navbar.Toggle>
          <Navbar.Collapse id="navbar_collapse" className='py-3'>
            <button onClick={() => navigate("/deploy/")}
              className={location.pathname == "/deploy/" ? "active" : ""}>
              Trang chủ
            </button>
            <button onClick={() => navigate("/deploy/lien-lac")}
              className={location.pathname == "/deploy/lien-lac" ? "active" : ""}>
              Liên lạc
            </button>
            <button >

              <a href="https://docs.google.com/spreadsheets/d/1ZOl54z3DAEErvfZwGMhibVD2Kz-1_VFjiXY3ImXZnD4/edit?usp=sharing" target="_blank">

                bảng công việc
              </a>
            </button>
            <button >
              <a href="https://youtu.be/1k-KDvSBINg" target="_blank">
                video youtube

              </a>
            </button>
            {
              auth ?
                <button onClick={() => navigate("/deploy/tai-khoan")}
                  className={location.pathname == "/deploy/tai-khoan" ? "active " : ""}>
                  Quản lý tài khoản
                  <i className="far fa-user-circle  ms-2  "></i>
                </button> :
                <div>
                  <button onClick={() => navigate("/deploy/dang-nhap")}
                    className={location.pathname == "/deploy/dang-nhap" ? "active" : ""}>
                    Đăng nhập
                  </button>
                  <button onClick={() => navigate("/deploy/dang-ky")}
                    className={location.pathname == "/deploy/dang-ky" ? "active" : ""}>
                    Đăng ký
                  </button>
                </div>

            }
          </Navbar.Collapse>
        </div>

      </Navbar>




    </div>
  )
}

export default Nav_Bar
