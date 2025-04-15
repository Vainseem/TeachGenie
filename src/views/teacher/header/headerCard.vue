<template>
  <el-card
    style="position: absolute; width: 100%; height: 99%; overflow: hidden"
  >
    <div class="header-content">
      {{ headerContent }}
    </div>
    <welcome-word style="position: absolute; right: 80px" />

    <UserAvatar
      style="
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
      "
    />
  </el-card>
</template>
<script setup>
import UserAvatar from "@/views/teacher/header/userAvatar.vue";
import WelcomeWord from "@/views/teacher/header/welcomeWord.vue";
import { defineProps, watch } from "vue";

const props = defineProps({
  headerContent: {
    type: String,
    default: "",
  },
});
watch(props, { immediate: true, deep: true });
</script>

<style scoped>
.header-content {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: bold;
  font-size: 18px;
  color: #4a4b6e;
  line-height: 21px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
</style>
