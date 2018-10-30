
import React, { Component } from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import '../../style/main.less'

class Header extends Component {
  static __NAME = 'HEADER';
  render() {
    const { children } = this.props
    return (<div className="layout-header">{children}</div>)
  }
}
class Footer extends Component {
  static __NAME = 'FOOTER';
  render() {
    const { children } = this.props
    return (<div className="layout-footer">{children}</div>)
  }
}
class Aside extends Component {
  static __NAME = 'ASIDE';
  render() {
    const { children } = this.props
    return (<div className="layout-aside">{children}</div>)
  }
}
class Subject extends Component {
  static __NAME = 'SUBJECT';
  render() {
    const { children } = this.props
    return (<div className="layout-subject">{children}</div>)
  }
}
class Scroll extends Component {
  static __NAME = 'SCROLL';
  render() {
    const { children } = this.props
    return (<div className="layout-scroll">{children}</div>)
  }
}
class Content extends Component {
  static __NAME = 'CONTENT';
  render() {
    const { children } = this.props
    return (<div className="layout-content">{children}</div>)
  }
}

export class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static defaultProps = {
    assemble: 'layout',
    hideAside: false
  }
  static Content = Content
  static Scroll = Scroll
  static Subject = Subject
  static Aside = Aside
  static Header = Header
  static Footer = Footer

  _createRootClass() {
    const { assemble, children, hideAside } = this.props
    let clsName = 'layout'
    if(assemble === 'static') {
      clsName += ' layout-static'
    } else if(assemble === 'scroll') {
      clsName += ' layout-content-scroll'
    } else if(assemble === 'fixed') {
      clsName += ' layout-fixed-header'
    }
    if(hideAside) {
      clsName += ' hidden-aside'
    }

    return clsName
  }
  render() {
    const { assemble, children } = this.props
    const clsName = this._createRootClass(assemble)

    return (
      <div className={clsName}>
        {children}
      </div>
    )
  }
  componentWillMount() {}
  componentWillReceiveProps(nextProps, prevProps) {}
  componentDidMount() {}
  componentWillUnmount() {}
}

export class LayoutComponent extends Component {
  constructor(props) {
    super(props)
    this.state= {}
  }
  render() {

    return (
      <Layout assemble="static">
        <Layout.Header>d</Layout.Header>
        <Layout.Content>
          <Layout.Aside>d</Layout.Aside>
          <Layout.Subject>
            <div className="height-400"></div>
            <div className="height-400"></div>
            <div className="height-400"></div>
            <div className="height-400"></div>
          </Layout.Subject>
        </Layout.Content>
        <Layout.Footer>d</Layout.Footer>


      </Layout>
    )
  }
}


//
render(<LayoutComponent />, document.getElementById('root'));

