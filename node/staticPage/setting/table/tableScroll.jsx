import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import kn from '../../../assets/server'
import '../../style/main.less'
import warning from 'warning'

export class TableScroll extends Component {
  constructor(props) {
    super(props);
  }

  // static defaultProps = data

  render() {
    return (<div className="table-scroll">

      <TableHeader ref="header"
                   {...this.props}/>

      <TableBody ref="body"
                 {...this.props}/>
    </div>);
  }
  componentDidUpdate() {
  }
  componentWillMount() {

  }
  componentWillReceiveProps() {

  }

  // 添加click事件
  componentDidMount() {
  }

}