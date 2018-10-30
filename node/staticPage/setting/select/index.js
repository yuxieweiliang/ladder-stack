
import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import { typeOf } from '../../../assets/method'
import '../../style/main.less'

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this._onFocus = this._onFocus.bind(this)
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
    const { size, disabled } = this.props
    const { focused } = this.state
    let className = 'select'

    if(size == 'sm') {
      className += ' select-sm'
    }
    if(focused) {
      className += ' select-selection-open'
      className += ' select-selection-focused'
    }
    if(disabled) {
      className += ' select-selection-disabled'
    }


    return className
  }

  /**
   * 计算input class
   * @returns {string}
   * @private
   */
  _createSelectionClass() {
    const { value } = this.state
    const { mode } = this.props
    let className = 'select-selection'

    if(mode === 'select' || mode === 'combobox') {
      className += ' select-selection-single'
    } else if (mode === 'multiple' || mode === 'tags') {
      className += ' select-selection-multiple'
    }

    if(!value || (typeOf(value, 'set') && value.size === 0)) {
      className += ' select-selection-placeholder'
    }
    return className
  }

  _onFocus(e, boolen) {
    // 阻止事件冒泡
    e.preventDefault()

    // 绑定事件
    if(boolen) {
      document.addEventListener('click', this._onFocus)
    }

    this.setState({
      focused: boolen === true
    })

    // 移除document的事件
    if(!boolen) {
      document.removeEventListener('click', this._onFocus)
    }
  }

  /**
   * 点击列表
   * @param e
   * @param item
   * @private
   */
  _onClickItems(e, item) {
    const { mode } = this.props

    e.preventDefault();
    if(e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }

    if(mode === 'select' || mode === 'combobox') {
      this.setState({
        value: item.children,
        focused: false
      })
      // 移除document的事件
      document.removeEventListener('click', this._onFocus)
    } else {
      const value = this.state.value

      if(value.has(item.children)) {
        value.delete(item.children)
      } else {
        value.add(item.children)
      }
      this.setState({
        value
      })
    }
  }

  /**
   * 是否显示ICON
   * @returns {XML}
   * @private
   */
  _createIcon() {
    const { mode } = this.props
    if(mode !== 'select') {
      return
    }

    return (
      <div className="select-icon-box">
        <span className="fa fa-angle-down"/>
      </div>
    )
  }

  /**
   * 获取input的值，或者是选中的项
   * @returns {XML}
   * @private
   */
  _createMultiple() {
    const { value } = this.state
    const { mode, placeholder } = this.props

    if(mode === 'select' || mode === 'combobox') {
      return this.state.value || placeholder
    }

    if(!value.size) {
      return placeholder
    }
    return (
      <ul>
        {
          Array.from(value).map((item, i) => {
            return (
              <li key={i}
                  className="select-selection-choice">
                {item}
              </li>
            )
          })
        }
      </ul>
    )
  }

  /**
   * 创建input
   * @returns {XML}
   * @private
   */
  _createSelection() {
    const { mode, placeholder, children } = this.props
    const options = children.map(item => item.props)

    if(mode === 'combobox') {
      return <input type="text"
                    role={mode}
                    value={this.state.value || ''}
                    placeholder={placeholder}
                    className={this._createSelectionClass()}
                    onClick={(e) => this._onFocus(e, true)}
                    onChange={(e) => {

                      // const array = Array.from()

                      this.setState({
                        value: e.target.value,
                        options: options.filter(item => (
                          item.children.indexOf(e.target.value) > -1
                        ))
                      })
                    }
                    }/>
    }

    return (
      <div type="text"
           role={mode}
           className={this._createSelectionClass()}
           onClick={(e) => this._onFocus(e, true)}>
        {
          this._createMultiple()
        }
        {
          this._createIcon()
        }
      </div>
    )

  }

  /**
   * 创建下拉列表
   * @returns {XML}
   * @private
   */
  _createDropDown() {
    const { mode } = this.props
    const { options, value } = this.state


    return (
      <ul className="dropdown-menu">
        {
          options.map((item, i) => {
            let clsName = null
            let hasItem = null

            if (mode === 'multiple' || mode === 'tags') {
              hasItem = !!value.has(item.children)
              clsName = 'fa fa-check'
            }
            return (
              <li key={i}
                  className={clsName}
                  aria-selected={hasItem}
                  value={item.value}
                  onClick={(e) => this._onClickItems(e, item)}>
                <a>{item.children}</a>
              </li>
            )
          })
        }
      </ul>
    )
  }
  render() {
    return (
      <div className={this._rootClass()}>
        {
          this._createSelection()
        }
        {
          this._createDropDown()
        }
      </div>
    )
  }
  componentWillMount() {
    const { children, defaultValue, mode } = this.props
    let value = defaultValue
    if(mode === 'multiple' || mode === 'tags') {
      value = new Set(defaultValue)
    }
    this.setState({
      options: children.map(item => item.props),
      value
    })
  }
  componentDidMount() {
    this.setState({
      focused: false
    })
  }
  /*componentWillUnmount() {

  }*/
}




class Option extends Component {}
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
            <div className="height-400">2</div>
            <div className="height-400">2</div>
            <div className="height-400">2</div>
          </div>
          <div className="layout-subject">
            <div className="height-40"></div>
            <div className="row">
              <div className="ratio-3">
                <Select>
                  <Option value="111">111</Option>
                  <Option value="222">222</Option>
                  <Option value="333">333</Option>
                  <Option value="444">444</Option>
                  <Option value="555">555</Option>
                  <Option value="666">666</Option>
                </Select>
              </div>
              <div className="ratio-3">
                <Select mode="combobox">
                  <Option value="111">111</Option>
                  <Option value="222">222</Option>
                  <Option value="333">333</Option>
                  <Option value="444">444</Option>
                  <Option value="555">555</Option>
                  <Option value="666">666</Option>
                </Select>
              </div>
              <div className="ratio-3">
                <Select mode="multiple" defaultValue={['a10', 'c12']}>
                  <Option value="111">111</Option>
                  <Option value="222">222</Option>
                  <Option value="333">333</Option>
                  <Option value="444">444</Option>
                  <Option value="555">555</Option>
                  <Option value="666">666</Option>
                </Select>
              </div>
              <div className="ratio-3">
                <Select mode="tags">
                  <Option value="111">111</Option>
                  <Option value="222">222</Option>
                  <Option value="333">333</Option>
                  <Option value="444">444</Option>
                  <Option value="555">555</Option>
                  <Option value="666">666</Option>
                </Select>
              </div>
            </div>
            <div className="height-40"></div>
            <div className="row">
              <div className="ratio-3">
                <Select defaultValue="fdsafdsa">
                  <Option value="111">111</Option>
                  <Option value="222">222</Option>
                  <Option value="333">333</Option>
                  <Option value="444">444</Option>
                  <Option value="555">555</Option>
                  <Option value="666">666</Option>
                </Select>
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