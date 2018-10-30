import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import kn from '../../../assets/server'
import { typeOf } from '../../../assets/method'
import '../../style/main.less'
import warning from 'warning'

let menuId = (function() {
  let id = 0
  return () => id++
})()

class Menu extends Component {
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

        array.push(<li key={i}><a href="">{list.context}</a></li>)

        // 如果分多段
      } else if(typeOf(list) === 'array') {
        if(i !== 0) {
          array.push(<li key={i + 'divider'} className="divider"/>)
        }

        list.map((item, j) => {
          array.push(<li key={j + '-' + i}><a href="">{item.context}</a></li>)
        })

      } else {
        console.error('data in wrong format')
      }
    })
    return array
  }

  _inlineSub(subList) {
    return subList.subset.map((item, i) => {
      let className = 'menu-item '
      const hasSub = (item.subset && item.subset.length > 0)
      let ref = 'id-' + menuId() + '-' + i

      if(hasSub && item.state === 'open') {
        className += 'open'
      }
      if(!hasSub && item.active) {
        className += 'active'
      }

      return (
        <li key={item.id + '-' + i}
            className={className}
            ref={ ref }
            onClick={(e) => this._subClick(e, ref, item)}>
          <div className="menu-title">
            <a href="javascript:void(0)">{item.context}</a>
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
    } else if(node.parentNode) {
      return this._parent(node.parentNode, target)
    }
  }

  _subClick(e, ref, item) {
    e.stopPropagation()
    let oldNode = this.state.old
    let oldActive = this.state.oldActive
    let thisNode = this.refs[ref]
    let className = thisNode.className.split(' ')
    let active = thisNode.parentNode.querySelector('.active')
    let open = thisNode.parentNode.querySelector('.open')
    if(className.indexOf('disabled') > -1) {
      return
    }

    // 关闭旧节点
    if(open) {
      open.className = 'menu-item'
    }
    if(oldActive) {
      oldActive.className = 'menu-item'
    }

    if(active) {
      active.className = 'menu-item'
    }

    if(className.indexOf('open') > -1 || className.indexOf('active') > -1) {
      this.refs[ref].className = 'menu-item'
    } else if(item.subset) {
      this.refs[ref].className = 'menu-item open'
      this.setState({old: thisNode})
    } else {

      this.refs[ref].className = 'menu-item active'
      this.setState({oldActive: thisNode})
    }
    this.props.onClick(item)
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
   * @param item
   * @private
   */
  _navClick(i, item) {
    let oldNode = this.state.active
    let thisNode = this.refs[i]
    let className = thisNode.className.split(' ')
    const {rootClass} = this.props
    if(rootClass === 'horizontal' || item.disabled) {
      return
    }

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
    this.props.onClick(item)

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

    if(item.state === 'open') {
      className +='open'
    }

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
    if(!this.props.dataSource) {
      return <div/>
    }
    return (<div className={this._rootClass()}>
      {/*<span className="menu-prev"/>*/}
      <div className="menu-nav">
        {
          this.props.dataSource.map((item, i) => {
            let ref = 'id-' + menuId()  + '-' + i
            return (
              <div
                key={item.id}
                ref={ref}
                className={this._navClass(item, i)}
                onClick={() => this._navClick(ref, item)}>
                <div className="menu-title">
                  <a href="javascript:void(0)">
                    {
                      item.icon && <i className={'fa fa-' + item.icon}/>
                    }
                    {item.context}
                  </a>
                  {
                    item.subset && <span className="fa fa-sort-down"/>
                  }

                </div>
                {
                  item.subset && this._renderSub(item)
                }
              </div>
            )
          })
        }
      </div>
      {/*<span className="menu-next"/>*/}
    </div>);
  }
}
render(<Menu rootClass="inline" {...data} onClick={(item) => console.log(item)}/>, document.getElementById('root'));
// http://10.0.0.35:804/Quality/GetUserGroupInfoByid?token=523B516F4843EBFF0DF295611FE8F5D9BABE9CD0490E197782CCC560D2D1E42C&UserId=NANYP

const token = '523B516F4843EBFF0DF295611FE8F5D9BABE9CD0490E197782CCC560D2D1E42C'
kn.fetch({url: 'http://10.0.0.35:804/Documents/GetAllUserInfo',token})
  .then(response => kn.fetch({url: 'http://10.0.0.35:804/Documents/GetAllWards',token})
    .then(res => {
      const length = response.data.length
      const arrayList = res.data.map((list, i) => {
        let items = {
          id: list.dept_code,
          icon: null,
          context: list.dept_name,
          active: list.active,
          open: false,
          subset: [],
          parentId: list.parentid
        }

        response.data.map(item => {

          if(list.dept_code === item.dept_code) {
            items.subset.push({
              id: item.dept_code,
              deptCode: item.dept_code,
              deptName: item.dept_name,
              context: item.user_name,
            })
          }
          if(i === length -1 && items.subset.length < 1) {
            items.subset = null
          }
        })
        return items

      })
      /*render(<Menu rootClass="inline" dataSource={arrayList} onClick={(item) => console.log(item)}/>, document.getElementById('root'));*/
    }))

