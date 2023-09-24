大厂性能的计算方式与优化方案（性能优化进阶）

# 目录

性能优化

⼀、⽹⻚性能衡量与指标

    1.衡量⽹⻚性能因素与指标
      a) ⽹⻚的加载
      b) ⽹⻚的交互
    2.⽹⻚开发中的分段渲染与性能评估
    3.混合开发中的性能评估

⼆、前端性能优化的发展⽅向及细节路径

    4.Core Web Vitals宗旨及其细节
      a) CWV 概念
      b) CWV 的分区模型
      c) 宗旨与实际⽅案

参考⽂档：  
 [直播回顾丨谷歌 Core Web Vitals 深入解读](https://baijiahao.baidu.com/s?id=1677330875057509648&wfr=spider&for=pc)

    5.前端性能利器Performance的使⽤
      a) performance⾯板的合理使⽤
      b) Performance⼯具接⼝

参考⽂档：  
 [MDN - Web 性能](https://developer.mozilla.org/zh-CN/docs/Learn/Performance)

    6.加载上的优化
      a) 异步加载
      b) 按需加载
      c) 新时代的异类 - bigpipe

三、 浏览器层⾯的优化点

    7.浏览器存储的优化⽅案
    8.PWA 概念架构

四、⻚⾯性能纬度体系

    i.回到那道⾯试题 – 各阶段性能衡量纬度拓
    展
    ii.性能体系的拆分独⽴ => 衡量标准

五、MVVM 框架层⾯的性能优化

    i.基础类优化
      1.利⽤框架本身设计思路进⾏优化
      2.利⽤第三⽅⼯具进⾏优化
    ii.技巧类

五、⼤⼚可视化性能监控⽅案体系

    a) 埋点上报 => 点到点 + 信息采集
    b) 数据处理 => 阈值设置 / 数据分类 / 数据重组
    c) 可视化展现
      i.⾃研报表监控
      ii.grafana
    d) 告警处理
      i.告警触发
      ii.触发分派 => 钉钉、企微、邮件

# 性能优化进阶

## Navigation Timing API

浏览器内核 performance 提供给我们的内核。

1. navigationStart  
   标识从上一个文档卸载结束时，如果没有上一个文档，这个值将和 fetchStart 相等。

2. unloadEventStart / End  
   标识前一个网页 unload 点，没有上一个文档或者不同域，为 0

3. redirectStart / End  
   一个重定向的持续时间

4. fetchStart / End  
   浏览器准备好使用 HTTP 请求抓取文档的时间（优化加载时间）

5. domainLookupStart / End
   页面请求 HTTP（TCP）开始或者重新建立连接的时间（卡）

6. connectStart / End
   网络连接的时间

7. secureConnectionStart / End  
   HTTPS 连接时间

8. requestStart / End  
   连接请求时间 包含了 from cache

9. responseStart / End  
   返回持续时间 包含了 from cache

10. domLoading  
    开始解析渲染 DOM 树 => readyState | loading => readystatechange

11. domInteractive  
    完成了 DOM 树的解析时间 => readyState | interactive

12. domContentLoadedEventStart / End  
    网页内资源加载到加载完成

13. domComplete  
    DOM 树解析完成

14. loadEventStart / End  
    load 事件回调函数事件

```html
<!-- index.html -->
<script>
  javascript: () => {
    const perfData = window.performance.timing
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
    console.log('页面加载耗时', pageLoadTime)
  }
</script>
```

## Core Web Vitals - 网页核心的性能指标

- Google 提出的衡量标准，每个 CWV 代表用户体验的一个不同方面
  可衡量的，并反映真实体验：
  加载 | 交互 | 稳定

### Largest Contentful Paint (LCP)

衡量装载性能。为了提供良好的用户体验，LCP 应该在页面首次开始加载后 2.5 秒内发生

- 前 2.5s 内进行最大内容渲染

a. 最大内容包括哪些？

- `<img>`元素
- `<svg>`元素
- `<video>`元素
- 通过 url()函数加载的背景图片元素
- 包含文本节点 或者 其他内联文本元素子集的块级元素

b. LCP 值低下的原因

- 服务器渲染慢
- 阻断渲染的 JS 和 css
- 资源加载时间慢
- 客户端渲染机器的性能

c. 针对性的改造

- 服务器的优化  
  缓存 HTML 离线页面，缓存页面资源，减少浏览器对资源请求消耗  
  => 强缓存、协商缓存

  尽量减少阻断渲染：CSS & JS 文件层面进行压缩、合并、级联、内敛，减少串型处理，后置逻辑  
  => 浏览器原理

  图片进行格式优化。JPG 或者 WEBP 等等，降低图片的大小，加快请求速度  
  => 1. 图片格式 2. cdn 3. 云资源管理

- 客户端优化  
  文件解析的方式。减少文件大小，减少逻辑操作、优化算法复杂度  
  => webpack plugin

### First Input Delay（FID）

衡量交互性 为了提供良好的用户体验，页面的 FID 应该小于 100ms

- 页面的首次输入延迟应当小于 100ms

a. 减少 Javascript 的执行时间

- 缩小并减少 JS 文件大小
- 延迟或取消部分无需的逻辑文件
- 尽量减少或者按需加载 polyfill

b. 分解耗时的长任务

- 任何阻塞主线程 50ms 以上的都可以称之为长任务
- 将长任务拆分为若干较小任务并异步执行；后置到下次渲染开始执行

c. worker

- js worker: web worker | service worker

```js
// 1.web worker
// main.js
// 新增worker
const myWorker = new Worker('worker.js')
// 与main thread之间的通信
myWorker.postMessage('hello')
myWorker.onmessage = fuction(e){
  console.log(e.data)
}
// worker.js
self.onmessage = function(e) {
  console.log(e.data)
  // 处理
  self.postMessage(workerResult)
}
// 2.service worker
//  main.js
const self = navigator.serviceWorker.register('./service-worker.js') // ---------------------------------------------------------------------to do
// service-worker.js
self.addEvenListener('intall',function(){
//…
})
self.addEvenListener('activate',function(){
})

// 网络请求
self.addEventListener('fetch', function(event) {
  event.repondwith(
    caches.match(event.request)
  )
})
// 面向网络和cache:处理响应逻辑
```

### Cumlative Layout Shift(CLS)

测量视觉的稳定性。为了提供良好的用户体验，页面应该保证 CLS 小于 0.1

- 布局的移动可能发生在可见元素从前一帧到下一帧改变的位置。

a. 不使用无尺寸元素
=> srcset & sizes

```js
<img
  srcset="zhaowa-320w.jpg 320w,
          zhaowa-480w.jpg 480w,
          zhaowa-800w.jpg 800w"
  sizes="(max-width:320px) 280px,
          (max-width:480px) 440px,
          800px"
  src="zhaowa-800w.jpg"
/>
```

b. 减少内部内容的插入 => 影响整体的布局

c. 动态字体控制

```js
@font-face {
  font-family: 'xxxx';
  font-style: normal;
  font-weight: 400;
  src: local('xxx Regular'), local('xxx-Regular'), url('https://fonts.xxxx.com/xxx.woff2') format('woff2');
  font-display: swap;
}
<link rel="preload">预加载字体
```

### CWV 工具 - Core Web Vitals Annotations

## 性能优化的另一种可能性 - bigpipe - 页面分解成若干个 pagelet

1. 服务前端接收来自客户端的 http 请求
2. 存储层缓存获取数据
3. 生成 HTML，响应给客户端 + 客户端渲染
4. 动态区隔解析内容

## 大厂监控体系

a) 埋点上报 => 点到点 + 信息采集  
b) 数据清洗 => 阈值设置 | 数据分类 | 数据重组  
c) 可视化展现

    i. 自研报表监控
    ii. grafana

d) 告警处理

    i. 告警触发
    ii. 触发分派 => 钉钉、企业微信、邮件
