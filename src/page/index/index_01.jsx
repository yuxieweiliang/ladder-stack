const React = require('react');
import { render } from 'react-dom'


class MyComponent extends React.Component {
  _input() {
    console.log('aaaa')
  }
  render() {
    return (<input  value={this.props.number} onInput={() => this._input()}/>);
  }
}

if(typeof document !== 'undefined') {
  render(<MyComponent/>, document.getElementById('root'));
}
module.exports = MyComponent;