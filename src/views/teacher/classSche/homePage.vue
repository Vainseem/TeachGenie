<template>
  <div v-if="store.state.isLoading">加载中...</div>
  <div
    class="container"
    :style="{ height: containerHeight + 60 + 'px' }"
    v-else
  >
    <div v-if="!store.state.scheduleEditStatus" class="schedule">
      <div class="schedule-left">
        <row-item></row-item>
      </div>
      <div class="schedule-right">
        <column-item></column-item>
      </div>
      <el-button
        id="editButton"
        class="editButton"
        size="default"
        type="info"
        @click="editSche"
      >
        编辑课表
      </el-button>
    </div>

    <div v-else class="schedule">
      <div class="schedule-left">
        <row-item></row-item>
      </div>
      <div class="schedule-right">
        <column-item></column-item>
      </div>
      <el-button
        id="add"
        class="editButton"
        size="default"
        type="primary"
        @click="addSche"
      >
        新增课时
      </el-button>
      <el-button
        id="reduce"
        class="editButton"
        size="default"
        type="primary"
        @click="reduceSche"
      >
        减少课时
      </el-button>
      <el-button
        id="editButton"
        class="editButton"
        size="default"
        type="success"
        @click="saveSche"
      >
        保存
      </el-button>
    </div>
  </div>
</template>
<script setup>
import ColumnItem from "./columnItem.vue";
import RowItem from "./rowItem.vue";
import store from "@/store";
import { updateSche } from "@/api/teacherAPI";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";

const containerHeight = ref(0);

const editSche = () => {
  store.commit("changeScheduleEditStatus");
};

const addSche = () => {
  store.commit("addSchedule");
};

const reduceSche = () => {
  store.commit("reduceSchedule");
};

const saveSche = async () => {
  store.commit("changeScheduleEditStatus");
  const res = await updateSche(store.state.schedule);
  if (res.data.status === 200) {
    ElMessage.success("保存成功");
    setTimeout(() => {
      getScheduleHeight();
    }, 500);
  } else {
    ElMessage.error("错误");
  }
  await store.dispatch("getSchedule");
};
// 获取schedule-right的高度，并设置container的高度实现container高度自适应
const getScheduleHeight = () => {
  setTimeout(() => {
    if (document.querySelector(".schedule-right")) {
      containerHeight.value =
        document.querySelector(".schedule-right").offsetHeight;
    } else {
      containerHeight.value = 0;
    }
  }, 500);
};
onMounted(() => {
  getScheduleHeight();
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  position: relative;
  width: 1200px;
  top: 12px;
  min-height: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  transition: 0.5s ease-in-out;
}
.editButton {
  position: absolute;
  bottom: 0px;
  right: 0;
}
.schedule {
  position: absolute;
  top: 54px;
  width: 1140px;
  height: auto;
  display: inline;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
}
.schedule-left {
  position: absolute;
  left: 26px;
}
.schedule-right {
  position: absolute;
  right: 26px;
}
.editButton {
  top: -40px;
  width: 60px;
}
#add {
  top: -40px;
  right: 180px;
}
#reduce {
  top: -40px;
  right: 90px;
}
</style>