### 各个小程序api对比
#### 命名空间 - 面试题：各家属性有何区别
* 微信 - wx
* 支付宝 - my
* 百度 - swan

#### 模板指令
##### 指令 - if for
* 微信 - wx:if wx:for
* 支付宝 - a:if a:for
* 百度 - s-if s-for

##### key
* 微信 - wx:key
* 支付宝 - key
* 百度 - s-key

##### 事件
* 微信 - bind/catch[事件全小写名]="回调名"
* 支付宝 - on/catch[事件名驼峰]="回调名"
* 百度 - bind/catch[事件全小写名]="回调名"

#### 脚本 & 文件
##### 组件模块中内嵌脚本
* 微信 - <wxs />
* 支付宝 - <import-sjs />
* 百度 - <filter />

##### 小程序文件名
* 微信 - .wxml .wxss
* 支付宝 - .axml .acss
* 百度 - .swan .css

#### 业务流程差别
##### 获取手机号
* 微信 - 
    1. button组件open-type设置成getPhoneNumber
    2. 通过bindgetphonenumber事件回调获取到动态令牌code => code发送给业务后台
    3. 业务后台通过调用微信后台的phonenumber.getPhoneNumber，消费code => 换取手机号
* 支付宝 - my.getPhoneNumber 唤起用户预授权，获取手机号
* 百度 - 
    1. button组件open-type设置成getPhoneNumber
    2. 通过bindgetphonenumber作为获取手机号的回调
    3. 返回值中包含encryptedData 和 iv需要发送到服务端进行解密

### 主流跨平台框架对比 - taro remax mpvue wepy
#### mpvue - 不推荐
* 特点
1. 通过vue进行开发
2. 支持多端框架
3. 保留了vue.runtime的核心方法，无缝继承了vue的基础能力
4. 提供了将vue的模板宇凡转换成小程序wxml的语法能力
5. 修改vue的构建配置，构建出复合小程序的代码格式：json/wxml/wxss/js

* 原理特性
1. 不用于完全编译时框架，mpvue结合了runtime加入了vue.runtime.js
2. 整合了diff/events/生命周期

* 状态
社区废弃不维护，遗留问题比较多，不推荐使用

#### remax
* 特点
1. 使用react风格和方式来进行小程序的开发
2. 代码转换到多个小程序平台
3. 原生支持ts

* 原理特性
1. 同样不完全依赖静态编译，整合进了运行时替换
2. 运行时实现了一套类似react-dom。区别是把react-dom里和window、document相关内容，替换成小程序中相应内容，实现了react-reconciler
3. 书写风格贴近于面向对象，react技术栈友好

#### taro - 支持平台多
* 特点
1. 原生支持npm/yarn
2. 原生支持使用ES-next / css预编译器
3. 原生支持使用Redux / MobX进行状态管理
4. 支持小程序Api的promise化

* 原理特性
1. 静态编译的框架，主要工作都是在编译阶段进行的
2. 源码模块解耦，可读性好。taro-transformer-wx模块 => index.ts => tsc & babel => AST => parseJSXChildren => wxml => 静态编译阶段实现了转义
