// main.js文件
(function () {
  require.config({
    baseUrl: "js/", //基本路径 出发点在根目录下
    paths: {
      // 自定义模块——映射: 模块标识名: 路径
      alerter: "./modules/alerter", //此处不能写成alerter.js,会报错
      dataService: "./modules/dataService",
      // 第三方库模块
      jquery: "./libs/jquery/2.0.0/jquery.min", //注意：写成jQuery会报错
    },
  });
  require(["alerter"], function (alerter) {
    alerter.showMsg();
  });
})();
