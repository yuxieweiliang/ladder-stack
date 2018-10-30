import React from 'react'
import { render } from 'react-dom'


class MyComponent extends React.Component {
  _input() {
    console.log('aaaa')
  }
  render() {
    return (<input  value={this.props.number} onInput={() => this._input()}/>);
  }
}


render(<MyComponent/>, document.getElementById('root'));