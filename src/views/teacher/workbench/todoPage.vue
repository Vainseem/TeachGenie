<template>
  <div class="workbench-header">待办提醒</div>
  <div class="workbench-add" @click="emit('update:isAddTodo', true)">
    <el-icon :size="15"><Plus /></el-icon>添加提醒
  </div>
  <div v-if="store.state.teacherTodoList.allInfo.length">
    <div
      class="workbench-item"
      v-for="(item, index) in paginatedData.allInfo"
      :key="index"
      :style="{
        backgroundColor: paginatedData.allState[index]
          ? 'white'
          : 'rgb(241, 241, 241)',
        opacity: paginatedData.allState[index] ? 1 : 0.5,
      }"
    >
      <div class="workbench-item__info">{{ item }}</div>
      <div
        class="workbench-item__ddl"
        :style="{
          color:
            dayjs().diff(paginatedData.allDdl[index], 'day') === 0
              ? '#e55e5e'
              : 'black',
        }"
      >
        {{
          dayjs().diff(paginatedData.allDdl[index], "day") === 0
            ? `今天${dayjs(paginatedData.allDdl[index]).format("HH:mm")}截止`
            : paginatedData.allDdl[index]
        }}
      </div>
    </div>
  </div>

  <div v-else>
    <div class="workbench-notodo">暂无待办提醒</div>
  </div>
  <el-pagination
    class="workbench-pagination"
    small
    layout="prev, pager, next"
    :current-page="Pagination.currentPage"
    :page-size="Pagination.pageSize"
    :total="store.state.teacherTodoList.total"
    @current-change="handlePageChange"
    pager-count="3"
  />
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import { reactive, computed, onMounted, defineEmits } from "vue";
import { useStore } from "vuex";
import { updateTeacherTodoList } from "../../../../public/methods";
import dayjs from "dayjs";
const store = useStore();
const Pagination = reactive({
  currentPage: 1,
  pageSize: 3,
});
const emit = defineEmits(["update:isAddTodo"]);
const paginatedData = computed(() => {
  const start = (Pagination.currentPage - 1) * Pagination.pageSize;
  const end = start + Pagination.pageSize;
  return {
    allDdl: store.state.teacherTodoList.allDdl.slice(start, end),
    allInfo: store.state.teacherTodoList.allInfo.slice(start, end),
    allState: store.state.teacherTodoList.allState.slice(start, end),
  };
});
const handlePageChange = (page) => {
  Pagination.currentPage = page;
};

onMounted(async () => {
  // const res = await getTodo();
  // store.commit("updateTeacherTodoList", res.data.message);
  updateTeacherTodoList();
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
  cursor: pointer;
}
@include b(add) {
  position: absolute;
  top: 24px;
  right: 24px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: bold;
  font-size: 15px;
  color: #000000;
  line-height: 21px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}
@include b(item) {
  position: relative;
  margin-bottom: 8px;
  top: 64px;
  left: 25px;
  width: 523px;
  height: 64px;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid #dfdfdf;
  @include e(info) {
    position: absolute;
    top: 22px;
    left: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
  @include e(ddl) {
    position: absolute;
    top: 22px;
    right: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
@include b(notodo) {
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
@include b(pagination) {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
