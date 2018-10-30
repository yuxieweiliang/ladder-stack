
import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import { typeOf } from '../../../assets/func'
import '../../style/main.less'
let id = 0;
class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      oldNode: null,
    }
  }

  _renderDom(list) {
    return (
      <div className="input-group">
        <input className="form-control" type="text"/>
        <span className="input-group-addon">button</span>
      </div>);
  }
  hasClass(arg) {
    let className = dom.split(' ')
    return className.indexOf(arg) > -1
  }


  // 添加click事件
  componentDidMount() {
    document.addEventListener('click', this._hideDropDown, false);
  }

  /**
   * 渲染组建
   * @returns {*}
   */
  render() {
    return this._renderDom(this.props.list)
  }
  /**
   * 组建卸载时，将chick事件清除
   */
  componentWillUnmount() {
    document.removeEventListener('click', this._hideDropDown);
  }
}


render(<MyComponent root="inline" />, document.getElementById('root'));