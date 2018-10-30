/* global ReactServer React*/
import PeopleCard from 'units/peopleInfoCard';
import BtnAsTag from 'units/btnAsTag';
import iFetch from 'script/var/fetch';

const data = {
  btnList: [
    {text: '保存', url: ''},
    {text: '保存', url: ''},
    {text: '保存', url: ''},
    {text: '保存', url: ''}
  ],
  handle: () => {}
};
const list = {
  nurse: {
    config: {
      0: '#c602cd',
      1: '#cd2902',
      2: '#cd2902',
      3: '#f58452',
    }
  },
  list: [
    {
      key: 'CHARGE_TYPE',
      item: ['自费', '市医保', '欠费', '合疗'],
      config: {
        0: '#c602cd',
        1: '#cd2902',
        2: '#cd2902',
        3: '#f58452',
      }
    },
    {
      key: 'NURSE_LEVEL',
      item: ['病危', '病重', '一般'],
      config: {
        0: '#c602cd',
        1: '#cd2902',
        2: '#cd2902',
        3: '#f58452',
      }
    }
  ]
};
function createDate(item, list) {
  const url = item.SEX == '男'
    ?
    'http://localhost:8080/public/img/timg_6.jpg'
    :
    'http://localhost:8080/public/img/timg_6.jpg';

  const data = {
    user: {
      name: item.PATIENT_NAME,
      url,
      history: item.INHOSPITAL_DAYS,
      sex: item.SEX,
    },
    message: {
      msg: [
        {key: '年龄:', value: item.AGE},
        {key: '入院:', value: item.ADMISSION_DATE},
        {key: '手术:', value: item.undefined},
        {key: 'id  :', value: item.PATIENT_ID},
        {key: '余额:', value: item.BALANCE, class: 'red'},
      ],
      otherSymptom: [
        item.ISALLERGY == '1' && '敏',
        item.ISAUTRDANGER == '1' && '深',
        item.ISBARTHELDANGER == '1' && '自',
        item.ISBRADENDANGER == '1' && '压',
        item.ISFALLDANGER == '1' && '跌',
        item.ISSLIPDANGER == '1' && '导',
      ],
    },

    hospital: {
      bedNum: item.BED_NO,
      nurse: {
        item: [ '特级护理', '一级护理', '二级护理', '三级护理'],
        value: item.undefined,
        config: list.nurse.config
      },
      list: []
    },
  };

// 添加hospital中的list
  data.hospital.list = list.list.map(ite => {
    let key = null;

    if(ite.key == 'CHARGE_TYPE') {
      key = ite.item.indexOf(item[ite.key]);
    } else key = item[ite.key];

    return {
      ...ite.context,
      value: ite.item[key]
    };
  });

  return data;
}
class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}
  render() {
    return (
      <div className="operation-container">
        {
          this.state.data && this.state.data.map((item, i) => (
            <div key={i} className="user-msg-card" data-type="pda">
              <PeopleCard {...item}/>
              <BtnAsTag {...data}/>
            </div>
          ))
        }
      </div>
    );
  }
}


/* eslint no-console:off*/
document.querySelector('#list').innerHTML = ReactServer.renderToString(<ListView/>);


