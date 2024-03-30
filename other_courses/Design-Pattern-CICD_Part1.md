# 设计模式 - CI/CD（上）

项目实践+Nginx+Docker-+CI/CD+Git

> 本节简介：  
> 整体的流程，从工程化、Docker 环境、CICD、GIT 方向上面，实际上在工程上面

> 项目应用的一些想法

## 打包工具

### Webpack or Vite

#### Webpack

1. 模块打包工具：Webpack 是一个模块打包工具，主要用于将多个 JavaScript 文件打包成一个或多个 bundle。它可以处理不仅仅是 JavaScript，还包括 CSS，图片等资源。

2. 构建过程：Webpack 通过读取一个入口文件（如`index.js`),分析这个文件和它的依赖，并将所有这些文件打包成一个（或多个）bundle。这个过程包括加载器(loader)和插件(plugin)来处理非 JavaScript 资源。

3. 开发服务器：Webpack 提供了一个可选的开发服务器(Webpack Dev Server),支持热模块替换(HMR)。

4. 适用范围：由于其广泛的配置选项和插件系统，Webpack 适用于大型复杂的前端项目。

5. 构建时间：对于大型项相，Webpack 的构建时间可能会比较长，因为它需要处理和打包项目中的每个文件。

#### Vite

1. 下一代前端构建工具：Vite 是一个更现代的开发环境，旨在提供更快的开发体验。它不是一个模块打包工具，而是一个利用原生 ES 模块(ESM)的开发服务器。

2. 构建过程：在开发模式下，Vite 为每个请求单独转换模块，而不是打包所有模块。这意味着它只会处理当前页面所需的模块，从而大大加快了重载和启动时间。

3. 生产构建：对于生产环境，Vite 使用 Rollup 进行打包。Rollup 是另一个现代的 JavaScript 打包器，专注于生成更小、更快的代码。

4. 快速冷启动：Vite 的一个显著特点是其快速的冷启动时间，因为它无需预打包。

5. 更少的配置：Vite 旨在提供开箱即用的体验，通常需要更少的配置。

---

#### Teacher 分析：

**用 Vite，基本 10 倍以上的快：**

- 解决环境变量的问题，Vite 配置更少，集成好了，只需使用 react 内嵌的包一个：`plugins: [react(),]`，这样配置一下就好，比如：

```bash
export default defineConfig(...{
  plugins: [react(),]
})
```

输入的入口：

- 把整个根目录作为 dev-server 的启动和打包目录的；
- 所以如果需要多入口的话，那就需要多个 html（如果项目需要十几个多入口，需要十几个项目 html）；

多入口场景：

- 比如：移动端 hybird 开发。

使用 SPA 和 MPA 的好处：

1. 搜索优化，可以引流。

2.

打包工具这里：

- 以后在实践当中，有新项目尽量使用 Vite 去靠：如果项目不大，改造成本不高，一些配置顺手就改了，在一些项目当中尽量多练练，多实践！借着公司给你的钱和时间去提升自己的能力，这不是最好的事儿吗，还显得你积极、进步。跟老大讲：最近咱 Vite 做的很好，咱家项目都是 Webpack 又慢打包又 xx，我自己加班主动申请我给你改造，你觉得老板不支持你吗，在你做完你基本工作的前提下。

- next 是一个开发环境。

**Vite 现在，基本已经成为主流：**

开发 dev 的体验：

- 至少从性能上、从实用上，从项目级别上已经成为咱们打包工具的新的助手了。webpack 逐渐被。。尤其是热更新。
- 比如现在改造的项目，使用 webpack 改一个 button 颜色，至少等到 5~10s 的 compile；如果项目够大够乱，俗话 SHI 山代码，可能十几秒刷出来，但 Vite 基本无感的，都喜欢双屏，基本这里一改几乎无感的。
- 要看项目，比如电商项目、视频、抖音项目，这边更改保存那边就出来了；

打包的体验：

- Vite 最后的 building 状态利用的 rollup；所以 webpack 和 rollup 在打包效率上讲，在同样的量级上面，并不一定快；但是打包我们是能接受的，开发体验更加重要，不知道该对还是改错了，习惯了就要等待 5s；

- Vite 基本团队上新项目应用了，无论 Vue 还是 React；

- 接小 SIHUO 重要的不是看钱，看的是能不能让你成长，用工作提升你自己的能力，是最最最好的方法。自主学习无目标性的学习少部分自律的人能做到，大部分人都需要打一鞭子走一步，就用 Vite 写。出海节项目；国内： 淘宝、一品威客、猪八戒、码站、码市、程序员客栈。价值&劳动不匹配；比如整个电商系统，下单、购物车、物流跟踪、付费，比如微信小程序登录、下单、浏览、搜索、加购、订单支付、物流跟踪、客服退单，开发周期加入 3 个月，许多人，多少你还有得赚，还能挣到钱？1000w 确实要做到抖音、淘宝、拼多多那个商城级别了；因为涉及很多子系统的建设，都需要很多人力的；加入 3 个月，工作日 60 天，6000 个人日，1500 起步，能力更高 2000、2500 都有可能；工程师+外包一部分，大概 9000w。
- Copilot：  
  -表结构输入给它，帮你做好智能化，会把代码吐给你；很多接口（比如搜索分页）都是可以复用的，表结构给他，固定格式，一堆搜索框还能表头排序；后端管理系统已经非常成熟了，前端可能还需要 AntD+逻辑修改一下；想生成 Java/Node.js/Python 等都可以；所有接口增删改查 put update 等都可以生成给你；  
  -而且数据监测、异常、返回都给你处理好了，你只要按照一定的格式输入进去，马上给你吐出来（Copilot&GPT4.0），与 VSCode 无缝集成；  
  -比如 Java 同学很多不写 Unit Test，你就可以用它写：直接项目目录输入给它（某项目目录之下，请帮我生成所有的 Unit Test），它就会帮你写，有没有发现现在白盒测试工程师现在越来越少了（写代码来测代码），有了 AI 后不需要了，这个工作岗位其实可能已经被 AI 干掉了；后面可能 Java、Node、前端写页面级别的基本上被干掉了；
- ChatGPT4.0 & Copilot 为什么排队交钱？代码模型大；全世界唯一一家开源代码管理的鼻祖，代码积累量大；大模型跟数据量非常正相关；跟人脸识别一样的道理，数据量非常庞大，全球 80 亿人口所有脸都收集过来，建立一个库，人脸识别是不是非常的准；**所以特征向量的提取和特征值的提取，与你本身的样本的多寡非常有关系的；**

- Vite 工具用起来：  
  -不难，比 Webpack 简单多的多；  
  -先上手，别先挖祖坟，别什么事想知道原理，这个事要到后面了解：深入浅出，学东西先用起来、配起来、熟悉起来，你再慢慢挖原理；  
  -Webpack 也不会坐以待毙，Rollup 也在用 rust 重写；

- 框架就是 React&Vue：  
  -哪个好？就是两种模式；  
  -Teacher 使用了 Vue 以后，多态 Store 数据管理让 Teacher 更舒服：不管哪个组件（子组件、父组件、X 组件）都是用一个 store，公共变量一起监听一起用，都可以享受其带来的变化，所以它跟 Emits 一个道理；  
  -React 也可以，是以 Provider 的形式做 Context，你要把你所需要共有共享的数据包起来，把组件包进去；但是如果没有关系的组件，没有包起来的组件——远亲组件就会很麻烦；  
  -本质上看你喜欢哪一个；这些组件，只是在做业务层的时候非常有用；有时，Vue 在一些功能上并不比 React 跑的慢，不一定哪个就是高手；开发感受上 Vue 写的更少；

- 比如：  
  1.React 的 4ass 内嵌、标签化的绑定（CSS 的计算、classname 的计算，第三方的组件 classname 的计算）等较多难；Vue 的 class 和:class 可以共存等很舒适；  
  2.Vue 的 Scope 的 style、DOM、Script 嵌在一起，React 的 JSX、CSS、JS 分开，基本多数都是文件夹套文件夹；项目结构上，Vue 的文件夹结构更加简单；Vue 项目当中，Vite 也注入了很多公共组件，比如说约定好的 Components 等等；  
  从这个角度讲，看每个人的感受；

- **大厂不看框架，熟悉一个即可；而是看你的底层功底：**  
  -你对业务、对代码的设计、代码模式比较清晰，而不是会用几个框架、过几年换新的；  
  -历史原因阿里使用 React，招 React 你就不投了？  
  -你要观测它框架的使用方式/设计模式，为什么做成这样（虽然没做过但是要代入进去），都是要有思考的；

- **代码注释在哪些地方要写：**  
  1.如果你在某个地方做了妥协、变更、提升，你一定要写下来，为什么要这么做？  
  2.只要你的代码不 ugly，基本 debug 都能看懂，是为了给你自己看，强制在这个过程中思考，哪怕写一句业务需要（尽管这么实现很糟糕），这个证明你 代码在向业务妥协（而不是你很蠢）；  
  3.比如我看到一段代码，没有任何解释（我觉得这段代码很蠢），找到改的人，就问你为什么写这么一行蠢的代码，然后你告诉我，你也想不起来了；那不好意思，我觉得你专业度不够；

- 这就是为什么很多大厂，很多人进不去的原因：  
  -不在于你的基础能力不够(我也说过，3/5 年以上你在写代码的层级上跟大厂没区别(不管专科/本科/985/211 都一样)，只是这个氛围&环境对人的要求&提升不一样了)，所以说你做的少、没做过、不经常做，你就不喜欢做；  
  -所以我们要求你这么去做，经常做；刚开始也会指导你，你写的多了，每一行代码你也就知道为什么这么去写；  
  -当你写代码会先思考为什么这么写的时候，你就成长了；而不是拿到需求 PRD 看看红的、蓝的，赶紧的先把东西码出来；

- 所以急的项目永远不利于成长：  
  -你没有时间思考，这就是对你职业最大的一个风险；  
  -不管做什么，一定要思考，有了思考你就会发现你的成长很快；  
  -哪怕你想一个问题你为什么要做它（哪怕是写项目需要、功能需要，你要把它写下来，证明你调研过、思考过、努力过），否则别人也不知道你在这方面做出了思考&努力，成没成长；

- 所以你在换的时候，看看 webpack 和 vite 的区别：  
  -甚至是同一个项目，你用 Vite 打包和 Webpack 打包，都有 Analyse 的插件；  
  -你可以看看打包的大小、打包的时间、打包的速度，相应的组件包加起来帮你分析，把每次的 log 都打出来，对比一下；  
  -同样打包 14 个，对比一下这两个数据，你做成一个表格，这就是你真正学到东西了；

- 那时有人问你：Vite 为什么比 Webpack 好？  
  -你就能从数据上告诉他我实际上跑过；  
  -那时你在自己看看文章、听别人讲、再看看源码：哦~原来他们是使用了这个原因而快，快在这儿；  
  -你要知道为什么而不是别人凭空说什么就是什么（那就是三人为虎了）；

---

再看打包：Npm or pnpm。

### Npm or pnpm

#### npm

- npm(Node Package Manager)是 Node.js 的默认包管理器，广泛用于 JavaScript 社区。
- 在 npm 中，当你安装一个包时，该包的所有依赖（以及依赖的依赖）都会被安装到顷目的 node_modules
  目录下。如果多个包依赖同一个包，该依赖可能会被多次安装在不同位置，导致 node_modules 目录非常庞大。
- npm 会尝试将依赖提升到尽可能高的层级，以避免重复，但这并不总能避免依赖的多次安装。

#### pnpm

- pnpm(Performant npm)是一个替代 npm 的包管理器，注重性能和效率。
- pnpm 使用了一种不同的方式来存储依赖。它在一个单独的全局位置维护所有下载的包，并在项目的 node_modules 目录中创建对这些包的硬链接。这种方法可以显著减少磁盘空间的使用，并加快安装速度。
- pnpm 保持了包的依赖结构，同时避免了重复下载相同的包，从而在保持 npm 兼容性的同时提高了效率。

#### 依赖安装位置

- 在 npm 中，如果一个包 A 依赖另一个包 B,而 B 又依赖另一个包 C,npm 会尝试将 C 安装在离根目录最近的位置。如果项目本身没有直接依赖 C,则 C 会被安装在 A 的 node_modules 目录下。如果项目本身也依赖 C,则 c 可能会被安装在项目顶层的 node_modules 中。
- pnpm 通过硬链接和符号链接的方式创建一个扁平化的 node modules 结构，从而避免了依赖重复，同时保持了依赖树的正确结构。

#### 总结

pnpm 是对 npm 的一个优化，主要在于更高效的依赖管理和磁盘空间的使用。它尝试解决 npm 中冗余依赖和大量磁盘使用的问题。在大型项目或多项目工作环境中，pnpm 的这些优势尤为明显。然而，npm 由于其作为 Node.js 默认包管理器的地位，仍然在 JavaScript 社区中占据着主导地位。

#### Teacher 分析

npm 和 yarn 组织方式差不多，就是在效率上有一些区别（命令行区别不大，但是组织方式不一致）

- A 引用 C, B 引用 C，npm 会把 C 安装两次，pnpm 只会安装一次；

- 不利于打包优化；C 只要打一次就够了；

pnpm 优点就是依赖扁平化：

举例：

- pnpm 有`pnpm-lock.yaml`：pnpm 工具帮你做的依赖包，也是根据`package.json`的`dependencies`和`devDependencies`来帮你打包的；

- 装完包你就一目了然了，可能有依赖（当你发现包下有循环依赖第三方包时，包上不会出现`node_modules`而是`loos`了）；比如有两个包都依赖了第三个包，就会放到`.pnpm`下，以`@*+*+*`的形式告诉你还有第三方依赖，在这里完全打平；
- 所以它抽取公共组件特别快，只需根据`pnpm-lock.yaml`，至少在包依赖上会快很多；还会节省空间，不需解析抽取公共包了，在这一步就做完了；还有其他工具就不深入探讨了；
- 只是一个包加载工具：就是项目初始化`pnpm install`，还有引入第三方新包的时候`pnpm add 一个包`；剩下该用 yarn 跑命令就用 yarn 他们命令行上没有本质区别，就是结构上按照自己的做的；

另外，我希望你们多用 pnpm 代替 npm；

考题：至于请你分析一下，几个打包工具用过几种？

- 背诵一下上面题即可。

## 工程工具

CI/CD 具体内容看下面

**总结：没有最好的项目，持续优化才是王道。目前最佳实践 pnpm+vite 打包，建议使用 vue3（或者 svelte），利用 gitlab 的 CI/CD，主要是跟项目结合的比较好。Nginx 反向代理，如果有能力还是建议 nodejs 做渲染(ssr)和网关。业务层需要按照业务分好仓库，尽量不要把所有代码塞到一个项目。组件库的建设方案很多，<span style="color:red;">个人还是建议，直接使用 gitlab,方便又跟 CI/CD 无缝衔接。组件需要按需引入，打包速度和体积提升很大。</span>关于 CSS 多尺寸适配的问题，端尽量分开，利用 dns 重定向机制，pc 和移动，分开 2 个域名，独立代码建设。移动端使用 vw/vh 的解决方案，pc 端固定好骨架，尺寸依然使用 px。**

github 要花钱，我们的代码基本在 gitlab 上，公司自己都会自己买机器，搭建一个；
只需要在 gitlab 上做 CI/CD 就可以了

不需要建立账号了
gitlab 在代码上了，执行也在上面，

### Nginx 配置解读，最实用

1.`http`块

这是 Nginx 配置文件中最常见的块，用于定义所有与 HTTP 服务器相关的配置。

```bash
http {
  # ...
}
```

2. `server` 块

`server` 块定义了一个虚拟服务器。一个 `http` 块可以包含多个 `server` 块。

```bash
  server {
  listen 80; # 监听端口
  server_name example.com; # 服务器名称
  # ...
}
```

3. `location` 块

location 块用于定义处理特定请求类型的规则。例如，它可以根据 URI 的不同部分来处理不同的请求。

```bash
nginxCopy code
location / {
  root /data/www; # 定义服务器上的文件路径
  index index.html index.htm; # 默认提供的文件
}
```

4. `listen`

指定 Nginx 监听的端口（和可选的 IP 地址）。

```bash
listen 80; # 监听80端口
```

5. `server_name`

定义服务器的名称，用于基于名称的虚拟主机。

```bash
server_name example.com www.example.com;
```

6. `root`

设置服务器请求的根路径。

```bash
root /var/www/html;
```

7. `index`

定义请求目录时默认返回的文件。

```bash
index index.html index.htm;
```

8. `access_log` 和 `error_log`

定义访问日志和错误日志的位置。

```bash
access_log /var/log/nginx/access.log;
error_log /var/log/nginx/error.log;
```

9. **`proxy_pass`**

用于设置反向代理。

```bash
location /some/path/ {
    proxy_pass http://localhost:3000;
}
```

10. **`ssl_certificate` 和 `ssl_certificate_key`**

当使用 HTTPS 时，这些指令指定 SSL 证书和密钥的位置。

```bash
ssl_certificate /etc/ssl/certs/nginx.crt;
ssl_certificate_key /etc/ssl/private/nginx.key;
```

这些配置项是 Nginx 配置的基础，理解这些可以帮助你开始配置和优化你的 Nginx 服务器。Nginx 的配置非常灵活，可以根据需要进行详细的定制。记得在修改配置后，需要重启 Nginx 服务来使改动生效。

### Nginx 配置案例

#### http 基础配置

```bash
server {
  listen 80;
  server_name izelas.run git.izelas.run;
  return 301 https://$server_name$request_uri;
}
```

#### https 基础配置

```bash
server {
  listen 443 ssl;
  server_name izelas.run; # 你的域名

  ssl_certificate /root/ssl/izelas.run.pem; # 你的 SSL 证书
  ssl_certificate_key /root/ssl/izelas.run.key; # 你的 SSL 私钥

  location / {
    root /root/izelas; #静态文件的目录
    index index.html index.htm; # 默认页面
    try_files $uri $uri/ =404; # 尝试提供请求的文件，如果不存在则返回404
  }

  # 反向代理，解决跨域问题（单独代理请求到服务器）
  location /prod-api/ {
    proxy_pass https://api.admin.com/;
    # $host 变量, Host变量名
    proxy_set_header Host $host; #域名转发
    proxy_set_header X-Peal-IP $remote_addr; #IP转发
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Cookie  $http_cookie; #cookie配置
  }
}

```

#### 老师的配置举例：

- ubuntu 的操作系统。

> etc/nginx/conf.d/git.izelas.run.conf

```shell
# ...
```

> etc/nginx/conf.d/izelas.run.conf

```shell
server {
  listen 443 ssl;
  server_name izelas.run; # 你的域名

  ssl_certificate /root/ssl/izelas.run.pem; # 你的 SSL 证书
  ssl_certificate_key /root/ssl/izelas.run.key; # 你的 SSL 私钥

  location / {
    root /root/izelas; # 静态文件的目录
    index index.html index.htm; # 默认页面
    try_files $uri $uri/ =404; # 尝试提供请求的文件，如果不存在则返回 404
  }
}
```

[负载均衡]()

### 阿里云实战

【1】购买一个：阿里云的 ECS（Elastic Compute Service），是一种简单高效、安全可靠的云端计算服务。它提供了弹性的计算能力，支持自定义配置 CPU、内存、网络、磁盘等资源。这里我们将 ECS 作为我们的服务器环境。

购买的域名：阿里云的云解析 DNS，是一种域名解析服务。它可以将域名解析为 IP 地址，使域名可以被访问。这里我们将云解析 DNS 作为我们的域名解析服务。

购买的 SSL 证书：阿里云的 SSL 证书服务，是一种数字证书服务。它可以为网站提供 HTTPS 加密传输，并提供 HTTPS 安全访问。这里我们将 SSL 证书服务作为我们的证书申请服务。

购买的防火墙：阿里云的安全组，是一种网络安全防护服务。它可以为云服务器提供网络访问控制，保障云服务器的安全。这里我们将安全组作为我们的网络安全服务。

### 阿里云实战操作步骤

阿里云控制台：https://home.console.aliyun.com/

购买的云服务器 ECS：阿里云服务器

- 选一个操作系统：ubuntu，fidolr

云服务器 ECS -> 实例与镜像 -> 实例：看购买的云服务器。

云服务器 ECS -> 网络与安全 -> 安全组：点击管理规则（你的防火墙能透出哪几个端口）：

- `目的：443/443`（HTTPS，从右到左：机器上的 443 映射到外网的 443）
- `目的：80/80`（HTTP，从右到左：机器上的 80 映射到外网的 80）
- `目的：22/22`（SSH 登录方式，从右到左：机器上的 22 映射到外网的 22）

【2】购买一个域名

【3】云解析 DNS -> 域名解析

【4】购买的 SSL 证书：证书申请

### Docker 实战

```shell
# 阶段1：构建
# 使用Node.js 21.0.0 镜像
FROM node:21.0.0 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 到工作目录
COPY ./package.json ./pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm


# 安装项目依赖
RUN pnpm install

# 复制项目文件到工作目录
COPY /root/test/ .

# 构建应用
RUN pnpm run build

# 阶段2：运行
# 使用更小的 nginx 镜像来提供静态文件服务
FROM nginx:alpine

# 从构建阶段复制构建的文件到 nginx 目录
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 运行 nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### 使用方法

1. 将上述 Dockerfile 保存在您的项目根目录中。
2. 在包含 Dockerfile 的目录中运行以下命令来构建 Docker 镜像：

```shell
docker build -t your-name /www/home/
```

1. 运行容器：

```shell
docker run -d -p 12345:80 vite-app
```

这将在端口 12345 上启动一个 nginx 服务器，提供您的 Vite 应用。您可以通过访问 http:/localhost:8080
来查看您的应用。

```nginx
Nginx
Ssl
server_name:git.izelas.com
proxy localhost:12345
```

### Git 命令解读

#### 基本配置

- 配置用户名和邮箱（首次使用 Git 时必须配置）：

```bash
git config-global user.name"你的名字"
git config--global user.email"你的邮箱"
```

#### 仓库操作

- 克隆现有仓库：

```bash
git clone <仓库地址>
```

#### 初始化新仓库：

```bash
git init
```

#### 文件操作

- 添加文件到暂存区：

```bash
git add.

git add -u
```

- 提交暂存区的文件到仓库：

```bash
git commit-m"提交信息"
```

- 查看状态：

```bash
git status
```

- 查看提交历史：

```bash
git log
```

#### 分支操作

- 创建分支：

```bash
git branch <分支名>
```

- 切换分支：

```bash
git checkout <分支名>
```

- 创建并切换到新分支：

```bash
git checkout -b <分支名>
```

- 合并分支：

```bash
git merge <分支名>
```

- 删除分支：

```bash
git branch -d <分支名>
```

#### 远程仓库操作

- 查看远程仓库：

```bash
git remote -v
```

- 添加远程仓库：

```bash
git remote add <远程仓库名> <远程仓库地址>
```

- 拉取远程仓库的数据：

```bash
git pull <远程仓库名> <分支名>
```

- 推送到远程仓库：

```bash
git push <远程仓库名> <分支名>
```

#### 其他常用操作

- 查看更改：

```bash
git diff
```

- 撒销更改（撤销工作目录中的更改）：

```bash
git checkout -- <文件名>
```

- 重置暂存区（但保留工作目录不变）：

```bash
git reset HEAD <文件名>
```

- 撒销提交（创建一个新的提交来撤销之前的提交）：

```bash
git revert <提交ID>
```

- 更改最后一次提交：

```bash
git commit --amend
```

#### 总结：

```sql
// git 创建账号
// 设置ssh-key
git clone branch-name

git checkout -b my-branch
git push

git push --set-upstream origin my-branch

// or
git push -u origin my-branch

git add .
git add -u // 删除东西了，就用这个暂存
git commit -m ''
git push

git checkout master
git pull origin master I

git checkout my-branch
git merge master

git checkout master
git merge my-branch
git push

# 注意：要在自己分支上解决master和自己分支的冲突，然后再合并到master。（所以先拉去master最新内容，合并到自己分支上解决冲突，最后把解决好冲突的自己的无冲突的dev合并到master里。我平时工作是这么做的。）

// 回滚
git log
git reset --hard <commit-hash>
git push origin <branch-name> --force
git push origin <branch-name> --force-with-lease

// 放弃本地更改
git checkout -f

// 切回上一个分支
git checkout -
```

### CI/CD 实战

GitLab CI/CD(持续集成和持续部署)是一个强大的自动化工具，它集成在 GitLab 中，用于自动化软件开发的各个阶段，包括测试、构建和部署。以下是 GitLab CI/CD 的基本概念和组件，以及如何设置和使用它的简要概述：

#### 基本概念

1. 持续集成(CI)：自动化地将代码更改从多个贡献者集成到单个软件项目中。通常涉及自动化测试，以确保这些更不会破坏应用程序。

2. 持续部署(CD)：自动化的软件发布过程，允许开发团队快速、安全地部器代码到生产环境。

#### GitLab CI/CD 关键组件

1. `.gitlab-ci.yml`：这是 GitLab CI/CD 的配首文件，位于项目的根目录。它定义了 CI/CD 流程中的作业、脚本和阶段。

2. Runner：GitLab Runner 是一个开源项目，用于运行你的作业并将结果发送回 GitLab。Runner 可以是特定于项目的，也可以是全局的或共享的。

3. Pipeline：Pipeline 是你定义在`.gitlab-ci.yml`文件中的一系列作业，这些作业可以被分组为不同的阶段，如`build`、`test`和`deploy`。

4. Job：Job 是 pipeline 中的单个任务，例如运行测试或部署代码。
5. Artifact：Artifact 是作业执行过程中创建的文件，可以在作业之间传递或存档供以后使用。

#### 设置 GitLab CI/CD

1. 创建 `.gitlab-ci.yml`文件：在你的 GitLab 仓库中创建 `.gitlab-ci.yml`文件，并定义你的 pipeline。例如：

```yml
yamlCopy code
stages:- test- deploytest:stage: testscript:- echo "Running tests"- ./run-tests.shdeploy
```

1. 配置 GitLab Runner：你需要安装并注册 GitLab Runner,这是实际执行 CI/CD 作业的服务器。你可以在自己的服
   务器上安装 Runner,或者使用 GitLab 提供的共享 Runner。.
2. 运行 Pipeline:当你推送代码更改到仓库时，GitLab 会自动触发 CI/CD pipeline。你也可以手动触发 pipeline。
3. 查看 Pipeline 结果：在 GitLab Ul 中，你可以查看每个 pipeline 的状态、作业日志和 artifact。
