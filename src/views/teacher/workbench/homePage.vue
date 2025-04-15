<template>
  <div class="container">
    <div class="statistics">
      <StatisticsPage />
    </div>
    <div class="lesson">
      <LessonPage />
    </div>
    <div class="todo">
      <TodoPage
        @update:isAddTodo="handleDataFromTodoPage"
        v-model:isAddTodo="isAddTodo"
      />
    </div>
    <div class="task">
      <TaskPage
        @update:isAddTask="handleDataFromTaskPage"
        v-model:isAddTask="isAddTask"
      />
    </div>
    <div class="feedback">
      <FeedbackPage />
    </div>
  </div>
  <AddTask v-if="isAddTask" v-model:isAddTask="isAddTask" />
  <AddTodo v-if="isAddTodo" v-model:isAddTodo="isAddTodo" />
</template>

<script setup>
import StatisticsPage from "./statisticsPage.vue";
import LessonPage from "./lessonPage.vue";
import TodoPage from "./todoPage.vue";
import TaskPage from "./taskPage.vue";
import FeedbackPage from "./feedbackPage.vue";
import AddTask from "./addTask.vue";
import AddTodo from "./addTodo.vue";
import { ref } from "vue";
const isAddTask = ref(false);
const isAddTodo = ref(false);
const handleDataFromTaskPage = (data) => {
  isAddTask.value = data;
};
const handleDataFromTodoPage = (data) => {
  isAddTodo.value = data;
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  width: 1224px;
  height: 100%;
}
.statistics,
.lesson,
.todo,
.task {
  position: absolute;
  width: 572px;
  height: 312px;
  background: #ffffff;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
}
.statistics {
  left: 24px;
  top: 25px;
}
.lesson {
  left: 616px;
  top: 25px;
}
.todo {
  left: 24px;
  top: 361px;
}
.task {
  left: 616px;
  top: 361px;
}
.feedback {
  position: absolute;
  width: 1164px;
  height: 829px;
  background: #ffffff;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  left: 24px;
  top: 697px;
}
</style>
