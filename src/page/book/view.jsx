const React = require('react');
import { render } from 'react-dom'
import func from './behavior'

import { Button, Input, Card, Layout, Menu, Icon, SubMenu, List } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  state = func.state;
  _nameHandle = func._nameHandle
  _descriptionHandle = func._descriptionHandle
  createBook = func.createBook

  render() {
    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Australian walks 100km after outback crash.',
      'Australian walks 100km after outback crash.',
      'Australian walks 100km after outback crash.',
      'Australian walks 100km after outback crash.',
      'Australian walks 100km after outback crash.',
      'Australian walks 100km after outback crash.',
      'Australian walks 100km after outback crash.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ];
    return (<Layout>
      <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
          </Menu.Item>
          <Menu.SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="71">Option 7</Menu.Item>
            <Menu.Item key="72">Option 7</Menu.Item>
            <Menu.Item key="73">Option 7</Menu.Item>
            <Menu.Item key="74">Option 7</Menu.Item>
            <Menu.Item key="75">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>

            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="11">Option 10</Menu.Item>
            <Menu.Item key="12">Option 10</Menu.Item>
            <Menu.Item key="13">Option 10</Menu.Item>
            <Menu.Item key="14">Option 10</Menu.Item>
            <Menu.Item key="15">Option 10</Menu.Item>
            <Menu.Item key="16">Option 10</Menu.Item>
            <Menu.Item key="17">Option 10</Menu.Item>
            <Menu.Item key="18">Option 10</Menu.Item>
            <Menu.Item key="19">Option 10</Menu.Item>
            <Menu.Item key="20">Option 10</Menu.Item>
            <Menu.Item key="21">Option 10</Menu.Item>
            <Menu.Item key="22">Option 10</Menu.Item>
            <Menu.Item key="23">Option 10</Menu.Item>
            <Menu.Item key="24">Option 10</Menu.Item>
            <Menu.Item key="25">Option 10</Menu.Item>
            <Menu.Item key="26">Option 10</Menu.Item>
            <Menu.Item key="27">Option 10</Menu.Item>
            <Menu.Item key="28">Option 10</Menu.Item>
            <Menu.Item key="29">Option 10</Menu.Item>
            <Menu.Item key="30">Option 10</Menu.Item>
            <Menu.Item key="31">Option 10</Menu.Item>
            <Menu.Item key="32">Option 10</Menu.Item>
            <Menu.Item key="33">Option 10</Menu.Item>
            <Menu.Item key="34">Option 10</Menu.Item>
            <Menu.Item key="35">Option 10</Menu.Item>
            <Menu.Item key="36">Option 10</Menu.Item>
            <Menu.Item key="37">Option 10</Menu.Item>
            <Menu.Item key="38">Option 10</Menu.Item>
            <Menu.Item key="39">Option 10</Menu.Item>
            <Menu.Item key="40">Option 10</Menu.Item>
            <Menu.Item key="41">Option 10</Menu.Item>
            <Menu.Item key="42">Option 10</Menu.Item>
            <Menu.Item key="43">Option 10</Menu.Item>
            <Menu.Item key="44">Option 10</Menu.Item>
            <Menu.Item key="45">Option 10</Menu.Item>
            <Menu.Item key="46">Option 10</Menu.Item>
            <Menu.Item key="47">Option 10</Menu.Item>
            <Menu.Item key="48">Option 10</Menu.Item>
            <Menu.Item key="49">Option 10</Menu.Item>
            <Menu.Item key="50">Option 10</Menu.Item>
            <Menu.Item key="51">Option 10</Menu.Item>
            <Menu.Item key="52">Option 10</Menu.Item>
            <Menu.Item key="53">Option 10</Menu.Item>
            <Menu.Item key="54">Option 10</Menu.Item>
            <Menu.Item key="55">Option 10</Menu.Item>
            <Menu.Item key="56">Option 10</Menu.Item>
            <Menu.Item key="58">Option 10</Menu.Item>
            <Menu.SubMenu key="sub3" title="Submenu">
              <Menu.Item key="98">Option 11</Menu.Item>
              <Menu.Item key="99">Option 12</Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200}}>
        <Header>header</Header>
        <Content className="ant-spin-container" >
          <List
            style={{ overflowX: 'hidden' }}
            grid={{ gutter: 12, xs: 1, sm: 2, md: 3, lg: 6, xl: 8 }}
            header={<div>书名</div>}
            dataSource={data}
            renderItem={item => (<List.Item>
              <Card style={{height: 200}}>{item}</Card>
            </List.Item>)}>
          </List>
        </Content>
        <Footer>f</Footer>
      </Layout>
    </Layout>);
  }
}

if(typeof document !== 'undefined') {
  request('./style.less')// 视图样式
  render(<MyComponent/>, document.getElementById('root'));
}


MyComponent.propTypes = {

};

module.exports = MyComponent;
