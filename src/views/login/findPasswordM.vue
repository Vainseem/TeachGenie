<template>
  <div class="findPass">
    <div class="findPass-header">找回密码</div>
    <el-form ref='formRef' :model = 'form' style="min-height: 600px" class="register-form" :rules="rules">
        <el-form-item prop="username" class="register-input-username">
          <el-input type="text" :prefix-icon="Iphone" size="large" v-model="form.mobile" placeholder="请输入注册手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="register-input-password">
          <el-input v-if="isView" type="text" :prefix-icon="Lock" size="large" v-model="form.password" placeholder="请输入新密码" >
            <template #suffix>
              <el-icon @click="handleSuffix(0)" class="register-icon"><Hide /></el-icon>
            </template>
          </el-input>
          <el-input v-else type="password" :prefix-icon="Lock" size="large" v-model="form.password" placeholder="请输入新密码">
            <template #suffix>
              <el-icon @click="handleSuffix(0)" class="register-icon"><View /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="register-input-confirmPassword">
          <el-input v-if="checkIsView" type="text" :prefix-icon="Lock" size="large" v-model="form.confirmPassword" placeholder="请确认新密码" @blur="checkPass">
            <template #suffix>
              <el-icon @click="handleSuffix(1)" class="register-icon"><Hide /></el-icon>
            </template>
          </el-input>
          <el-input v-else type="password" :prefix-icon="Lock" size="large" v-model="form.confirmPassword" placeholder="请确认新密码" @blur="checkPass">
            <template #suffix>
              <el-icon @click="handleSuffix(1)" class="register-icon"><View /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input type="text" v-model="form.code" placeholder="请输入验证码" class="verificationInput"></el-input>
          <el-button type="info" :disabled="codeDisabled" class="verificationButton" @click="sendVerification" plain>获取验证码</el-button>
        </el-form-item>
        <el-button type="primary" class="register-button" @click="handleRegister">重置密码</el-button>
    </el-form>
    <div class="goLogin" @click="goLogin(0)">返回登录</div>
    <div class="findPass-footer">选择找回方式</div><div class="line1"></div><div class="line2"></div>
    <div class="findByEmail" @click="goFindEmail">邮箱找回</div><div class="findByPhone">手机号找回</div>
  </div>
</template>
<script setup>
import { Hide, Lock, Iphone, View } from "@element-plus/icons-vue";
import {ref} from "vue";
import store from "@/store";

const isView = ref(false);
const checkIsView = ref(false);
const codeDisabled = ref(false);
const form = ref({
  mobile: "",
  password: '',
  confirmPassword: "",
  code:'',
})
const rules = ref({
  username:[{
    required: true,
    message: '请输入注册手机号',
    trigger: 'blur'
  }],
  password:[{
    required: true,
    trigger:'blur',
    message:'请输入密码'
  }],
  checkPass:[{
  }]
})
const handleSuffix = (e) => {
  switch (e){
    case 0:{
      isView.value = !isView.value;
      break;
    }
    case 1:{
      checkIsView.value = !checkIsView.value;
    }
  }
}
const sendVerification = async () => {
  codeDisabled.value = true
  setTimeout(() => {
    codeDisabled.value = false
  }, 60000)
}
const checkPass = ()=>{
  if(form.value.confirmPassword === ''){
    rules.value.checkPass.length = 0
    rules.value.checkPass.push({
      required: true,
      message:'请确认密码',
      trigger:'blur'})
  }else if(form.value.confirmPassword !== form.value.password){
    rules.value.checkPass.length = 0
    rules.value.checkPass.push({
      required: true,
      message:'两次密码不一致',
      trigger:'blur'})
  }else if(form.value.confirmPassword === form.value.password){
    rules.value.checkPass.length = 0
    return
  }
}
const goLogin = (e)=>{
  store.commit('changeRegisterStatus',e)
}
const goFindEmail = ()=>{
  store.commit('changeRegisterStatus',4)
}
</script>

<style scoped>
.findPass{
  position: absolute;
  left: calc((895/1536)*100vw);;
  top: calc((150/730)*100vh);;
  width: 400px;
  height: 500px;
  background: #FFFFFF;
  box-shadow: 0px 5px 20px 1px rgba(0,0,0,0.15);
  border-radius: 10px 10px 10px 10px;
}
.findPass-header{
  top: 22px;
  left: 152px;
  position: absolute;
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
.register-input-username{
  position: absolute;
  top: 73px;
  left: 30px;
  width: 341px;
  height: 42px;
  background: #FFFFFF;
  border-radius: 3px 3px 3px 3px;
}
.register-input-password{
  position: absolute;
  top: 131px;
  left: 30px;
  width: 341px;
  height: 42px;
  background: #FFFFFF;
  border-radius: 3px 3px 3px 3px;
}
.register-input-confirmPassword{
  position: absolute;
  top: 189px;
  left: 30px;
  width: 341px;
  height: 42px;
  background: #FFFFFF;
  border-radius: 3px 3px 3px 3px;
}
.verificationInput{
  position: absolute;
  left: 30px;
  top: 247px;
  width: 205px;
  height: 42px;
  background: #FFFFFF;
  border-radius: 3px 3px 3px 3px;
}
.verificationButton{
  position: absolute;
  left: 251px;
  top: 247px;
  width: 120px;
  height: 42px;
  background: #548EE0;
  border-radius: 3px 3px 3px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;
  line-height: 20px;
  font-style: normal;
  text-transform: none;
}
.register-button{
  position: absolute;
  top: 305px;
  left: 30px;
  width: 341px;
  height: 44px;
  background: #548EE0;
  border-radius: 3px 3px 3px 3px;
  display: flex;
  align-items: center;justify-content: center;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 20px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}
.goLogin{
  position: absolute;
  top: 365px;
  left: 172px;
  width: 56px;
  height: 19px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #6C9FE4;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}
.findPass-footer{
  position: absolute;
  top: 396px;
  left: 164px;
  width: 72px;
  height: 16px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #9FA5B1;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.findByEmail{
  position: absolute;
  top: 428px;
  left: 30px;
  width: 160px;
  height: 44px;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #9FA5B1;
  display: flex;
  align-items: center;justify-content: center;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #9FA5B1;
  line-height: 20px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}
.findByPhone{
  position: absolute;
  top: 428px;
  left: 211px;
  width: 160px;
  height: 44px;
  background: #548EE0;
  border-radius: 3px 3px 3px 3px;
  display: flex;
  align-items: center;justify-content: center;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 20px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}
.register-icon{
  cursor: pointer;
}
.line1,.line2{
  position: absolute;
  top: 405px;
  width: 122px;
  height: 0px;
  border: 1px solid #DEE1E4;
}
.line2{
  left: 248px;

}
.line1{
  left: 31px;
}
</style>