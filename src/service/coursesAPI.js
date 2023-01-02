import fetcher from "./fetcher";

const coursesAPI = {
    get_course_All: () => {
        return fetcher.get(`api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP03`)
    },

    get_course_Search: (tenKhoaHoc) => {
        return fetcher.get(`api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP03`)
    },

    get_course_Detail: (maKhoaHoc) => {
        return fetcher.get(`api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
    },

    get_DanhMuc: () => {
        return fetcher.get(`api/QuanLyKhoaHoc/LayDanhMucKhoaHoc`)
    },

    get_course_DanhMuc: (maDanhMuc) => {
        return fetcher.get(`api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP03`)
    }
}

export default coursesAPI