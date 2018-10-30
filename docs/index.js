import path from 'path'
import fs from 'fs'
import markdown from 'marked'
import func from '../assets/func/index'

export default async  (ctx, next) => {
  // 获取存放组建的目录
  const data = await func.readFile(path.join(__dirname + '/config.json'), 'utf-8');
  let url = path.join(__dirname + '/../' + JSON.parse(data).path);
  // 读取组建存放目录下的文件
  const files = await func.readDir(url);
  // 获取文件夹中的每一个组件
  const fileList = files.map(item => path.join(url + '/' + item));
  // 获取所有组件中的文件 -> 二维数组
  const fileData = await func.getFilesPath(fileList);
  fileData.map(items => {
    items.map((item, i) => {
      if(item.indexOf('md') < 0) {
        return
      } else {
        const url = fileList[1] + '/' + item;
        const data = fs.readFileSync(url,'utf8');
        ctx.macked = markdown(data)
      }
    })
  });
  await  next();
};
