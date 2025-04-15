<template>
  <div class="newChatContainer">
    <div class="AI-footer">内容由AI大模型生成</div>
    <div ref="chatBody" class="AI-newChatContainer">
      <div class="AI-newChatContainer__header">
        {{ model.sessionName }}
      </div>
      <div class="AI-newChatContainer__body">
        <div
          v-for="(item, index) in model.question"
          :key="index"
          class="question"
          v-show="model.question[index]"
        >
          <div class="question-content">
            <span>{{ item }}</span>
            <el-avatar
              shape="circle"
              :style="{ padding: 0, borderRadius: '50%' }"
              :size="size"
              :src="userAvatar"
            />
          </div>
          <div class="answer-content">
            <!-- <span v-html="renderMarkdown(model.answer[index])"></span> -->
            <span v-html="model.answer[index]"></span>
            <img src="../../../assets/AI_slices/ai.png" />
          </div>
        </div>
      </div>
      <div class="AI-newChatContainer__input">
        <textarea
          v-model="model.message"
          @keydown="handleKeyDown"
          ref="textarea"
          placeholder="请输入，Enter键发送，Shift+Enter键换行"
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
          src="../../../assets/AI_slices/icon_send1.png"
          @click="sendToNode()"
        />
      </div>
    </div>
    <div
      v-if="page === 0 || page === 2"
      style="cursor: pointer; position: absolute; right: 56px; top: 3px"
    >
      <img
        src="../../../assets/AI_slices/icon_history-file1.png"
        @click="unfold(1)"
      />
    </div>
    <div
      v-else-if="page === 1"
      style="cursor: pointer; position: absolute; right: 56px; top: 3px"
    >
      <img
        src="../../../assets/AI_slices/icon_history-file2.png"
        @click="unfold(0)"
      />
    </div>
    <div
      v-if="page === 2"
      style="cursor: pointer; position: absolute; right: 28px; top: 3px"
    >
      <img
        src="../../../assets/AI_slices/icon_left-expand2.png"
        @click="unfold(0)"
      />
    </div>
    <div
      v-else-if="page === 0 || page === 1"
      style="cursor: pointer; position: absolute; right: 28px; top: 3px"
    >
      <img
        src="../../../assets/AI_slices/icon_left-expand1.png"
        @click="unfold(2)"
      />
    </div>
    <div ref="chatHistory" class="AI-historyContainer">
      <div class="AI-historyContainer__box">
        <span>AI教学计划生成</span>
        <div class="AI-historyContainer__box--rename">
          <img src="../../../assets/AI_slices/icon_edit.png" />
        </div>
        <div class="AI-historyContainer__box--delete">
          <img src="../../../assets/AI_slices/icon_delete.png" />
        </div>
        <div class="AI-historyContainer__box--img">
          <img
            style="width: 100%; height: 100%"
            src="https://imgur.com/7Xle44F.jpg"
            alt=""
          />
        </div>
        <div class="AI-historyContainer__box--img">
          <img
            style="width: 100%; height: 100%"
            src="https://imgur.com/mOpBLtY.png"
            alt=""
          />
        </div>
        <div class="AI-historyContainer__box--img">
          <img
            style="width: 100%; height: 100%"
            src="https://imgur.com/AYPMA7r.png"
            alt=""
          />
        </div>
      </div>
      <img
        class="AI-historyContainer--close"
        @click="unfold(0)"
        src="../../../assets/AI_slices/icon_close.png"
      />
    </div>
    <div ref="chatResource" class="AI-resourceContainer">
      <div class="AI-resourceContainer__iconBox">
        <img
          v-show="recoursePage !== 0"
          @click="chooseRecourse(0)"
          src="../../../assets/AI_slices/icon_mindmap.png"
        />
        <img
          v-show="recoursePage === 0"
          @click="chooseRecourse(0)"
          src="../../../assets/AI_slices/icon_mindmap2.png"
        />
        <img
          v-show="recoursePage !== 1"
          @click="chooseRecourse(1)"
          src="../../../assets/AI_slices/icon_mind-mapping.png"
        />
        <img
          v-show="recoursePage === 1"
          @click="chooseRecourse(1)"
          src="../../../assets/AI_slices/icon_mind-mapping2.png"
        />
        <img
          v-show="recoursePage !== 2"
          @click="chooseRecourse(2)"
          src="../../../assets/AI_slices/icon_form.png"
        />
        <img
          v-show="recoursePage === 2"
          @click="chooseRecourse(2)"
          src="../../../assets/AI_slices/icon_form2.png"
        />
        <!--        <img @click="chooseRecourse()" src="@/assets/AI_slices/icon_folder-download.png">-->
        <!--        <img @click="chooseRecourse()" src="@/assets/AI_slices/icon_folder-download2.png">-->
        <!--        <img @click="chooseRecourse()" src="@/assets/AI_slices/icon_link1.png">-->
        <!--        <img @click="chooseRecourse()" src="@/assets/AI_slices/icon_link2.png">-->
      </div>
      <div v-show="recoursePage === 0">
        <iframe
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 590px;
            height: 400px;
          "
          src="https://docs.google.com/presentation/d/1DNgj32zZs6Wt7XStxCrMTOxexCohrK2s/preview"
          frameborder="0"
        ></iframe>
      </div>
      <div v-show="recoursePage === 1">
        <img
          src="https://imgur.com/mOpBLtY.png"
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 590px;
            height: 400px;
          "
        />
      </div>
      <div v-show="recoursePage === 2">
        <video
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 590px;
            height: 400px;
          "
          src="@/assets/video/AIman.mp4"
          controls
        ></video>
      </div>
      <img
        class="AI-resourceContainer--close"
        @click="unfold(0)"
        src="../../../assets/AI_slices/icon_close.png"
      />
      <div class="AI-resourceContainer--line"></div>
      <keep-alive> </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onActivated, defineModel, ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { updateChatHistory } from "@/api/teacherAPI";
import { summarizeTitle } from "@/api/AIAPI";
import { isGeneratePlanOrQuiz } from "../../../../public/methods";
import { io } from "socket.io-client";
// import { marked } from "marked";

let ws = null;
let messageTimeout = null;
let nodePath = 1;

const socket = io("ws://49.233.37.218:3000");
const isConnected = ref(false);
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const size = "28px";
const userAvatar = `http://8.137.77.237/images/${userInfo.uid}.jpg`;
const textarea = ref(null);
const isReceiving = ref(false);
const chatBody = ref(null);
const chatHistory = ref(null);
const chatResource = ref(null);
const page = ref(0); //page为0则不展开，为1拉出历史对话，为2拉出会话资源
const recoursePage = ref(0); //recoursePage为0则拉出大纲，为1则思维导图，为2则PPT
const model = defineModel("AIChatFormData");

// const renderMarkdown = (md) => {
//   return marked(md);
// };

const uploadDocument = () => {
  const file = document.querySelector(".file-input").files[0];
  console.log(file);
  model.value.question[0] = file.name;
  model.value.answer[0] =
    "您似乎上传了一个有关AI课题的备课文件，AI大模型将根据您上传的文件生成教学计划。";
  model.value.count++;
  scrollToBottom();
};

const chooseRecourse = (num) => {
  recoursePage.value = num;
};

const randomUserId = "xxx" + Math.floor(Math.random() * 1000000);

const connect = function () {
  ws = new WebSocket(
    "ws://8.137.77.237:8888/ws?userid=" + randomUserId + "&secret=" + "william"
  );

  ws.onopen = () => {
    console.log("连接成功");
    isConnected.value = true;
  };
  ws.onclose = () => {
    console.log("连接关闭");
    isConnected.value = false;
  };
};

const sendMessage = () => {
  if (model.value.firstQuestion) {
    model.value.question[model.value.count] = model.value.firstQuestion;
    model.value.firstQuestion = "";
  }
  ws.send(model.value.question[model.value.count]); //ws流式数据发送信息
  ws.onmessage = (event) => {
    // 获取流式数据
    if (event.data === "") {
      return;
    } else {
      nextTick(async () => {
        scrollToBottom();
      });
      model.value.answer[model.value.count] =
        (model.value.answer[model.value.count] || "") + event.data;
      isReceiving.value = true; // WebSocket 收到数据时，设置 isReceiving 为 true
      clearTimeout(messageTimeout); // 清除之前的超时定时器
      messageTimeout = setTimeout(async () => {
        isReceiving.value = false; // 超过时间没有新数据，认为接收结束
        const updateRes = await updateChatHistory(
          model.value.question[model.value.count],
          model.value.answer[model.value.count],
          model.value.sessionName
        );
        console.log(updateRes);
        model.value.count++;
      }, 3000); // 3秒内没有数据，认为数据接收完毕
    }
  };
  console.log(model.value.answer[model.value.count]);
};

const handleKeyDown = async (event) => {
  if (event.key === "Enter") {
    if (event.shiftKey) {
      // Shift + Enter 换行
      const cursorPosition = textarea.value.selectionStart;
      const textBefore = model.value.message.substring(0, cursorPosition);
      const textAfter = model.value.message.substring(cursorPosition);
      model.value.message = textBefore + "\n" + textAfter; // 更新 message，插入换行符
      nextTick(() => {
        // 更新光标位置，保持光标在插入位置后面
        textarea.value.selectionStart = textarea.value.selectionEnd =
          cursorPosition + 1;
      });

      event.preventDefault(); // 阻止默认的换行行为
    } else {
      // Enter 键发送消息
      model.value.question[model.value.count] = model.value.message;
      model.value.message = "";
      const isPlanOrQuiz =
        (await isGeneratePlanOrQuiz(
          //判断是否是生成教学计划或习题
          model.value.question[model.value.count],
          randomUserId
        )) || "other";
      if (isPlanOrQuiz.includes("plan") || isPlanOrQuiz.includes("quiz")) {
        model.value.answer[model.value.count] = isPlanOrQuiz.substring(4);
        model.value.count++;
        scrollToBottom();
      } else {
        sendMessage();
        scrollToBottom();
        event.preventDefault(); // 阻止默认的换行行为
        if (model.value.count === 0) {
          const res = await summarizeTitle(model.value.message, randomUserId);
          model.value.sessionName = res.data.title;
        }
      }
    }
  }
};

const firstSendMessage = async () => {
  connect();
  const isPlanOrQuiz =
    (await isGeneratePlanOrQuiz(
      //判断是否是生成教学计划或习题
      model.value.firstQuestion,
      randomUserId
    )) || "other";
  if (isPlanOrQuiz.includes("plan") || isPlanOrQuiz.includes("quiz")) {
    if (model.value.from === 1) {
      if (model.value.firstQuestion) {
        const res = await summarizeTitle(
          model.value.firstQuestion,
          randomUserId
        );
        model.value.sessionName = res.data.title;
        model.value.question[model.value.count] = model.value.firstQuestion;
        model.value.answer[model.value.count] = isPlanOrQuiz.substring(4);
        const updateRes = await updateChatHistory(
          model.value.question[model.value.count],
          model.value.answer[model.value.count],
          model.value.sessionName
        );
        console.log(updateRes);

        model.value.firstQuestion = "";
        model.value.from = 2; //设置from=2，表示已经发送过消息
        model.value.message = "";
        model.value.count++;
      }
    }
  } else {
    setTimeout(async () => {
      if (isConnected.value) {
        if (model.value.from === 1) {
          //from=1表示从homeChat页面来，第一次发送消息
          sendMessage();
          model.value.question[model.value.count] = model.value.message;
          if (model.value.count === 0) {
            //判断是不是第一次发送消息，如果是则生成会话名称
            const res = await summarizeTitle(model.value.message, randomUserId);
            model.value.sessionName = res.data.title;
          }
          model.value.from = 2; //设置from=2，表示已经发送过消息
          model.value.message = "";
        }
      }
    }, 1500);
  }
};

const requireFile = () => {
  socket.emit("requestFile" + nodePath);
};

const sendToNode = async () => {
  scrollToBottom();
  model.value.question[model.value.count] = model.value.message;
  if (model.value.count === 1) {
    const res = await summarizeTitle(model.value.message, randomUserId);
    console.log(res.data.title);
    model.value.sessionName = "AI教学计划生成";
  }
  model.value.message = "";
  requireFile();
  socket.on("fileChunk", (chunk) => {
    model.value.answer[model.value.count] =
      (model.value.answer[model.value.count] || "") + chunk;
    scrollToBottom();
  });
  socket.on("fileEnd", () => {
    model.value.count++;
    console.log("文件传输结束");
    nodePath++;
    socket.off("fileChunk");
    socket.off("fileEnd");
  });
};

onActivated(() => {
  fetch("http://49.233.37.218:3000").then((res) => {
    console.log(res);
  });
  if (model.value.firstQuestion) {
    nextTick(() => {
      scrollToBottom();
      if (model.value.isNewChat && model.value.isConnected) {
        ws.close();
        model.value.isNewChat = false;
        model.value.isConnected = false;
        firstSendMessage();
        console.log("已发送第一次聊天");
      } else {
        connect();
        firstSendMessage();
        console.log("已发送第一次聊天");
      }
    });
  } else {
    socket.on("connect", () => {
      console.log("Node连接成功");
    });
  }
});

const scrollToBottom = () => {
  nextTick(() => {
    document.querySelector(".AI-newChatContainer__body").scrollTop = 9999999;
  });
};

const unfold = (num) => {
  page.value = num;
  //page为0则不展开，为1拉出历史对话，为2拉出会话资源
  switch (num) {
    case 0:
      chatBody.value.style.transform = "translateX(-50%)";
      chatHistory.value.style.transform = "translateX(120%)";
      chatResource.value.style.transform = "translateX(120%)";
      break;
    case 1:
      chatBody.value.style.transform = "translateX(-90%)";
      chatHistory.value.style.transform = "translateX(0%)";
      chatResource.value.style.transform = "translateX(120%)";
      break;
    case 2:
      chatBody.value.style.transform = "translateX(-90%)";
      chatHistory.value.style.transform = "translateX(120%)";
      chatResource.value.style.transform = "translateX(0%)";
      break;
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/styles/AI";
@include b(footer) {
  width: 100%;
  position: absolute;
  bottom: 12px;
  height: 19px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #95989e;
  line-height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  text-transform: none;
}
@include b(newChatContainer) {
  position: absolute;
  top: 1%;
  width: 45%;
  left: 50%;
  height: 99%;
  transform: translateX(-50%);
  transition: 1s;
  @include e(header) {
    width: 100%;
    top: 0;
    position: absolute;
    padding: 0;
    margin: 0;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fdfdfe;
  }
  @include e(body) {
    position: absolute;
    top: 5%;
    width: 100%;
    height: 70%;
    overflow: auto;
    &::-webkit-scrollbar {
      transform: translateX(10%);
      width: 8px;
      height: 8px;
    }
    /* 滚动条轨道样式 */
    &::-webkit-scrollbar-track {
      background-color: #f1f1f1; /* 轨道的背景颜色 */
      border-radius: 10px; /* 轨道的圆角 */
    }

    /* 滚动条滑块样式 */
    &::-webkit-scrollbar-thumb {
      background-color: #888; /* 滑块的背景颜色 */
      border-radius: 10px; /* 滑块的圆角 */
      border: 2px solid #f1f1f1; /* 滑块的边框 */
    }

    /* 滚动条滑块的悬浮样式 */
    &::-webkit-scrollbar-thumb:hover {
      background-color: #555; /* 悬浮时的颜色 */
    }
    .answer-content,
    .question-content {
      margin: 20px;
    }
    .answer-content img {
      position: absolute;
      transform: translateY(20%);
      left: 20px;
    }
    .answer-content span {
      position: relative;
      left: 52px;
      max-width: 80%;
      display: inline-block;
      background: #ffffff;
      box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.16);
      padding: 10px;
      border-radius: 5px 5px 5px 5px;
      font-weight: 400;
      font-size: 16px;
    }
    .question-content {
      display: flex;
      justify-content: right;
    }

    .question-content span {
      position: relative;
      right: 52px;
      padding: 10px;
      display: inline-block;
      max-width: 80%;
      background: rgb(232, 231, 250);
      font-weight: 400;
      font-size: 16px;
      box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.16);
      border-radius: 5px 5px 5px 5px;
    }
  }

  @include e(input) {
    position: absolute;
    width: 100%;
    bottom: 43px;
    textarea {
      resize: none;
      width: 100%;
      height: 120px;
      background: #ffffff;
      border-radius: 20px 20px 20px 20px;
      border: 2px solid #548ee0;
      padding: 20px;
      box-sizing: border-box;
    }
    img {
      position: absolute;
      right: 20px;
      bottom: 20px;
      cursor: pointer;
    }
  }
}
@include b(historyContainer) {
  position: absolute;
  transform: translateX(120%);
  transition: 1s;
  display: flex;
  justify-content: center;
  top: 36px;
  right: 28px;
  width: 35%;
  height: 87%;
  background: #ffffff;
  box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.16);
  border-radius: 20px 20px 20px 20px;
  overflow-y: auto;
  @include m(close) {
    position: absolute;
    top: 24px;
    right: 28px;
    cursor: pointer;
  }
  @include e(box) {
    position: relative;
    top: 50px;
    width: 480px;
    height: 205px;
    background: rgb(245, 248, 253);
    border-radius: 5px 5px 5px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      position: absolute;
      z-index: 1;
      top: 14px;
      left: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 14px;
      color: #000000;
      line-height: 21px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    @include m(rename) {
      position: absolute;
      top: 12px;
      right: 52px;
    }
    @include m(delete) {
      position: absolute;
      top: 12px;
      right: 16px;
    }
    @include m(img) {
      position: relative;
      top: 10px;
      margin: 10px 10px 0px 10px;
      width: 140px;
      height: 140px;
      background: #ffffff;
    }
  }
}
@include b(resourceContainer) {
  position: absolute;
  transform: translateX(120%);
  transition: 1s;
  display: flex;
  justify-content: center;
  top: 36px;
  right: 28px;
  width: 35%;
  height: 87%;
  background: #ffffff;
  box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.16);
  border-radius: 20px 20px 20px 20px;
  overflow-y: auto;
  @include m(close) {
    position: absolute;
    top: 24px;
    right: 28px;
    cursor: pointer;
  }
  @include m(line) {
    position: absolute;
    top: 58px;
    left: 10%;
    width: 90%;
    height: 1px;
    border: 1px solid #9fa5b1;
    background: #9fa5b1;
  }
  @include e(iconBox) {
    position: absolute;
    top: 16px;
    left: 28px;
    width: 120px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      position: relative;
    }
  }
}
.file-input {
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 20px;
  margin: 0;
  padding: 0;
  right: 60px;
  cursor: pointer;
}
</style>