const React = require('react');
import { render } from 'react-dom'
import func from './behavior'
// ant design
import { Button, Input, Avatar, Layout, Menu, Icon, SubMenu, Row, Col, Tag } from 'antd';
// markDown
import { markdown } from 'markdown'
const { Header, Content, Footer, Sider } = Layout;

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  state = func.state;
  _nameHandle = func._nameHandle
  _descriptionHandle = func._descriptionHandle
  createBook = func.createBook
  textareaChange = (e) => {

    this.setState({html: markdown.toHTML(e.target.value)})

  }
  render() {
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
      <Layout style={{ marginLeft: 200 }}>
        <Header>header</Header>
        <Content>
          <Row className="row" type="flex" justify="center">
            <Col xs={14} sm={13} md={12} lg={11} xl={10} className="book-container">
              <header className="book-title">
                <h2>
                  这里是书的名字
                </h2>
              </header>
              <div className="author-container">
                <div className="author-box">
                  <img className="author-portrait" src="/img/younai.jpg" alt="由乃"/>
                </div>
                <div className="author-context">
                  <h4 className="author-name">雨血薇凉 <span>签约作者</span> <span>关注</span></h4>
                  <p className="author-description">时间 字数：121321 阅读 32324 评论 32 喜欢 323 赞赏 2</p>
                </div>
              </div>
              <div className="subject-content">
                这里是书文章的描述
                这里是书文章的描述
                这里是书文章的描述
                这里是书文章的描述
                这里是书文章的描述
                这里是书文章的描述
                这里是书文章的描述
                这里是书文章的描述
                这里是书文章的描述
              </div>
              <div className="row book-sponsor">
                <div className="row text-center book-sponsor-title">打赏鼓励阿何写出更多好文章</div>
                <div className="row text-center book-sponsor-btn">
                  <Button type="primary">赞助</Button>
                </div>
                <div className="row text-center book-sponsor-user">
                  <Avatar size="large" icon="user"/>
                  <Avatar size="large" icon="user"/>
                </div>
              </div>
              <div className="row book-group">
                <div className="col-sm-6"><a href="#">这里是文章所属的分类</a></div>
                <div className="col-sm-6 text-right"><a href="#">举报</a><span>© 著作权归作者所有</span></div>
              </div>
              <div className="row book-group">
                <div className="col-sm-6">广告推荐</div>
                <div className="col-sm-6 text-right">举报  © 著作权归作者所有</div>
              </div>
              <div className="row author-love">
                <div className="author-container">
                  <div className="author-box">
                    <img className="author-portrait" src="/img/younai.jpg" alt="由乃"/>
                  </div>
                  <div className="author-context">
                    <h4 className="author-name">雨血薇凉 <span>签约作者</span> <span>关注</span></h4>
                    <p className="author-description">用了121321长时间  写了 121321 字  被 32324 人关注 获得了 32 个喜欢</p>
                  </div>
                </div>
                <div className="author-description-about">文章的描述 这里是书文章的描述这里是书文章的描述这里是书文章的描述这里是书文章的描述 这里是</div>
              </div>
              <div className="row book-share">
                <div className="col-sm-6 book-share-love">
                  <Button type="primary"><Icon type="heart"/>喜欢</Button>
                </div>
                <div className="col-sm-6 text-right">
                  <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <button className="book-share-btn">分享到更多</button>
                </div>
              </div>
              <div className="row book-group">
                <div className="col-sm-12">
                  <div className="author-container">
                    <div className="author-box">
                      <Avatar size="large" src="/img/younai.jpg" />
                    </div>
                    <div className="author-context">
                      <Input.TextArea rows={4}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row book-group book-comment-title">
                <div className="col-sm-6 book-comment-left">
                  <h3 className="book-comment-title-text">
                    <span className="book-comment-num">100</span>
                    条评论
                  </h3>
                  <Tag color="gold">只看作者</Tag>
                </div>
                <div className="col-sm-6 book-comment-right">
                  <span className="book-comment-sort">按喜欢排序</span>
                  <span className="book-comment-sort">按时间排序</span>
                </div>
              </div>
              <div className="row book-group">
                <div className="col-sm-12">
                  <div className="author-container author-sm">
                    <div className="author-box">
                      <img className="author-portrait" src="/img/younai.jpg" alt="由乃"/>
                    </div>
                    <div className="author-context">
                      <h4 className="author-name">雨血薇凉 <span>签约作者</span> <span>关注</span></h4>
                      <p className="author-description">写了 121321 字  被 32324 人关注 获得了 32 个喜欢</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 book-comment">评论的内容，评论的内容，评论的内容，评论的内容，评论的内容，评论的内容，评论的内容</div>
                <div className="col-sm-12">
                  <span className="book-action"><Icon type="like-o"/>点赞</span>
                  <span className="book-action"><Icon type="message"/>回复</span>
                </div>
                <div className="col-sm-12">
                  <div className="book-reply">
                    <p className="book-reply-context">
                      <a className="book-reply-user">这个人</a>：<a className="book-reply-user">@那个人</a>
                      评论的内容，评论的内容，评论的内容，评论的内容，评论的内容，评论的内容，评论的内容
                    </p>
                    <div className="row book-reply-comment-btn-box">
                      <div className="col-sm-6">
                        <time>2018.01.16 10:26</time>
                        <span className="book-action-comment">回复</span>
                      </div>
                      <div className="col-sm-6 text-right">
                        <span className="book-reply-report">举报</span>
                      </div>
                    </div>
                    <div className="row book-reply-comment-input-box">
                      <div className="col-sm-12">
                        <Input.TextArea className="book-reply-comment-input" rows={3}/>
                      </div>
                      <div className="col-sm-6">
                        <div className="book-reply-comment-expression">表情</div>
                      </div>
                      <div className="col-sm-6 text-right">
                        <Button className="book-reply-comment-default">取消</Button>
                        <Button className="book-reply-comment-primary" type="primary">发送</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Content>
        <Footer>f</Footer>
      </Layout>
    </Layout>);
  }
}

if(typeof document !== 'undefined') {
  require('./style.less')
  render(<MyComponent/>, document.getElementById('root'));
}


MyComponent.propTypes = {

};

module.exports = MyComponent;
