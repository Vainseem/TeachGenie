<template >
  <div class="box">
    <div class="login_illustration">
      <img src="@/assets/login_slices/login_illustration.png" />
    </div>

    <div class="login_box" v-if="store.state.registerStatus === 0">
      <div class="content">用户登录</div>
      <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
        <el-form-item prop="username" class="login-username">
          <el-input
            type="text"
            :prefix-icon="User"
            size="large"
            v-model="form.username"
            placeholder="请输入用户名/邮箱/手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-password">
          <el-input
            v-if="isView"
            type="text"
            :prefix-icon="Lock"
            size="large"
            v-model="form.password"
            placeholder="请输入密码"
          >
            <template #suffix>
              <el-icon @click="handleSuffix" class="icon"><Hide /></el-icon>
            </template>
          </el-input>
          <el-input
            v-else
            type="password"
            :prefix-icon="Lock"
            size="large"
            v-model="form.password"
            placeholder="请输入密码"
          >
            <template #suffix>
              <el-icon @click="handleSuffix" class="icon"><View /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button class="login-button" @click="handleLogin">登陆</el-button>
      </el-form>
      <div class="remember-password">
        <el-checkbox v-model="isPassRemembered">记住密码</el-checkbox>
      </div>
      <div class="forget-password" @click="changeRegisterStatus(3)">
        忘记密码？
      </div>
      <div class="no-username">还没有账号？</div>
      <div class="register" @click="changeRegisterStatus(1)">立即注册</div>
      <div class="chooseJob">选择登陆身份</div>
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="student-login">学生登录</div>
      <div class="teacher-login active">教师登录</div>
    </div>
    <email-register
      v-else-if="store.state.registerStatus === 1"
    ></email-register>
    <mobile-register
      v-else-if="store.state.registerStatus === 2"
    ></mobile-register>
    <find-password-m
      v-else-if="store.state.registerStatus === 3"
    ></find-password-m>
    <find-password-e
      v-else-if="store.state.registerStatus === 4"
    ></find-password-e>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { User, Lock, View, Hide } from "@element-plus/icons-vue";
import { login } from "@/api/login";
import router from "@/router";
import store from "@/store";
import EmailRegister from "@/views/register/emailRegister.vue";
import MobileRegister from "@/views/register/mobileRegister.vue";
import FindPasswordM from "@/views/login/findPasswordM.vue";
import FindPasswordE from "@/views/login/findPasswordE.vue";
import dayjs from "dayjs";

const isPassRemembered = ref(true);
const isView = ref(false);
const form = ref({
  username: localStorage.getItem("account") || "",
  password: localStorage.getItem("password") || "",
});
const formRef = ref(null);
const rules = ref({
  username: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      message: "请输入密码",
    },
  ],
});

const changeRegisterStatus = (num) => {
  store.commit("changeRegisterStatus", num);
};

const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (isPassRemembered.value) {
        localStorage.setItem("password", form.value.password);
      }
      localStorage.setItem("account", form.value.username);
      const res = await login(form.value);

      if (res.data.status === 200) {
        const userInfo = {
          username: res.data.message.username,
          role: res.data.message.role,
          token: res.data.message.token,
          uid: res.data.message.uid,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        const currentLoginDate = dayjs();
        localStorage.setItem("lastLoginDate", currentLoginDate); //七天免登录，记录登录时间
        sessionStorage.setItem("hasRefreshed", "false"); //页面刷新逻辑，避免数据从localStorage中获取慢一步
        ElMessage.success("登陆成功");
        router.push({ path: "/teacher/AIDesign", query: { from: "login" } });
      } else {
        ElMessage.error(res.data.message);
      }
    } else {
      ElMessage.error("错误");
      return false;
    }
  });
};

const handleSuffix = () => {
  isView.value = !isView.value;
};

onMounted(() => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const lastLoginDate = localStorage.getItem("lastLoginDate"); //七天免登录，记录登录时间
  let lastLoginDateStr = null;
  let userInfoStr = null;
  lastLoginDateStr = lastLoginDate ? lastLoginDate : null;
  userInfoStr = userInfo ? userInfo : null;
  const daysDiff = dayjs().diff(lastLoginDateStr, "day");
  if (userInfoStr && userInfoStr.token && daysDiff < 7) {
    router.push("/teacher/AIDesign"); // token 存在时跳转
    ElMessage.success("免登录成功");
  }
});
</script>

<style scoped>
h2 {
  position: absolute;
  color: white;
  left: 50%;
  top: -5%;
  transform: translateX(-50%) translateY(-50%);
}
.login_illustration {
  position: absolute;
  left: calc((145 / 1536) * 100vw);
  top: 150px;
}
.login_box {
  position: absolute;
  left: calc((895 / 1536) * 100vw);
  top: 159px;
  width: 400px;
  height: 479px;
  background: #ffffff;
  box-shadow: 0px 5px 20px 1px rgba(0, 0, 0, 0.15);
  border-radius: 10px 10px 10px 10px;
}
.login_box .content {
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  width: 96px;
  height: 31px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: bold;
  font-size: 24px;
  color: #202937;
  line-height: 20px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
.login-username,
.login-password,
.login-button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.login-username {
  top: 81px;
  width: 341px;
  height: 42px;
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
}
.login-password {
  top: 147px;
  width: 341px;
  height: 42px;
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
}
.login-button {
  top: 260px;
  width: 341px;
  height: 44px;
  background: #548ee0;
  border-radius: 3px 3px 3px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  line-height: 20px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
.remember-password {
  position: absolute;
  left: 30px;
  top: 210px;
}
.forget-password {
  position: absolute;
  top: 213px;
  left: 301px;
  width: 70px;
  height: 19px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #6c9fe4;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}
.no-username {
  position: absolute;
  left: 129px;
  top: 328px;
  width: 84px;
  height: 19px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #95989e;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.register {
  position: absolute;
  left: 217px;
  top: 328px;
  width: 56px;
  height: 19px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #6c9fe4;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}
.chooseJob {
  position: absolute;
  left: 164px;
  top: 367px;
  width: 72px;
  height: 16px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #9fa5b1;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.line1,
.line2 {
  position: absolute;
  width: 122px;
  height: 0px;
  border: 1px solid #dee1e4;
  top: 376px;
}
.line1 {
  left: 31px;
}
.line2 {
  left: 248px;
}
.student-login,
.teacher-login {
  position: absolute;
  width: 160px;
  height: 44px;
  border: 1px solid #9fa5b1;
  border-radius: 3px 3px 3px 3px;
  top: 403px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #95989e;
  line-height: 20px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}
.student-login {
  left: 30px;
}
.teacher-login {
  left: 211px;
}
.active {
  border: 0px;
  background: #548ee0;
  color: #ffffff;
}
.icon {
  cursor: pointer;
  position: absolute;
  right: 10px;
  z-index: 1;
}
</style>