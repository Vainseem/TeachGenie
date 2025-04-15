<template>
  <div class="welcome-word">{{ username }}</div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { updateUserInfo } from "@/api/teacherAPI";
const username = ref("");
onMounted(async () => {
  const res = await updateUserInfo();
  username.value = res.data.message.username;
});
</script>



<style scoped>
.welcome-word {
  top: 50%;
  transform: translateY(-50%);
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #707070;
  line-height: 21px;
  font-style: normal;
  text-transform: none;
}
</style>