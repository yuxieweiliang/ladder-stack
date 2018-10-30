import React, { Component } from 'react'
import { render } from 'react-dom'
import data from './data'
import _ from 'lodash'
import kn from '../../../assets/server'
import '../../style/main.less'
import warning from 'warning'
import { TableScroll } from './tableScroll'
import { TableLeft } from './tableLeft'
import { TableRight } from './tableRight'
import { THeader } from './tHeader'
import { TBody } from './tBody'
import { Group } from './group.jsx'
import { ColumnGroup } from './columnGroup.jsx'
import { Column } from './column.jsx'
import { menuId, getTreeCol, flatArray, flatFilter, normalizeColumns, treeMap, assemble } from './func'

import { CheckBox } from '../checkbox'





class Table extends Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this)
    this.bodyScroll = this.bodyScroll.bind(this)
  }
  state = {
    width: 0,
    style: 'table-position-left',
    header: {},
    body: {}
  }
  static defaultProps = data



  componentWillMount() {
    const { width, dataSource, rowSelection } = this.props
    this.setState({
      initialData: [...dataSource],
      dataSource
    })



    if(rowSelection) {
      const { selectKeys } = rowSelection
      let select = selectKeys ? [...selectKeys] : []
      this.setState({
        rowSelection: {
          ...this.defaultHeaders.rowSelection,
          ...rowSelection,
          selectKeys: select
        }
      })
    }





  }

  /**
   * 创建表格主体数据
   * @param keys
   */
  _createBodyData(keys) {
    return {
      style: {
        minWidth: this.props.width + 'px'
      },
      dataSource: this.state.dataSource,
      keys
    }
  }

  defaultHeaders = {
    rowSelection : {
      selections: {
        key: '',
        text: '',
        onSelect() {}
      },
      type: 'checkbox'
    },
    sort: {
      order: () => this._createSorter
    }
  }

  /**
   * 创建表格头部数据
   * @param keys
   * @param columnArray
   */
  _createHeaderData(keys, columnArray) {
    let tree = treeMap(columnArray, function(node) {
      return {
        ...node,
        search: <div key="1">fdsaf</div>
      }
    })

    return {
      style: {
        minWidth: this.props.width + 'px'
      },
      keys,
      dataSource: assemble(getTreeCol(tree)),
      sort: {
        order: this._createSorter.bind(this)
      },
      filter: {
        order: this._createFilter.bind(this)
      }
    }
  }

  /**
   * 创建过滤
   * @param callback
   */
  _createFilter(callback) {
    let { dataSource } = this.props
    dataSource = dataSource.filter(callback)
    this.setState({
      dataSource
    })
  }

  /**
   * 点击上下排序
   * @param callBack
   * @param order
   * @param columnKey
   */
  _createSorter(callBack, order, columnKey) {
    let { sorter, dataSource, initialData } = this.state


    if(!sorter) {

      dataSource = dataSource.sort(callBack)
    } else if(sorter && order !== sorter.order) {

      dataSource = dataSource.sort(callBack)

    } else {

      dataSource = [...initialData]
      order = null
    }
    this.setState({
      sorter:{
        order,
        columnKey
      },
      dataSource
    })
  }

  /**
   * 创建筛选checkbox
   * @param columnArray
   */
  _createSelect(columnArray) {
    let { rowSelection, dataSource } = this.state


    const key = columnArray[0].key
    let selectKeys = this.state.rowSelection.selectKeys // 用来存当前选中项的key
    const type = rowSelection.type || 'checkbox'

    // 如果存在，并且数组中还没有
    if(rowSelection.selections) {
      if(key !== type) {
        return ({
          selectRender: () => {
            let checkedAll = selectKeys.length === dataSource.length

            if(type === 'radio') {
              return '选择'
            }
            return <CheckBox type={type}
                          checked={checkedAll}
                          onChange={() => {

                            // 如果key里面的值，并不是全部，则把没有的再存进去
                            if(selectKeys.length !== dataSource.length) {
                              this.state.dataSource.map(item => {
                                if(selectKeys.indexOf(item.key) < 0) {
                                  selectKeys.push(item.key)
                                }
                              })
                            } else {
                              // 如果已经是所有值了，就把选中的清空
                              selectKeys = []
                            }

                            this.setState({
                              rowSelection: {
                                ...rowSelection,
                                selectKeys
                              }
                            })

                            if(rowSelection.onSelectAll) {
                              rowSelection.onSelectAll(selectKeys, )
                            }
                          }} />
          },
          width: 80,
          dataIndex: type,
          key: type,
          render: (text, item) => {
            return (<CheckBox type={type}
                              defaultChecked={selectKeys.indexOf(item.key) > -1}
                              checked={selectKeys.indexOf(item.key) > -1}
                              onChange={(e) => {

                                const other = _.filter(selectKeys,  list => list !== item.key)

                                if(type === 'radio') {
                                  selectKeys = [item.key]
                                } else {

                                  if(selectKeys.indexOf(item.key) < 0) {
                                    selectKeys.push(item.key)
                                  } else {
                                    selectKeys = other
                                  }
                                }

                                this.setState({
                                  rowSelection: {
                                    ...rowSelection,
                                    selectKeys
                                  }
                                })

                                if(rowSelection.onChange) {
                                  rowSelection.onChange(item.key, item,e.target.checked)
                                }
                              }}/>)
          }
        })
      }
    }
  }

  _getColumns() {
    let { rootClass, style, dataSource, columns, children, rowSelection } = this.props
    // 检查数据结构
    const columnArray = columns || normalizeColumns(children)
    const key = columnArray[0].key
    const type = rowSelection.type || 'checkbox'
    // 是否需要加载选择
    let checkbox = null

    // 如果添加checkbox
    if(rowSelection) {
      checkbox = this._createSelect(columnArray)

      // 如果第一个不是checkbox，则添加最前面，如果是，就把第一个替换掉。
      if(key != type) {
        columnArray.unshift(checkbox)
      } else {
        columnArray[0] = checkbox
      }
    }

    // 是否需要加载选择
    // const filter = this._createFilter(columnArray)


    // 是否需要排序
    // const sorter = this._createSorter(columnArray)

    return columnArray
  }

  render() {
    const { rootClass, style, dataSource, columns, children, rowSelection } = this.props
    const columnArray = this._getColumns()
    const keys = flatArray(columnArray).filter(item => item.key)
    const body = this._createBodyData(keys)
    const header = this._createHeaderData(keys, columnArray)
    // const childrens = _getRow(children)
    // let child = _getLength(childrens)



    return (<div className={'table table-fixed-header '} >
      <div className="table-content">
        <div className="table-scroll">

          <THeader {...header}/>
          <TBody {...body}/>


        </div>



        {/*

         {
         (this.state.width < width) && (
         <TableLeft ref="left"
         leftCol="1"
         {...this.state}
         {...this.props}/>
         )
         }



         {
         (this.state.width < width) && (
         <TableRight ref="right"
         rightCol="1"
         {...this.state}
         {...this.props}/>
         )
         }
         */}


      </div>
    </div>);
  }
  /*componentDidUpdate() {
   let { width } = this.state,
   _this = this,
   header = this.refs.header.refs.tableHeader,
   body = this.refs.body.refs.tableBody
   //leftT = this.refs.left.refs.tableLeft.refs.tableBody,
   //rightT = this.refs.right.refs.tableRight.refs.tableBody
   if(!this.state.body.height) {

   this.setState({
   header: {
   height: header.offsetHeight,
   width: header.offsetWidth,
   listH: header.querySelector('tr').offsetHeight,
   listW: header.querySelector('tr').offsetWidth,
   },
   body: {
   height: body.offsetHeight,
   width: body.offsetWidth,
   listH: body.querySelector('tr').offsetHeight,
   listW: body.querySelector('tr').offsetWidth,
   }
   })
   }

   }*/
  componentWillReceiveProps() {}

  bodyScroll() {
    const { children, width } = this.props
    let _this= this,
      header = this.refs.header.refs.tableHeader,
      body = this.refs.body.refs.tableBody
    let left = body.scrollLeft,
      right = left + body.offsetWidth,
      _width = body.scrollWidth

    /// 跟随滚动条联动
    header.scrollLeft = left

    if(_width <= width) {
      if(left === 0) {
        _this.setState({style: 'table-position-left'})
      }
      if(right >= width) {
        if(_this.state.style !== 'table-position-right') {
          _this.setState({style: 'table-position-right'})
        }
      }
      if(left !==0 && right < width){
        _this.setState({style: 'table-position-middle'})
      }
    } else {
      _this.setState({width: _width})
    }

  }
  scroll(e) {
    let body = this.refs.body.refs.tableBody,


      leftT = this.refs.left.refs.tableLeft.refs.tableBody || null,
      rightT = this.refs.right.refs.tableRight.refs.tableBody || null


    let top = e.target.scrollTop,
      arr = [body, leftT, rightT],
      i = 0

    for(i; i < arr.length; i++) {

      if(arr[i] == body) {
        this.bodyScroll()
      }

      if(arr[i] !== e.target) {
        arr[i].removeEventListener('scroll', scroll)
        /// 跟随滚动条联动
        arr[i].scrollTop = top
      }
    }
  }

  renderAgain() {
    let _this= this,
      body = this.refs.body.refs.tableBody,
      leftT = this.refs.left.refs.tableLeft.refs.tableBody,
      rightT = this.refs.right.refs.tableRight.refs.tableBody

    body.addEventListener('mouseover', function() {
      body.addEventListener('scroll', _this.scroll, false);
    })
    body.addEventListener('mouseout', function() {
      body.removeEventListener('scroll', _this.scroll);
    })

    leftT.addEventListener('mouseover', function() {
      leftT.addEventListener('scroll', _this.scroll, false);
    })
    leftT.addEventListener('mouseout', function() {
      leftT.removeEventListener('scroll', _this.scroll);
    })

    rightT.addEventListener('mouseover', function() {
      rightT.addEventListener('scroll', _this.scroll, false);
    })
    rightT.addEventListener('mouseout', function() {
      rightT.removeEventListener('scroll', _this.scroll);
    })
  }

  // 添加click事件
  componentDidMount() {
    let _this= this

    // 初始化
    // this.bodyScroll()


    if(this.props.width > window.innerWidth) {
      //this.renderAgain()
    }

    // 当屏幕大小改变时
    window.addEventListener('resize', function() {
      _this.setState({width: window.innerWidth})
      if(_this.props.width > window.innerWidth) {
        // _this.renderAgain()
      }
    }, false);
  }

}

const rowSelection = {
  selectKeys: ['1'],
  onChange: (selectedRowKeys, selectedRows) => {
    //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    //console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    //console.log(selected, selectedRows, changeRows);
  },
};


//
render(<Table {...data } rowSelection={rowSelection}/>, document.getElementById('root'));










/*class TableList extends Component {
 render() {
 return (
 <Table  {...this.props}>
 <Column context="a1" dataIndex="a1" key="a1" fixed="left"/>
 <ColumnGroup context="a0">
 <Column context="b1" dataIndex="b1" key="b1"/>
 <Column context="c1" dataIndex="c1" key="c1"/>
 <Column context="c1" dataIndex="c1" key="c2"/>
 <Column context="c2" dataIndex="c2" key="c3"/>
 <Column context="c2" dataIndex="c2" key="c4"/>
 <Column context="c1" dataIndex="c1" key="c5"/>
 <Column context="c1" dataIndex="c1" key="c6"/>
 </ColumnGroup>
 <Column context="a2" dataIndex="a2" key="a2"/>
 <Column context="a3" dataIndex="a3" key="a3"/>
 <Column context="a4" dataIndex="a4" key="a4"  fixed="right"/>
 {/!*<TableLeft/>*!/}
 </Table>
 )
 }
 }*/




/*
 */

/*
 * Array.prototype.max = function() {
 return Math.max.apply({},this)
 }
 Array.prototype.min = function() {
 return Math.min.apply({},this)
 }*/






