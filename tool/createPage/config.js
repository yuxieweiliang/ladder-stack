

let createConfig = {
  name: '组建模板配置',
  desc: '这里是创建组建的配置文件',
  root: 'ass',
  // 命令行中显示的信息
  logs: {
    name: 'name',
    type: 1,
    author: '作者',
    createTime: new Date().toLocaleDateString(),
    func: '',
    desc: '描述',
    usage: '使用'
  },
  // 组件结构
  structure: function(option) {
    return [{
      name: 'view.jsx',
      desc: '组件入口 ,使用 react jsx 处理',
      template:  (
        "import './style'; // 视图样式 \n"+
        "import view from './view';//视图 \n"+
        "export default view; \n"
      )
    },{
      name: 'style.less',
      desc: '用户界面的样式 ，使用 less 处理',
      template:  (
        "import './style'; // 视图样式 \n"+
        "import view from './view';//视图 \n"+
        "export default view; \n"
      )
    },{
      name: 'behavior.es6',
      desc: '分析用户行为 ，使用 es6 处理',
      template:  (
        "import './style'; // 视图样式 \n"+
        "import view from './view';//视图 \n"+
        "export default view; \n"
      )
    },{
      name: 'index.js',
      desc: '处理用户数据、状态 , 使用 js处理',
      template:  (
        "import './style'; // 视图样式 \n"+
        "import view from './view';//视图 \n"+
        "export default view; \n"
      )
    },{
      name: 'readme.md',
      desc: '记录组件被创建时的情况',
      template:  (`
> 组件名称
## ${option.name}

> 组件类型 [组件类型 (1)-静态组件 (2)-交互组件 (3)-中间件]
## ${option.type}

> 作者
## ${option.author}

> 创建时间
## ${option.start}

> 组件的功能
## ${option.func}

> 组件描述(应用场景、上下文环境、依赖等等)
## ${option.desc}

> 组件用法举例
## ${option.usage}
        `
      )
    }]
  }
}

module.exports =  Object.assign(createConfig, {
  structure: createConfig.structure(createConfig.logs)
})
