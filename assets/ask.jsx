/* global React ReactServer*/
/* eslint no-console:off*/

import ListHeaderView from 'units/listHeaderView';
import ListPanelController from 'units/listPanelController';

import { list } from './data';

import 'styles/com.scss';

class AskList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  render() {
    return <div></div>;
  }
}

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

document.querySelector('#list').innerHTML = ReactServer.renderToString(<InitView user="user"/>);

// ReactDom.render(<InitView  />, document.querySelector('#root'));
