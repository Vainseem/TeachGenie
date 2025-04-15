<template>
  <div class="back" @click="back">&lt;&nbsp;&nbsp;&nbsp;返回</div>
  <div class="container">
    <div class="left-container">
      <div class="left"><img :src="querys.imgSrc" alt="" /></div>
      <div class="lessonName">{{ querys.title }}</div>
      <div class="teacherName">授课老师：{{ userInfo.username }}</div>
      <div class="lessonTime">上传时间：{{ querys.uploadTime }}</div>
    </div>
    <div class="right-container">
      <div class="title">课程概述</div>
      <div class="line"></div>
      <div class="content">{{ aboutList[querys.id] }}</div>
    </div>
    <div class="bottom-container">
      <div class="title">课程资源</div>
      <div class="line"></div>
      <div class="iconBox">
        <img
          v-show="recoursePage !== 'markdown'"
          @click="chooseRecourse('markdown')"
          src="../../../assets/AI_slices/icon_mindmap.png"
        />
        <img
          v-show="recoursePage === 'markdown'"
          @click="chooseRecourse('markdown')"
          src="../../../assets/AI_slices/icon_mindmap2.png"
        />
        <img
          v-show="recoursePage !== 'ppt'"
          @click="chooseRecourse('ppt')"
          src="../../../assets/AI_slices/icon_mind-mapping.png"
        />
        <img
          v-show="recoursePage === 'ppt'"
          @click="chooseRecourse('ppt')"
          src="../../../assets/AI_slices/icon_mind-mapping2.png"
        />
        <img
          v-show="recoursePage !== 'word'"
          @click="chooseRecourse('word')"
          src="../../../assets/AI_slices/icon_form.png"
        />
        <img
          v-show="recoursePage === 'word'"
          @click="chooseRecourse('word')"
          src="../../../assets/AI_slices/icon_form2.png"
        />
      </div>
      <iframe
        v-if="recoursePage === 'ppt'"
        :src="pdfUrls[querys.id].ppt"
        frameborder="0"
        width="800px"
        height="450px"
        style="
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          border: 1px solid #707070;
          border-radius: 10px;
        "
      ></iframe>
      <div
        v-if="recoursePage === 'markdown'"
        v-html="renderMarkdown(pdfUrls[querys.id].markdown)"
        style="
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          border: 1px solid #707070;
          width: 800px;
          height: 450px;
          border-radius: 10px;
          overflow-x: auto;
        "
      ></div>
      <div
        v-if="recoursePage === 'word'"
        style="
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          border: 1px solid #707070;
          width: 800px;
          height: 450px;
          border-radius: 10px;
          overflow-x: auto;
        "
      >
        <video
          style="width: 100%; height: 100%"
          src="@/assets/video/AIman.mp4"
          controls
        ></video>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { marked } from "marked";
const route = useRoute();
const router = useRouter();
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const recoursePage = ref("markdown");
const chooseRecourse = (type) => {
  recoursePage.value = type;
};
const querys = {
  title: route.query.title,
  imgSrc: route.query.src,
  uploadTime: route.query.uploadTime,
  id: route.query.id,
};
const aboutList = {
  0: "本课程旨在培养学生对深度学习、神经网络和强化学习等核心技术的理解，掌握生成式AI（如ChatGPT、Stable Diffusion）的内部机制，并具备独立设计和实现AI模型的能力。通过案例分析、互动讨论和实践活动等环节，学生将学习如何合理选择AI技术、设计AI模型、分析AI应用效果，并识别AI技术在不同领域的应用场景。课程还结合多媒体资源，如思维导图、词云图和视频，以增强教学效果，帮助学生更直观地理解AI技术的实践应用。",
  1: "本课程围绕“城市路口交通流量调查与分析”主题，旨在培养学生对交通调查的基本认识，掌握不同调查方法的原理与应用，并具备独立设计和实施交通调查方案的能力。通过案例分析、互动讨论和数据分析等环节，学生将学习如何合理选择调查方法、设计调查方案、分析交通流量数据，并识别交通问题。课程还结合多媒体资源，如图片、PPT 和视频，以增强教学效果，帮助学生更直观地理解交通流量调查的实践应用。",
  2: "本课程旨在培养学生对商务邮件写作的规范性和专业性的认识，掌握商务邮件的结构和写作技巧，能够独立撰写清晰、简洁且符合商务规范的邮件。通过实例分析、分组互动和模拟写作等环节，学生将学习如何根据不同情境撰写合适的商务邮件，并提高邮件的清晰度和专业性。课程还结合多媒体资源，如图片、PPT 和视频，以增强教学效果，帮助学生更直观地理解商务邮件写作的实践应用。",
};
const back = () => {
  router.back();
};

const renderMarkdown = (md) => {
  return marked(md);
};

const pdfUrls = {
  0: {
    ppt: "https://docs.google.com/presentation/d/1DNgj32zZs6Wt7XStxCrMTOxexCohrK2s/preview",
    markdown: `
## **一、教学目标**

- **深入理解核心技术**：掌握深度学习、神经网络和强化学习的原理，理解生成式AI（如ChatGPT、Stable Diffusion）的内部机制。
- **案例分析与跨领域应用**：分析自动驾驶、金融风险管理和医疗图像诊断等真实案例，了解AI技术在各行业的实践与挑战。
- **模型设计与评估**：能够利用主流框架（如TensorFlow、PyTorch）设计并实现简单AI模型，并使用LIME/SHAP等工具对模型进行公平性与可解释性评估。
- **伦理与社会反思**：探讨AI带来的伦理问题（如偏见、深度伪造、就业影响），培养从多角度审视AI发展问题的能力。

------

## **二、教学内容**

1. **AI核心技术**
   - 深度学习与神经网络的基本原理
   - 强化学习与决策优化
   - 生成式AI的工作机制及案例解析
2. **行业应用案例**
   - 自动驾驶：传感器数据处理与路径规划案例分析
   - 金融分析：市场预测、风险管理与模型实战
   - 医疗诊断：医疗图像识别、病理分析和智能诊断实例
3. **伦理与社会影响**
   - AI偏见、数据公平性与可解释性问题
   - 自动化对就业和社会结构的影响
   - 深度伪造（Deepfake）和信息安全挑战

------

## **三、教学活动安排**

### **活动一：技术解读与案例研讨（30分钟）**

- **多媒体讲解（15分钟）**
  - 使用精心制作的课件介绍神经网络、强化学习和生成式AI的基本原理。
  - 列举自动驾驶、金融、医疗领域的实际案例，说明各自的技术实现和应用效果。
- **数据案例研讨（15分钟）**
  - 分发真实或模拟数据（如自动驾驶传感器数据或金融时间序列数据）。
  - 小组讨论：分析数据背后的AI决策流程和模型设计思路，提出改进意见。

------

### **活动二：AI模型设计与实现（45分钟）**

- **项目任务发布（5分钟）**
  - 分组说明任务：利用Python和TensorFlow/PyTorch实现图像分类或时间序列预测模型。
- **小组实践（30分钟）**
  - 每组搭建、训练模型并记录关键性能指标（准确率、F1分数等）。
  - 应用LIME、SHAP等工具进行模型解释，评估模型公平性与鲁棒性。
- **成果展示与讨论（10分钟）**
  - 小组展示设计思路、实现过程及评估结果。
  - 教师和同学共同点评，针对模型创新性与改进方向进行讨论。

------

### **活动三：伦理辩论与未来展望（25分钟）**

- **辩论前准备（5分钟）**
  - 分组确定正反立场，围绕“AI发展是否应设定技术与伦理边界”以及“自动化是否加剧社会不平等”两个主题进行讨论。
- **小组辩论（15分钟）**
  - 各组分别陈述观点，运用技术细节、案例和数据论证各自立场。
- **总结与反思（5分钟）**
  - 教师针对辩论内容进行点评，提炼关键论点，并引导学生思考AI技术的双刃剑效应及未来发展方向。

------

## **四、时间分配**

- 技术解读与案例研讨：30分钟
- AI模型设计与实现：45分钟
- 伦理辩论与未来展望：25分钟
- 总结与反思：10分钟

------

## **五、教学准备**

- **多媒体课件**：包含AI核心原理、案例视频和数据图表。
- **编程环境**：Jupyter Notebook或Google Colab，预装相关库（TensorFlow、PyTorch、LIME/SHAP）。
- **数据集**：MNIST、股票市场数据、医疗图像数据等真实或模拟数据。

------

## **六、教学评价**

- **项目任务评估**：根据小组AI模型设计、实现和评估的完整性、创新性与技术深度进行评分。
- **课堂表现**：通过辩论和案例讨论，评价学生的思辨能力、团队协作和表达能力。
- **反思报告**：课后提交一篇反思文章，讨论AI技术未来发展、伦理问题与社会影响。

------

## **七、预期成果**

- **理论掌握**：学生能清晰解释AI核心技术原理及应用案例。
- **实践能力**：学生能独立设计并实现AI模型，并利用可解释性工具对模型进行评估。
- **伦理认知**：学生能从技术、伦理和社会角度分析AI的优势与潜在风险，并提出合理对策

# 2. 多媒体

## ppt

[ppt戳这里](ppt/高级.pptx)

## 思维导图

<img src="https://imgur.com/mOpBLtY.png" alt="image-20250405215554505" style="zoom:50%;" />

## 词云图

<img src="https://imgur.com/AYPMA7r.png" alt="image-20250405215554505" style="zoom:50%;" />

# 3. 习题

#### 一、选择题模块（每题 2 分，共 10 分）

1. **下列哪项技术可以通过减少内部协变量偏移来加速神经网络训练？**
   A. Dropout
   B. Batch Normalization
   C. 数据增强
   D. 早停法
2. **在强化学习中，“时间差分学习”（Temporal Difference Learning）结合了哪两种方法？**
   A. 蒙特卡洛方法与引导学习
   B. 动态规划与进化算法
   C. Q学习与策略梯度
   D. Actor-Critic 与遗传算法
3. **多分类神经网络中常用的损失函数是：**
   A. 均方误差
   B. 交叉熵损失
   C. Hinge Loss
   D. 二元交叉熵
4. **在生成式对抗网络（GAN）中，如果判别器过强，相对的生成器可能会出现下列哪种现象？**
   A. 模型收敛过快
   B. 模式坍缩（Mode Collapse）
   C. 过拟合训练数据
   D. 损失函数震荡减小
5. **以下哪种技术能够提高深度学习模型的局部可解释性？**
   A. 梯度下降
   B. LIME（局部可解释模型-不可知解释方法）
   C. 随机失活（Dropout）
   D. 批归一化（Batch Normalization）

------

**答案：**

1. B
2. A
3. B
4. B
5. B

------

#### 二、填空题模块（每题 3 分，共 15 分）

1. 在深度学习中，通过计算误差关于各参数的导数并反向传播误差信息的过程称为 ________，常用的优化算法包括 ________。
   **答案：** backpropagation；梯度下降
2. 在强化学习中，用于评估在特定状态下采取某一动作所能获得的长期累计奖励的函数被称为 ________。
   **答案：** Q函数
3. 为防止深度神经网络训练中出现梯度爆炸或消失，常用的技术包括 ________ 和合适的权重 ________。
   **答案：** 梯度裁剪；初始化（如Xavier或He初始化）
4. 生成式对抗网络（GAN）中的两个模型——生成器和判别器——构成了一个 ________ 博弈，其目标可被看作一个 ________ 优化问题。
   **答案：** 零和；最小最大
5. 在深度学习中，模型的正则化技术（如Dropout）主要用于减少 ________，以提升模型在新数据上的泛化能力。
   **答案：** 过拟合

------

#### 三、简答题模块（每题 5 分，共 15 分）

1. **请讨论深度神经网络中模型复杂度与可解释性之间的权衡。**
   **参考答案：**
   随着神经网络层数和参数数量的增加，模型的表达能力和拟合复杂数据的能力提高，但同时也使得模型内部决策过程变得更难解释，形成所谓的“黑箱”。高复杂度的模型可能在特定任务上表现出色，但在需要透明性和可解释性（如医疗、金融）时可能不被接受。权衡之道在于采用可解释性技术（如LIME、SHAP）或构造具有内在解释机制的模型，同时在设计时考虑简化结构以便更容易理解。
2. **解释 adversarial training（对抗训练）在提升深度学习模型鲁棒性方面的作用，并说明其可能的局限性。**
   **参考答案：**
   对抗训练通过在训练集中加入经过精心设计的对抗样本，使模型学习如何在面对恶意扰动时保持稳定性，从而提高鲁棒性。其作用在于减少模型对微小扰动的敏感性，防止攻击者通过扰动输入数据使模型产生错误预测。但局限性包括：对抗样本生成过程复杂、训练成本高，以及可能导致模型在正常样本上的性能略有下降。此外，对抗训练通常针对已知攻击形式，对于未知攻击可能防御效果有限。
3. **描述在强化学习中，如何利用超参数调优来平衡“探索”与“利用”的关系，并讨论这种调优对模型收敛速度和最终性能的影响。**
   **参考答案：**
   在强化学习中，超参数如探索率（ε）在 ε-greedy 策略中扮演关键角色，决定了模型在探索未知动作和利用已知最优策略之间的平衡。较高的探索率有助于发现全局最优解，但可能延缓收敛；较低的探索率则可能使模型过早陷入局部最优。常用的调优方法包括线性或指数衰减ε值、随机搜索和贝叶斯优化。合理的超参数调优能在加快模型收敛速度的同时，确保最终策略的高质量和稳定性，同时避免因过度利用而导致的局部最优困境。

------


    `,
  },
  1: {
    ppt: "https://docs.google.com/presentation/d/1TgUYRrUGMiCl6A846hi5xyxx0HQaI6U-/preview",
    markdown: `# **教学案例主题一：城市路口交通流量调查与分析**

## **1. 教学设计**

- 教学目标：
  - 理解交通调查的目的和意义。
  - 掌握不同交通调查方法的原理和应用。
  - 能够设计和实施交通流量调查方案。
  - 能够分析交通流量数据，识别交通问题。
- 教学内容：
  - 交通调查概述（目的、类型、意义）。
  - 交通流量调查方法（人工计数、视频检测、感应线圈等）。
  - 交通流量数据分析（流量、高峰小时系数、服务水平等）。
  - 案例分析：某城市路口交通流量调查与分析。
- 教学活动安排：
  - 互动环节一：调查方法选择（10分钟）
    - 教师提出问题：针对不同交通场景，如何选择合适的调查方法？
    - 学生分组讨论，分析各种调查方法的优缺点。
    - 各组代表分享讨论结果，教师引导总结。
  - 互动环节二：调查方案设计（20分钟）
    - 教师提供某城市路口的地图和相关信息。
    - 学生分组设计交通流量调查方案，包括调查时间、地点、方法、人员、设备等。
    - 各组代表展示方案，并接受其他学生的提问和评价。
  - 互动环节三：数据分析与问题识别（30分钟）
    - 教师提供模拟的交通流量调查数据。
    - 学生分组分析数据，计算相关指标，绘制图表。
    - 学生根据分析结果，识别路口的交通问题，并提出改进建议。
    - 各组代表分享分析结果和建议，教师点评。
- 时间分配：
  - 导入（5分钟）
  - 理论讲解（20分钟）
  - 案例分析（20分钟）
  - 调查方案设计与数据分析（30分钟）
  - 总结与评价（5分钟）
- 预期成果：
  - 学生能够理解交通调查的目的和意义。
  - 学生能够掌握不同交通调查方法的原理和应用。
  - 学生能够设计和实施交通流量调查方案。
  - 学生能够分析交通流量数据，识别交通问题。

## **2. 多媒体教学资源**

### 2.1 图片

不同交通调查方法的现场照片（人工计数、视频检测、感应线圈等）

<img src="https://imgur.com/T4feUmY.jpg" alt="image-20250324211824073" style="zoom:50%;" />





### 2.2 ppt

[交通调查](ppt/第3章交通调查.ppt)



### 2.3 视频





## **3. 练习题**

### **3.1 选择题**

1. **人工计数法的优点是：**
   - A. 成本低，操作简单
   - B. 可以获取详细的车辆类型和行驶轨迹信息
   - C. 适用于大规模、长时间的交通流量调查
   - D. 数据精度高，受人为因素影响小
2. **高峰小时系数（PHF）的计算公式是：**
   - A. 高峰小时流量 / 小时内最大15分钟流量
   - B. 小时内最大15分钟流量 / 高峰小时流量
   - C. 高峰小时流量 / 小时内平均流量
   - D. 小时内平均流量 / 高峰小时流量
3. **以下哪种交通调查方法适用于获取车辆速度分布数据？**
   - A. 人工计数法
   - B. 视频检测法
   - C. 感应线圈法
   - D. 雷达测速法

**选择题答案与解析：**

1. **人工计数法的优点是：**

   - **A. 成本低，操作简单**
   - **解析：** 人工计数法相较于其他技术手段，成本较低且易于操作，但可能受人为因素影响较大。

2. **高峰小时系数（PHF）的计算公式是：**

   - **A. 高峰小时流量 / 小时内最大15分钟流量**
   - **解析：** 高峰小时系数用于反映高峰小时内流量的不均匀程度，计算公式为高峰小时流量除以小时内最大15分钟流量。

3. **以下哪种交通调查方法适用于获取车辆速度分布数据？**

   - **D. 雷达测速法**
   - **解析：** 雷达测速法能够精确测量车辆速度，适用于获取车辆速度分布数据。视频检测法和感应线圈法也可以获取速度信息。

   

### 3.2 填空题

1. **交通调查的主要目的是为了________、________和________交通状况，识别存在的问题并为交通管理提供决策支持。**
2. **常见的交通流量调查方法包括________、________和________等，每种方法适用于不同的交通场景。**
3. **在设计交通流量调查方案时，需考虑的关键因素包括________、________、________和________等。**
4. **高峰小时系数用于衡量交通流量的________，是交通数据分析中的重要指标之一。**
5. **在分析交通流量数据时，识别交通问题通常需要结合________和________等分析方法，发现拥堵、瓶颈等现象。**



------



1. **答案：** 收集、分析、评估
   **解析：** 交通调查的目的是通过系统地收集和分析交通数据，评估交通状况，识别问题，为交通规划和管理提供科学依据。
2. **答案：** 人工计数、视频检测、感应线圈
   **解析：** 不同的交通流量调查方法各有优缺点：人工计数成本低但易受人为因素影响；视频检测可自动记录但设备成本较高；感应线圈适用于高速公路等固定场所。
3. **答案：** 调查时间、地点、方法、人员
   **解析：** 设计调查方案时，需要明确调查的具体时间段、地点选择、使用的方法（如人工或视频）、参与人员及其分工，以确保调查结果的有效性和可靠性。
4. **答案：** 波动性
   **解析：** 高峰小时系数（PHF）反映流量在一小时内的波动情况，数值越低，表明流量在该小时内更不均匀，常用于交通设计与评估。
5. **答案：** 图表展示、统计指标
   **解析：** 在分析交通流量数据时，常通过图表（如折线图、柱状图）直观展示流量变化趋势，并结合高峰小时系数、服务水平等统计指标来识别问题，例如拥堵或车流瓶颈。

### 3.3 简答题

3-4 某交叉口采用抽样法调查停车延误，由10 min观测(间隔为15 s)所得资料列于表中，试作延误分析。       

| 开始时间 | 0s   | 15s  | 30s  | 45s  | 停止车数 | 没有停止车数 |
| -------- | ---- | ---- | ---- | ---- | -------- | ------------ |
| 8:00     | 0    | 0    | 2    | 6    | 8        | 10           |
| 8:01     | 2    | 0    | 4    | 4    | 10       | 9            |
| 8:02     | 3    | 3    | 6    | 0    | 12       | 15           |
| 8:03     | 1    | 4    | 0    | 5    | 10       | 8            |
| 8:04     | 0    | 5    | 0    | 1    | 5        | 11           |
| 8:05     | 9    | 1    | 2    | 6    | 15       | 12           |
| 8:06     | 3    | 0    | 7    | 0    | 10       | 7            |
| 8:07     | 1    | 2    | 6    | 2    | 9        | 8            |
| 8:08     | 5    | 7    | 5    | 0    | 16       | 13           |
| 8:09     | 1    | 3    | 0    | 4    | 8        | 16           |
| 8:10     | 3    | 0    | 6    | 5    | 10       | 10           |

答案：

<img src="https://imgur.com/N23vPT1.jpg" alt="image-20250324225837232" style="zoom:67%;" />

`,
  },
  2: {
    ppt: "https://docs.google.com/presentation/d/10sFvzT90UJj313VsIwdS5hSAQN6MJlwT/preview",
    markdown: `# **商务英语邮件写作技巧**

## **1. 教学设计**

- 教学目标：

  - **理解商务邮件的结构和常用表达方式**，包括开头、正文和结尾的规范写法。
  - **掌握商务邮件写作中的礼仪与技巧**，能够根据不同的场景（如询问、投诉、确认、感谢等）使用合适的语言。
  - **能够独立撰写清晰、简洁且符合商务规范的邮件**，并能适应不同的商务情境。

- 教学内容：

  - **商务邮件的基本结构**：包括称呼、开头、正文、结尾等部分。
  - **常用表达与礼仪**：如何用恰当的语气进行请求、确认、投诉等。
  - **商务邮件的写作技巧**：如何保持邮件简洁、清晰并具有专业性。
  - **案例分析与练习**：通过实际场景模拟，分析不同类型商务邮件的写作技巧。

- 教学活动安排：

  ##### **活动一：商务邮件结构讲解与实例分析**（20分钟）

  - **教师讲解**：介绍商务邮件的常见结构与写作要求，包括：
    - 称呼与问候：如何根据对象选择合适的称呼（例如：Dear Mr. Smith, Dear Team等）。
    - 邮件开头：常用开头句型（例如：I hope this email finds you well, I am writing to...）。
    - 正文与结尾：如何表达请求、提供信息或回应对方（例如：Could you please... / I look forward to your reply...）。
    - 邮件礼仪：如何保持礼貌与专业性。
  - **实例分析**：展示一封典型的商务邮件，并进行逐步分析，讲解其中的关键表达和写作技巧。

  ##### **活动二：分组互动 - 商务邮件写作练习**（30分钟）

  - **活动说明**：学生分成小组，每组根据不同情境撰写一封商务邮件。情境可以包括：
    - 向客户确认订单详情。
    - 向上司请假。
    - 向同事请求帮助或提供信息。
    - 向供应商投诉货物延迟。
  - **学生分组**：每组讨论并撰写一封商务邮件，注意使用合适的表达、语气与礼仪。
  - **展示与反馈**：各组将邮件展示给全班，教师与同学提供反馈，重点点评邮件的结构、语气及表达技巧。

  ##### **活动三：互动讨论与邮件改进**（20分钟）

  - **活动说明**：教师展示一封典型的商务邮件（可包含一些常见错误或不当表达）。
  - **分组讨论**：学生小组讨论邮件中的问题，并提出改进意见（例如：语气过于直接、内容不够简洁等）。
  - **集体改进**：各组汇报讨论结果，教师对邮件进行修改，并解释修改的原因。

  ##### **活动四：模拟商务邮件写作与角色扮演**（15分钟）

  - **活动说明**：选择一个复杂的商务情境，例如：
    - 与海外客户就合同条款进行邮件沟通。
    - 向客户提供售后服务方案。
  - **角色扮演**：学生模拟实际商务邮件沟通，进行“发邮件”和“回复邮件”的角色扮演。
  - **讨论与总结**：教师引导学生分析邮件内容，讨论邮件中使用的策略与语言表达，强调商务邮件中的注意事项。

- 时间分配：

  - **导入与理论讲解**（20分钟）
  - **分组练习与展示**（30分钟）
  - **互动讨论与邮件改进**（20分钟）
  - **模拟写作与角色扮演**（15分钟）
  - **总结与评价**（5分钟）

- 预期成果：

  - 学生能够理解并掌握商务邮件的基本结构和写作技巧。
  - 学生能够根据不同的情境撰写合适的商务邮件，体现出良好的沟通能力与邮件礼仪。
  - 学生能够通过互动环节改进写作技巧，提高邮件的清晰度和专业性。
  - 学生能够在模拟情境中应用商务邮件写作技巧，增加实际应用能力。

## **2. 多媒体教学资源**

### 2.1 图片



<img src="https://imgur.com/LWSb9aH.jpg" alt="665af529f8eb4db5f5806efb2282501c" style="zoom:33%;" />



<img src="https://imgur.com/j6N9W4t.jpg" alt="8be1a3c019b7a224f8201d6d6694a9df" style="zoom:33%;" />

### 2.2 ppt

[ppt入口](ppt/商务英语邮件.ppt)









## **3. 练习题**

### **Part 1: Multiple Choice Questions**

1. **Which of the following is the most appropriate salutation for a formal business email when the recipient's name and gender are unknown?**

   - A. Dear Mr. Smith
   - B. Dear Sir/Madam
   - C. Hi there
   - D. Dear John

   **Correct Answer:** B

2. **Which of the following phrases would you typically use at the beginning of a business email to show politeness?**

   - A. I’m writing to let you know…
   - B. I hope this email finds you well.
   - C. Let’s get to the point.
   - D. Just wanted to remind you…

   **Correct Answer:** B

3. **What is the most appropriate expression to use when you are attaching a file in your email?**

   - A. Please find attached…
   - B. I am writing to inform you…
   - C. As discussed…
   - D. Let me know if you need anything.

   **Correct Answer:** A

4. **Which of the following should be avoided in a business email?**

   - A. A clear and concise subject line
   - B. Use of casual or overly friendly language
   - C. A formal greeting and closing
   - D. Proper grammar and punctuation

   **Correct Answer:** B

------

### **Part 2: Fill in the Blanks**

1. **In a formal business email, it’s common to open with a salutation like “________,” when you know the recipient's name.**

   **Answer:** Dear [Name]

2. **Business emails should be clear and ________, so avoid unnecessary details or complex language.**

   **Answer:** concise

3. **At the end of a business email, it’s polite to use phrases like “________” to express your expectation for a reply.**

   **Answer:** I look forward to hearing from you.

4. **In the signature of a business email, you should include your full name, job title, and ________ for easy contact.**

   **Answer:** contact information

------

### **Part 3: Short Answer Questions**

1. **What are the typical components of a business email? Briefly explain each part.**

   **Answer:**
    A typical business email consists of:

   - **Salutation**: A polite greeting, e.g., "Dear [Name]".
   - **Opening**: A brief introduction, often including pleasantries or the purpose of the email.
   - **Body**: The main content, where you provide the details or request.
   - **Closing**: A polite expression indicating the email’s end, e.g., "Best regards".
   - **Signature**: Your full name, job title, and contact information.

2. **Why is it important to keep business emails concise and clear?**

   **Answer:**
    It is important to keep business emails concise and clear to respect the recipient's time, ensure that the message is easily understood, and avoid confusion or misunderstandings. Long-winded emails can overwhelm or frustrate the reader, reducing the effectiveness of the communication.

3. **Give an example of a polite way to request information in a business email.**

   **Answer:**
    "Could you please provide the latest sales report at your earliest convenience?"
    This phrase is polite and respectful, making the request without sounding too direct or demanding.

`,
  },
};
</script>


<style scoped lang="scss">
* {
  font-family: Microsoft YaHei, Microsoft YaHei;
  color: #000000;
  line-height: 21px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.back {
  position: relative;
  left: 10px;
  top: 10px;
  width: 100px;
  height: 21px;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  color: gray;
}
.container {
  position: relative;
  width: 1164px;
  min-height: 100px;
  left: 50%;
  transform: translateX(-50%);
}
.left-container {
  position: absolute;
  left: 30px;
  top: 32px;
  width: 750px;
  height: 240px;
  background: #ffffff;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 350px;
    height: 240px;
    background-size: 100% 100%;
    border: 1px solid #707070;
    border-radius: 10px 0px 0px 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .lessonName {
    position: absolute;
    left: 374px;
    top: 10px;
    width: 299px;
    height: 21px;
    font-weight: 400;
    font-size: 20px;
  }
  .teacherName {
    position: absolute;
    left: 374px;
    top: 60px;
    font-weight: 400;
    font-size: 16px;
  }
  .lessonTime {
    position: absolute;
    left: 374px;
    top: 90px;
    width: 299px;
    height: 21px;
    font-weight: 400;
    font-size: 16px;
  }
}
.right-container {
  position: absolute;
  left: 800px;
  top: 32px;
  width: 394px;
  height: 240px;
  background: #ffffff;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  .title {
    position: absolute;
    top: 12px;
    left: 16px;
    width: 69px;
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
  .line {
    position: absolute;
    top: 37px;
    left: 17px;
    width: 69px;
    height: 2px;
    background: #1661cb;
  }
  .content {
    position: absolute;
    overflow: auto;
    top: 53px;
    left: 20px;
    width: 354px;
    height: 163px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
.bottom-container {
  position: absolute;
  left: 30px;
  top: 296px;
  width: 1164px;
  height: 517px;
  background: #ffffff;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  .title {
    position: absolute;
    top: 12px;
    left: 16px;
    width: 69px;
    height: 21px;
  }
  .line {
    position: absolute;
    top: 37px;
    left: 17px;
    width: 69px;
    height: 2px;
    background: #1661cb;
  }
  .iconBox {
    position: absolute;
    top: 12px;
    left: 130px;
    width: 100px;
    display: flex;
    justify-content: space-between;
  }
}
</style>