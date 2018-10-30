
import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import { typeOf } from '../../../assets/func'
import '../../style/main.less'
import './style.less'
import '../checkbox/style.less'
let id = 0;
class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      oldNode: null,
    }
  }
  static defaultProps = data

  _treeClick(e, item) {
    // this.setState({active: i}) .target.parentNode.parentNode
    e.stopPropagation();
    let node = this.refs[item.id]
    let oldNode = this.state.oldNode


    // 如果点击的是checkbox
    /*if(e.target.className === 'icon' || !e.target.className) {
      return
    }*/


    // 清除上一次点击的节点的样式
    if(oldNode) {
      oldNode.querySelector('.tree-list-title').className = 'tree-list-title'
    }

    // 给本次点击的节点添加点击样式
    this.refs[item.id].querySelector('.tree-list-title').className = 'tree-list-title active'

    // 将上一次点击的节点缓存起来
    this.setState({oldNode: node})

    if(node.className === 'tree-list open') {

      this.refs[item.id].className = 'tree-list'

    } else {

      this.refs[item.id].className = 'tree-list open'

    }
  }

  _treeClass() { // "tree-list "
    let className = 'tree-list '
    if(this.state.active === id) {
      className +='open'
    }
    id++
    return  className
  }

  _treeIcon(item) {
    if(item.subset && item.subset.length > 0) {
      return (
        <i className="fa fa-caret-right"/>
      )
    } else {
      return ''
    }
  }

  _renderDom(list) {
    return (
      <ul className="tree">
        {
          list.map((item, i) => {
            return (
              <li
                key={i}
                ref={item.id}
                onClick={(e) => this._treeClick(e, item)}
                className={this._treeClass(item, i)}>
                <div className="tree-switcher">
                  <div className="tree-icon">
                    {
                      this._treeIcon(item)
                    }
                  </div>
                  <div className="tree-icon">
                    <label className="checkbox" htmlFor={'radio' + item.id}>
                      <input type="checkbox" id={'radio' + item.id} name="radio-1"/>
                        <span className="icon"/>
                    </label>
                  </div>
                  <span className="tree-list-title">{item.title}</span>
                </div>
                {
                  item.subset && (
                    <div className="tree-content">
                      <div className="tree-list-body">
                        {this._renderDom(item.subset)}
                      </div>
                    </div>
                  )
                }
              </li>
            )
          })
        }
      </ul>);
  }
  hasClass(arg) {
    let className = dom.split(' ')
    return className.indexOf(arg) > -1
  }

  /**
   * 判断点击其他地方，隐藏下拉列表
   * @param e
   * @private
   */
  _hideDropDown(e) {
    let $list = document.querySelector('.tree-list-title.active')

    if(e.target.className === 'tree-list-title' || e.target.className === 'tree-list-title active' ) {
      return
    }

    if($list) {
      document.querySelector('.tree-list-title.active').className = 'tree-list-title'
    }
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