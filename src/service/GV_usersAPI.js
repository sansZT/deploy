import fetcher from "./fetcher"

const GV_usersAPI = {
    get_user_All: () => {
        return fetcher.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03`)
    },
    
    get_user_Search: (taiKhoan) => {
        return fetcher.get(`api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP03&tuKhoa=${taiKhoan}`)
    },

    not_Join_user: (maKhoaHoc) => {
        return fetcher.post(`api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`, maKhoaHoc)
    },

    wait_Join_user: (maKhoaHoc) => {
        return fetcher.post(`api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, maKhoaHoc)
    },

    already_Join_user: (maKhoaHoc) => {
        return fetcher.post(`api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`, maKhoaHoc)
    },

    ////////////////////

    add_user: (values) => {
        return fetcher.post(`api/QuanLyNguoiDung/ThemNguoiDung`, values)
    },
    
    update_user: (values) => {
        return fetcher.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values)
    },
    
    delete_user: (taiKhoan) => {
        return fetcher.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    },

    // ///////

    ghidanh: (values) => {
        return fetcher.post(`api/QuanLyKhoaHoc/GhiDanhKhoaHoc`, values)
    },
    huyghidanh: (values) => {
        return fetcher.post(`api/QuanLyKhoaHoc/HuyGhiDanh`, values)
    },

    dangky: (values) => {
        return fetcher.post(`api/QuanLyKhoaHoc/DangKyKhoaHoc`, values)
    }
    
}

export default GV_usersAPI