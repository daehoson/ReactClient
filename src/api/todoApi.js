import axios from "axios"

export const API_SERVER_HOST = `http://192.168.2.170:8080`

const prefix = `${API_SERVER_HOST}/api/todo`


// 상세조회
export const getOne = async(tno) =>{

    const res = await axios.get(`${prefix}/${tno}`)

    return res.data
}

// 목록조회
export const getList = async (pageParam) =>{
    const {page, size} = pageParam 

    // const res = axios.get(`${prefix}/list`, {params:{page,size}})

    const res = await axios.get(`${prefix}/list`, {
        params: { page, size }
    });
    return res.data 
}

export const postAdd = async (todoObj) => {
    const res = await axios.post(`${prefix}/`,todoObj)
    return res.data 
}

export const deleteOne = async(tno) => {
    const res = await axios.delete(`${prefix}/${tno}`)
    return res.data
}

export const putOne = async(todo) => {
    const res = await axios.put(`${prefix}/${todo.tno}`,todo)
    return res.data
}