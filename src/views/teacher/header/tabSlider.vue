<template>
  <el-icon size="23" v-if="store.state.sliderStatus"><Fold /></el-icon>
  <el-icon size="23" v-else><Expand /></el-icon>
</template>
<script setup>
import {Fold,Expand} from "@element-plus/icons-vue";
import store from "@/store";
</script>
<style scoped>
el-icon{
  position: absolute;
}
</style>