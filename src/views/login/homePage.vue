<template>
  <div class="container">
    <div ref="active" class="active">
      <div class="line">———</div>
    </div>
    <div class="HOME" @click="slider('HOME')">首页</div>
    <div class="ABOUT" @click="slider('ABOUT')">关于</div>
    <div class="LOGIN" @click="slider('LOGIN')">登录</div>

    <img
      :style="home_left_style"
      class="home_left"
      src="@/assets/home_slices/home_left.png"
    />
    <img
      :style="home_top_style"
      class="home_top"
      src="@/assets/home_slices/home_top.png"
    />
    <img
      :style="home_middle_style"
      class="home_middle"
      src="@/assets/home_slices/home_middle.png"
    />
    <img
      :style="home_right_style"
      class="home_right"
      src="@/assets/home_slices/home_right.png"
    />

    <img
      :style="login_top_style"
      ref="login_top"
      class="login_top"
      src="@/assets/login_slices/login_top.png"
    />
    <img
      :style="login_left_style"
      ref="login_left"
      class="login_left"
      src="@/assets/login_slices/login_left.png"
    />
    <img
      :style="login_middle_style"
      ref="login_middle"
      class="login_middle"
      src="@/assets/login_slices/login_middle.png"
    />
    <img
      :style="login_bottom_style"
      ref="login_bottom"
      class="login_bottom"
      src="@/assets/login_slices/login_bottom.png"
    />
    <img
      :style="login_right_style"
      ref="login_right"
      class="login_right"
      src="@/assets/login_slices/home_right.png"
    />
    <div v-if="pageNum === 0" style="transition: 1s">
      <div class="home_bg"></div>
      <div class="discription">师说新语</div>
      <div class="Lorem">
        为了解决当前教育领域的困难问题，师说新语响应当前教育数字化转型的迫切需求，将当下先进的AI技术应用于教育领域，我们在多设备端进行开发，依靠检索增强技术、对抗学习、用户画像、数字人教师、软件定义网络等前沿核心技术，构建了基于人机对抗与检索增强协同式备课平台，通过技术革新，解决传统教育方法中的多重痛点，为教师提供便捷的备课服务、为学生提供高质量的课程与学习资源。
      </div>
      <div class="start-button" @click="slider('LOGIN')">开始使用</div>
      <div class="home_illustration">
        <img src="@/assets/home_slices/home_illustration.png" />
      </div>
    </div>
    <div v-else-if="pageNum === 1">关于</div>
    <div v-else-if="pageNum === 2">
      <login-page></login-page>
    </div>
  </div>
</template>
<script setup>
import LoginPage from "@/views/login/loginPage.vue";
import { computed, ref } from "vue";
const login_top = ref(null);
const login_left = ref(null);
const login_middle = ref(null);
const login_bottom = ref(null);
const login_right = ref(null);
const active = ref(null);
const pageNum = ref(0);

//椭圆进出场动画
const home_left_style = computed(() => {
  return {
    top: pageNum.value === 0 ? "calc((647/730)*100vh)" : "1500px",
    opacity: pageNum.value === 0 ? "1" : "0",
  };
});
const home_top_style = computed(() => {
  return {
    top: pageNum.value === 0 ? "calc((-124/730)*100vh)" : "-300px",
    opacity: pageNum.value === 0 ? "1" : "0",
  };
});
const home_middle_style = computed(() => {
  return {
    top: pageNum.value === 0 ? "calc((109/730)*100vh)" : "-200px",
    opacity: pageNum.value === 0 ? "1" : "0",
  };
});
const home_right_style = computed(() => {
  return {
    top: pageNum.value === 0 ? "calc((-82/730)*100vh)" : "-200px",
    opacity: pageNum.value === 0 ? "1" : "0",
  };
});
const login_top_style = computed(() => {
  return {
    position: "absolute",
    top: pageNum.value === 2 ? "-74px" : "-200px",
    opacity: pageNum.value === 2 ? "1" : "0",
    left: "calc((464/1536)*100vw)",
  };
});
const login_left_style = computed(() => {
  return {
    position: "absolute",
    top: pageNum.value === 2 ? "752px" : "1500px",
    opacity: pageNum.value === 2 ? "1" : "0",
    left: "calc((154/1536)*100vw)",
  };
});
const login_right_style = computed(() => {
  return {
    position: "absolute",
    top: pageNum.value === 2 ? "-82px" : "-200px",
    opacity: pageNum.value === 2 ? "1" : "0",
    left: "calc((1305/1536)*100vw)",
  };
});
const login_middle_style = computed(() => {
  return {
    position: "absolute",
    top: pageNum.value === 2 ? "671px" : "1500px",
    opacity: pageNum.value === 2 ? "1" : "0",
    left: "calc((963/1536)*100vw)",
  };
});
const login_bottom_style = computed(() => {
  return {
    position: "absolute",
    top: pageNum.value === 2 ? "735px" : "1500px",
    opacity: pageNum.value === 2 ? "1" : "0",
    left: "calc((1029/1536)*100vw)",
  };
});

const slider = (e) => {
  switch (e) {
    case "HOME":
      active.value.style.left = "942px";
      pageNum.value = 0;
      break;
    case "ABOUT":
      active.value.style.left = "1042px";
      pageNum.value = 1;
      break;
    case "LOGIN":
      active.value.style.left = "1142px";
      pageNum.value = 2;
      break;
  }
};
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.container {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}

.home_illustration {
  position: absolute;
  left: calc((599 / 1536) * 100vw);
  top: calc((115 / 730) * 100vh);
}

.home_left {
  position: absolute;
  left: calc((-179 / 1536) * 100vw);
  top: calc((647 / 730) * 100vh);
}

.home_top {
  position: absolute;
  left: calc((288 / 1536) * 100vw);
  top: calc((-124 / 730) * 100vh);
}

.home_middle {
  position: absolute;
  left: calc((550 / 1536) * 100vw);
  top: calc((109 / 730) * 100vh);
}

.home_right {
  position: absolute;
  left: calc((1355 / 1536) * 100vw);
  top: calc((-82 / 730) * 100vh);
}

.home_left,
.home_right,
.home_middle,
.home_top,
.login_top,
.login_middle,
.login_right,
.login_bottom,
.login_left {
  transition: 1s;
}

.discription {
  position: absolute;
  left: 139px;
  top: 231px;
  width: 288px;
  height: 140px;
  font-family: Arial, Arial;
  font-weight: bold;
  font-size: 59px;
  color: #161c79;
  line-height: 74px;
  letter-spacing: 5px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.Lorem {
  position: absolute;
  left: 139px;
  top: 407px;
  width: 364px;
  height: 96px;
  font-family: Arial, Arial;
  font-weight: 400;
  font-size: 11px;
  color: #999999;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.start-button {
  cursor: pointer;
  position: absolute;
  left: 366px;
  top: 544px;
  width: 148px;
  height: 41px;
  background: #ff65a7;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 40px 40px 40px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Arial;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  line-height: 0px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.HOME,
.ABOUT,
.LOGIN,
.active {
  position: absolute;
  cursor: pointer;
  top: 16px;
  width: 101px;
  height: 41px;
  border-radius: 40px 40px 40px 40px;
  font-family: Arial, Arial;
  font-weight: 400;
  font-size: 14px;
  color: #4a4b6e;
  line-height: 21px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.HOME {
  left: 942px;
}

.ABOUT {
  left: 1042px;
}

.LOGIN {
  left: 1142px;
}

.active {
  background: #f6f1fc;
  left: 942px;
  transition: 1s;
}

.active .line {
  position: absolute;
  top: 35px;
  font-weight: bolder;
  color: #bdbbc7;
}
</style>