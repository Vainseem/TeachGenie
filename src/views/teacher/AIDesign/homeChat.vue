<template>
  <div>
    <div class="AI-background">
      <img src="@/assets/AI_slices/assistant_home_illustration.png" />
      <div class="AI-background__content">AI备课助手</div>
    </div>
    <div @keydown="handleKeyDown" class="AI-input">
      <textarea
        ref="textarea"
        class="AI-input__textarea"
        placeholder="请发送，Enter键发送，Shift+Enter键换行"
        v-model="model.firstQuestion"
      ></textarea>
      <input
        @change="uploadDocument"
        style="z-index: 1; opacity: 0"
        class="file-input"
        type="file"
      />
      <el-icon color="rgb(159, 165, 177)" class="file-input" :size="20">
        <UploadFilled />
      </el-icon>
      <img
        @click="sendMessage"
        class="AI-input__icon"
        src="@/assets/AI_slices/icon_send1.png"
      />
    </div>
  </div>
</template>
<script setup>
import { nextTick, ref, defineModel, onDeactivated } from "vue";
import { useRoute } from "vue-router";
import { UploadFilled, ElMessage } from "@element-plus/icons-vue";
import { uploadFile } from "@/api/AIAPI";
const route = useRoute();
const textarea = ref(null);
const model = defineModel("AIChatFormData");
const uploadDocument = () => {
  const file = document.querySelector(".file-input").files[0];
  uploadFile(file).then((res) => {
    if (res.status === 200) {
      ElMessage.success("文件上传成功");
    }
  });
};
const handleKeyDown = (event) => {
  if (event.key === "Enter") {
    if (event.shiftKey) {
      // Shift + Enter 换行
      const cursorPosition = textarea.value.selectionStart;
      const textBefore = model.value.message.substring(0, cursorPosition);
      const textAfter = model.value.message.substring(cursorPosition);
      // 更新 message，插入换行符
      model.value.message = textBefore + "\n" + textAfter;

      // 更新光标位置，保持光标在插入位置后面
      nextTick(() => {
        textarea.value.selectionStart = textarea.value.selectionEnd =
          cursorPosition + 1;
      });

      event.preventDefault(); // 阻止默认的换行行为
    } else {
      // Enter 键发送消息
      clearChatData();
      event.preventDefault(); // 阻止默认的换行行为
      model.value.tabFlags = 1;
    }
  }
};

const clearChatData = () => {
  model.value.answer = [];
  model.value.count = 0;
  model.value.sessionName = "未命名对话";
  model.value.question = [];
  model.value.isNewChat = true;
};

onDeactivated(() => {
  model.value.from = 1;
});

// 如果从登录页面跳转过来，则刷新页面，这样能避免localStorage中没有userInfo的bug
const fromComponent = route.query.from;
//刷新页面需要做一个标记，避免重复刷新
const hasRefreshed =
  sessionStorage.getItem("hasRefreshed") === "false" ? false : true;
if (fromComponent === "login" && !hasRefreshed) {
  sessionStorage.setItem("hasRefreshed", "true");
  window.location.reload();
}
</script>
<style scoped lang="scss">
@import "@/assets/styles/AI";
@include b(background) {
  img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 143px;
  }
  @include e(content) {
    position: absolute;
    top: 370px;
    width: 179px;
    height: 42px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 32px;
    color: #2e6abe;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
@include b(input) {
  position: relative;
  top: 425px;
  left: 50%;
  transform: translateX(-50%);
  width: 648px;
  height: 120px;
  @include e(textarea) {
    position: absolute;
    width: 648px;
    height: 120px;
    background: #ffffff;
    border-radius: 20px 20px 20px 20px;
    border: 2px solid #548ee0;
    padding: 20px;
    box-sizing: border-box;
    resize: none;
  }
  @include e(icon) {
    cursor: pointer;
    position: absolute;
    right: 26px;
    bottom: 13px;
    z-index: 1;
  }
}
.file-input {
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 56px;
  bottom: 13px;
}
</style>