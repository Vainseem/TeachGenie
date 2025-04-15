<template>
  <div class="title1">各科成绩预览</div>
  <div class="pie"></div>
  <div class="title2">成绩变化趋势</div>
  <el-select
    v-model="subject"
    class="m-2"
    placeholder="学科名称"
    small
    style="position: absolute; top: 0px; right: 50px; width: 120px"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <div class="category"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onActivated, ref } from "vue";

const subject = ref("");

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

let pieChart = null;
const pieOption = ref({
  tooltip: {
    trigger: "item",
  },
  legend: {
    show: true,
    top: "5%",
    orient: "vertical",
    right: "0%",
  },
  series: [
    {
      name: "单位：分",
      type: "pie",
      radius: ["40%", "70%"],
      data: [
        { value: 120, name: "语文" },
        { value: 140, name: "数学" },
        { value: 110, name: "英语" },
        { value: 80, name: "物理" },
        { value: 60, name: "化学" },
        { value: 40, name: "生物" },
        { value: 20, name: "地理" },
        { value: 60, name: "历史" },
        { value: 50, name: "政治" },
      ],
    },
  ],
});
let categoryChart = null;
const categoryOption = ref({
  xAxis: {
    type: "category",
    data: ["2-11", "2-12", "2-13", "2-14", "2-15", "2-16", "2-17"],
  },
  yAxis: {
    type: "value",
    data: ["40", "50", "60", "70", "80", "90", "100"],
  },
  series: [
    {
      data: [62, 73, 80, 93, 82, 83, 92],
      type: "line",
      smooth: true,
    },
  ],
});
const drawPie = () => {
  pieChart = echarts.init(document.querySelector(".pie"));
  pieChart.setOption(pieOption.value);
};
const drawCategory = () => {
  categoryChart = echarts.init(document.querySelector(".category"));
  categoryChart.setOption(categoryOption.value);
};
const init = () => {
  if (pieChart) {
    pieChart.clear();
    drawPie();
  } else {
    drawPie();
  }
  if (categoryChart) {
    categoryChart.clear();
    drawCategory();
  } else {
    drawCategory();
  }
};
onActivated(() => {
  init();
});
</script>

<style scoped lang="scss">
.pie {
  position: absolute;
  top: 50px;
  left: 14px;
  width: 542px;
  height: 380px;
  background: #ffffff;
}
.category {
  position: absolute;
  top: 50px;
  left: 578px;
  width: 542px;
  height: 380px;
}
.title1 {
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
.title2 {
  position: absolute;
  left: 578px;
  top: 0;
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
</style>
