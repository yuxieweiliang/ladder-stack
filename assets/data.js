/**
 * Created by Administrator on 2017/7/18.
 */

export const user = {
  /**
   * 用户性别级名字与在院时长
   */
  user: {
    name: '张三',
    url: 'http://localhost:8080/public/img/timg_6.jpg',
    history: 30,
    sex: '女',
  },

  /**
   * 用户信息
   */
  message: {
    msg: [
      {key: '年龄:', value: 33},
      {key: '入院:', value: '2010-12-11'},
      {key: '手术:', value: '2010-12-11'},
      {key: 'id  :', value: 2432143},
      {key: '余额:', value: -424323, class: 'red'},
    ],
    // 其他症状
    otherSymptom: ['导','压','跌','自','深','敏'],
  },

  /**
   * android点击头像时 -> 调用 || pc,点击卡片时，调用
   */
  handle: () => {},

  /**
   * 在院信息  level: 水平   illness：疾病   nurse：护理
   */
  hospital: {
    bed: 1,
    doctor: '不知道',
    nurse: {
      item: ['特级护理', '一级护理', '二级护理', '三级护理'],
      value: 0,
      config: {
        0: '#c602cd',
        1: '#cd2902',
        2: '#cd2902',
        3: '#f58452',
      }
    },
    list: [{
      item: ['自费', '市医保', '欠费', '合疗'],
      value: 2,
      config: {
        0: '#c602cd',
        1: '#cd2902',
        2: '#cd2902',
        3: '#f58452',
      }
    }, {
      item: ['病危', '病重', '一般'],
      value: 2,
      config: {
        0: '#c602cd',
        1: '#cd2902',
        2: '#f58452',
      }
    }
    ]
  },
};


export const header = {
  type: 'pda',
  user: {
    name: '张三',
    src: 'http://localhost:8080/public/img/user-img.jpg'
  },
  menu: [
    {text: '首页', url: ''},
    {text: '体温单', url: ''}
  ],
  search: {
    id: 242432432,
    items: ['全部', '一级护理', '二级护理', '三级护理', '新入患者', '昨日新入' ],
    handle: () => {}
  },
  title: '体温单'
};

export const userMsg = {
  user,
  patient: {
    list: []
  },
  handle() {}
};
for (let i=0; i< 30; i++) {
  userMsg.patient.list.push(user);
}

export const list = [{
  header: {
    title: '一级标题'
  },
  value: 'fdafdsa',
  child: [{
    id: 1212432,
    text: '标题',
    shape: 'checkbox',
    checked: true,
    checkbox: {
      change: () => {}
    }
  },{
    id: 1212432,
    text: '标题',
    shape: 'checkbox',
    checkbox: {
      change: () => {}
    }
  },{
    id: 1212432,
    text: '标题',
    shape: 'radio',
    name: '1',
    checked: true,
    checkbox: {
      change: () => {}
    }
  },{
    id: 1212432,
    text: '标题',
    shape: 'radio',
    name: '1',
    checkbox: {
      change: () => {}
    }
  }]
},{
  header: {
    title: '一级标题'
  },
  child: [{
    id: 1212432,
    title: '标题',
    items: [1,2,3,4,5,6],
    shape: 'comBox',
    handle: {
      change: () => {},
      blur: () => {},
      focus: () => {},
      select: () => {},
    },
    readonly: false
  },{
    id: 1212432,
    title: '标题',
    items: [1,2,3,4,5,6],
    shape: 'selectView',
    handle: () => {},
    readonly: false
  },{
    id: 1212442,
    title: '标题',
    shape: 'inputEdit',
    handle: {
      change() {},
      focus() {},
      blur() {}
    },
    readonly: false
  },{
    id: 1212442,
    title: '标题',
    shape: 'textArea',
    handle: {
      change() {},
      focus() {},
      blur() {}
    },
    readonly: false
  },{
    title: '日期',
    shape: 'dateView',
    type: 'pda',
    id: 1212432,
    dateSub: () => {},
  },{
    title: '时间',
    shape: 'hourView',
    type: 'pda',
    id: 1212432,
    hourSub: () => {},
  },{
    title: '日期和时间',
    shape: 'dateTime',
    type: 'pda',
    id: 1212432,
    dateSub: () => {},
    hourSub: () => {},
  },{
    title: '日期时间',
    shape: 'timer',
    type: 'pda',
    id: 1212432,
    timerSub: () => {},
  }]
},{
  child: [{
    id: 1212432,
    title: '标题',
    items: [1,2,3,4,5,6],
    shape: 'comBox',
    handle: {
      change: () => {},
      blur: () => {},
      focus: () => {},
      select: () => {},
    },
    readonly: false
  },{
    id: 1212432,
    title: '标题',
    items: [1,2,3,4,5,6],
    shape: 'selectView',
    handle: () => {},
    readonly: false
  },{
    id: 1212442,
    title: '标题',
    shape: 'inputEdit',
    handle: {
      change() {},
      focus() {},
      blur() {}
    },
    readonly: false
  }]
},{
  child: [{
    id: 1212432,
    title: '标题',
    items: [1,2,3,4,5,6],
    shape: 'comBox',
    handle: {
      change: () => {},
      blur: () => {},
      focus: () => {},
      select: () => {},
    },
    readonly: false
  }]
},{
  child: [{
    id: 1212432,
    title: '标题',
    items: [1,2,3,4,5,6],
    shape: 'comBox',
    handle: {
      change: () => {},
      blur: () => {},
      focus: () => {},
      select: () => {},
    },
    readonly: false
  }]
}];