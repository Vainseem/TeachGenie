import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 引入 Element Plus 的样式
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.errorHandler = (err) => {
    console.warn('Vue 捕获错误：', err); // 改为警告，不显示红色 error
    // 不抛出，让错误“吃掉”
};

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

