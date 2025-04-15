<template>
  <div class="container" v-if="!ifShowRecourse">
    <el-input
      class="search-input"
      v-model="searchInput"
      placeholder="搜索资源..."
      :prefix-icon="Search"
    />
    <el-select
      v-model="selectValue"
      class="m-2"
      placeholder="全部类型"
      :style="selectStyle"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <input type="file" id="file" />
    <div class="upload-btn">
      <el-icon
        style="position: absolute; top: 10px; left: 10px"
        :size="24"
        color="#ffffff"
        ><UploadFilled
      /></el-icon>
      <span>上传资源</span>
    </div>
    <div class="header">
      <div style="cursor: pointer" class="header-item" @click="fetchStream">
        <div class="header-item-title">总资源数</div>
        <div class="header-item-number">100</div>
        <div class="header-item-compare">较上月</div>
        <div class="compare-num">+3.6%</div>
        <div class="header-item-icon">
          <el-icon :size="24" color="#E59022"><Management /></el-icon>
        </div>
      </div>
      <div class="header-item">
        <div class="header-item-title">本月上传</div>
        <div class="header-item-number">42</div>
        <div class="header-item-compare">较上月</div>
        <div class="compare-num">+3.6%</div>
        <div class="header-item-icon">
          <el-icon :size="24" color="#1661CB"><UploadFilled /></el-icon>
        </div>
      </div>
      <div class="header-item">
        <div class="header-item-title">已存储空间</div>
        <div class="header-item-number">100GB</div>
        <div class="header-item-compare">较上月</div>
        <div class="compare-num">+3.6%</div>
        <div class="header-item-icon">
          <el-icon :size="24" color="#1DAF86"><List /></el-icon>
        </div>
      </div>
      <div class="header-item">
        <div class="header-item-title">活跃用户</div>
        <div class="header-item-number">108</div>
        <div class="header-item-compare">较上月</div>
        <div class="compare-num">+3.6%</div>
        <div class="header-item-icon">
          <el-icon :size="24" color="#7C3AED"><UserFilled /></el-icon>
        </div>
      </div>
    </div>
    <div class="body">
      <div
        class="body-item"
        v-for="(item, index) in paginatedPreviewList"
        :key="index"
      >
        <div class="item-box1" @click="showResource(item)">
          <div class="preview-img">
            <img :src="item.src" alt="" />
          </div>
          <div class="preview-title">{{ item.title }}</div>
          <div class="preview-time">{{ item.time }}</div>
        </div>
        <div class="item-box2"></div>
        <div class="item-box3"></div>
      </div>
    </div>
    <el-pagination
      v-model:current-page="Pagination.currentPage"
      v-model:page-size="Pagination.pageSize"
      :small="small"
      :style="paginationStyle"
      background
      layout="prev, pager, next, jumper"
      :total="previewList.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <div v-else>
    <router-view />
  </div>
</template>
<script setup>
import { reactive, computed, ref, onMounted, onUpdated } from "vue";
import { useRouter } from "vue-router";
import {
  Management,
  UploadFilled,
  List,
  UserFilled,
  Search,
} from "@element-plus/icons-vue";
const router = useRouter();
const ifShowRecourse = ref(false);
const selectValue = ref("");
const options = reactive([
  {
    value: "ppt",
    label: "ppt",
  },
  {
    value: "txt",
    label: "txt",
  },
  {
    value: "doc",
    label: "doc",
  },
  {
    value: "pdf",
    label: "pdf",
  },
]);
const previewList = reactive([
  {
    title: "AI教学案例",
    time: "2025-04-06",
    src: "https://imgur.com/7Xle44F.jpg",
    id: 0,
  },
  {
    title: "交通工程学",
    time: "2025-03-27",
    src: "https://imgur.com/T4feUmY.jpg",
    id: 1,
  },
  {
    title: "商务英语",
    time: "2025-03-27",
    src: "https://imgur.com/j6N9W4t.jpg",
    id: 2,
  },
  {
    title: "计网原理",
    time: "2025-03-10",
    src: "http://8.137.77.237/doc/1.jpg",
  },
  {
    title: "计算机组成原理",
    time: "2025-03-10",
    src: "http://8.137.77.237/ppt/1.jpg",
  },
  {
    title: "计算机网络",
    time: "2025-03-10",
    src: "http://8.137.77.237/txt/1.jpg",
  },
  {
    title: "数据库系统原理与实践",
    time: "2025-03-10",
    src: "http://8.137.77.237/ppt/2.jpg",
  },
  {
    title: "数据结构",
    time: "2025-03-10",
    src: "http://8.137.77.237/txt/2.jpg",
  },
  {
    title: "数据库资料",
    time: "2025-03-10",
    src: "http://8.137.77.237/doc/2.jpg",
  },
  {
    title: "高等数学",
    time: "2025-03-10",
    src: "http://8.137.77.237/txt/3.jpg",
  },
  {
    title: "人类文明诗歌鉴赏",
    time: "2025-03-10",
    src: "http://8.137.77.237/ppt/3.jpg",
  },
  {
    title: "人类文明资料",
    time: "2025-03-10",
    src: "http://8.137.77.237/doc/3.jpg",
  },
  {
    title: "商务英语",
    time: "2025-03-10",
    src: "http://8.137.77.237/doc/4.jpg",
  },
  {
    title: "微积分",
    time: "2025-03-10",
    src: "http://8.137.77.237/ppt/4.jpg",
  },
  {
    title: "自然科学",
    time: "2025-03-10",
    src: "http://8.137.77.237/txt/4.jpg",
  },
  {
    title: "大学英语",
    time: "2025-03-10",
    src: "http://8.137.77.237/doc/5.jpg",
  },
  {
    title: "四六级英语",
    time: "2025-03-10",
    src: "http://8.137.77.237/ppt/5.jpg",
  },
  {
    title: "Java高级编程",
    time: "2025-03-10",
    src: "http://8.137.77.237/txt/5.jpg",
  },
]);
const Pagination = reactive({
  currentPage: 1,
  pageSize: 10,
});

const paginatedPreviewList = computed(() => {
  const start = (Pagination.currentPage - 1) * Pagination.pageSize;
  const end = start + Pagination.pageSize;
  return previewList.slice(start, end);
});

const showResource = (data) => {
  ifShowRecourse.value = true;
  router.push({
    path: "/teacher/resLib/resourceDetail",
    query: {
      title: data.title,
      src: data.src,
      uploadTime: data.time,
      id: data.id,
    },
  });
};

const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};

const selectStyle = {
  width: "108px",
  height: "35px",
  position: "absolute",
  top: "36px",
  left: "266px",
  background: "#ffffff",
  border: "1px solid #dfdfdf",
  borderRadius: "5px",
};
const paginationStyle = {
  position: "absolute",
  top: "785px",
  left: "50%",
  transform: "translateX(-50%)",
};
const checkRoute = () => {
  const fullPath = router.currentRoute.value.fullPath;
  const basePath = fullPath.split("?")[0];
  if (basePath === "/teacher/resLib/resourceDetail") {
    ifShowRecourse.value = true;
  } else {
    ifShowRecourse.value = false;
  }
};
onMounted(() => {
  checkRoute();
});

onUpdated(() => {
  checkRoute();
});
</script>

<style scoped lang="scss">
.container {
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 1224px;
}
.search-input {
  position: absolute;
  top: 36px;
  left: 30px;
  width: 224px;
  height: 36px;
  background: #ffffff;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #dfdfdf;
}
.m-2 {
  :deep(.el-select__wrapper) {
    min-height: 35px; // 设置输入框高度
    line-height: 36px;

    .el-input__inner {
      height: 100%;
    }
  }
}
#file {
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  position: absolute;
  top: 36px;
  right: 32px;
  width: 144px;
  height: 40px;
}
.upload-btn {
  position: absolute;
  top: 36px;
  right: 32px;
  width: 144px;
  height: 40px;
  background: #1661cb;
  border-radius: 5px 5px 5px 5px;
  span {
    position: absolute;
    top: 10px;
    right: 15px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 18px;
    color: #fdfdfe;
    line-height: 21px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    font-style: normal;
    text-transform: none;
  }
  cursor: pointer;
}
.header {
  position: absolute;
  display: flex;
  top: 104px;
  left: 30px;
  width: 100%;
  height: 110px;
}
.header-item {
  position: relative;
  width: 260px;
  height: 110px;
  background: #fdfdfe;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  margin-right: 42px;
  .header-item-title {
    position: absolute;
    top: 8px;
    left: 12px;
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
  .header-item-number {
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
  .header-item-compare {
    position: absolute;
    top: 77px;
    left: 12px;
  }
  .compare-num {
    position: absolute;
    top: 77px;
    left: 77px;
    color: rgb(67, 188, 154);
  }
  .header-item-icon {
    position: absolute;
    top: 23px;
    right: 36px;
  }
}
.body {
  position: absolute;
  top: 246px;

  width: 1300px;
  height: 465px;
  display: flex;
  flex-wrap: wrap;

  .body-item {
    position: relative;
    width: 205px;
    height: 204px;
    left: 30px;
    margin-right: 44px;
  }
  .item-box1,
  .item-box2,
  .item-box3 {
    position: absolute;
    left: 0;
    top: 0;
    width: 192px;
    height: 191px;
    background: #ffffff;
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 2px 2px 2px 2px;
    .preview-img {
      position: absolute;
      top: 10px;
      left: 9px;
      width: 174px;
      height: 114px;
      background: #ffffff;
      border-radius: 0px 0px 0px 0px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .preview-title {
      position: absolute;
      top: 128px;
      left: 9px;
      height: 17px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 13px;
      color: #000000;
      line-height: 23px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .preview-time {
      position: absolute;
      top: 167px;
      left: 9px;
      height: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      font-size: 12px;
      color: #707070;
      line-height: 23px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
  .item-box1 {
    z-index: 3;
  }
  .item-box2 {
    z-index: 2;
    transform-origin: 0 100%;
    transform: rotate(2deg);
  }
  .item-box3 {
    z-index: 1;
    transform-origin: 0 100%;
    transform: rotate(4deg);
  }
}
</style>