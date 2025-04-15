import { getSche } from "@/api/teacherAPI";
import { createStore } from 'vuex';
const store = createStore({
    state() {
        return {
            headerContent: 'AI大设计',
            menuActiveIndex: '1-1',
            sliderStatus: true,
            scheduleEditStatus: false,
            schedule: [
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
            ],
            registerStatus: 0,//0为登录，1为邮箱注册，2为手机号注册，3为手机号找回，4为邮箱找回

            teachTaskList: {
                allDdl: [],
                allInfo: [],
                allState: [],
                allTitle: [],
                total: 0,
            },
            teacherTodoList: {
                allInfo: [],
                allState: [],
                allDdl: [],
                total: 0,
            }
        };
    },
    mutations: {
        // 修改头部内容
        changeHeaderContent(state, payload) {
            state.headerContent = payload;
        },
        // 修改菜单激活状态
        changeMenuActiveIndex(state, payload) {
            state.menuActiveIndex = payload;
        },

        changeRegisterStatus(state, payload) {
            state.registerStatus = payload;
        },
        changeSliderStatus(state) {
            state.sliderStatus = !state.sliderStatus;
        },
        changeScheduleEditStatus(state) {
            state.scheduleEditStatus = !state.scheduleEditStatus;
        },
        setSchedule(state, schedule) {
            state.schedule = schedule;
        },
        addSchedule(state) {
            state.schedule.push(['', '', "", '', '', '', ""])
        },
        reduceSchedule(state) {
            state.schedule.pop();
        },
        // AIChatUpdateFormDataMessage(state, payload) {
        //     state.AIChatFormData.message = payload
        // },
        // AIChatUpdateFormDataMessageCursor(state, ...cursor) {
        //     state.AIChatFormData.message.substring(cursor)
        // },
        // AIChatUpdateFormDataAnswer(state, payload) {
        //     state.AIChatFormData.answer[state.AIChatFormData.count] = state.AIChatFormData.answer[state.AIChatFormData.count] + payload
        // },
        // AIChatUpdateFormDataQuestion(state, payload) {
        //     state.AIChatFormData.question[state.AIChatFormData.count] = payload
        // },
        // AIChatUpdateFormDataCount(state) {
        //     state.AIChatFormData.count++
        // },
        // AIChatHandleRoute(state, page) {
        //     state.AIChatFormData.tabFlags = page;
        // },
        // 修改教学任务列表
        updateTeachTaskList(state, payload) {
            state.teachTaskList.allDdl = payload.allDdl || [];
            state.teachTaskList.allInfo = payload.allInfo || [];
            state.teachTaskList.allState = payload.allState || [];
            state.teachTaskList.allTitle = payload.allTitle || [];
            state.teachTaskList.total = payload.allInfo.length || 0;
        },
        updateTeacherTodoList(state, payload) {
            state.teacherTodoList.allInfo = payload.allInfo || [];
            state.teacherTodoList.allState = payload.allState || [];
            state.teacherTodoList.allDdl = payload.allDdl || [];
            state.teacherTodoList.total = payload.allInfo.length || 0;
        },
    },
    actions: {
        async getSchedule({ commit }) {
            const res = await getSche()
            const data = res.data.message.schedule ? res.data.message.schedule : [
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
                ['', '', "", '', '', '', ""],
            ];
            commit('setSchedule', data);
            return res;
        }
    }
});

export default store;