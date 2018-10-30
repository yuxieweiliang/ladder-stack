/* global ReactDomServer React*/
/* eslint no-console:off*/
import ListHeaderView from 'units/listHeaderView';
import ListPanelController from 'units/listPanelController';


import { list } from './data';


class AskList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  render() {
    return <div></div>;
  }
}
fetch('http://113.200.60.140:8010/Nurse/GetHealthRecordList?patientid=10153554&visitid=4&starttime=2016-06-06%2017:8&endtime=2017-07-27%204:56&token=77EE0046C2A8B92F3320AF5D3940516EE63D3338AD23519FF72609D5EBF27578');

const InitView = () => (
  <main className="scroll">
    <AskList/>
    {/*       人物卡片列表         */}
    {
      list.map((items, i) => {
        const header = items.header;
        return (
          <section className={'list-container ' + (header ? 'has-header' : '')} data-type="pda" key={i}>
            {
              header && (
                <ListHeaderView title={header.title}/>
              )
            }
            <div className="list-main">
              {
                items.child.map((item, key) => {
                  return (
                    <ListPanelController key={key} item={item}/>
                  );
                })
              }
            </div>
          </section>
        );
      })
    }
  </main>
);

document.querySelector('#list').innerHTML = ReactDomServer.renderToString(<InitView user="user"/>);

// ReactDom.render(<InitView  />, document.querySelector('#root'));
