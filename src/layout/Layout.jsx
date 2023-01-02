import React from 'react'
import Nav_Bar from './Nav_Bar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Hook from './Hook'

const Layout = () => {
    return (
        <div className='Layout'>
            <Hook />
            <Nav_Bar />


            <Outlet />


            <Footer />
        </div>
    )
}

export default Layout
