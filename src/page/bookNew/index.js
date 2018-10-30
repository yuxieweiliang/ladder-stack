const React = require('react');
import { render } from 'react-dom'
import ViewComponent from './view';//视图


if(typeof document !== 'undefined') {
  require('./style.less');
  render(<ViewComponent patientData={this.props.patientData}/>, document.getElementById('root'));
}



export default ViewComponent;
