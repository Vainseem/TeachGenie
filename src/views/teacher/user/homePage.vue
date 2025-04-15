<template>
  <!-- 
  
    <template #header>
      <div class="card-header">
        <span>资料管理</span>
      </div>
    </template>

    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      size="large"
      status-icon
    >
      <div style="margin-bottom: 25px">
        <span
          style="
            position: relative;
            top: 50px;
            left: 40px;
            font-size: 14px;
            color: rgb(96, 98, 102);
          "
          >头像</span
        >
        <input
          class="avatarInput"
          type="file"
          @change="onAvatar"
          accept="image/*"
        />
        <div
          style="
            position: relative;
            left: 100px;
            top: 20px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
          "
        >
          <img
            style="width: 100%; height: 100%; border-radius: 50%"
            :src="ruleForm.avatarURL"
          />
        </div>
      </div>

      <el-form-item label="昵称" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="常用邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input type="number" v-model="ruleForm.mobile" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="ruleForm.real_name" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-segmented v-model="ruleForm.gender" :options="genderOptions" />
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="11">
          <el-form-item prop="birthday">
            <el-date-picker
              v-model="formattedBirthday"
              type="date"
              aria-label="Pick a date"
              placeholder="选择日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="个人简介" prop="introduction">
        <el-input v-model="ruleForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save(ruleForm)"> 保存 </el-button>
      </el-form-item>
    </el-form>
  </el-card> -->
  <div class="user-basicInfo">
    <div class="user-basicInfo__content">基本信息</div>
    <div class="user-basicInfo__avatar">
      <input
        class="avatarInput"
        type="file"
        @change="onAvatar"
        accept="image/*"
      />
      <el-avatar :size="90" :src="avatarURL" />
    </div>
    <div class="user-basicInfo__username">姓名</div>
    <input
      class="user-basicInfo__username--input"
      v-model="userForm.username"
      @blur="updateUserForm"
    />
    <div class="user-basicInfo__school">学校</div>
    <input
      class="user-basicInfo__school--input"
      v-model="userForm.school"
      @blur="updateUserForm"
    />
  </div>
  <div class="user-account">
    <div class="user-account__content">账号安全</div>
    <div class="user-account__phone--content">手机号码</div>
    <div class="user-account__phone">138****5678</div>
    <div class="user-account__email--content">邮箱地址</div>
    <div class="user-account__email">li****@gmail.com</div>
    <div class="user-account__password--content">登录密码</div>
    <div class="user-account__password">建议定期更换密码，确保账号安全</div>
    <div class="user-changePhone">修改</div>
    <div class="user-changeEmail">修改</div>
    <div class="user-changePassword">修改</div>
    <div class="user-logout" @click="logout">退出账号</div>
    <div class="user-writeOff">注销账号</div>
  </div>
</template>
<script setup>
import router from "@/router";
import { onMounted, ref, computed } from "vue";
import { ElMessage } from "element-plus";
import {
  updateAvatar,
  updateUserDetail,
  updateUserInfo,
} from "@/api/teacherAPI";
import { filterForm } from "../../../../public/methods";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const userForm = ref({
  uid: userInfo.uid,
  username: userInfo.username,
  school: "未填写",
  email: userInfo.email || "未填写",
  mobile: userInfo.mobile || "未填写",
});
const filteredUserForm = computed(() =>
  filterForm(userForm.value, "email", "mobile")
);
const avatarURL = ref(`http://8.137.77.237/images/${userInfo.uid}.jpg`);
const updateUserForm = async () => {
  const res = await updateUserDetail(filteredUserForm.value);
  if (res.data.status === 200) {
    ElMessage.success("成功更新个人信息");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } else {
    ElMessage.error("更新个人信息失败");
  }
};
const onAvatar = async (event) => {
  const file = event.target.files[0]; // 获取选择的文件
  if (!file) {
    ElMessage.error("请选择图片");
    return;
  }
  const res = await updateAvatar(file);
  if (res.data.status === 200) {
    ElMessage.success("成功更新头像");
    avatarURL.value = `http://8.137.77.237/images/${userInfo.uid}.jpg`;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } else {
    ElMessage.error("更新头像失败");
  }
};

const logout = () => {
  localStorage.removeItem("userInfo");
  router.push("/");
};
onMounted(async () => {
  avatarURL.value = `http://8.137.77.237/images/${userInfo.uid}.jpg`;
  const res = await updateUserInfo();
  userForm.value.school = res.data.message.school || "未填写";
  userForm.value.username = res.data.message.username;
});
</script>

<style lang="scss" scoped>
.avatarInput {
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 90px;
  height: 90px;
  background: #ffffff;
  border-radius: 50%;
}
@import "@/assets/styles/_user.scss";
@include b(basicInfo) {
  position: relative;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 1164px;
  height: 186px;
  background: #ffffff;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;

  @include e(content) {
    position: absolute;
    top: 22px;
    left: 25px;
    width: 73px;
    height: 22px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: bold;
    font-size: 17px;
    color: #000000;
    line-height: 21px;
    font-style: normal;
    text-transform: none;
  }
  @include e(avatar) {
    position: absolute;
    top: 64px;
    left: 32px;
    width: 90px;
    height: 90px;
    background: #ffffff;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  @include e(username) {
    position: absolute;
    top: 73px;
    left: 170px;
    width: 50px;
    height: 22px;
    width: 38px;
    height: 24px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 18px;
    color: #707070;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    @include m(input) {
      position: absolute;
      top: 105px;
      left: 170px;
      width: 450px;
      height: 40px;
      background: #ffffff;
      border-radius: 5px 5px 5px 5px;
      border: 1px solid #95989e;
      display: inline-block;
      padding-inline-start: 10px;
      &:focus {
        outline: none;
      }
    }
  }
  @include e(school) {
    position: absolute;
    top: 73px;
    left: 668px;
    width: 38px;
    height: 24px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 18px;
    color: #707070;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    @include m(input) {
      position: absolute;
      top: 105px;
      left: 668px;
      width: 450px;
      height: 40px;
      background: #ffffff;
      border-radius: 5px 5px 5px 5px;
      border: 1px solid #95989e;
      display: inline-block;
      padding-inline-start: 10px;
      &:focus {
        outline: none;
      }
    }
  }
}
@include b(account) {
  position: relative;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 1164px;

  height: 400px;
  background: #ffffff;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  @include e(content) {
    position: absolute;
    top: 22px;
    left: 25px;
    width: 73px;
    height: 22px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: bold;
    font-size: 17px;
    color: #000000;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
  @include e(phone) {
    position: absolute;
    top: 108px;
    left: 24px;
    height: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 15px;
    color: #707070;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    @include m(content) {
      position: absolute;
      top: 74px;
      left: 24px;
      width: 73px;
      height: 22px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 17px;
      color: #000000;
      line-height: 21px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
  @include e(email) {
    position: absolute;
    top: 182px;
    left: 24px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 15px;
    color: #707070;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    @include m(content) {
      position: absolute;
      top: 148px;
      left: 24px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 17px;
      color: #000000;
      line-height: 21px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
  @include e(password) {
    position: absolute;
    top: 256px;
    left: 24px;
    width: 246px;
    height: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 15px;
    color: #707070;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    @include m(content) {
      position: absolute;
      top: 222px;
      left: 24px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 17px;
      color: #000000;
      line-height: 21px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}
@include b(logout) {
  position: absolute;
  top: 320px;
  left: 398px;
  width: 152px;
  height: 48px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  border: 1px solid #1661cb;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1661cb;
  font-weight: 400;
  font-size: 18px;
  cursor: pointer;
}
@include b(writeOff) {
  position: absolute;
  top: 320px;
  left: 614px;
  width: 152px;
  height: 48px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  border: 1px solid #ce2020;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ce2020;
  font-weight: 400;
  font-size: 18px;
  cursor: pointer;
}
@include b(changePhone) {
  position: absolute;
  top: 74px;
  right: 24px;
  width: 36px;
  height: 22px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 17px;
  color: #548ee0;
  line-height: 21px;
  cursor: pointer;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
@include b(changeEmail) {
  position: absolute;
  top: 148px;
  right: 24px;
  width: 36px;
  height: 22px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 17px;
  color: #548ee0;
  line-height: 21px;
  cursor: pointer;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
@include b(changePassword) {
  position: absolute;
  top: 222px;
  right: 24px;
  width: 36px;
  height: 22px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 17px;
  color: #548ee0;
  line-height: 21px;
  cursor: pointer;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
</style>


