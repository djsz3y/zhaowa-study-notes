// module4.js文件
define(function (require, exports, module) {
  var module2 = require("./module2"); //引入(同步)依赖模块

  function show() {
    console.log("module4 show() " + module2.msg);
  } //内部函数

  exports.show = show; //向外暴露

  require.async("./module3", function (m3) {
    console.log("异步引入依赖模块3  " + m3.API_KEY);
  }); //引入(异步)依赖模块

  // console.log("--------与上面相反一下--------");

  // var module3 = require("./module3"); //引入(同步)依赖模块 module3

  // function show2() {
  //   console.log("module4 show2() " + module3.API_KEY);
  // } //内部函数

  // exports.show2 = show2; //向外暴露

  // require.async("./module2", function (m2) {
  //   console.log("异步引入依赖模块2  " + m2.msg);
  // }); //引入(异步)依赖模块 module2
});
