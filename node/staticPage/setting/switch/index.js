
import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import '../../style/main.less'
import './style.less'

class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static defaultProps = {
    disabled: false,
    defaultChecked: false,
    size: null,
    onChange(){},
  }
  _onClick() {
    const { onChange, disabled } = this.props
    const checked = !this.state.checked

    if(disabled) {
      return
    }
    // 返回
    onChange(checked)

    // 修改
    this.setState({checked})
  }

  _innerHtml() {
    const { checkedChildren, unCheckedChildren } = this.props
    let icon = null

    if(this.state.checked) {
      icon = checkedChildren ? checkedChildren : '开'
    } else {
      icon = unCheckedChildren ? unCheckedChildren : '关'
    }


    return icon
  }

  _rootClass() {
    const { size } = this.props

    let className = 'switch'
    if(size == 'sm') {
      className += ' switch-sm'
    }
    return className

  }
  render() {
    const { disabled } = this.props

    return (
      <span className={this._rootClass()}
            data-checked={this.state.checked}
            disabled={disabled}
            onClick={() => this._onClick()}>
          <span className="switch-inner">
            {this._innerHtml()}
            </span>
        </span>
    )
  }
  componentWillMount() {
    const { defaultChecked } = this.props
    this.setState({
      checked: defaultChecked
    })
  }
}




class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state= {}
  }
  render() {
    const option = {
      type: 'alert',
      onChange: (type) => {
        console.log(type)
      },
    }

    return (
      <div className="layout layout-content-scroll">
        <header className="layout-header flex"></header>
        <article className="layout-content">
          <div className="layout-aside">
            <div className="height-400">2</div>
            <div className="height-400">2</div>
            <div className="height-400">2</div>
          </div>
          <div className="layout-subject">
            <div className="height-40"></div>
            <div className="row">
              <div className="width-100"></div>
              <div>
                <Switch {...option} disabled={this.state.disabled} defaultChecked={true}/>
                <button onClick={() => this.setState({disabled: !this.state.disabled})}>agss</button>
              </div>
            </div>
          </div>
        </article>
        <footer className="layout-footer"></footer>
      </div>
    )
  }
}

render(<MyComponent  />, document.getElementById('root'));