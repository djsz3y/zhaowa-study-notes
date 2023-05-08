一星期入门 React 基础

提醒：每一小节的参考链接基本是 [React 官方文档](https://react.dev/)

# 目标

- react.js 简介
- jsx 模版语法及 babel 编译配置
- 事件/条件渲染/列表渲染等基础用法
- react.js 组件化及生命周期
- refs 及 React API 详解
- create-react-app cli 的使用
- "函数组件和 class 组件/受控组件和非受控组件"
- 异步过程使用单例的 event 对象
- 性能优化方式（⭐）
- 介绍 immutable 库 immutable-js 和 immer

# 1.react.js 简介

快速开始一节：80%常用概念。

# 2.JSX 模版语法及 babel 编译配置

## 2.1.JSX 语法【to do】

### 2.1.1.JSX 标记语法【done】

JSX 标记语法，可选，大多数 React 应用为了方便都使用

React JSX 组件必须返回唯一一个 JSX 标签：`return (<div></div>)`或`return (<></>)`

HTML 移植 JSX 在线转换工具：[HTML to JSX online converter](https://transform.tools/html-to-jsx)

```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  )
}
```

参考链接：[Writing markup with JSX](https://react.dev/learn#writing-markup-with-jsx)

### 2.1.2.变量、表达式【done】

[1] JSX 中，JS 里放标签，内部用**花括号**`{}`嵌入变量以展示：

[2] 两种**传递属性值**的方式：

- [2.1]传字符串：双引号内嵌字符串；e.g.`className="avatar"`
- [2.2]传变量值：花括号内嵌变量；e.g.`src={user.imageUrl}`

```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90
}

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1> //1.
      <img
        className="avatar" //2.1.
        src={user.imageUrl} //2.2.
        alt={'Photo of ' + user.name} //3.
        style={{
          width: user.imageSize,
          height: user.imageSize
        }} //4.
      />
    </>
  )
}
```

[3] 花括号里，放字符串拼接：`alt={'Photo of ' + user.name}`

[字符串拼接 string concatenation](https://javascript.info/operators#string-concatenation-with-binary)

[4] 双花括号：=> 单花括号，放对象（JSX 花括号内常规{}对象）`style={{ width: user.imageSize, height: user.imageSize }}`

参考链接：[Displaying data](https://react.dev/learn#displaying-data)

### 2.1.3.class style【done】

CSS class 用 `className`：

```html
<img className="avatar" /> //className
```

style 文件：

```css
/* In your CSS */
.avatar {
  border-radius: 50%;
}
```

React 不规定如何添加 css 文件：

- HTML 添加 link 标签方式
- 构建工具和框架查其文档

参考链接：[Adding styles](https://react.dev/learn#adding-styles)

### 2.1.4.子元素和组件

```jsx

```

## 2.2.babel 编译配置

# 3.事件/条件渲染/列表渲染等基础用法【to do】

## 3.1.事件【done】

声明事件用 onClick={}；e.g.`onClick={handleClick}`：

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!')
  }

  return <button onClick={handleClick}>Click me</button> //onClick={}
}
```

参考链接：[Responding to events](https://react.dev/learn#responding-to-events)

## 3.2.条件渲染【done】

[1] if 语句有条件的包含 JSX：

```jsx
let content
if (isLoggedIn) {
  content = <AdminPanel />
} else {
  content = <LoginForm />
}
return <div>{content}</div>
```

[2] 三元表达式`a?b:c`，更紧凑的方式：

```jsx
function LoggedInPanelOrForm() {
  return <div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
}
```

[3] 不用 else`isLoggedIn && <AdminPanel />`，更短的逻辑语法：

```jsx
<div>{isLoggedIn && <AdminPanel />}</div>
```

[4] 有条件的指定属性

参考链接：[Conditional rendering](https://react.dev/learn#conditional-rendering)

## 3.3.列表渲染【done】

[1] 渲染组件列表：使用 for 循环 、 map 方法。  
for loop and the array map() function to render lists of components.

[2] li 有 key 属性，唯一标识（字符串/数字，数据库 ID），区分兄弟项。  
通过 key 得知你插入、删除、排序每一项。

```jsx
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 }
] // 产品数组

export default function ShoppingList() {
  const listItems = products.map(
    //-------------------------------------------------[1]
    (product) => (
      <li
        key={product.id} //----------------------------[2]
        style={{
          color: product.isFruit ? 'magenta' : 'darkgreen'
        }}
      >
        {product.title}
      </li>
    )
  ) // 产品数组 map 循环，返回 li

  return (
    <ul>{listItems}</ul> // 放在 ul 里返回成组件
  )
} // 一个 ShoppingList 组件
```

参考链接：[Rendering lists](https://react.dev/learn#rendering-lists)

## 3.4.组件和 props 类型检查

### 3.4.1.组件

[1] 创建组件：声明 MyButton 组件名必须大写，html 标签小写

```jsx
function MyButton() {
  return <button>I'm a button</button>
}
```

[2] 嵌套组件：MyButton 组件嵌套在 MyApp 组件中

```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  )
}
```

参考链接：[Creating and nesting components ](https://react.dev/learn#components)

### 3.4.2.props 类型检查

## 3.5.state 和 setState

```jsx

```

# 4.react.js 组件化及生命周期【to do】

## 组件化

```jsx

```

## 生命周期

```jsx

```

# 5.refs 及 React API 详解

## refs

## React API

# 6.create-react-app cli 的使用

[Create React App 官网](https://create-react-app.dev/)

## 6.1.简介【done】

[1] 一行命令设置现代 Web 应用程序

[2] 没有版本不匹配 Only One Dependency

[3] 设置直接编辑配置文件

[4] 几秒开始 Get started in seconds

- 创建 my-app 的项目

```bash
npx create-react-app my-app
```

[5] 易于维护 Easy to Maintain

- 一行命令升级 Create React App 新版本发布

```bash
npm install react-scripts@latest
```

参考链接：[Create React App 首页](https://create-react-app.dev/)

## 6.2.使用

```bash

```

参考链接：[Creating an App](https://create-react-app.dev/docs/getting-started#creating-an-app)

# 7."函数组件和 class 组件/受控组件和非受控组件"

# 8.异步过程使用单例的 event 对象

# 9.性能优化方式（⭐）

# 10.介绍 immutable 库 immutable-js 和 immer
