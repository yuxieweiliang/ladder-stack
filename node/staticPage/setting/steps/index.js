
import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import { typeOf } from '../../../assets/method'
import '../../style/main.less'

class Step extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static defaultProps = {
    disabled: false,
    placeholder: '输入……',
    mode: 'select',
    defaultValue: null,
    size: null,
    onChange(){},
  }

  /**
   * 计算rootClass
   * @returns {string}
   * @private
   */
  _rootClass() {
    const { size, current, itCls } = this.props
    let className = 'steps-item'

    if(size === 'sm') {
      className += ' select-sm'
    }
    // 已完成
    if(current === 'finish') {
      className += ' steps-status-finish'
    }
    // 当前
    if(current === 'process') {
      className += ' steps-status-process'
    }
    // 等待
    if(current === 'wait') {
      className += ' steps-status-wait'
    }

    // 是否有错误或提醒
    if(itCls) {
      className += ` steps-${itCls}`
    }

    console.log(this.props)

    return className
  }

  _createIcon() {
    const { index, icon, progressDot } = this.props
    let inner = index + 1

    //
    if(progressDot) {
      return (
        <div className="steps-head-inner">
          <i className="steps-icon anticon anticon-check"/>
        </div>
      )
    }

    // 如果有自定义icon 则优先使用自定义
    if(icon) {
      return icon
    }

    return (
      <div className="steps-head-inner">
        <i className="steps-icon anticon anticon-check">{ inner }</i>
      </div>

    )
  }
  render() {
    const { title, description} = this.props
    return (
      <div className={this._rootClass()}>
        <div className="steps-tail"><i/></div>
        <div className="steps-step">
          <div className="steps-head">
              {this._createIcon()}

          </div>
          <div className="steps-main">
            <div className="steps-title">{title}</div>
            <div className="steps-description">{description}</div>
          </div>
        </div>
      </div>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  /*componentWillUnmount() {

  }*/
}

class Steps extends Component {
  constructor(props) {
    super(props)
  }
  static Step = Step
  static defaultProps = {
    current: null,
    status: null,
    size: null,
    progressDot: null,
    direction: 'horizontal',
  }
  /**
   * 计算rootClass
   * @returns {string}
   * @private
   */
  _rootClass() {
    const { size, direction, progressDot } = this.props
    let className = 'steps'

    if(size === 'sm') {
      className += ' steps-small'
    }

    // 步骤条方向
    if(direction === 'vertical') {
      // 纵向
      className += ' steps-vertical'
    } else {
      // 横向
      className += ' steps-horizontal'
    }

    if(progressDot) {
      className += ' steps-progress'
    }

    return className
  }

  _createChildren() {
    let { children, current, status, progressDot } = this.props
    return children.map((child, i) => {
      let _cur = ''
      let itCls = ''
      // 计算当前状态
      if(current > i) {
        _cur = 'finish'
        if(status && (i === current - 1)) {
          itCls = `prev-${status}`
        }
      } else if(current === i) {
        _cur = 'process'
        if(status) {
          itCls = status
        }
      } else {
        _cur = 'wait'
      }


      // 返回
      return ({
        ...child,
        props: {
          ...child.props,
          current: _cur,
          itCls,
          index: i,
          progressDot
        }
      })
    })
  }
  render() {
    return (
      <div className={this._rootClass()}>
        {this._createChildren()}
      </div>
    )
  }
}
class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state= {}
  }
  render() {

    return (
      <div className="layout layout-content-scroll">
        <header className="layout-header flex"/>
        <article className="layout-content">
          <div className="layout-aside">
            <div className="height-400"/>
            <div className="height-400"/>
            <div className="height-400"/>
          </div>
          <div className="layout-subject">
            <div className="height-40"/>
            <div className="row">
              <div className="ratio-12">
                {/*       status="warning" direction="vertical" size="sm"     ×                              */}
                <Steps current={1} progressDot>
                  <Steps.Step title="Finished" description="This is a description." icon={<span className="fa fa-scissors"/>}>111</Steps.Step>
                  <Steps.Step title="In Progress" description="This is a description." icon={<span className="fa fa-warning"/>}>111</Steps.Step>
                  <Steps.Step title="Waiting" description="This is a description." icon={<span className="fa fa-eraser"/>}>111</Steps.Step>
                </Steps>
              </div>
            </div>

          </div>
        </article>
        <footer className="layout-footer"/>
      </div>
    )
  }
}

render(<MyComponent  />, document.getElementById('root'));