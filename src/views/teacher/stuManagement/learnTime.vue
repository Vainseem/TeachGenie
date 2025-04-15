<template>
  <div class="title">学习记录详情</div>
  <el-select
    v-model="selectValue"
    :style="selectStyle"
    placeholder="全部科目"
    style="width: 108px"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-table
    :data="paginationData"
    style="
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
    "
  >
    <el-table-column align="center" prop="subject" label="科目" width="180" />
    <el-table-column
      align="center"
      prop="content"
      label="学习内容"
      width="180"
    />
    <el-table-column align="center" prop="time" label="学习时长" />
    <el-table-column align="center" prop="date" label="完成日期" />
  </el-table>
  <el-pagination
    v-model:current-page="pagination.currentPage"
    v-model:page-size="pagination.pageSize"
    layout="prev, pager, next, jumper"
    :total="tableData.length"
    style="
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    "
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script setup>
import { reactive, ref, computed } from "vue";
const selectValue = ref("");
const pagination = reactive({
  currentPage: 1,
  pageSize: 6,
});
const options = [
  {
    value: "语文",
    label: "语文",
  },
  {
    value: "数学",
    label: "数学",
  },

  {
    value: "英语",
    label: "英语",
  },
  {
    value: "物理",
    label: "物理",
  },
  {
    value: "化学",
    label: "化学",
  },
  {
    value: "生物",
    label: "生物",
  },
  {
    value: "地理",
    label: "地理",
  },
  {
    value: "历史",
    label: "历史",
  },
  {
    value: "政治",
    label: "政治",
  },
];
const tableData = [
  {
    subject: "语文",
    content: "学习内容",
    time: "10分钟",
    date: "2024-01-01",
  },
  {
    subject: "数学",
    content: "学习内容",
    time: "10分钟",
    date: "2024-01-01",
  },
  {
    subject: "英语",
    content: "学习内容",
    time: "10分钟",
    date: "2024-01-01",
  },
  {
    subject: "语文",
    content: "学习内容",
    time: "10分钟",
    date: "2024-01-01",
  },
  {
    subject: "数学",
    content: "学习内容",
    time: "10分钟",
    date: "2024-01-01",
  },
  {
    subject: "英语",
    content: "学习内容",
    time: "10分钟",
    date: "2024-01-01",
  },
  {
    subject: "英语",
    content: "学习内容",
    time: "10分钟",
    date: "2024-01-01",
  },
  {
    subject: "语文",
    content: "学习内容",
    time: "10分钟",
    date: "2024-01-01",
  },
  {
    subject: "数学",
    content: "学习内容",
    time: "10分钟",
    date: "2024-01-01",
  },
  {
    subject: "英语",
    content: "学习内容",
    time: "10分钟",
    date: "2024-01-01",
  },
];
const paginationData = computed(() => {
  return tableData.slice(
    (pagination.currentPage - 1) * pagination.pageSize,
    pagination.currentPage * pagination.pageSize
  );
});
const selectStyle = {
  position: "absolute",
  top: "0px",
  right: "29px",
  width: "108px",
};
</script>

<style scoped lang='scss'>
.title {
  position: absolute;
  top: 0px;
  left: 25px;
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

// .el-table {
//   :deep(.el-table__row) {
//     :deep(.cell) {
//       color: red;
//     }
//   }
// }
</style>
