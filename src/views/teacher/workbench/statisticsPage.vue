<template>
  <div>
    <div class="workbench-header">数据统计</div>
    <div class="workbench-header__icon">
      <el-icon><Refresh /></el-icon>
    </div>
    <div class="workbench-item__hours">
      <div class="workbench-item--title">今日课量</div>
      <div class="workbench-item--num" style="color: #000000">24</div>
      <div class="workbench-item--footer">
        <el-icon class="icon"><ArrowUp /></el-icon>较昨日+2
      </div>
    </div>
    <div class="workbench-item__homeworks">
      <div class="workbench-item--title">待批作业</div>
      <div class="workbench-item--num">86</div>
      <div class="workbench-item--footer">
        <el-icon class="icon"><Clock /></el-icon>预计2小时
      </div>
    </div>
    <div class="workbench-item__students">
      <div class="workbench-item--title">学生总数</div>
      <div class="workbench-item--num" style="color: #7c3aed">156</div>
      <div class="workbench-item--footer">
        <el-icon class="icon"><User /></el-icon>4个班级
      </div>
    </div>
    <div class="workbench-item__activities">
      <div class="workbench-item--title">教研活动</div>
      <div class="workbench-item--num" style="color: #000000">3</div>
      <div class="workbench-item--footer">
        <el-icon class="icon"><Calendar /></el-icon>本周安排
      </div>
    </div>
  </div>
</template>

<script setup>
import { Refresh, ArrowUp, Clock } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
@import "@/assets/styles/_workbench.scss";
@include b(header) {
  position: absolute;
  top: 22px;
  left: 25px;
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
  @include e(icon) {
    position: absolute;
    top: 25px;
    right: 24px;
  }
}
@include b(item) {
  @include e(hours) {
    position: absolute;
    left: 25px;
    top: 64px;
    width: 254px;
    height: 102px;
    background: #eff6ff;
    border-radius: 10px 10px 10px 10px;
  }
  @include e(homeworks) {
    position: absolute;
    left: 294px;
    top: 64px;
    width: 254px;
    height: 102px;
    background: #ecfdf5;
    border-radius: 10px 10px 10px 10px;
  }
  @include e(students) {
    position: absolute;
    left: 25px;
    top: 184px;
    width: 254px;
    height: 102px;
    background: #f5f3ff;
    border-radius: 10px 10px 10px 10px;
  }
  @include e(activities) {
    position: absolute;
    left: 294px;
    top: 184px;
    width: 254px;
    height: 102px;
    background: rgb(249, 249, 249);
    border-radius: 10px 10px 10px 10px;
  }
  @include m(title) {
    position: absolute;
    top: 8px;
    left: 12px;
    width: 69px;
    height: 21px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 21px;
    font-style: normal;
    text-transform: none;
  }
  @include m(num) {
    position: absolute;
    top: 37px;
    left: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: bold;
    font-size: 18px;
    color: #059669;
    line-height: 21px;
    font-style: normal;
    text-transform: none;
  }
  @include m(footer) {
    position: absolute;
    top: 72px;
    left: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    line-height: 21px;
    font-style: normal;
    text-transform: none;
    .icon {
      position: relative;
      top: 2px;
      margin-right: 4px;
    }
  }
}
</style>