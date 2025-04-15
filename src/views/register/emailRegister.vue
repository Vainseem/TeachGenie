<template >
  <div class="register-box">
    <div class="register-header">用户注册</div>
    <el-form ref='formRef' :model = 'form' style="min-height: 600px" class="register-form" :rules="rules">
      <el-select size="large" class="selector" v-model="form.job" :options="options" @change="handleJob">
        <el-option v-for="item in options" :key="item.value" :value="item.value" />
      </el-select>
      <el-form-item prop="username" class="register-input-username">
        <el-input type="text" :prefix-icon="User" size="large" v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="email" class="register-input-email">
        <el-input type="text" :prefix-icon="Message" size="large" v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="register-input-password">
        <el-input v-if="isView" type="text" :prefix-icon="Lock" size="large" v-model="form.password" placeholder="请设置密码" >
          <template #suffix>
            <el-icon @click="handleSuffix(0)" class="register-icon"><Hide /></el-icon>
          </template>
        </el-input>
        <el-input v-else type="password" :prefix-icon="Lock" size="large" v-model="form.password" placeholder="请设置密码">
          <template #suffix>
            <el-icon @click="handleSuffix(0)" class="register-icon"><View /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass" class="register-input--confirmPassword">
        <el-input v-if="checkIsView" type="text" :prefix-icon="Lock" size="large" v-model="form.confirmPassword" placeholder="请确认密码" @blur="checkPass">
          <template #suffix>
            <el-icon @click="handleSuffix(1)" class="register-icon"><Hide /></el-icon>
          </template>
        </el-input>
        <el-input v-else type="password" :prefix-icon="Lock" size="large" v-model="form.confirmPassword" placeholder="请确认密码" @blur="checkPass">
          <template #suffix>
            <el-icon @click="handleSuffix(1)" class="register-icon"><View /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" v-model="form.code" placeholder="请输入验证码" class="verificationInput"></el-input>
        <el-button type="info" :disabled="codeDisabled" class="verificationButton" @click="sendVerification" plain>向邮箱发送验证码</el-button>
      </el-form-item>
        <el-button type="primary" class="register-button" @click="handleRegister">注册</el-button>
    </el-form>
    <div class="registered">已有账号？</div>
    <div class="goLogin" @click="goLogin(0)">立即登录</div>
    <div class="register-footer">选择登录方式</div>
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="emailRegister">邮箱注册</div>
    <div class="mobileRegister" @click="changeRegisterWay(2)">手机号注册</div>
  </div>

</template>
<script setup>
import {Hide, Lock, Message, User, View} from "@element-plus/icons-vue";
import store from "@/store";
import {ref} from "vue";
import {emailRegister, emailVerification} from "@/api/register";
import {ElMessage} from "element-plus";
import router from "@/router";
const codeDisabled = ref(false);
const isView = ref(false);
const checkIsView = ref(false);
const form = ref({
  username: "",
  email: '',
  password: '',
  confirmPassword: "",
  code:'',
  job:'教师'
})
const options = [
  {
    value:'学生'
  },
  {
    value:'教师'
  }
]
const rules = ref({
  username:[{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }],
  email:[{
    required: true,
    message: '请输入有效邮箱',
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

const changeRegisterWay = (num) =>{
  store.commit('changeRegisterStatus',num)
}

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
const formRef = ref(null)

const handleRegister = async () => {
  const formData = {
    email: form.value.email,
    code:form.value.code,
    username: form.value.username,
    password: form.value.password
  }
  const res = await emailRegister(formData)
  if (res.data.status === 200 && res.data.message == null) {
    ElMessage.success('注册成功')
    await router.push('/login')
  }else {
    ElMessage.error(res.data.message)
  }
}

const sendVerification = async () => {
  codeDisabled.value = true
  setTimeout(()=> {
    codeDisabled.value = false
  },60000)
  const email = form.value.email;
  const res = await emailVerification(email)
  if (res.data.status == 200) {
    ElMessage.success('验证码以发送至邮箱，请注意查收')
  }else {
    ElMessage.error('验证码发送失败，请重试')
  }
}

const goLogin = (e)=>{
  store.commit('changeRegisterStatus',e)
}

</script>

<style scoped>
h2{
  position: absolute;
  color: white;
  left: 50%;
  top: -5%;
  transform: translateX(-50%) translateY(-50%);
}
.register-box{
  position: absolute;
  left: calc((895/1536)*100vw);;
  top: calc((122/730)*100vh);;
  width: 400px;
  height: 556px;
  background: #FFFFFF;
  box-shadow: 0px 5px 20px 1px rgba(0,0,0,0.15);
  border-radius: 10px 10px 10px 10px;
}
.register-header{
  position: absolute;
  top: 20px;
  left: 152px;
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
.selector{
  position: absolute;
  top: 71px;
  left: 251px;
  width: 120px;
  height: 42px;
  border-radius: 3px 3px 3px 3px;
}
.register-form{
  width: 100%;
  height: 100%;
}
.register-input-username{
  position: absolute;
  left: 30px;
  top: 71px;
  width: 205px;
  height: 42px;
  background: #FFFFFF;
  border-radius: 3px 3px 3px 3px;
}
.register-input-password{
  position: absolute;
  top: 129px;
  left: 30px;
  width: 341px;
  height: 42px;
  background: #FFFFFF;
  border-radius: 3px 3px 3px 3px;
}
.register-input--confirmPassword{
  position: absolute;
  top: 187px;
  left: 30px;
  width: 341px;
  height: 42px;
  background: #FFFFFF;
  border-radius: 3px 3px 3px 3px;
}
.register-input-email{
  position: absolute;
  top: 245px;
  left: 30px;
  width: 341px;
  height: 42px;
  background: #FFFFFF;
  border-radius: 3px 3px 3px 3px;
}
.register-button{
  position: absolute;
  top: 361px;
  left: 30px;
  width: 341px;
  height: 44px;
  background: #548EE0;
  border-radius: 3px 3px 3px 3px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  text-transform: none;
}
.icon {
  position: absolute; /* 使图标可以相对父容器进行定位 */
  left: -40px;
}
.verificationInput{
  position: absolute;
  top: 303px;
  left: 30px;
  width: 205px;
  height: 42px;
  background: #FFFFFF;
  border-radius: 3px 3px 3px 3px;
}
.verificationButton{
  position: absolute;
  top: 303px;
  left: 251px;
  width: 120px;
  height: 42px;
  background: #548EE0;
  border-radius: 3px 3px 3px 3px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  text-transform: none;
}
.registered{
  position: absolute;
  top: 421px;
  left: 135px;
  width: 70px;
  height: 19px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #95989E;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.goLogin{
  cursor: pointer;
  position: absolute;
  left: 209px;
  top: 421px;
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
}
.register-footer{
  position: absolute;
  top: 452px;
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
.line1{
  position: absolute;
  top: 461px;
  left: 31px;
  width: 122px;
  height: 0px;
  border: 1px solid #DEE1E4;
}
.line2{
  position: absolute;
  top: 461px;
  left: 248px;
  width: 122px;
  height: 0px;
  border: 1px solid #DEE1E4;
}
.emailRegister{
  cursor: pointer;
  position: absolute;
  top: 484px;
  left: 30px;
  width: 160px;
  height: 44px;
  background: #548EE0;
  border-radius: 3px 3px 3px 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 20px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
.mobileRegister{
  cursor: pointer;
  position: absolute;
  top: 484px;
  left: 211px;
  width: 160px;
  height: 44px;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #9FA5B1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #95989E;
  line-height: 20px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
.register-icon{
  cursor: pointer;
  position: absolute;
  right: 10px;
  z-index: 1;
}
</style>