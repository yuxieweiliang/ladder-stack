import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import kn from '../../../assets/server'
import { typeOf } from '../../../assets/func'
import '../../style/main.less'
import warning from 'warning'


class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
    }
  }
  static defaultProps = data

  _horizontalSub(subList) {
    let array = []
    subList.subset.map((list, i) => {

      // 如果只有一段
      if(typeOf(list) === 'object') {

        array.push(<li key={i}>{list.title}</li>)

        // 如果分多段
      } else if(typeOf(list) === 'array') {
        if(i !== 0) {
          array.push(<li key={i + 'divider'} className="divider"/>)
        }

        list.map((item, j) => {
          array.push(<li key={j + '-' + i}>{item.title}</li>)
        })

      } else {
        console.error('data in wrong format')
      }
    })
    return array
  }
  _inlineSub(subList) {
    return subList.subset.map((item, i) => {
      const hasSub = (item.subset && item.subset.length > 0)
      return (
        <li key={item.id + '-' + i} ref={item.id} onClick={(e) => this._subClick(e, item)}>
          <div className="menu-title">
            <a href="javascript:void(0)">{item.name}</a>
            {
              hasSub && <span className="fa fa-angle-down"/>
            }

          </div>
          {
            hasSub && this._renderSub(item)
          }
        </li>
      )
    })
  }

  _parent(node, target) {
    if(node && node.parentNode && node.parentNode.className.split(' ').indexOf(target) > -1) {
      // console.log(node.parentNode.className.split(' ').indexOf(target)> -1)
      return true
    } else if(node.parentNode){
      return this._parent(node.parentNode, target)
    }
  }

  _subClick(e, item) {
    e.stopPropagation()
    let oldNode = this.state.old
    let oldActive = this.state.oldActive
    let thisNode = this.refs[item.id]
    let className = thisNode.className.split(' ')
    if(className.indexOf('disabled') > -1) {
      return
    }

    // 关闭旧节点
    if(thisNode.parentNode.querySelector('.open')) {
      oldNode.className = 'menu-item'
    }
    if(oldActive) {
      oldActive.className = 'menu-item'
    }

    if(className.indexOf('open') > -1 || className.indexOf('active') > -1) {
      this.refs[item.id].className = 'menu-item'
    } else if(item.subset) {
      this.refs[item.id].className = 'menu-item open'
      this.setState({old: thisNode})
    } else {

      this.refs[item.id].className = 'menu-item active'
      this.setState({oldActive: thisNode})
    }

  }
  _renderSub(subList) {
    const {rootClass} = this.props
    let subDom = null;

    // 水平导航条
    if(rootClass === 'horizontal' ) {
      subDom = this._horizontalSub(subList)

      // 垂直可展开
    } else if(rootClass === 'inline' ) {
      subDom = this._inlineSub(subList)
    }


    return (

      <ul className={this._navSubClass()}>{subDom}</ul>
    )
  }

  /**
   * 一级菜单
   * @param i
   * @private
   */
  _navClick(i) {
    let oldNode = this.state.active
    let thisNode = this.refs[i]
    let className = thisNode.className.split(' ')

    // 关闭旧节点
    if(oldNode) {
      oldNode.className = 'menu-item'
    }

    if(className.indexOf('open') > -1) {
      this.refs[i].className = 'menu-item'
    } else {
      this.refs[i].className = 'menu-item open'
    }
    this.setState({active: thisNode})

  }

  /**
   * 根节点样式
   * @returns {string}
   * @private
   */
  _rootClass() {
    let className = 'menu-root menu-'
    const {rootClass} = this.props

    // 水平导航条
    if(rootClass === 'horizontal' ) {
      className += rootClass

      // 垂直可展开
    } else if(rootClass === 'inline' ) {
      className += rootClass
    }

    return className
  }

  /**
   *
   * @param item
   * @param i
   * @returns {string}
   * @private
   */
  _navClass(item, i) {
    let className = 'menu-item '
    if(this.state.active === i) {
      className +='open'
    } else if(item.disabled) {
      className +='disabled'
    }
    return  className
  }

  /**
   * 子节点样式
   * @returns {string}
   * @private
   */
  _navSubClass() {
    let className = 'menu-hidden '
    const {rootClass} = this.props

    // 水平导航条
    if(rootClass === 'horizontal' ) {
      className += 'menu-drop'

      // 垂直可展开
    } else if(rootClass === 'inline' ) {
      className += 'menu-sub'
    }
    return className
  }
  render() {
    const { subList } = this.props
    let subDom = null;

    // 水平导航条
    if(rootClass === 'horizontal' ) {
      subDom = this._horizontalSub(subList)

      // 垂直可展开
    } else if(rootClass === 'inline' ) {
      subDom = this._inlineSub(subList)
    }


    return (

      <ul className={this._navSubClass()}>{subDom}</ul>
    )
  }
}


MenuItem.isMenuItem = 1;

export default MenuItem
