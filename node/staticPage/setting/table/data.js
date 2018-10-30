import React from 'react'

export default {
  rootClass: 'inline',
  width: '1100',

  // 表格大小，行高
  size: 'middle',

  // 是否显示边框
  bordered: true,

  // 表头
  title:() => 'Header',

  // 表尾
  footer: () => 'Here is footer',

  // 显示头部
  showHeader: true,

  // 显示分页
  pagination: true,

  // 行选择
/*  rowSelection: {

    onChange: (selectedRowKeys, selectedRows) => {
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      //console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      //console.log(selected, selectedRows, changeRows);
    },
  },*/

  // 滚动
  scroll: undefined,

  // 显示附加信息
  expandedRowRender: record => <p>{record.description}</p>,

  /**
   * title: 当前显示的内容
   * dataIndex: 当前列的名字
   * key: key
   */
  dataSource: [
    {key: '1', colSpan: 0, first: '胡', last: '彦斌', sex: '女', name: '胡彦斌', fal:'fdsa', age: 32, address: '西湖区湖底公园1号'},
    {key: '2', colSpan: 2, name: '胡彦祖', checked: true, sex: '男', first: '胡', last: '彦祖', age: 42, address: '西湖区湖底公园1号', edit: 'edit_this' },
    {key: '3', colSpan: 0, first: '胡', last: '彦斌', sex: '女', name: '胡彦斌', fal:'fdsa', age: 32, address: '西湖区湖底公园1号'},
    {key: '4', colSpan: 2, name: '胡彦祖', sex: '男', first: '胡', last: '彦祖', age: 42, address: '西湖区湖底公园1号', edit: 'edit_this' }
  ],



  /**
   * title: 当前显示的内容
   * dataIndex: 当前列的名字
   * key: key
   * filters: 筛选
   * onFilter: 筛选
   */
  columns: [
    {
      title: '姓名', width: 80, fixed: 'left', dataIndex: 'name', key: 'name',
      sorter: (a, b) => {
        // console.log(a.age - b.age)
        return a.age - b.age
      },
      sortOrder: true,
    },
    {
      title: '性别', width: 40, fixed: 'left', dataIndex: 'sex', key: 'sex',
      filters: [
        {text: 'Joe', value: '男',},
        {text: 'John', value: '女',}
        ],
      onFilter: (value, record) => {
        return (value.map(item => item.value).indexOf(record.sex) > -1)
      }//record.sex.indexOf(value.map(item => item.value)) > -1 //console.log(record.sex === '男'),
    },
    {
      title: '用户',
      children: [
        {title: '年龄', dataIndex: 'age', key: 'age', width: 50, sorter: (a, b) => a.age - b.age},
        {title: '姓名', children: [
          {title: '姓', dataIndex: 'first', key: 'first', width: 60, sorter: (a, b) => a.age - b.age},
          {title: '名', dataIndex: 'last', key: 'last', width: 60, sorter: (a, b) => a.age - b.age}
          ]
        }
        ]
    },
    {title: '住址', width: 60, fixed: 'right', dataIndex: 'address', key: 'address', },
    {
      title: '编辑', width: 60, fixed: 'right', dataIndex: 'edit', key: 'edit',
      render: (node, nodes) => {
        // console.log(nodes)
        return (
          <a onClick={() => console.log(node)} href="#">{node}</a>
        )
      },
    }
  ],

}