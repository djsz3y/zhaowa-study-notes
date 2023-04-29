# Vue-cli

## Part1. VUE 脚⼿架

### ⼀、脚⼿架的⻆⾊

1. 效率提升辅助⼯具  
   a. 什么是脚⼿架  
   b. 如何使⽤ vue 脚⼿架快速创建  
   c. 脚⼿架实际使⽤
2. 规范化产物  
   拓展预习：  
   脚⼿架的起步——https://cli.vuejs.org/zh/guide/

### ⼆. Vue 脚⼿架源码解读

1. 源码结构 ⼊⼝  
   a. 脚⼿架本质与重点  
   b. ⼊⼝处辅助⼯具  
   c. 校验处理
2. 从 init 开始
   a. 模板的使⽤与缓存  
   b. 加载逻辑  
   c. Docker 环境布署
3. Generator 流程
   a. 获取配置  
   b. 前置后置处理  
   c. 渲染模板

## Part2. VUE 状态机

1. 状态机背景
   1. ⻚⾯三要素：布局样式、权限逻辑、状态数据
   2. 状态机概念 —— 从流⽔线⽽来
   3. Vue 状态机
2. Vuex 实例  
   实战场景中 Vuex 使⽤：
   a. Store  
   b. Mutation  
   c. Action
3. Vuex 核⼼流程  
   状态机图解
4. 源码解析  
   结构原理  
   初始化挂载  
   Store 对象解析
5. 相关⾯试题  
   课前预习
   1. vuex 与状态机  
      状态机的概念与理解  
      https://www.ruanyifeng.com/blog/2013/09/finite￾state_machine_for_javascript.html  
      https://www.jianshu.com/p/76f6bb7f6896
   2. vuex 基础配置
      https://vuex.vuejs.org/zh/

## Part3. SSR

1. SSR 原理及使⽤场景
2. 已有项⽬如何做 SSR 改造
   i. 构建层 – webpack 配置
   a. 配置结构
   b. Plugin
   c. Router

   ii. 代码层 – 书写区别
   d. 实例代码区别
   e. 路由书写区别
   f. ⽹络请求

   iii. ⽹络层
   g. ⽹络配置

   iv. 服务相关层
