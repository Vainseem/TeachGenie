<template>
  <div class="stu-box">
    <div class="stu-box__header">
      <div class="stu-box__header--title">选择学生</div>

      <el-input
        class="stu-box__header--search"
        :prefix-icon="Search"
        id="input"
        v-model="search"
        placeholder="搜索学生姓名"
      />

      <div class="stu-box__header--now">当前：学生1</div>
    </div>
    <el-select v-model="value" placeholder="班级" :style="option1Style">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>
    <el-select v-model="value" placeholder="学习状况" :style="option2Style">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>
    <div class="stu-box__content">
      <div class="stu-box__content--item active">
        <div class="avatar">
          <img
            style="width: 100%; height: 100%; border-radius: 50%"
            src="@/assets/avatars/1.jpg"
            alt=""
          />
        </div>
        <div class="name">学生1</div>
        <div class="class">班级1</div>
        <div class="state">学习积极</div>
      </div>
      <div class="stu-box__content--item">
        <div class="avatar">
          <img
            style="width: 100%; height: 100%; border-radius: 50%"
            src="@/assets/avatars/2.jpg"
            alt=""
          />
        </div>
        <div class="name">学生2</div>
        <div class="class">班级2</div>
        <div class="state" style="background: #eff6ff; color: #1661cb">
          表现良好
        </div>
      </div>
      <div class="stu-box__content--item">
        <div class="avatar">
          <img
            style="width: 100%; height: 100%; border-radius: 50%"
            src="@/assets/avatars/3.jpg"
            alt=""
          />
        </div>
        <div class="name">学生3</div>
        <div class="class">班级3</div>
        <div class="state" style="background: #eb6b6b; color: #df1414">
          待改进
        </div>
      </div>
      <div class="stu-box__content--item">
        <div class="avatar">
          <img
            style="width: 100%; height: 100%; border-radius: 50%"
            src="@/assets/avatars/4.jpg"
            alt=""
          />
        </div>
        <div class="name">学生4</div>
        <div class="class">班级4</div>
        <div class="state" style="background: #fef5d2; color: #e59022">
          需要关注
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
const option1Style = {
  position: "absolute",
  top: "72px",
  left: "32px",
  width: "72px",
  height: "30px",
  background: "#ffffff",
  borderRadius: "5px 5px 5px 5px",
};
const option2Style = {
  position: "absolute",
  top: "72px",
  left: "124px",
  width: "105px",
  height: "30px",
  background: "#ffffff",
  borderRadius: "5px 5px 5px 5px",
};
const value = ref("");
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>

<style scoped lang="scss">
@import "@/assets/styles/_stuManagement.scss";
.active {
  background: rgba(185, 184, 241, 0.2);
  border: 1px solid #1e1bc5;
}
@include b(box) {
  position: relative;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 1164px;
  height: 240px;
  background: #ffffff;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  @include e(header) {
    @include m(title) {
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
    }
    @include m(search) {
      position: absolute;
      top: 15px;
      right: 32px;
      width: 224px;
      height: 36px;
      background: #ffffff;
      border-radius: 5px 5px 5px 5px;
      border: 1px solid #dfdfdf;
      &:focus {
        border: 1px solid #dfdfdf;
      }
    }
    @include m(now) {
      position: absolute;
      top: 23px;
      left: 134px;
      width: 115px;
      height: 30px;
      background: #eff6ff;
      border-radius: 10px 10px 10px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 15px;
      color: #1661cb;
      line-height: 21px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
  @include e(content) {
    position: absolute;
    top: 120px;
    width: 1164px;
    height: 120px;
    display: flex;
    @include m(item) {
      position: relative;
      top: 0;
      left: 32px;
      width: 240px;
      height: 92px;
      border: 1px solid #707070;
      border-radius: 10px 10px 10px 10px;
      margin-right: 47px;
      .avatar {
        position: absolute;
        left: 12px;
        top: 12px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #ffffff;
        border: 1px solid #707070;
      }
      .name {
        position: absolute;
        top: 10px;
        left: 56px;

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
      .class {
        position: absolute;
        top: 35px;
        left: 56px;
        width: 45px;
        height: 21px;
        font-family: Microsoft YaHei, Microsoft YaHei;
        font-weight: 400;
      }
      .state {
        position: absolute;
        top: 59px;
        left: 56px;
        width: 66px;
        height: 23px;
        background: #d1fae5;
        border-radius: 5px 5px 5px 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Microsoft YaHei, Microsoft YaHei;
        font-weight: 400;
        font-size: 13px;
        color: #065f46;
        line-height: 21px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}
</style>