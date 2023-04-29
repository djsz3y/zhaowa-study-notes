vue
下载模板

vue-cli_2.x.x
看源码，首先看结构：大致知道什么布局。

docs 文档

lib 类库：支援主程序运行的类库。

test 测试

bin 主流程：
vue vue-build vue-create vue-init vue-list

vue 里：哪些功能，哪些 api 能够提供给用户。
提供了哪些 api： init list build create
vue --help 就可以知道哪些 api。
写命令行工具给到的手册式的指引。

用 commander 生成 ali 手册性的指引。

vue list 会如何？
vue create：提示 vue3 版本里使用的。
列出本地当前版本所有模板。
提出了哪些工具：

1. logger：本地化实现（lib 类库中的 logger：chalk 高亮提示，重点提示，）所有 logger 打印，通过 chalk 打印。
   chalk 成功 的用 chalk.white 白色打印。
   封装带有提示色彩的命令行。
2. request 网络请求工具，去 github 地址拉去官方所提供的模板：加载了官方提供的模板。（加 proxy）
   加载官方模板=》罗列模板名称描述。

vuebuild 没有这个功能直接弹出 help

vue-init：
download 下载远程仓库
命令行处理工具 program
fs 读取本地文件。
node 下的文件操作系统中 existsSync - 监测路径是否存在
path node 自带模板，拼接路径。
ora 敲完命令，思考，命令行加载效果工具。
home rolup gulp 快速获取用户根目录
/ 当前主文件根目录，~ ./ 0
tildify 绝对路径替换成带波浪号
高亮打印 chalk
inquirer 用户交互：闻讯：
运行时编译还是。。。| 面试比较多提及（特别是工程化经验的时候。）
// rm -rf js 版本 文件夹删除
统一打印机制 logger ：上报逻辑（logger，建议统一封装一下，）

const generate 根据模板构建项目

checkVersion 检查当前脚手架版本 从而做校验
告警 warnings
路径处理 localPath

正文：
路径处理：
监测本地路径是否正确 isLocalPath 真实有效路径
获取本地模板的路径：getTemplatePath

面试：如何使用本地离线下载好的模板或者自己预设的模板 --offline。

--help 当前怎么用

help 指令呼出

主要 settings 流程：主要的设置模块
// 模板名称 program commander 用户输入指令的输入
如何获取到 program.args，自己写命令行工具，也可以通过这个获取。

hasSlash 模板路径中是否包含斜杠 => weishenme ?
=> 判断路径层级

项目名称 rawName
项目名称空或项目名称是点. ——输入是否为空 =》 是否以当前目录文件为根。

调整了当前目录名作为构建目录根：子目录：以当前目录为根

读源码结合功能看。

那参数判断拼接

本地目录的拼接 yunyin/.vue-templates/webpack
如果本地

如何拿到（你写脚手架怎么拿？）最常见，最基础的问题。

是否在当前目录下构建 || 存在传入路径。
// 用户交互（重点 inquirer）
run() 生成项目主路径。
确认本地路径是否存在

应付日常面试：
指令
交互
官方第三方
元数据

脚手架，统一技术栈。

直接通过模板路径去生成

<!-- check-version.js -->
非本地的逻辑
检查版本号
check 脚手架的版本号
dist-tags 

多个条件匹配

ask inquire 弹框封装，prompt 做灵活配置，传入配置，

metalsmith元数据和本地的数组合并
inPlace 当前目录，dest根目录

Handlebars 模板通用处理。

注册了配置对象 - 动态组件配置可以学习这种方式。

项目

模板
