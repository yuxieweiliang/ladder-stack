
import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import '../../style/main.less'
import './style.less'
let id = 0;








class PagingView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaults: [2, 3, 4, 5, 6],
      page: 1
    }
  }

  _setPage(page) {
    const { defaultCurrent, total, showSizeChanger } = this.props
    const start = 2
    const end = total -1
    let move = 2
    let defaults = []

    if(page > start + 1 && page < end - 1) {
      for(let i = -move; i < 3; i++ ) {
        defaults.push(page + i)
      }

    } else if(page === start + 1) {
      for(let i = -1; i < 4; i++ ) {
        defaults.push(page + i)
      }
    } else if(page === end-1) {
      for(let i = -3; i < 2; i++ ) {
        defaults.push(page + i)
      }
    } else {
      defaults = this.state.defaults
    }

    this.setState({
      page,
      defaults
    })
  }

  _createPageItems() {
    const { defaultCurrent, total, showSizeChanger } = this.props
    const { page, defaults } = this.state


    return defaults.map((item, i) => {
      let className = 'paging-item'
      if(page === item) {
        className += ' paging-active'
      }


      return (
        <li key={i}
            className={className}
            onClick={() => this._setPage(item)}>
          <a>{item}</a>
        </li>
      )
    })

  }

  /**
   * 点击左右箭头，切换到下一个或上一个
   * @param page
   * @private
   */
  _changePage(page) {
    const { total } = this.props
    const _page = this.state.page + page

    if(_page >= 1 && _page <= total) {

      this._setPage(_page)
    }
  }


  /**
   * 创建左右翻页
   * @param fix
   * @returns {XML}
   * @private
   */
  _createPrevPage(fix) {
    const { total } = this.props
    const { page } = this.state
    const _this = this

    /**
     * 左右翻页每次翻一页
     */
    const turningPage = function () {
      if(fix === 'prev') {
        _this._setPage(page - 3)
      } else if(fix === 'next') {
        _this._setPage(page + 3)
      }
    }

    // 显示上一页
    if(fix === 'prev') {
      if(page <= 4) {
        return
      }
    } else if(fix === 'next') {
      // 显示下一页

      if(page >= total - 3) {
        return
      }
    }

    return (
      <li className={'paging-jump-' + fix}
          onClick={turningPage}>
        <a/>
      </li>
    )
  }
  render() {
    const { total } = this.props
    const { page } = this.state
    const pages = this._createPageItems(total)
    let prevClass = 'paging-item'
    let nextClass = 'paging-item'
    if(page === 1) {
      prevClass += ' paging-active'
    } else if(page === total) {
      nextClass += ' paging-active'
    }

    console.log(this.state.defaults, this.state.page)
    return (
      <ul className="paging">
        <li className="paging-prev" disabled={page <= 4} onClick={() => this._changePage(-1)}>
          <a className="paging-item-link">＜</a>
        </li>

        <li className={prevClass} onClick={() => this._setPage(1)}>
          <a>1</a>
        </li>


        { // 翻页上一页
          this._createPrevPage('prev')
        }


        {
          pages && pages
        }

        { // 翻页下一页
          total >= 7 && this._createPrevPage('next')
        }

        <li className={nextClass} onClick={() => this._setPage(total)}>
          <a>{total}</a>
        </li>

        <li className="paging-next" disabled={page >= total - 3} onClick={() => this._changePage(1)}>
          <a className="paging-item-link">＞</a>
        </li>
      </ul>
    )
  }
}
class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      oldNode: null,
    }
  }
  // 添加click事件
  componentDidMount() {
    document.addEventListener('click', this._hideDropDown, false);
  }

  /**
   * 渲染组建
   * @returns {*}
   */
  render() {
    const paging1 = {
      defaultCurrent: 1,
      total: 20
    }
    const paging2 = {
      defaultCurrent: 1,
      total: 8,
      showSizeChanger: true,
    }

    return (
      <div className="layout layout-content-scroll">
        <header className="layout-header flex"></header>
        <article className="layout-content">
          <div className="layout-aside">
            <div className="height-400">2</div>
            <div className="height-400">2</div>
            <div className="height-400">2</div>
          </div>
          <div className="layout-subject">
            <div className="height-40"></div>
            <div className="row">
              <div className="width-100"></div>
              <div>
                <PagingView {...paging1}/>
              </div>
            </div>
            <div className="height-40"></div>
            <div className="row">
              <div className="width-100"></div>
              <div>
                <PagingView {...paging2}/>
              </div>
            </div>
          </div>
        </article>
        <footer className="layout-footer"></footer>
      </div>
    )
  }
  /**
   * 组建卸载时，将chick事件清除
   */
  componentWillUnmount() {
    document.removeEventListener('click', this._hideDropDown);
  }
}

const data = {
  defaultCurrent: 1,
  total: 50,
  size: 'small',
  showSizeChanger: true, // 可以选择跳转到那一页
  showQuickJumper : true, //可以快速跳转
  simple  : true, // 简介形

  current: 1,
  onChange:(page) => {},

  showTotal: 'fdsafdsa', // 展示文字

  itemRender: (current, type, originalElement) => {}
}



render(<MyComponent  />, document.getElementById('root'));