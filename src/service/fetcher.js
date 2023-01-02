import axios from 'axios'

const fetcher = axios.create({
    baseURL: "https://elearningnew.cybersoft.edu.vn",
    headers: {
        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMiIsIkhldEhhblN0cmluZyI6IjE3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTY4OTYwMDAwMCIsIm5iZiI6MTY1MzkzMDAwMCwiZXhwIjoxNjgxODM3MjAwfQ.Yk1H5QCjda1n9Cd5-k2yU_DLnRqRvaB7FIkn1hIuPE0"    
    }
})



fetcher.interceptors.request.use(
    (config) => {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        if(accessToken != null){
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },

    (err) => {
        return [false, err.response]
    }
)

fetcher.interceptors.response.use(
    (re) => {
        return [true, re.data]
    },

    (err) => {
        return [false, err.response]
    }
)


export default fetcher