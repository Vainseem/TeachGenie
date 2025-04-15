<template>
  <div class="video">
    <video src="@/assets/video/AIman.mp4" controls></video>
  </div>
</template>

<script setup>
</script>

<style scoped lang='scss'>
.video {
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  video {
    width: 100%;
    height: 100%;
  }
}
</style>