import React from 'react'
import { useParams } from 'react-router-dom'
import Hoc_Vien from './Hoc_Vien'
import Course_manager from './Course_manager'
import User_manager from './User_manager'

const Manager = () => {
    let path = useParams()

    if (path.quanly == "khoa-hoc-da-ghi-danh") {
        return <Hoc_Vien />
    }
    if(path.quanly == "quan-ly-khoa-hoc"){
        return <Course_manager />
    }
    if(path.quanly == "quan-ly-nguoi-dung"){
        return <User_manager />
    }

}

export default Manager