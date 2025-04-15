<template>
  <div class="AI">
    <div class="AI-scroll">
      <div v-if="AIChatFormData.tabFlags === 0" @click="handleRoute(0)">
        <img src="@/assets/AI_slices/icon_newlybuild2.png" alt="" />
      </div>
      <div v-else @click="handleRoute(0)">
        <img src="@/assets/AI_slices/icon_newlybuild1.png" alt="" />
      </div>
      <div v-if="AIChatFormData.tabFlags === 1" @click="handleRoute(1)">
        <img src="@/assets/AI_slices/icon_home2.png" alt="" />
      </div>
      <div v-else @click="handleRoute(1)">
        <img src="@/assets/AI_slices/icon_home1.png" alt="" />
      </div>
      <div v-if="AIChatFormData.tabFlags === 2" @click="handleRoute(2)">
        <img src="@/assets/AI_slices/icon_history2.png" alt="" />
      </div>
      <div v-else @click="handleRoute(2)">
        <img src="@/assets/AI_slices/icon_history1.png" alt="" />
      </div>
    </div>

    <keep-alive>
      <home-chat
        v-if="AIChatFormData.tabFlags === 0"
        :AIChatFormData="AIChatFormData"
      ></home-chat>

      <new-chat
        v-else-if="AIChatFormData.tabFlags === 1"
        :AIChatFormData="AIChatFormData"
      ></new-chat>

      <history-chat
        v-else-if="AIChatFormData.tabFlags === 2"
        :AIChatFormData="AIChatFormData"
      ></history-chat>
    </keep-alive>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import HomeChat from "@/views/teacher/AIDesign/homeChat.vue";
import NewChat from "@/views/teacher/AIDesign/newChat.vue";
import HistoryChat from "@/views/teacher/AIDesign/historyChat.vue";
const AIChatFormData = reactive({
  firstQuestion: "", //第一次提问
  isNewChat: true, //是否是新对话
  message: "", //要发送的信息
  answer: [],
  question: [],
  count: 0, //对话来回条数
  sessionName: "未命名对话", //会话名称
  tabFlags: 0, //tab栏跳转，0代表AI首页，1代表新建出来的会话，2代表历史会话
  from: 0, //从哪个页面跳转过来的,默认为0，这样子就能处理新对话的创建
});
const handleRoute = (tab) => {
  AIChatFormData.tabFlags = tab;
};

onMounted(async () => {
  // connect()
  // const res = await getChatHistory('英语')
  // console.log('获取的聊天历史：', res)
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/AI";
.AI {
  position: relative;
  width: 100%;
  height: 100%;
}
@include b(scroll) {
  position: absolute;
  left: 24px;
  top: 234px;
  width: 56px;
  height: 220px;
  background: #ffffff;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid #707070;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  img {
    margin: 20px;
    cursor: pointer;
  }
}
</style>
