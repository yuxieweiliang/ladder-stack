import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import kn from '../../../assets/server'
import '../../style/main.less'
import warning from 'warning'

export class Column extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { context, colSpan, rowSpan } = this.props
    return (<th colSpan={colSpan} rowSpan={rowSpan}>{ context }</th>)
  }
}