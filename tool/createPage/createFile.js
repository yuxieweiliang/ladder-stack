let path = require('path');
let fs = require('fs');


let createFiles = function(dirPath, filesText = '') {
  /**
   * resolve 将相对路径转换为绝对路径
   * normalize 规范 '..' | '.'
   */
  let normal = path.resolve(path.normalize(dirPath));

  /**
   * 判断当前路径是绝对路径
   */
  if(!path.isAbsolute(normal)) {
    process.stdout.write('路径必须是一个绝对路径！\n');
    process.exit(1)
  }

  /**
   *  path.sep 平台分隔符 '/'
   */
  let normalArr = normal.split(path.sep);

  /**
   * 创建文件
   */
  let theDir = '';
  for (let dir of normalArr) {
    theDir += dir + path.sep; // path.sep  平台分隔符
    theDir = path.normalize(theDir);
    theDir = theDir.replace(/\r\n/g,'');

    /**
     * 判断当前路径是否存在！
     */
    let isExists = fs.existsSync(theDir);

    // 如果文件不存在
    if(!isExists) {
      /**
       * 获取当前路径的信息
       * parse.name  -> 文件名
       * parse.ext  -> 后缀名
       */
      let parseDir = path.parse(theDir);

      // 如果后缀名不存在，则是文件
      if(parseDir.ext === '') {

        fs.mkdirSync(theDir);
      } else {
        fs.writeFileSync(theDir, filesText)
      }
    }

  }
};

let typeOf = function(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
};

module.exports = function(dirPath, filesText = '') {
  const type = typeOf(dirPath);

  /**
   * 流输出 前面的33用于添加颜色，后面的用于恢复白色
   */
  process.stdout.write('\033[31m创建文件:\033[33m\n');
  process.stdout.write('\033[31m -  路径:\033[33m  ' +  dirPath + '\n');


  // 是否是一个字符串
  if(type === 'string') {
    createFiles(...arguments);
  }
  // 数组
  else if(type === 'array') {
    dirPath.map(item => createFiles(item.path, item.text));
  }
  // 其他
  else {
    process.stdout.write('路径格式不正确！\n');
    process.exit(1)
  }
};

/*fs.stat(cwd, function(err, stat) {
 console.log(stat);
 console.log('     \033[31mfdsfdsafdsafdsa\033[39m');
 process.stdin.resume();
 process.stdin.setEncoding('utf8')
 });*/

/**
 * 与existsSync一样，不过是异步的，当他判断的时候，theDir已经成了全部路径了
 * 不过参数为当前路径与一个函数，函数参数为当前路径每一段是否存在
 */
/*
fs.exists(theDir, function(exists) {
  // 此时 theDir  == E:\00_project\00_demo\
  console.log('exists', exists);
});*/
