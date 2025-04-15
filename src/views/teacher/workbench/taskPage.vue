<template>
  <div>
    <div class="workbench-header">教学任务</div>
    <div @click="emit('update:isAddTask', true)" class="workbench-add">
      <el-icon :size="15"><Plus /></el-icon>添加教学任务
    </div>

    <div v-if="paginatedData.allTitle.length" class="workbench-task">
      <div
        v-for="(item, index) in paginatedData.allTitle"
        :key="index"
        class="workbench-task__item"
        :style="{
          backgroundColor:
            paginatedData.allState[index] === false
              ? 'rgb(236, 253, 245)'
              : 'rgb(255, 251, 235)',
        }"
      >
        <div class="workbench-task__item--title">
          {{ item }}
        </div>
        <div class="workbench-task__item--info">
          {{ paginatedData.allInfo[index] }}
        </div>
        <div class="workbench-task__item--ddl">
          <el-checkbox
            style="margin-right: 5px; position: relative; top: 2px"
            :model-value="!paginatedData.allState[index]"
            @change="finishTask(item)"
          ></el-checkbox
          >截止日期：{{ paginatedData.allDdl[index] }}
        </div>
        <div
          class="workbench-task__item--state"
          :style="{
            backgroundColor:
              paginatedData.allState[index] === false
                ? 'rgb(209, 250, 229)'
                : 'rgb(254, 245, 208)',
            color:
              paginatedData.allState[index] === false ? '#065F46' : '#AD6D3C',
          }"
        >
          {{ paginatedData.allState[index] === false ? "已完成" : "未完成" }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="workbench-notask">暂无教学任务</div>
    </div>
    <el-pagination
      :current-page="Pagination.currentPage"
      class="workbench-pagination"
      small
      layout="prev, pager, next"
      :page-size="Pagination.pageSize"
      :total="store.state.teachTaskList.total"
      @current-change="handlePageChange"
      pager-count="3"
    />
  </div>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import { onMounted, reactive, computed } from "vue";
import { updateTeachTaskList } from "../../../../public/methods";
import store from "@/store";
import { defineProps, defineEmits } from "vue";
import { finishTeachTask } from "@/api/teacherAPI";
defineProps({
  isAddTask: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:isAddTask"]);

const Pagination = reactive({
  currentPage: 1,
  pageSize: 2,
});
const paginatedData = computed(() => {
  const start = (Pagination.currentPage - 1) * Pagination.pageSize;
  const end = start + Pagination.pageSize;
  return {
    allDdl: store.state.teachTaskList.allDdl.slice(start, end),
    allInfo: store.state.teachTaskList.allInfo.slice(start, end),
    allState: store.state.teachTaskList.allState.slice(start, end),
    allTitle: store.state.teachTaskList.allTitle.slice(start, end),
  };
});
const handlePageChange = (page) => {
  Pagination.currentPage = page;
};

const finishTask = async (e) => {
  console.log(JSON.parse(localStorage.getItem("userInfo")).uid);
  console.log(e);

  const res = await finishTeachTask({
    uid: JSON.parse(localStorage.getItem("userInfo")).uid,
    title: e,
  });
  console.log(res);
  updateTeachTaskList();
};

onMounted(() => {
  updateTeachTaskList();
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
  font-style: normal;
  text-transform: none;
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
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}
@include b(task) {
  @include e(item) {
    position: relative;
    top: 64px;
    left: 25px;
    width: 523px;
    height: 99px;
    margin-bottom: 8px;
    background: #fffbeb;
    border-radius: 10px 10px 10px 10px;
    overflow: visible;
    @include m(title) {
      position: absolute;
      top: 12px;
      left: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: bold;
      font-size: 16px;
      color: #000000;
      line-height: 21px;
      font-style: normal;
      text-transform: none;
    }
    @include m(info) {
      position: absolute;
      top: 41px;
      left: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 14px;
      color: #000000;
      line-height: 21px;
      font-style: normal;
      text-transform: none;
    }
    @include m(ddl) {
      position: absolute;
      left: 16px;
      bottom: 12px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 14px;
      color: #000000;
      line-height: 21px;
      font-style: normal;
      text-transform: none;
    }
    @include m(state) {
      position: absolute;
      right: 12px;
      top: 12px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 14px;
      color: #ad6d3c;
      line-height: 21px;
      font-style: normal;
      text-transform: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 26px;
      background: #fef5d0;
      border-radius: 0px 0px 0px 0px;
    }
  }
}
@include b(pagination) {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
}
@include b(notask) {
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