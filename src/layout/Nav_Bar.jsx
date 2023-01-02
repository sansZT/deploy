import React from 'react'
import { Navbar } from 'react-bootstrap'
import '../style/Footer_Navbar.scss'
import {useNavigate, useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'


const Nav_Bar = () => {
  let navigate = useNavigate()
  let location = useLocation()
  let {auth} = useSelector(state => state.authReducer)

  return (
    <div className='Nav_Bar'>
      <Navbar collapseOnSelect fixed='top' expand="md" >
        <div className="container">

          <Navbar.Brand onClick={() => navigate("/")}>
            <h2>Simple Elearn</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar_collapse'>
            <i className="fas fa-bars "></i>

          </Navbar.Toggle>
          <Navbar.Collapse id="navbar_collapse" className='py-3'>
            <button onClick={() => navigate("/")} 
            className={ location.pathname=="/"? "active" : "" }>
              Trang chủ
            </button>
            <button onClick={() => navigate("/lien-lac")} 
            className={ location.pathname=="/lien-lac"? "active" : "" }>
              Liên lạc
            </button>
            <button onClick={() => navigate("/huong-dan")} 
            className={ location.pathname=="/huong-dan"? "active" : "" }>
              Hướng dẫn
            </button>
            {
              auth ?
              <button onClick={() => navigate("/tai-khoan")} 
              className={ location.pathname=="/tai-khoan"? "active " : "" }>
                Quản lý tài khoản
                <i className="far fa-user-circle  ms-2  "></i>
              </button> :
              <div>
                <button onClick={() => navigate("/dang-nhap")}
                className={ location.pathname=="/dang-nhap"? "active" : "" }>
                  Đăng nhập
                </button>
                <button onClick={() => navigate("/dang-ky")}
                className={ location.pathname=="/dang-ky"? "active" : "" }>
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
