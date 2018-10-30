import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import kn from '../../../assets/server'
import '../../style/main.less'
import warning from 'warning'

export class TableLeft extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    col: {width: '200px'},
    item: [{width: '200px'}]
  }
  render() {
    const { children } = this.props
    const item = _getRow(children)
    let child = _getLength(item)

    return (
      <div className="table-fixed-left">

        <TableHeader  allkey={item.key} width="100px" child={child} {...this.props}/>

        <TableBody ref="tableLeft" allkey={item.key} width='100px' minWidth='100px' {...this.props}/>

      </div>
    )
  }
}