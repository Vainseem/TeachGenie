import request from './request';
export const emailVerification = (email) => {
    return request({
        method:'GET',
        url:`/api/auth/ask-code?email=${email}&type=register`,
    })
}
export const emailRegister = (data) => {
    return request({
        method:'POST',
        url:'/api/auth/register',
        data:data,
        headers:{
            'content-type':'application/json',
        }
    })
}