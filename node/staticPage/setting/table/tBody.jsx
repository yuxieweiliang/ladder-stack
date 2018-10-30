import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import kn from '../../../assets/server'
import '../../style/main.less'
import warning from 'warning'
import { Group } from './group.jsx'
import { ColumnGroup } from './columnGroup.jsx'
import { Column } from './column.jsx'
import { menuId, getTreeCol, flatArray, flatFilter, normalizeColumns, treeMap } from './func'

export class TBody extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { dataSource, style, keys } = this.props


    return (
      <div className="table-body" ref="tableBody">
        <table data-ref="body" style={style}>
          <Group keys={keys}/>
          <tbody className="t-body">
          {
            dataSource.map((items, i) => {

              return (
                <tr key={i}>
                  {
                    keys.map((column, j) => {
                      let context = items[column.key]
                      if(column.render) {
                        context = column.render(items[column.key], items)
                      }

                      // console.log(context)
                        return (
                          <td  key={j}>{context}</td>
                        )

                      })
                  }
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}