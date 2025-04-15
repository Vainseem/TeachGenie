<template>
  <div class="row">
    <div class="rectangle"></div>
    <ul>
      <li v-for="i in store.state.schedule.length" :key="i">第{{ i }}节</li>
    </ul>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style-type: none;
}
ul li {
  width: 106px;
  height: 115px;
  border-top: 1px solid rgba(159, 165, 177, 0.5);
  justify-content: center;
  align-items: center;
  display: flex;
  background: rgb(243, 244, 246);
  font-size: 14px;
  font-weight: 400;
}
ul li:last-child {
  border-bottom: 1px solid rgba(159, 165, 177, 0.5);
  box-shadow: 3px 4px 6px 1px rgba(0, 0, 0, 0.16);
  border-bottom-left-radius: 10%;
}
.rectangle {
  position: relative;
  width: 106px;
  height: 50px;
  background: rgb(243, 244, 246);
  border-top-left-radius: 10%;
}
.row {
  position: relative;
  left: 0;
  width: 106px;
}
</style>