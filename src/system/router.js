import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Trang_Chu from '../layout/trang_chu/Trang_Chu'
import Huong_Dan from '../layout/huong_dan/Huong_Dan'
import Tai_Khoan from '../layout/tai_khoan/Tai_Khoan'
import Not_Found from '../layout/error_page/Not_Found'
import ChiTiet_KH from '../layout/chitiet_KH/ChiTiet_KH'
import Dang_ky from '../widget/Dang_ky'
import Dang_nhap from '../widget/Dang_nhap'
import Form_ThongTin from '../widget/Form_ThongTin'
import Lien_Lac from '../layout/lien_lac/Lien_Lac'
import Course_manager from '../layout/tai_khoan/Course_manager'
import User_manager from '../layout/tai_khoan/User_manager'
import Hoc_Vien from '../layout/tai_khoan/Hoc_Vien'
import Course_Detail from '../layout/tai_khoan/Course_Detail'
import Ghi_Danh_manager from '../layout/tai_khoan/Ghi_Danh_manager'





const router = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { index: true, element: <Trang_Chu /> },
            { path: ":maKhoaHoc", element: <ChiTiet_KH /> },
            { path: "huong-dan", element: <Huong_Dan /> },
            { path: "dang-ky", element: <Dang_ky /> },
            { path: "dang-nhap", element: <Dang_nhap /> },
            { path: "lien-lac", element: <Lien_Lac /> },
            {
                path: "tai-khoan", element: <Tai_Khoan />, children: [
                    { path: "thong-tin-ca-nhan", element: <Form_ThongTin /> },
                    { path: "khoa-hoc-da-ghi-danh", element: <Hoc_Vien /> },
                    { path: "quan-ly-khoa-hoc", element: <Course_manager /> },
                    { path: "quan-ly-nguoi-dung", element: <User_manager /> },
                    { path: "quan-ly-khoa-hoc/:chitiet", element: <Course_Detail /> },
                    { path: "quan-ly-ghi-danh", element: <Ghi_Danh_manager /> }

                ]
            },
        ]
    },


    { path: "*", element: <Not_Found /> }
])


export default router