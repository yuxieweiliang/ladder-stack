
import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import { typeOf } from '../../../assets/method'
import '../../style/main.less'
import './style.less'



const notificationInstance = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPlacement = 'topRight';
let defaultGetContainer;


const type = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

function getPlacementStyle(placement) {
  let style;
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top: defaultTop,
        bottom: 'auto',
      };
      break;
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom: defaultBottom,
      };
      break;
    case 'bottomRight':
      style = {
        right: 0,
        top: 'auto',
        bottom: defaultBottom,
      };
      break;
    default:
      style = {
        right: 0,
        top: defaultTop,
        bottom: 'auto',
      };
  }
  return style;
}
function  notice(type) {
  switch (type) {
    case 'success':
      return 'check-circle-o';
      break;
    case 'info':
      return 'info-circle-o';
      break;
    case 'error':
      return 'cross-circle-o';
      break;
    case 'warning':
      return 'exclamation-circle-o';
      break;
    default:
      return 'info-circle';
  }
}


class PopupView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _createButton(btn) {
    if(btn) {
      return (
        <div className="notification-btn">
          <button className="btn btn-primary"
                  onClick={() => btn.onClick()}>
            {typeOf(btn.text, 'string') ? btn.text : '确定'}

          </button>
        </div>
      )
    }
  }

  _createRootClass(type, size, direction) {
    let className = 'notification'

    if(size === 'sm') {
      className += ' notification-sm'
    }
    if(size === 'lg') {
      className += ' notification-lg'
    }

    return className
  }


  _createLeftIcon(icon) {
    if(icon) {
      return (
        <div className="notification-left">
          {
            icon
          }
        </div>
      )
    }
  }


  static defaultProps = {
    direction: 'topRight'
  }
  render() {
    const { type, size, direction, message, description, btn, icon } = this.props

    return (
      <div className={this._createRootClass(type, size, direction)}>
        <div className="notification-close">
          <span className="icon-close"/>
        </div>
        <div className="notification-content">
          <div className="notification-body">
            {
              this._createLeftIcon(icon)
            }

            <div className="notification-right">

              <div className="notification-header">
                <h2>{message}</h2>
              </div>
              <p>{description}</p>
            </div>
          </div>
          {this._createButton(btn)}
        </div>
      </div>
    )
  }
}


let notifications = {
  icon: 'info-circle',
  dom: {},
  render(option) {
    const dom = document.createElement('div')
    this.dom[option.direction].append(
      render(
        <div className="notification-list">
          <PopupView {...option}/>
        </div>,
        dom
      )
    )
  },
  init(option) {

    const dom = document.createElement('div')
    const className = 'notification-' + (option.direction || defaultPlacement)
    const style = getPlacementStyle(option.direction)

    if(!this.dom[option.direction]) {
      this.dom[option.direction] = render(<div className={className} style={style}/>, dom)
      document.body.append(this.dom[option.direction])
    }
  },
  open(option) {
    this.init(option)
    this.render(option)
  }

};

['success', 'info', 'error', 'warning']
  .map(item => notifications[item] = (option) => {
    const icon = <span className={notice(item)}/>
    notifications.init(option, )


    notifications.render({...option, icon})
  })



class MyComponent extends Component {



  _showAlert(popup) {
    notifications.open(popup);
  }


  _showAlerts(popup) {
    notifications.success(popup);
  }



  render() {
    const popup = {
      type: 'alert',
      size: 'sm',
      message: '标题',
      // icon: <span className="icon-close"></span>,
      description: '谁知道你想干嘛谁知道你想干嘛谁知道你想干嘛谁知道你想干嘛',
      /*btn: {
        text: '谁知道你想干嘛',
        onClick(){}
      }*//*,
      body: {
        context: '这里是提示信息',
      }*/
    }

    const popup2 = {
      direction: 'bottomLeft',
      type: 'alert',
      size: 'sm',
      message: '标题',
      // icon: <span className="icon-close"></span>,
      description: '谁知道你想干嘛谁知道你想干嘛谁知道你想干嘛谁知道你想干嘛',
      /*btn: {
        text: '谁知道你想干嘛',
        onClick(){}
      }*//*,
      body: {
        context: '这里是提示信息',
      }*/
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
                {/*<PopupView {...popup}><div className="abdc">fdsafdsafa</div></PopupView>*/}
                <button onClick={() => this._showAlert(popup)}>创建</button>
                <button onClick={() => this._showAlerts(popup2)}>创建</button>
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