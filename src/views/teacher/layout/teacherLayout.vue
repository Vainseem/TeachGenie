<template>
  <el-container
    class="layout-container-demo"
    style="overflow: hidden; left: 0; top: 0; height: 100vh"
    @click="getPageSize()"
  >
    <div class="LOGO"></div>
    <el-aside
      style="
        width: 216px;
        position: relative;
        top: 64px;
        left: 0;
        border-right: 1px solid rgba(112, 112, 112, 0.16);
      "
    >
      <el-scrollbar background-color="#f0f0f0">
        <el-menu
          class="el-menu-vertical-demo"
          active-text-color="#1661CB"
          :collapse="!store.state.sliderStatus"
          background-color="#ffffff"
          text-color="black"
          :default-openeds="['1']"
          :default-active="activeIndex"
          @select="handleSelect"
        >
          <el-menu-item index="1-1" @click="routeJump('AIDesign')"
            >AI备课助手</el-menu-item
          >
          <el-menu-item index="1-2" @click="routeJump('workbench')"
            >工作台</el-menu-item
          >
          <el-menu-item index="1-3" @click="routeJump('classSche')"
            >课程表</el-menu-item
          >
          <el-menu-item index="1-4" @click="routeJump('stuManagement')"
            >学生管理</el-menu-item
          >
          <el-menu-item index="1-5" @click="routeJump('resLib')"
            >资源库</el-menu-item
          >
          <el-menu-item index="1-6" @click="routeJump('user')"
            >账号设置</el-menu-item
          >
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header
        style="
          padding: 0;
          margin: 0;
          height: 6%;
          text-align: right;
          font-size: 12px;
        "
      >
        <HeaderCard :headerContent="headerContent" />
      </el-header>

      <el-main style="overflow-x: hidden">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import router from "@/router";
import store from "@/store";
import { getPageSize } from "../../../../public/wholeSize";
import HeaderCard from "../header/headerCard.vue";
import { ref, onMounted } from "vue";

const activeIndex = ref("1-1");
const headerContent = ref("AI大设计");
const handleSelect = (key) => {
  activeIndex.value = key;
  switch (key) {
    case "1-1":
      headerContent.value = "AI备课助手";
      break;
    case "1-2":
      headerContent.value = "工作台";
      break;
    case "1-3":
      headerContent.value = "课程表";
      break;
    case "1-4":
      headerContent.value = "学生管理";
      break;
    case "1-5":
      headerContent.value = "资源库";
      break;
    case "1-6":
      headerContent.value = "账号设置";
      break;
  }
};
onMounted(() => {
  const fullPath = router.currentRoute.value.fullPath;
  const basePath = fullPath.split("/").slice(0, 3).join("/");
  switch (basePath) {
    case "/teacher/AIDesign":
      activeIndex.value = "1-1";
      headerContent.value = "AI备课助手";
      break;
    case "/teacher/workbench":
      activeIndex.value = "1-2";
      headerContent.value = "工作台";
      break;
    case "/teacher/classSche":
      activeIndex.value = "1-3";
      headerContent.value = "课程表";
      break;
    case "/teacher/stuManagement":
      activeIndex.value = "1-4";
      headerContent.value = "学生管理";
      break;
    case "/teacher/resLib":
      activeIndex.value = "1-5";
      headerContent.value = "资源库";
      break;
    case "/teacher/user":
      activeIndex.value = "1-6";
      headerContent.value = "账号设置";
  }
});
const routeJump = (path) => {
  router.push("/teacher/" + path);
};
</script>

<style scoped>
.LOGO {
  position: absolute;
  top: 0;
  left: 0;
  width: 214px;
  height: 62px;
  border: 1px solid rgba(112, 112, 112, 0.16);
}
.el-scrollbar__view {
  width: 100%;
}

.el-aside {
  opacity: 1;
}

.el-menu-vertical-demo {
  width: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 15%; */
  min-height: 400px;
}

ul.el-menu {
  padding: 0;
  margin: 0;
  width: 100%;
}

li.el-menu-item {
  width: 100%;
  padding: 0;
}
.is-active {
  background-color: #eff6ff;
}
.is-active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #548ee0;
}
.layout-container-demo {
  position: absolute;
  top: 0;
  width: 100%;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background-color: #ffffff;
}

.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-menu-item:hover {
  background-color: #eff6ff;
  color: #1661cb;
}
.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>