# HTML 面试题

## HTML DOCTYPE 的含义？什么是 HTML 的标准模式与混杂模式？

> 概率不大，H5 之前问的多；  
> 背过：
>
> - [3. DOCTYPE(⽂档类型) 的作⽤](https://juejin.cn/post/6905294475539513352#heading-3)

HTML 的文档类型声明，doctype ，一般 HTML 第一行代码，web 浏览器的一行指令，说明这个页面是用什么来编写的。

现在一般写 html，不写 xml，xhtml 等一些以前比较老的标准，而且都是写 html5，新建一个 index.html，打个感叹号`!`，默认会给你一个页面：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

当然也有一些其他的写法，比如：

```html
<!DOCTYPE html public "...">
```

声明一些 w3c 等，当然这是 4.0.1 的标准。

h5 html5 有一个比较宽松的语法，基本上完全向后兼容。

```html
<!DOCTYPE html>
```

html4.0.1，就会分严格模式、过渡模式等，比如说：strict、transitional 等；

那么它们两个的区别是什么？strict VS transitional ?

- strict 结构中不能有出现格式或表现的内容
  - 比如 `<b></b>`标签，相当于有明确的格式，代表加粗，是不能用的；
  - 或者 `<p font='5'></p>`
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

### 【1】语义化的好处：

> 从真正的业务、研发的角度来说，并没有真正的好处，  
> 但是其中最重要的就是说：

让我们根据结构化的内容，选择合适的标签。

> 那这样有什么**好处？**

1. seo 有利；
2. 代码的可读性，更好；
3. 标签上加上 alt, title，其中 hover 的效果：如果图片有一些问题，可以解释这个图片，都有一些描述的信息；
4. 更好的 Accessibility（Web Accessibility，A11y，无障碍访问） 更好的方便一些其他的设备进行解析。（尤其那些盲人用的，给图片上加一些标签，给 tab index 加一些标记，tab 页怎么往前推的？）

> 提高我们无障碍访问的 web 技术叫做 Accessible Rich Internet Applications (ARIA)  
> 参考链接：
>
> - [被大多数开发人员忽略的 Web Accessibility 是什么？](https://www.jianshu.com/p/4f6a23d4f288)

### 【2】那么 **HTML 标签**有哪些呢，包括这些**语义化的标签**？

#### Head 头文件类 & Sections 表示块、区域 & Grouping 表示分组 & Tables 表格类

> [1]Head 类，这一部分，比较重要的是 meta；
>
> - 因为 meta 相对来说，里面有各种各样的东西，可以做一些 html 优化，
> - 通过 `http-equiv` 编译的指令，可以写白名单策略，一些属性 `Content-Type`，`Refresh` 的一些情况、作者、描述等方便 html 去解析、方便机器人去索引

> **基础课里，对 html 标签都做了仔细地分析。**

> [2]Sections：表示块、区域的，比如：body、article、nav 等；不用它们，用 div 也是一样的，比如 使用 section 表示一个块。

> [3]Grouping 分组：比较常用的 ol li

> [4]Tables 表格：现在相对用的少一些，因为表格其实会造成比较严重的回流和重写，尤其是回流，它布局的特点，会让中间的计算内容比较大，比如大家在做一些比较极致的 html 的时候， 我们可以少用表格，可以用 grid 布局；

| Head     | Sections | Grouping   | Tables   |
| -------- | -------- | ---------- | -------- |
| doctype  | body     | p          | table    |
| html     | article  | hr         | caption  |
| head     | nav      | pre        | thead    |
| title    | aside    | blockquote | tbody    |
| base     | section  | ol, ul     | tfoot    |
| link     | header   | li         | tr       |
| **meta** | footer   | dl, dt, dd | th       |
| style    | h1 - h6  | figure     | td       |
| script   | main     | figcaption | col      |
| noscript | address  | div        | colgroup |

##### Chat 拓展【todo】

> 在 HTML 中，编译指令通常是指使用 `<meta>` 标签中的 `http-equiv` 属性来配置一些与 HTTP 响应头类似的指令。这些指令可以用来控制缓存、内容类型、重定向等行为。以下是一些常见的 http-equiv 编译指令：

【1】常见的 `http-equiv` 编译指令：

1. Content-Type：

2. Refresh：

3. X-UA-Compatible：

4. Cache-Control

5. Pragma：

6. Expires

【2】例子解释：

#### Forms 表单 & Interactive 互动 & Edits 编辑

> [1]当然不止这些，比如这里我们常用的表单，可能会考你 input：  
> 【面试题】：input type 有多少种类型？你知道哪些，简单说一说。  
> 23 种（联想：设计模式也有 23 种），平时知道的有：text，radio、password

> [2]那这些类型分别都有什么用呢？
>
> - 我们经常写 antv，element 的时候，用 radio、checkbox 其实它们的本质上都是 input 的 type，如果不知道还是要了解一下。

> [3]比如，还有一些交互的、还有一些编辑的。有的也不是很常用。

| Forms          | Interactive | Edits |
| -------------- | ----------- | ----- |
| form           | details     | del   |
| fieldset       | summary     | ins   |
| legend         | command     |       |
| label          | menu        |       |
| input          |             |       |
| button         |             |       |
| select         |             |       |
| textarea       |             |       |
| option         |             |       |
| progress...... |             |       |

#### 嵌入型标签 & 文本级别标签

> 嵌入型，比较常用；  
> 比如 图片 img，怎么加载的？可能图片这个标签加载了但是嵌入的内容没有加载，  
> 所以分为两种：它是否会阻塞 dom，比如 img 不会的，比如 img content loading 这个阶段，img 可能还没有加载完，比如 video，它可能是个 shadow dom；

> 这几个分类，相对来说已经比较完善了。

| Embedded 嵌入型        | Text-level                          |
| ---------------------- | ----------------------------------- |
| img                    | a                                   |
| iframe                 | em                                  |
| embed                  | strong                              |
| object                 | i, b                                |
| param                  | u, s, small                         |
| video                  | abbr                                |
| audio                  | q                                   |
| source                 | cite                                |
| canvas                 | dfn                                 |
| area, map, track...... | sub, sup, code, br, var, span...... |

## 如何检测浏览器是否支持 HTML5 特性？

### 分析题目，了解考点

> 一定要搞清楚，面试官想要问什么，面试官是想问 是否有什么办法检测 H5 吗？  
> 肯定不是，他肯定更想了解、更想考察你是否对 **HTML5 新特性**有一定的总结。
>
> - [6. HTML5 有哪些更新](https://juejin.cn/post/6905294475539513352#heading-6)

比如说：

- 比如说 canvas
- 比如说 用于媒体播放的 video, audio
- 比如说 对于本地缓存的支持 localStorage, Web Worker
- 比如说 新的语义化标签，比如 article, footer, header
- 比如说 新的表单控件，比如 form: calender, date
- 比如说 esm（es module），或者说 es module 不一定准确，但是 script 是不再需要 type 属性了。

> 我们想一想，在这个过程中，我们怎么说呢？并不是每一种都去检测，比如是否有这个标签怎么检测，当然 create 也可以 create 出来，  
> 但是我们可以先描述一下，如果面试官问到你的时候：

### 【答】：

【1】针对这个问题，我想一下，emmm，H5 新特性大概有哪些。。。

【2】在这里边，比较方便使用的有 [1] [2] [3]，如下：

[1]检查特定的属性和方法

> 都可以 检测浏览器是否支持 H5

```js
!!navigator.geolocation // 判断地理位置是否有
!!window.localStorage
!!window.Worker
```

[2]创建一个元素，看看特定元素，有没有属性和方法

> 创建一个 `canvas`，也可能是个字符串；所以使用 `.getContext()` 方法，判断是否是 H5 里的 `canvas`。

> 看 video 里是否有这个属性 `canPlayType`；  
> 参考链接：[MDN - HTMLMediaElement: canPlayType() method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canPlayType)

```js
document.createElement('canvas').getContext()
document.createElement('video').canPlayType
```

[3]第三方库（开源的库）

- http://modernizr.cn/

## jump HTML 中 meta 的作用？

- 基础课

## HTML 的标签有哪些可以优化 SEO？

[1]meta 中的相关属性

> keywords 关键词也是方便索引

```html
<meta name="author" content="aaa@gmail.com" />
<meta name="description" content="XXX XRM XXX 系统" />
<meta name="keywords" content="XXX XRM XXX 系统" />
```

[2]标签

1.  title
2.  meta
3.  header
4.  nav
5.  article
6.  aside
7.  footer

### Answer:

> 回答时，肯定不能把所有的语义化标签都说一遍，而是像以下这样回答更好：

1. 首先要保证是 SSR 的（然后你才存在 SEO 的可能性，不然浏览器都抓取不到你页面里写了啥）；
2. meta 中相关的属性；
3. 语义化标签，以一些结构化的为主。比如你写一些非结构化的它也能，但是起到的作用很小，因为很多时候要考虑**费效比**。比如你写一些非结构化的东西，它能起到的作用很小，那你要花大量的时间把它改成结构化的，

比如你真的想做很 NB 的 SEO 怎么办？百度买排名，自己做，其实费效比很高，比如请一个工程师做 SEO，一个月多给几 W，还不如把前投入广告，费效比会很低/高(√)，

回答时，就会加入你的思考，如果做的非常的厉害，非常的语义化，非常的结构化，多花几天时间做，那还不如拿这些工资去买一些 Baidu 排名。效果会更好。

无障碍。

## DOM 和 BOM 有什么区别？

JavaScript 在浏览器环境下，一般由三部分组成。

- ① ECMAScript 核心。描述了 JS 的语法和基本对象；
- ② DOM 文档对象模型， document. 你有一些 API，可以操作 文档。  
  控制台里，整个的 `document` 显示 `#document`，整个文档，就是 dom。
- ③ BOM 浏览器对象模型，browser. 你有一些 API，可以操作 浏览器。  
  比如操作：屏幕 `screen` 前进后退 `history`，`navigation`，`location`，`url` 等

进一步解释 ECMAScript 核心：

[1]比如，在 html 里写一些 js 代码，写一个冒泡排序：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      function sortArray() {
        // ...
      }
      sortArray(arr)
    </script>
  </body>
</html>
```

[2]这个和浏览器的 BOM DOM 没有任何关系，它依赖的是，我本身浏览器，比如 Chrome 的 V8、Safari JSCore，Spired monkey ，我依赖的是它这个 runtime 这个核心，能够对我的语法做一个解析，这个是 ECMAScript 的核心。

[3]就比如说浏览器，既不写`document.createApp` 也不写 `location.href=xxx`，它依然能运行 js 语法，靠的就是这一部分的东西。

## 如何实现移动端适配？

响应式布局是很小的一部分。

要了解移动端适配，首先要了解什么是像素、屏幕分辨率、图像分辨率、PPI、DPI、屏幕像素比？

举个例子：

比如一个屏幕，打开控制台，拖拽边框，宽度显示 1508 等，但是苹果的像素不可能只有 1501 的像素，这是为什么？
所以这里涉及到一个比较重要的概念，叫做 设备像素比。其实，关于移动端的一些方案，很多都是由 设备像素比 产生的。

```js
window.devicePixelRatio // 2
```

看显示器：内建视网膜显示器（14 英寸 3024 \* 1964），但是为什么在这里只能看到 1506 呢？

因为最早的时候，一个像素指的是 你可以显示的一个文字或者说一个什么的最小单元，那么怎么定义这个最小单元？比如一张图片，当放大到很大时，里面的字，有一个最小的区域，这个区域只能是一种颜色，放的小，只能看到一个字母 O，放的很大，就能看到这么一个区域，这个格子就是一个像素。

正常的一个设备，比如浏览器、PC，我们一个像素，一般以前的工艺，只能做到 72 个像素一英寸，但是苹果就很厉害，一开始是夏普，它能做到视网膜显示，一个像素这个物理大小的空间里，我能放下 144 个像素。

那么，如果一个 12 号的字体或者说一个 72 号的字体，所有的大小，小 50%，

不能做一个网页，专门适配苹果浏览器。

每一个移动端都有一个设备像素比

### 响应式布局

> 可能会问高端一些的东西，如果是响应式布局，直接说就完了。
>
> - 参考链接：[面试官：什么是响应式设计？响应式设计的基本原理是什么？如何做？](https://github.com/febobo/web-interview/issues/108)

### 1px 问题

#### 1px 是什么？

> 存在一个框，画时是 1px，当把边框等比例缩小一倍时，边框成了 0.5 px，  
> 放到 css 里，本身 css 没有 0.5 px，所以这里又渲染成了 1px，  
> 就会显得边框很粗，跟我们最初的设计稿不一致，  
> 大概会有这样一个问题，即 1px 的问题。

#### 那么 1px 的问题，该怎么解决呢？

一般怎么做？

- 先放大成 200%，然后 `scale(0.5)`

### rem 方案

在根目录下字体的大小。

各种各样的方案去适配移动端的布局，

rem 指的是 html 的 font-size 的大小。

就是把它的宽度，或者说一个图片，或者一个区域，先放大成 200% 的大小，再用 `scale(0.5)`给它缩小回来，你的边框 1px 看上去就比较正常了，相对来说。

具体做的时候，可以通过媒体查询，给不同的像素设备设置像素比，定制不同的 border-image
或者给不同的像素比，去设置它的 background-image，这只是大概讲一下方案

具体情况要具体分析，因为不同的像素比，要做的 scale 是不一样的，

像媒体查询器里

画一个 0.5 的线。

包括图片产生模糊，用一些两倍图，去处理这些东西。

或者用 js 去拼接一些 url 去处理一些图片，或者用 svg。

## 如何禁用页面中的右键、打印、另存为、复制等功能？

```js
// 右键
document.onmousedown = function (event) {
  if(event.button === 2) {
    return false
  }
}

document.oncontextmenu = function(event) {
  return false
}

// 打印

// 另存为

// 复制
<body oncopy="nocopy()"></body>
function nocopy(event) {
  event.returnValue = false
}

// F12
document.onkeydown = function(e) {
  if(window.event && window.event.keyCode === 123 ) {
    window.event.returnValue = false
  }
}
```

其实禁用某个东西，就是用户在执行这个事件的时候，你捕获到了，然后用一些方法，让这个事件不再往下传播，让这个事件不要再执行，不要再执行它应有的操作。

这个放到 5 年前，可能会考，比如工作 3~5 年，面试 1h，不会问你太原生的东西，可能会问你一些比较高级的东西，

所以 html 的题，大家有一些比较基本的理解，就可以了。

## href="javascript:void(0)" 和 href="#" 的区别是什么？

href="#" 锚点，默认 #top，会让你的网页网上走。

href="javascript:void(0)" 阻止事件，什么都不干，死链接。

## 对 target="\_blank"的理解？有什么安全性问题？如何防范？

target="\_blank"，类似于 window.open，你的子页面，会拿到你当前的句柄（句柄就是当前 window 对象）。

window.opener

> target="\_blank" 会新开一个页面，在新开的窗口里打印 window.opener 可以拿到上个窗口的一些东西。

```js
if (window.opener) {
  window.opener.location.href = 'bad.html'
}
```

```html
<a href="x.html" target="_blank" rel="noopener noreferer">跳转</a>
```

```js
var otherWindow = window.open('xxx')
otherWindow.opener = null
```

## 简述页面的存储区别？什么是本地存储？怎么做离线存储？

1. cookie

2. web storage  
   localStorage  
   sessionStorage  
   5MB

3. indexDB [webSQL]

web sql 相当于浏览器端的一个数据库

4. application cache
   pwa

service worker

# 1:27:39

# 参考链接

参考背题：

- [前端开发面试题](https://www.runoob.com/w3cnote/front-end-developer-questions-and-answers.html)
