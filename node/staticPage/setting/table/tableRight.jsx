import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import kn from '../../../assets/server'
import '../../style/main.less'
import warning from 'warning'

export class TableRight extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    col: {width: '300px'},
    item: [{width: '300px'}]
  }
  render() {
    const { children } = this.props
    const item = _getRow(children)
    let child = _getLength(item)
    return (
      <div className="table-fixed-right">

        <TableHeader  allkey={item.key} child={child}  width="100px" {...this.props}/>

        <TableBody ref="tableRight" allkey={item.key}  width='100px' minWidth='100px' {...this.props}/>
      </div>
    )
  }
}