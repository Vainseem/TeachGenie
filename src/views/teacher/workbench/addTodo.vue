<template>
  <el-dialog
    model-value="isAddTask"
    class="workbench-box"
    title="添加日程提醒"
    width="720px"
    height="445px"
    :show-close="false"
  >
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
      type="datetime"
      placeholder="选择提醒时间"
      format="YYYY-MM-DD HH:mm:ss"
      value-format="YYYY-MM-DD HH:mm:ss"
      :style="ddlStyle"
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
          @click="emit('update:isAddTodo', false)"
        >
          取消
        </el-button>
        <el-button :style="footerStyle" type="primary" @click="__addTodo">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, defineProps, watch, defineEmits } from "vue";
import { addTodo } from "@/api/teacherAPI";
import { ElMessage } from "element-plus";
import { updateTeacherTodoList } from "../../../../public/methods";

const props = defineProps({
  isAddTodo: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:isAddTodo"]);
watch(props.isAddTodo, { immediate: true, deep: true });
const formData = reactive({
  uid: localStorage.getItem("userInfo").uid,
  info: "",
  ddl: "",
});
const clearInput = () => {
  formData.info = "";
  formData.ddl = "";
};
const __addTodo = async () => {
  const res = await addTodo(formData);
  if (res.data.status === 200) {
    ElMessage.success("添加日程提醒成功");
    updateTeacherTodoList();
  } else {
    ElMessage.error("添加教学任务失败");
  }
  emit("update:isAddTodo", false);
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