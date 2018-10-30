/* global ReactDomServer ReactDom */
/* eslint no-console:0*/
import './styles/app.scss';
import HeaderView from 'units/headerView';
import PeopleCard from 'units/peopleInfoCard';
import BtnAsTag from 'units/btnAsTag';
import {user} from './data';
const data = {
  btnList: [
    {text: '保存', url: ''},
    {text: '保存', url: ''},
    {text: '保存', url: ''},
    {text: '保存', url: ''}
  ],
  handle: () => {}
};

// 请求复合页面的结构
fetch('http://113.200.60.140:8010/Report/GetReport_widget?token=77EE0046C2A8B92F3320AF5D3940516EE63D3338AD23519FF72609D5EBF27578&report_id=10522132');


const ListView = () => {
  return (
    <div className="operation-container">
      {
        [1,2,3,4,5,6].map((j, i) => (
          <div key={i} className="user-msg-card" data-type="pda">
            <PeopleCard {...user}/>
            <BtnAsTag {...data}/>
          </div>
        ))
      }
    </div>


  );
};

document.querySelector('#root').innerHTML = ReactServer.renderToString(<ListView user="user"/>);
