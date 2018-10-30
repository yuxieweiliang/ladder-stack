const React = require('react');
import { render } from 'react-dom'
import kn from '../../../assets/server'


import { Button, Input, Form, Layout, Menu, Icon, SubMenu  } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    }
  }
  _setUsername(username) {
    console.log('aaaa')
    this.setState({username})
  }
  _setPassword(password) {
    console.log(password)
    this.setState({password})
  }
  login() {
    let {username, password} = this.state;
    let option = {
      url: 'http://localhost:3000/api/user'
    };
    let data = {username, password}

    kn.post(option, data)
      .then(res => console.log(res))
  }
  render() {
    return (<Layout>
      <Header>header</Header>
      <Layout>
        <Sider>s</Sider>
        <Content>
          <Form layout="horizontal">
            <Form.Item label="user name" {...{labelCol: { span: 4 },wrapperCol: { span: 14 }}}>
              <Input size="small"
                     placeholder="Basic usage"
                     defaultValue={this.state.username}
                     onInput={(e) => this._setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item label="password" {...{labelCol: { span: 4 },wrapperCol: { span: 14 }}}>
              <Input size="small"
                     placeholder="Basic usage"
                     defaultValue={this.state.password}
                     onInput={(e) => this._setPassword(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Form Layout" {...{labelCol: { span: 4 },wrapperCol: { span: 14 }}}>
              <Button type="primary" onClick={() => this.login()}>登陆</Button>
            </Form.Item>
          </Form>
        </Content>
        <Sider>s</Sider>
      </Layout>
      <Footer>f</Footer>
    </Layout>);
  }
}

if(typeof document !== 'undefined') {
  require('./IndexPage.less');
  render(<MyComponent/>, document.getElementById('root'));
}


MyComponent.propTypes = {

};

module.exports = MyComponent;