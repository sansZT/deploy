import fetcher from "./fetcher"

const GV_coursesAPI = {
    add_course: (values) => {
        return fetcher.post(`api/QuanLyKhoaHoc/ThemKhoaHoc`, values)
    },

    upload_img: (form) => {
        return fetcher.post(`api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc`, form)
    },

    update_course: (values) => {
        return fetcher.put(`api/QuanLyKhoaHoc/CapNhatKhoaHoc`, values)
    },

    delete_course: (maKhoaHoc) => {
        console.log(maKhoaHoc);
        return fetcher.delete(`api/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
    },

    
}


export default GV_coursesAPI