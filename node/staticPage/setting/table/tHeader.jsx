import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import kn from '../../../assets/server'
import { typeOf, getOffset } from '../../../assets/method'
import '../../style/main.less'
import warning from 'warning'
import { Group } from './group.jsx'
import { ColumnGroup } from './columnGroup.jsx'
import { Column } from './column.jsx'


export class THeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {}
    }
  }


  _onFilter(e, column, istrue) {
    const { filter } = this.state
    const { style }  = filter
    const display = style && style.display === 'block' ? 'none' : 'block'
    const offset = getOffset(this.refs.tableHeader)
    const _offset = getOffset(e.target)
    const active = filter.active ? [...filter.active] : []
    let _filter = {
      ...filter,
      show: !filter.show,
      style: {
        display,
        top: _offset.top - offset.top + e.target.offsetHeight + 10,
        left: _offset.left - offset.left - e.target.offsetWidth
      },
      active
    }

    // 如果是点击确定
    if(istrue) {
      // 如果筛选项目全部都被取消，则返回所有
      if(filter.active.length === 0) {
        this.props.filter.order(() => true)
      } else {
        // 如果有筛选项目，则筛选
        this.props.filter.order(function(item) {
          return column.onFilter(filter.active, item)
        })
      }

    }

    this.setState({ filter: _filter })
    //
  }
  _filter(option) {
    const { filter } = this.state
    let _active = [...filter.active] // 复制
    const has = _.filter(_active, item => item.value === option.value)
    const other =  _.filter(_active, item => item.value !== option.value)

    if(has.length > 0) {
      this.setState({filter: {
        ...filter,
        active:  other
      }})
    } else {
      _active.push(option)
      this.setState({filter: {
        ...filter,
        active:  _active
      }})
    }

  }
  _createFilter(column) {
    const { filter } = this.state
    if(column.filters) {
      // console.log(column.filters) <span key={i}>{items.text}</span>
      return (
        <span className="table-column-sorter">
          <abbr className="fa fa-filter" title="" onClick={(e) => this._onFilter(e, column, false)}/>
          {
            <ul ref="dropDown" className="dropdown-menu" style={filter && filter.style}>
              {
                column.filters.map((items, i) => {
                  return (
                    <li key={i}>
                      <a href="javascript:void(0)">
                        <input type="checkbox" onChange={() => this._filter(items)}/>
                        {items.text}
                      </a>
                    </li>
                  )
                })
              }
              <li className="text-right between">
                <button className="btn-default btn-sm" onClick={(e) => this._onFilter(e, column, false)}>取消</button>
                <button className="btn-primary btn-sm" onClick={(e) => this._onFilter(e, column, true)}>确定</button>
              </li>
            </ul>
          }

        </span>
      )
    }

  }

  /**
   * 排序 ascend：正序，descend：反序
   * @param column
   * @param order
   * @private
   */
  _sorter(column, order) {
    const { sort } = this.props

    if(order === 'ascend') {

      // 点击上箭头，排列正序
      sort.order((prev, next) => column.sorter(prev, next), order, column.key)
    } else if(order === 'descend') {

      // 点击下箭头，排列反序
      sort.order((prev, next) => -column.sorter(prev, next), order, column.key)
    } else {
      // 当 order === false 的时候， 或 order === true 的时候
    }
  }
  /**
   * 可选参数 'ascend' 'descend' false
   * @param column
   * @returns {XML}
   * @private
   */
  _createSorter(column) {
    const { sort,  } = this.props
    let sortOrder = null

    if(column.sortOrder) {
      sortOrder = column.sortOrder
    }
    // console.log(sort)
    if(column.sorter) {

      return (
        <span className="table-column-sorter">
          <abbr className="caret-up fa fa-caret-up" title="" onClick={() => this._sorter(column, 'ascend')}/>
          <abbr className="caret-down fa fa-caret-down active" title="" onClick={() => this._sorter(column, 'descend')}/>
        </span>
      )
    }
  }

  _createTd(column, j, rowSpan) {
    const { dataSource, style,  } = this.props
    const filters = this._createFilter(column)
    const sorter = this._createSorter(column)

    // 如果有child，则清空rowSpan
    if(column.children) {
      rowSpan = ''
    }

    if(column.col === 1) {
      column.col = ''

    }
    if(rowSpan === 1) {
      rowSpan = ''

    }



    // console.log(column)
    return (
      <th key={'_' + j}
          colSpan={column.col}
          rowSpan={rowSpan}
      >
        <div className="table-title-inner">

          {/*  如果存在需要全选  */}
          {column.selectRender && column.selectRender(this.props)}

          {/*   如果只是显示标题       */}
          {column.title}

          {sorter}
          {filters}
        </div>
        </th>
    )
  }

  render() {
    const { dataSource, style, keys } = this.props
    const length = dataSource.length
    return (
      <div ref="tableHeader" className="table-header" >
        <table data-ref="head" style={style}>
          <Group keys={keys}/>

          <thead className="t-head">
          {
            dataSource.map((row, i) => {
              return (<tr key={i}>
                {
                  row.map((column, j) => this._createTd(column, j, length -i))
                }
              </tr>)

            })
          }
          </thead>
        </table>
      </div>
    )
  }
  componentDidMount() {}
  componentWillUpdate() {}
}