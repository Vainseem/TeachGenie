import axios from "axios";
// import {ElMessage} from "element-plus";

const service = axios.create({
    baseURL: 'http://8.137.77.237:8080',
    timeout: 5000,
})
//响应拦截器
// service.interceptors.response.use(
//     (response) => {
//         console.log(response);
//         const {data,meta} = response.data
//         if (meta.status === 200 || meta.status === 201) {
//             return data
//         }else {
//             ElMessage.error(meta.msg)
//             return  Promise.reject(new Error(meta.msg))
//         }
//     },
//     (error) => {
//         error.response && ElMessage.error(error.response.data)
//         return  Promise.reject(new Error(error.response.data))
//     }
// )
export default service;