<template>
  <div class="title">作业完成情况</div>
  <div class="count">
    <div class="left">{{ countTrue }}</div>
    <div class="center">/</div>
    <div class="right">{{ tableData.length }}</div>
  </div>
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
    <el-table-column align="center" prop="homework" label="作业" width="180" />
    <el-table-column align="center" prop="date" label="截止时间" />
    <el-table-column align="center" prop="state" label="完成状态" width="180">
      <template #default="scope">
        <el-tag v-if="scope.row.state === 'true'" type="success">已完成</el-tag>
        <el-tag v-else type="danger">未完成</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="operation" label="操作" width="180" />
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
const countTrue = computed(() => {
  return tableData.filter((item) => item.state === "true").length;
});
const tableData = [
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "false",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "false",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "false",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "true",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "true",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "true",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "true",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "true",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "true",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "true",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "true",
    operation: "查看详情",
  },
  {
    homework: "三角函数练习题",
    date: "2025-03-12 23:59:59",
    state: "true",
    operation: "查看详情",
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
.count {
  position: absolute;
  top: 0;
  right: 177px;
  display: flex;
  .left {
    font-size: 23px;
    font-weight: bold;
    color: darkorchid;
  }
  .center {
    font-size: 17px;
    font-weight: bold;
    color: #000000;
  }
  .right {
    font-size: 17px;
    font-weight: bold;
    color: #000000;
  }
}
</style>
