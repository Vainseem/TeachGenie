<template class="box">
  <div>
    <div v-if="!store.state.scheduleEditStatus" id="schedule">
      <div class="column-week">
        <ul>
          <li>星期一</li>
          <li>星期二</li>
          <li>星期三</li>
          <li>星期四</li>
          <li>星期五</li>
          <li>星期六</li>
          <li>星期日</li>
        </ul>
      </div>
      <div class="column" v-for="(lessons, i) in schedule" :key="i">
        <ul>
          <li
            v-for="(lesson, j) in lessons"
            :key="j"
            :style="{ backgroundColor: lesson ? '#D6DEEB' : '#fff' }"
          >
            {{ lesson }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else id="schedule">
      <div class="column-week">
        <ul>
          <li>星期一</li>
          <li>星期二</li>
          <li>星期三</li>
          <li>星期四</li>
          <li>星期五</li>
          <li>星期六</li>
          <li>星期日</li>
        </ul>
      </div>
      <div class="column" v-for="(lesson, i) in schedule" :key="i">
        <ul>
          <li><input v-model="lesson[0]" /></li>
          <li><input v-model="lesson[1]" /></li>
          <li><input v-model="lesson[2]" /></li>
          <li><input v-model="lesson[3]" /></li>
          <li><input v-model="lesson[4]" /></li>
          <li><input v-model="lesson[5]" /></li>
          <li><input v-model="lesson[6]" /></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();
const schedule = computed(() => store.state.schedule);

onMounted(async () => {
  await store.dispatch("getSchedule");
});
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  position: absolute;
  right: 0;
}
.column-week {
  position: relative;
  width: 981px;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
}
.column-week ul {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
}
.column-week ul li {
  width: 140px;
  height: 50px;
  background: #fff;
  border-radius: 0px 0px 0px 0px;
  font-size: 15px;
  border-top: 1px solid rgba(159, 165, 177, 0.5);
  border-right: 1px solid rgba(159, 165, 177, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: bold;
  font-size: 18px;
  color: black;
}
.column-week ul li:first-child {
  border-left: 1px solid rgba(159, 165, 177, 0.5);
}
.column-week ul li:last-child {
  border-top-right-radius: 10%;
  box-shadow: 3px 0 6px 0px rgba(0, 0, 0, 0.16);
}
.column {
  position: relative;
  width: 981px;
  margin: 0;
  padding: 0;
  box-shadow: 3px 4px 6px 0px rgba(0, 0, 0, 0.16);
  border-collapse: collapse;
}
.column:last-child {
  border-bottom: 1px solid rgba(159, 165, 177, 0.5);
}
.column ul {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
}
.column ul li {
  width: 140px;
  height: 115px;
  background: #fff;
  border-radius: 0px 0px 0px 0px;
  font-size: 15px;
  border-top: 1px solid rgba(159, 165, 177, 0.5);
  border-right: 1px solid rgba(159, 165, 177, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.column ul li:first-child {
  border-left: 1px solid rgba(159, 165, 177, 0.5);
}

.column ul li input {
  border: none;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>