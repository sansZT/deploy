import fetcher from "./fetcher";

const authAPI = {
    register: (values) => {
        return fetcher.post(`api/QuanLyNguoiDung/DangKy`, values)
    },

    login: (values) => {
        return fetcher.post(`api/QuanLyNguoiDung/DangNhap`, values)
    },

    information: () => {
        return fetcher.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    },    

    edit_information: (values) => {
        return fetcher.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values)
    },

    dang_ky: (values) => {
        return fetcher.post(`api/QuanLyKhoaHoc/DangKyKhoaHoc`, values)
    },

    huy_dang_ky: (values) => {
        return fetcher.post(`api/QuanLyKhoaHoc/HuyGhiDanh`, values)
    }
}

export default authAPI