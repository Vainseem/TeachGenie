<template>
  <div class="container">
    <div class="header">学习情况概览</div>
    <div class="top">
      <div class="stu-content">
        <div class="stu-content__title">学习成绩</div>
        <div class="stu-content__content">92.5</div>
        <div class="stu-content__icon">
          <el-icon color="#E59022" :size="24"><StarFilled /></el-icon>
        </div>
        <div class="stu-content__compair">较上月+3.2%</div>
        <div
          class="stu-content__detail"
          @click="currentComponent = learnResult"
        >
          详情
        </div>
      </div>
      <div class="stu-content" style="background: #eff6ff">
        <div class="stu-content__title" style="color: #1661cb">总学习时长</div>
        <div class="stu-content__content">102.5小时</div>
        <div class="stu-content__icon">
          <el-icon color="#1661CB" :size="24"><TrendCharts /></el-icon>
        </div>
        <div class="stu-content__compair" style="color: #1661cb">
          较上月+13.2%
        </div>
        <div
          class="stu-content__detail"
          @click="currentComponent = learnTime"
          style="color: #1661cb"
        >
          详情
        </div>
      </div>
      <div class="stu-content" style="background: #ecfdf5">
        <div style="color: #1daf86" class="stu-content__title">作业完成率</div>
        <div class="stu-content__content">92.8%</div>
        <div class="stu-content__icon">
          <el-icon color="#1DAF86" :size="24"><List /></el-icon>
        </div>
        <div style="color: #1daf86" class="stu-content__compair">
          较上月+5.2%
        </div>
        <div
          class="stu-content__detail"
          @click="currentComponent = workFinish"
          style="color: #1daf86"
        >
          详情
        </div>
      </div>
      <div class="stu-content" style="background: #eff6ff">
        <div class="stu-content__title" style="color: #7c3aed">知识点掌握</div>
        <div class="stu-content__content">86%</div>
        <div class="stu-content__icon">
          <el-icon color="#7c3aed" :size="24"><Opportunity /></el-icon>
        </div>
        <div class="stu-content__compair" style="color: #7c3aed">
          较上月+3.7%
        </div>
        <div
          class="stu-content__detail"
          @click="currentComponent = knowControl"
          style="color: #7c3aed"
        >
          详情
        </div>
      </div>
    </div>
    <div
      class="bottom"
      style="
        height: 440px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 1164px;
        height: 440px;
      "
    >
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  StarFilled,
  TrendCharts,
  List,
  Opportunity,
} from "@element-plus/icons-vue";
import learnResult from "./learnResult.vue";
import learnTime from "./learnTime.vue";
import workFinish from "./workFinish.vue";
import knowControl from "./knowControl.vue";
const currentComponent = ref(learnResult);
</script>

<style scoped lang="scss">
@import "@/assets/styles/_stuManagement.scss";
.container {
  position: relative;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 1164px;
  height: 640px;
  background: #ffffff;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
}
.header {
  position: absolute;
  left: 25px;
  top: 22px;
  width: 111px;
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
.top {
  position: absolute;
  top: 56px;
  left: 0px;
  width: 1164px;

  margin: 0%;
  padding: 0%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  @include b(content) {
    position: relative;
    margin-right: 44px;
    left: 32px;
    top: 0;
    width: 240px;
    height: 110px;
    background: #fffbeb;
    border-radius: 10px 10px 10px 10px;
    @include e(title) {
      position: absolute;
      top: 8px;
      left: 12px;
      height: 21px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 16px;
      color: #e59022;
      line-height: 21px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    @include e(content) {
      position: absolute;
      top: 41px;
      left: 12px;
      height: 24px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: bold;
      font-size: 18px;
      color: #000000;
      line-height: 21px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    @include e(content) {
      &:last-child {
        margin-right: 0px;
      }
    }
    @include e(icon) {
      position: absolute;
      top: 8px;
      right: 16px;
    }
    @include e(compair) {
      position: absolute;
      left: 12px;
      bottom: 12px;
      height: 21px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 16px;
      color: #e59022;
      line-height: 21px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    @include e(detail) {
      position: absolute;
      cursor: pointer;
      right: 18px;
      bottom: 12px;
      height: 19px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 14px;
      color: #e59022;
      line-height: 21px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}
</style>