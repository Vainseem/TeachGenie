<template>
  <div>
    <div class="workbench-header">今日课程</div>
    <div class="workbench-day">{{ today }}</div>
    <div v-if="todayScheduleWithoutEmpty.length">
      <div
        class="workbench-lesson"
        v-show="lesson !== ''"
        v-for="(lesson, index) in paginatedData"
        :key="index"
        :style="{ backgroundColor: lessonBackground(index) }"
      >
        <div class="workbench-lesson__name">{{ lesson }}</div>
        <div class="workbench-lesson__time">
          第{{ todaySchedule.indexOf(lesson) + 1 }}节
        </div>
      </div>
    </div>
    <div v-else>
      <div class="workbench-nolesson">今日无课</div>
    </div>

    <el-pagination
      :current-page="Pagination.currentPage"
      class="workbench-pagination"
      small
      layout="prev, pager, next"
      :page-size="Pagination.pageSize"
      :total="total"
      @current-change="handlePageChange"
      pager-count="3"
    />
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { useStore } from "vuex";
import { onMounted, reactive, ref, computed } from "vue";

const store = useStore();
const today = dayjs().format("YYYY年MM月DD日");
//考虑到可能会有空课，所以需要两个变量，以此来计算正确的总页数
const todaySchedule = ref([]);
const todayScheduleWithoutEmpty = ref([]);
const total = ref(0);

// 处理页码变化
const Pagination = reactive({
  currentPage: 1,
  pageSize: 3,
});
const paginatedData = computed(() => {
  const start = (Pagination.currentPage - 1) * Pagination.pageSize;
  const end = start + Pagination.pageSize;
  return todayScheduleWithoutEmpty.value.slice(start, end);
});
const handlePageChange = (page) => {
  Pagination.currentPage = page;
};
//处理背景色逻辑
const lessonBackground = (index) => {
  switch (index % 3) {
    case 0:
      return "#EFF6FF";

    case 1:
      return "#ECFDF5";

    case 2:
      return "#F5F3FF";
  }
};

onMounted(async () => {
  const res = await store.dispatch("getSchedule");
  let weekday = dayjs().day();
  if (weekday === 0) {
    weekday = 7;
  }
  const __todaySchedule = [];
  for (let i = 0; i < res.data.message.schedule.length; i++) {
    if (res.data.message.schedule[i][weekday - 1] !== "") {
      todayScheduleWithoutEmpty.value.push(
        res.data.message.schedule[i][weekday - 1]
      );
    }
    __todaySchedule.push(res.data.message.schedule[i][weekday - 1]);
  }
  todaySchedule.value = __todaySchedule;
  total.value = todayScheduleWithoutEmpty.value.length;
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/_workbench.scss";
@include b(header) {
  position: absolute;
  top: 22px;
  left: 25px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: bold;
  font-size: 17px;
  color: #000000;
  line-height: 21px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
@include b(day) {
  position: absolute;
  top: 31px;
  right: 24px;
  width: 112px;
  height: 19px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 21px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
@include b(lesson) {
  position: relative;
  top: 64px;
  left: 25px;
  width: 523px;
  margin-bottom: 8px;
  height: 64px;
  background: #eff6ff;
  border-radius: 10px 10px 10px 10px;
  @include e(name) {
    position: absolute;
    left: 16px;
    top: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    line-height: 21px;
    font-style: normal;
    text-transform: none;
  }
  @include e(time) {
    position: absolute;
    left: 16px;
    top: 37px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
@include b(pagination) {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
}
@include b(nolesson) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 21px;
}
</style>
