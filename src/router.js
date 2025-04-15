import { createRouter, createWebHashHistory } from "vue-router";
const login = () => import('./views/login/loginPage.vue')
const teacherLayout = () => import('./views/teacher/layout/teacherLayout.vue')
const AIDesign = () => import('./views/teacher/AIDesign/IndexPage.vue')

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: () => import('./views/login/homePage.vue') },
    { path: '/login', component: login },
    {
        path: '/teacher', component: teacherLayout,
        children: [
            {
                path: 'AIDesign',
                component: AIDesign,
            },
            {
                path: 'workbench',
                component: () => import('./views/teacher/workbench/homePage.vue'),
            },
            {
                path: 'classSche',
                component: () => import('./views/teacher/classSche/homePage.vue'),
            },
            {
                path: 'stuManagement',
                component: () => import('./views/teacher/stuManagement/homePage.vue'),
            },
            {
                path: 'resLib',
                component: () => import('./views/teacher/resLib/homePage.vue'),
                children: [
                    {
                        path: 'resourceDetail',
                        component: () => import('./views/teacher/resLib/resourceDetail.vue'),
                    },
                ],
            },
            {
                path: 'user',
                component: () => import('./views/teacher/user/homePage.vue'),
            },

        ]
    },
    {
        path: '/AIman',
        component: () => import('./views/teacher/AIDesign/AIman.vue'),
    },
    {
        path: '/AIppt',
        component: () => import('./views/teacher/AIDesign/AIppt.vue'),
    },
    { path: '/emailRegister', component: () => import('./views/register/emailRegister.vue'), },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router