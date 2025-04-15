import request from './request'
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
//上传反馈
export const addFeedback = (data) => {
  return request({
    method: 'POST',
    url: '/api/feedback/add/' + userInfo.uid,//这是学生的uid
    data,
    headers: {
      'Authorization': 'Bearer ' + userInfo.token,
      'content-type': 'application/json',
    }
  })
}