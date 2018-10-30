// 入口，引入，可以使用es6语法
// require('babel-core/register');
require('babel-register')({
  presets: ['es2015', 'react', 'stage-0', 'babel-polyfill'],
  plugins: ["transform-decorators-legacy", "transform-es2015-modules-commonjs"]
});
require('./server');
