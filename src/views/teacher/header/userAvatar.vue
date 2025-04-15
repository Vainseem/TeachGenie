<template>
  <el-dropdown>
    <el-avatar :size="size" :src="circleUrl"> </el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import router from "@/router";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const circleUrl = `http://8.137.77.237/images/${userInfo.uid}.jpg`;
const size = "30px";

const logout = () => {
  localStorage.removeItem("userInfo");
  router.push("/");
};
</script>

<style scoped>
</style>