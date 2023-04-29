// module1.js文件
define(function (require, exports, module) {
  var data = "djsz3y.com"; //内部变量数据

  function show() {
    console.log("module1 show() " + data);
  } //内部函数

  exports.show = show; //向外暴露
});
