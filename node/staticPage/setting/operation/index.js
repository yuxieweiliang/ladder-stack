
import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import { typeOf } from '../../../assets/method'
import '../../style/main.less'
import './style.less'
let id = 0;








class PopupView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }

  _createBody() {
    const { type, context, children } = this.props
    if(context && type === 'alert') {
      return (
        <p className="popup-context">
          {context}
        </p>
      )
    } else {
      return children
    }
  }

  _createHeader() {
    const { title = '标题', onClick } = this.props
    if(title) {
      return (
        <div className="popup-header">
          <div className="popup-title">
            <h2>{title}</h2>
          </div>
          <div className="popup-close">
            <i className="fa fa-close" onClick={() => onClick()}/>
          </div>
        </div>
      )
    }
  }

  _closePopup() {
    this.setState({
      show: false
    })
  }

  _createButton() {
    const {  btn, onClick } = this.props
    const btnEle = []
    // 如果有btn
    if(btn) {
      // 取消
      if(btn.cancel) {
        btnEle.push(<button key="cancel" className="btn btn-default"
                         onClick={() => onClick()}>
          {typeOf(btn.cancel, 'string') ? btn.cancel : '取消'}
        </button>)
      }
      // 确定
      if(btn.sure) {
        btnEle.push(<button key="sure" className="btn btn-primary"
                         onClick={() => onClick('sure')}>
          {typeOf(btn.sure, 'string') ? btn.sure : '确定'}

        </button>)
      }

      // 自定义
      if(btn.custom) {
        if(typeOf(btn.custom, 'string')) {
          btnEle.push(<button key="custom"
                           className="btn btn-primary"
                           onClick={() => onClick(btn.custom)}>
            {btn.custom}
          </button>)
        }
        if(typeOf(btn.custom, 'array')) {
          btn.custom.map((item, i) => {
            btnEle.push(<button key={i}
                             className="btn btn-primary"
                             onClick={() => onClick(item)}>
              {item}
            </button>)
          })
        }
      }

      return (
        <div className="popup-btn">
          {btnEle}
        </div>
      )
    }
  }

  _createRootClass() {
    const { type, size } = this.props
    let className = 'popup'
    if(type === 'alert') {
      className += ' popup-alert'
    }

    if(size === 'sm') {
      className += ' popup-sm'
    }

    return className
  }
  _createMask() {
    const { onClick } = this.props
    return (
      <div className="popup-mask" onClick={() => onClick()}/>
    )
  }
  render() {

    return (
      <div className={this._createRootClass()}>
        <div className="popup-container">
          {
            this.state.show && (
              <div className="popup-content">
                {this._createHeader()}
                <div className="popup-body">
                  {this._createBody()}
                </div>
                {this._createButton()}
              </div>
            )
          }
        </div>
        {
          this._createMask()
        }
      </div>
    )
  }
}
class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  _createPopup() {
    const { popup } = this.state

    if(popup) {
      return (
        <PopupView {...this.state.popup}>
          <div className="height-400">fdsafdsafa</div>
        </PopupView>

      )
    }

  }
  render() {
    return (
      <div className="layout layout-content-scroll">
        <header className="layout-header flex"/>
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
                {
                  this._createPopup()
                }
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => {
                this.setState({
                  popup: {
                    size: 'sm',
                    context: '这里是提示信息',
                    btn: {
                      sure: true,
                      cancel: true,
                      custom: '怎么回事'
                      },
                    onClick: () => {
                      this.setState({
                        popup: null
                      })
                    },
                  }
                })
              }}>
                打开
              </button>
            </div>
          </div>
        </article>
        <footer className="layout-footer"/>
      </div>
    )
  }
}

render(<MyComponent  />, document.getElementById('root'));