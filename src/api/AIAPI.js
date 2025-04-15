import request from "./AIconnect";
//从第一句对话中概括会话昵称
export const summarizeTitle = (question, userid) => {
  return request({
    method: "POST",
    url: `/title`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      question: question,
      user_id: userid,
    },
  });
};



//生成习题quiz
export const questionGenerateQuiz = (question, userid) => {
  return request({
    method: "POST",
    url: `/question_generate_quiz`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      question: question,
      user_id: userid,
    },
  });
};

//生成课程计划
export const questionGenerateLessonPlan = (question, userid) => {
  return request({
    method: "POST",
    url: `/question_generate_lesson_plan/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      question: question,
      user_id: userid,
    },
  });
};

//上传文件
export const uploadFile = (file) => {
  return request({
    method: "POST",
    url: `/upload/document/`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      file: file,
    },
  });
};


