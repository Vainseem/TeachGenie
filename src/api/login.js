import request from './request'
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/api/auth/login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    })
}
//忘记密码，E邮箱，M手机
export const restPassEcode = (email) => {
    return request({
        method:'GET',
        url:`/api/auth/auth/ask-code?email=${email}&type=reset`,
    })
}
export const resetPassE = (data)=>{
    return request({
        method:'POST',
        url:`/api/auth/reset-password`,
        data
    })
}
export const resetPassM = ()=>{

}