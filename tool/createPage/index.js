let path = require('path');
let fs = require('fs')
  , stdin = process.stdin
  , stdout = process.stdout;
let createFile = require('./createFile');
let config = require('./config');

/**
 * 当前目录绝对路径
 */
let cwd = process.cwd();

/**
 * 当前命令行参数
 */
let argv = process.argv,
  length = argv.length,
  dirRoot = cwd || argv[1],
  temp = argv[2],
  dirPath = argv[3] ? path.join(dirRoot, argv[3]) : path.join(dirRoot, config.root);

// 当参数 大于四个时提示
if(length > 4) {
  stdout.write('\33[33m只需要两个参数：name & path\33[33m\n');
  // process.exit(1)
}


// 如果组建名称存在，则创建
if(!temp) {

  stdout.write('\33[33m请输入组件名称：\33[33m \n');

  process.stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', function(option) {
    const url = path.join(dirPath, option);
    stdin.pause();

    /**
     * 先根据路径，查看是否路径是否存在，不存则先创建路径
     */
    config.structure.map(item => {
      const tempPath = path.join(url, item.name);
      let temp = item.template;
      createFile(tempPath, temp)
    });

    process.exit(0);
  });
} else {
  stdout.write('\33[33m组建创建目录：' + dirPath + '\33[33m\n');

  if(!path.isAbsolute(dirPath)) {
    stdout.write('\33[32m创建组建需要绝对路径！' + dirPath + '\33[33m\n');
  }

  config.structure.map(item => {
    const url = path.join(dirPath, item.name);
    let temp = item.template;
    createFile(url, temp)
  });

  process.exit(1);
}


















