//alerter.js文件
// 定义有依赖的模块
// define(["dataService"], function (dataService) {
define(["dataService", "jquery"], function (dataService, $) {
  let name = "djsz3y";
  function showMsg() {
    alert(dataService.getMsg() + ", " + name);
  }
  $("body").css("background", "yellowgreen");
  // 暴露模块
  return { showMsg };
});
