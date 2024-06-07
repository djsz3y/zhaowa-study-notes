# HTML 面试题

## HTML DOCTYPE 的含义？什么是 HTML 的标准模式与混杂模式？

> 背过：
>
> - [3. DOCTYPE(⽂档类型) 的作⽤](https://juejin.cn/post/6905294475539513352#heading-3)

HTML 的文档类型声明，doctype ，说明这个页面是用什么来编写的。

- h5 html5 有一个比较宽松的语法，基本上完全向后兼容。

```html
<!DOCTYPE html>
```

- h4.0.1
  - strict 结构中不能有出现格式或表现的内容
    - `<b></b>`，`<p font='5'></p>`
  - tansitional

```html
<!-- strict html -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<!-- strict xhtml -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!-- transitional html -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- transitional xhtml -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

## HTML5 有哪些语义化标签及其特性？HTML 元素有哪些分类与特性？

让我们根据结构化的内容，选择合适的标签。

- seo 有利；
- 代码的可读性，更好；
- 标签上加上 alt, title
- accessibility 方便一些其他的设备进行解析。

## 如何检测浏览器是否支持 HTML5 特性？

> 考察你是否对 **HTML5 新特性**有一定的总结
>
> - [6. HTML5 有哪些更新](https://juejin.cn/post/6905294475539513352#heading-6)

- canvas
- video, audio
- 本地缓存的支持 localStorage, Worker
- article, footer, header 新的语义化标签
- form: calender, date 新的表单控件
- esm es module, script 是不再需要 type 属性了。

[1]检查特定的属性和方法

> 检测浏览器是否支持 H5

```js
!!navigator.geolocation
!!window.localStorage
!!window.Worker
```

[2]创建一个元素，看看特定元素，有没有属性和方法

是否是 H5 里的 canvas

```js
document.createElement('canvas').getContext()
document.createElement('video').canPlayType
```

[3]第三方库

- http://modernizr.cn/

## jump HTML 中 meta 的作用？

## HTML 的标签有哪些可以优化 SEO？

[1]meta 中的相关属性  
`<meta name="author" content="aaa@gmail.com">`  
`<meta name="description" content="XXX XRM XXX 系统" >`  
`<meta name="keywords" content="XXX XRM XXX 系统" >`

[2]标签

1.  title
2.  meta
3.  header
4.  nav
5.  article
6.  aside
7.  footer

Answer:

1. 首先要保证是 SSR 的；
2. meta 中相关的属性；
3. 语义化标签，以一些结构化的为主。 费效比。

## DOM 和 BOM 有什么区别？

JavaScript 在浏览器环境下，一般由三部分组成。

- ECMAScript 核心。描述了 JS 的语法和基本对象；
- DOM 文档对象模型， document. 你有一些 API，可以操作 文档。
- BOM 浏览器对象模型，browser. 你有一些 API，可以操作 浏览器。

## 如何实现移动端适配？

### 1px 问题

先放大 200% ,然后 scale(0.5)

### rem 方案

rem 指的是 html 的 font-size 的大小。

## 如何禁用页面中的右键、打印、另存为、复制等功能？

```js
// 右键
document.onmousedown = function (event) {
  if (event.button === 2) {
    return false
  }
}

document.oncontextmenu = function (event) {
  return false
}

// 复制
// <body oncopy="nocopy()">
function nocopy(event) {
  event.returnValue = false
}

// f12
document.onkeydown = function (e) {
  if (window.event && window.event.keyCode === 123) {
    window.event.returnValue = false
  }
}
```

## href="javascript:void(0)"和 href="#"区别是什么？

href="#" 我的锚点，默认是 #top,会让你网页往上走。  
javascript:void(0) 死链接。

## 对 target="\_blank"的理解？有什么安全性问题？如何防范？

target="\_blank", 类似于 window.open, 你的子页面，会拿到你当前的句柄。  
window.opener

```js
if (window.opener) {
  window.opener.loacation.href = 'bad.html'
}
```

```html
<a href="x.html" target="_blank" rel="noopener noreferer">跳转</a>
```

```js
var otherWindow = window.open('xxx')
otherWindow.opener = null
```

## 简述页面的存储区别？什么是本地存储？怎么做离线缓存？

[1]cookie  
 每个 cookie 不能超过 4kb  
 每个域 20 个  
[key, value, domain, expireTime, httpOnly, sec, ss]

[2]web storage  
 localstorage  
 sessionstorage  
 5MB

[3]indexedDB [webSQL]

[4]application cache

1.  pwa
2.  service worker

## 什么是 canvas？什么时候需要使用 canvas？

canvas 的中文：画布。  
css div 普通的网页；  
svg 和传统的 html 差别不大。html 处理矢量绘图的能力不足。  
canvas 2d  
canvas webGL OpenGL 的 ES 规范，在 web 端的实现。利用 GPU 去渲染一些，3d/2d 的图形。

## 什么是 PWA？

渐进式网页应用。

核心技术：

- app manifest
- service worker 客户端代理的工作
- web push

## 什么是 Shadow DOM？

web component 做到真正的组件化。

- 原生规范，无需框架
- 原生使用，无需编译
- 真正意义上的 css scope

```js
customElements.define(
  'shadow-test',
  class extends HTMLElemenet {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' })
      shadow.innerHTML = 'this is a shadow dom'
    }
  }
)
```

<!-- stencil 框架 -->

## iframe 有哪些应用？

- 最常见的一种微前端手段
- ajax 上传文件
- 广告
- 跨域

## 如处理 iframe 通信？

- 同域下面

```js
document.demain = 'baidu.com'
frame.contentWindow.xxx
```

- post message

## 浏览器的渲染和布局逻辑是什么？

- DOM 树构建
- CSS 树构建
- 渲染树构建
- 页面布局
- 页面绘制

## 页面的重绘回流是什么？

回流

- 回流又称重排，指改变几何属性的渲染。感觉“回流”较高大上，后续统称回流吧。

- 可理解为将整个网页填白，对内容重新渲染一次。只不过以人眼的感官速度看浏览器回流是不会有任何变化的，若你拥有闪电侠的感官速度看浏览器回流(实质是将时间调慢)，就会发现每次回流都会将网页清空，从左上角第一个像素点从左到右从上到下这样一点一点渲染，直至右下角最后一个像素点。每次回流都会呈现该过程，只是感受不到而已。

- 渲染树的节点发生改变，影响了节点的几何属性，导致节点位置发生变化，此时就会触发浏览器回流并重新生成渲染树。回流意味着节点的几何属性改变，需重新计算并生成渲染树，导致渲染树的全部或部分发生变化。

重绘

- 重绘指改变外观属性而不影响几何属性的渲染。相比回流，重绘在两者中会温和一些，后续谈到的 CSS 性能优化就会基于该特性展开。

- 渲染树的节点发生改变，但不影响节点的几何属性。由此可见，回流对浏览器性能的消耗高于重绘且回流一定伴随重绘，重绘却不一定伴随回流。

为何回流一定伴随重绘？整个节点的位置都变了，肯定要重新渲染它的外观属性啊！

- 回流必定引发重绘，重绘不一定引发回流，可利用该法则解决一些因为回流重绘而引发的性能问题。在优化性能前，需了解什么情况可能产生性能问题，以下罗列一些常见情况。

- 改变窗口大小
- 修改盒模型
- 增删样式
- 重构布局
- 重设尺寸
- 改变字体
- 改动文字

## 怎样计算首屏和白屏的时间？常统计的页面性能数据指标包括？

FP FCP

PerformanceObserver

## 页面上有哪些领域可以做进一步的性能优化？

- visibility:hidden --> display:none
- 避免使用 table
- 避免层级过多
- dom insert -- fragment
- requestIdelCallback

FCP CLS FID

## 浏览器之间的线程调度是怎么做的？

    ● 最新的Chrome浏览器包括：1个浏览器主进程，1个GPU进程，1个网络进程，多个渲染进程，和多个插件进程；
      ○ 浏览器进程： 负责控制浏览器除标签页外的界面，包括地址栏、书签、前进后退按钮等，以及负责与其他进程的协调工作，同时提供存储功能
      ○ GPU进程：负责整个浏览器界面的渲染。Chrome刚开始发布的时候是没有GPU进程的，而使用GPU的初衷是为了实现3D CSS效果，只是后面网页、Chrome的UI界面都用GPU来绘制，这使GPU成为浏览器普遍的需求，最后Chrome在多进程架构上也引入了GPU进程
      ○ 网络进程：负责发起和接受网络请求，以前是作为模块运行在浏览器进程一时在面的，后面才独立出来，成为一个单独的进程
      ○ 插件进程：主要是负责插件的运行，因为插件可能崩溃，所以需要通过插件进程来隔离，以保证插件崩溃也不会对浏览器和页面造成影响
      ○ 渲染进程：负责控制显示tab标签页内的所有内容，核心任务是将HTML、CSS、JS转为用户可以与之交互的网页，排版引擎Blink和JS引擎V8都是运行在该进程中，默认情况下Chrome会为每个Tab标签页创建一个渲染进程
    ● 渲染进程中的线程
      ○ GUI渲染线程：负责渲染页面，解析html和CSS、构建DOM树、CSSOM树、渲染树、和绘制页面，重绘重排也是在该线程执行
      ○ JS引擎线程：一个tab页中只有一个JS引擎线程(单线程)，负责解析和执行JS。它GUI渲染进程不能同时执行，只能一个一个来，如果JS执行过长就会导致阻塞掉帧
      ○ 计时器线程：指setInterval和setTimeout，因为JS引擎是单线程的，所以如果处于阻塞状态，那么计时器就会不准了，所以需要单独的线程来负责计时器工作
      ○ 异步http请求线程： XMLHttpRequest连接后浏览器开的一个线程，比如请求有回调函数，异步线程就会将回调函数加入事件队列，等待JS引擎空闲执行
      ○ 事件触发线程：主要用来控制事件循环，比如JS执行遇到计时器，AJAX异步请求等，就会将对应任务添加到事件触发线程中，在对应事件符合触发条件触发时，就把事件添加到待处理队列的队尾，等JS引擎处理

    Chrome为例，有四种进程模型，分别是
    ● Process-per-site-instance：默认模式。访问不同站点创建新的进程，在旧页面中打开的新页面，且新页面与旧页面属于同一站点的话会共用一个进程不会创建
    ● Process-per-site：同一站点使用同一进程
    ● Process-per-tab：每一个标签页都创建新的进程
    ● Single Process：单进程模式
    线程模型中的线程都是干嘛的呢？
    ● MessagePumpForIO：处理进程间通信的线程，在Chrome中，这类线程都叫做IO线程
    ● MessagePumpForUI：处理UI的线程用的
    ● MessagePumpDefault：一般的线程用到的
    ●
    典型进程通信方式有：
    ● 管道通信：就是操作系统在内核中开辟一段缓冲区，进程1可以将需要交互的数据拷贝到这个缓冲区里，进程2就可以读取了
    ● 消息队列通信：消息队列就是用户可以添加和读取消息的列表，消息队列里提供了一种从一个进程向另一个进程发送数据块的方法，不过和管道通信一样每个数据块有最大长度限制
    ● 共享内存通信：就是映射一段能被其他进程访问的内存，由一个进程创建，但多个进程都可以访问，共享进程最快的是IPC方式
    ● 信号量通信：比如信号量初始值是1，进程1来访问一块内存的时候，就把信号量设为0，然后进程2也来访问的时候看到信号量为0，就知道有其他进程在访问了，就不访问了
    ● socket：其他的都是同一台主机之间的进程通信，而在不同主机的进程通信就要用到socket的通信方式了，比如发起http请求，服务器返回数据
