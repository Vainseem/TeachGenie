<template>
  <el-dialog
    model-value="isAddTask"
    class="workbench-box"
    title="添加教学任务"
    width="720px"
    height="445px"
    :show-close="false"
  >
    <el-input
      v-model="formData.title"
      :style="inputStyle"
      maxlength="15"
      placeholder="请输入标题"
      show-word-limit
      type="text"
    />
    <el-input
      v-model="formData.info"
      maxlength="30"
      class="workbench-box__input"
      :style="textareaStyle"
      :input-style="textareaInnerStyle"
      placeholder="请输入内容"
      show-word-limit
      type="textarea"
      resize="none"
    />
    <el-date-picker
      v-model="formData.ddl"
      type="date"
      placeholder="教学任务日期"
      :style="ddlStyle"
      size="default"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button
          :style="{ ...footerStyle, position: 'absolute', left: '0px' }"
          @click="clearInput"
        >
          清除
        </el-button>
        <el-button
          :style="footerStyle"
          @click="emit('update:isAddTask', false)"
        >
          取消
        </el-button>
        <el-button :style="footerStyle" type="primary" @click="addTask">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, defineProps, watch, defineEmits } from "vue";
import { addTeachTask } from "@/api/teacherAPI";
import { ElMessage } from "element-plus";
import { updateTeachTaskList } from "../../../../public/methods";
const props = defineProps({
  isAddTask: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:isAddTask"]);
watch(props.isAddTask, { immediate: true, deep: true });
const formData = reactive({
  uid: localStorage.getItem("userInfo").uid,
  title: "",
  info: "",
  ddl: "",
  state: true,
});
const clearInput = () => {
  formData.title = "";
  formData.info = "";
  formData.ddl = "";
};
const addTask = async () => {
  const res = await addTeachTask(formData);
  if (res.data.status === 200) {
    ElMessage.success("添加教学任务成功");
  } else {
    ElMessage.error("添加教学任务失败");
  }
  await updateTeachTaskList();
  emit("update:isAddTask", false);
};
const footerStyle = {
  border: "0",
  backgroundColor: "white",
  color: "#1661CB",
  fontWeight: "400",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: "white",
    color: "#1661CB",
  },
};
const inputStyle = {
  position: "relative",
  left: "50%",
  transform: "translate(-50%, 0)",
  top: "0px",
  width: "600px",
  "&:focus": {
    outline: "none",
  },
};
const textareaStyle = {
  position: "relative",
  left: "50%",
  transform: "translate(-50%, 0)",
  top: "20px",
  width: "600px",
  height: "100px",
  marginBottom: "20px",
  "&:focus": {
    outline: "none",
  },
};
const textareaInnerStyle = {
  height: "100px",
};
const ddlStyle = {
  position: "relative",
  left: "43px",
  top: "16px",
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_workbench.scss";
@include b(box) {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 445px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  backdrop-filter: blur(5px);
  @include e(input) {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 20px;
  }
}
</style>