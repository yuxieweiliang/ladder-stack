import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import kn from '../../../assets/server'
import '../../style/main.less'
import warning from 'warning'

export class Group extends Component {
  render() {
    const { keys } = this.props
    return(
      <colgroup>
        {
          _.map(keys, (item, i) => {
            const width = item.width + 'px'

            return <col key={i} style={{width: width, minWidth: width}}/>


          })
        }
      </colgroup>
    )
  }
}