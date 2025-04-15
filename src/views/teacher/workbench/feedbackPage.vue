<template>
  <div class="workbench-header" @click="handleClick">学生反馈</div>
  <div
    class="workbench-feedback"
    v-for="(item, index) in paginatedData"
    :key="index"
  >
    <div class="workbench-feedback__avatar">
      <img
        style="width: 100%; height: 100%"
        src="@/assets/avatars/4.jpg"
        alt=""
      />
    </div>
    <div class="workbench-feedback__name">{{ item.name }}</div>
    <div class="workbench-feedback__content">{{ item.info }}</div>
    <div class="workbench-feedback__time">{{ item.time }}</div>
    <div class="workbench-feedback__reply">回复</div>
    <div class="workbench-feedback__icon">
      <el-icon size="24px"><Comment /></el-icon>
    </div>
    <div class="workbench-feedback__state">
      {{ item.status ? "已回复" : "未回复" }}
    </div>
  </div>
  <el-pagination
    :style="paginationStyle"
    size="small"
    layout="prev, pager, next"
    :total="50"
    style="margin-top: 12px"
  />
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";
import { Comment } from "@element-plus/icons-vue";
import { getFeedback } from "@/api/teacherAPI";
import { addFeedback } from "@/api/studentAPI";
const paginationStyle = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "15px",
};
const pagination = reactive({
  currentPage: 2,
  pageSize: 5,
});
const paginatedData = computed(() => {
  return feedbackList.slice(
    (pagination.currentPage - 1) * pagination.pageSize,
    pagination.currentPage * pagination.pageSize
  );
});
const feedbackList = reactive([]);
const handleClick = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const res = await addFeedback({
    uid: userInfo.uid,
    info: "老师能发一下今天作业的答案吗？",
  });
  console.log(res);
};
onMounted(async () => {
  const res = await getFeedback();
  res.data.message.forEach((item) => {
    feedbackList.push({
      info: item.info,
      name: item.name,
      seq: item.seq,
      time: item.time,
      status: item.status,
    });
  });
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/_workbench.scss";
@include b(header) {
  position: absolute;
  left: 25px;
  top: 22px;
  width: 73px;
  height: 22px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: bold;
  font-size: 17px;
  color: #000000;
  line-height: 21px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
@include b(feedback) {
  position: relative;
  top: 64px;
  left: 25px;
  width: 1114px;
  height: 136px;
  background: #f9fafb;
  border-radius: 10px 10px 10px 10px;
  margin-bottom: 12px;
  @include e(avatar) {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 40px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #707070;
    border-radius: 50%;
  }
  @include e(name) {
    position: absolute;
    left: 84px;
    top: 20px;
    height: 21px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
  @include e(content) {
    position: absolute;
    left: 84px;
    top: 53px;
    height: 21px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 16px;
    color: #2a2a2a;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
  @include e(time) {
    position: absolute;
    top: 16px;
    right: 12px;
    height: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 15px;
    color: #707070;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
  @include e(reply) {
    position: absolute;
    cursor: pointer;
    left: 113px;
    bottom: 27px;
    width: 32px;
    height: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 15px;
    color: #000000;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
  @include e(icon) {
    position: absolute;
    left: 84px;
    top: 88px;
    width: 25px;
    height: 24px;
    cursor: pointer;
  }
  @include e(state) {
    position: absolute;
    left: 179px;
    bottom: 23px;
    width: 62px;
    height: 29px;
    background: #dbeafe;
    border-radius: 0px 0px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 15px;
    color: #4966c1;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
</style>