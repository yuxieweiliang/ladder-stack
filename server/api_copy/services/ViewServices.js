
// 处理开发环境、生成环境中的被请求的views中的资源的路径问题
module.exports = {

  /**
   * 匹配需要加载的资源的路径
   * @param view 视图的名称
   * @param defaultStore
   * @returns {*}
   */

  match: function (view) {
    /* global sails */

    if (!view) return;
    let assets = require('../../assets.json');
    const env = sails.config.environment;

    if (env === 'development') {
      return {
        header: assets.header.js,
        vendor: assets[view].js
      };
    }

    return {
      vendor: assets.vendor.js,
      style: assets[view].css,
      script: assets[view].js
    };
  }
};

