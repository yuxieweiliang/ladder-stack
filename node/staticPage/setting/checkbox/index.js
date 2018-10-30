
import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import '../../style/main.less'

export class CheckBox extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static defaultProps = {
    checked: false,
    disabled: false,
    defaultChecked: false,
    indeterminate: false,
    onChange(){},
  }

  _createChild() {
    const { children, defaultChecked } = this.props
    if(children) {
      return (
        <span>{children}</span>
      )
    }
  }
  _checked() {
    this.setState({
      checked: !this.state.checked
    })
  }
  render() {
    const { onChange, disabled, checked } = this.props
    const child = this._createChild()
    return (
      <label className="checkbox">
        <input type="checkbox"
               disabled={disabled}
               checked={this.state.checked}
               onChange={(e) => onChange(e)}
               onClick={() => this._checked()}/>
          <span className="icon"/>
        {child}
      </label>
    )
  }
  componentWillMount() {
    const { defaultChecked } = this.props
    if(defaultChecked){
      this.setState({
        checked: defaultChecked
      })
    } else {
      this.setState({
        checked: false
      })
    }
  }
  componentWillReceiveProps(nextProps, prevProps) {
    const { checked } = nextProps
    this.setState({checked})
  }
  componentDidMount() {}
  componentWillUnmount() {}
}

class Group extends Component {}

export class CheckBoxComponent extends Component {
  constructor(props) {
    super(props)
    this.state= {}
  }
  render() {

    return (
      <div>

        <CheckBox  onChange={(e) => console.log(e.target.checked)}/>
        <CheckBox  defaultChecked disabled onChange={(e) => console.log(e.target.checked)} />
      </div>
    )
  }
}


//
render(<CheckBoxComponent />, document.getElementById('checkbox'));

