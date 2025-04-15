<template>
  <div>{{ historyList }}</div>
</template>

<script setup>
import { ref, onActivated } from "vue";
import { getAllChat } from "@/api/teacherAPI";
const historyList = ref([]);
onActivated(async () => {
  const res = await getAllChat();
  historyList.value = res.data;
});
</script>

<style scoped lang='scss'>
</style>