import store from "@/store";
// import axios from "axios";
import request from './request';

const userInfo = JSON.parse(localStorage.getItem("userInfo"))

//课表
export const updateSche = (data) => {
    const formData = {
        uid: userInfo.uid,
        schedule: data,
        scheLen: store.state.schedule.length,
    }
    return request({
        url: `/api/courseTable/update/${userInfo.uid}`,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        },
        data: formData,
    })
}

export const getSche = () => {
    return request({
        method: 'GET',
        url: `/api/courseTable/course/${userInfo.uid}`,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        }
    })
}

//资料管理
export const updateUserInfo = () => {
    return request({
        method: 'GET',
        url: '/api/detail/fetch/' + userInfo.uid,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        }
    })
}
export const updateUserDetail = (data) => {
    return request({
        method: 'POST',
        url: '/api/detail/update/' + userInfo.uid,
        data,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
            'content-type': 'application/json',
        }
    })
}

//获取所有AI提问聊天记录
export const getAllChat = () => {
    return request({
        method: 'GET',
        url: `/api/chat/nameInfo/` + userInfo.uid,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        }
    })
}
//获取AI提问的一段聊天记录
export const getChatHistory = (name) => {
    return request({
        method: 'GET',
        url: `/api/chat/history/${userInfo.uid}?name=${name}`,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        }
    })
}
//上传AI提问聊天记录
export const updateChatHistory = (que, ans, name) => {
    const formData = {
        ques: que,
        resp: ans,
        name: name
    }
    return request({
        method: 'POST',
        url: `/api/chat/update/${userInfo.uid}`,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
            'content-type': 'application/json',
        },
        data: formData,
    })
}


//教学任务
//添加教学任务
export const addTeachTask = (data) => {
    return request({
        method: 'POST',
        url: '/api/task/add/' + userInfo.uid,
        data,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
            'content-type': 'application/json',
        }
    })
}

//完成教学任务
export const finishTeachTask = (data) => {
    return request({
        method: 'POST',
        url: '/api/task/finish/' + userInfo.uid,
        data,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
            'content-type': 'application/json',
        }
    })
}

//获取教学任务
export const getTeachTask = () => {
    return request({
        method: 'GET',
        url: '/api/task/history/' + userInfo.uid,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        }
    })
}

//待办提醒
export const addTodo = (data) => {
    return request({
        method: 'POST',
        url: '/api/alert/add/' + userInfo.uid,
        data,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
            'content-type': 'application/json',
        }
    })
}

//获取待办提醒
export const getTodo = () => {
    return request({
        method: 'GET',
        url: '/api/alert/history/' + userInfo.uid,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        }
    })
}
//上传头像
export const updateAvatar = (file) => {
    let formData = new FormData();
    formData.append('photo', file);
    return request({
        method: 'POST',
        url: '/api/detail/updatePhoto/' + userInfo.uid,
        data: formData,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        }
    })
}


//获取学生反馈
export const getFeedback = () => {
    return request({
        method: 'GET',
        url: '/api/feedback/fetch/' + userInfo.uid,
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        }
    })
}