/* global React */

import Header from '../Header/Header';
export default class App extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className="container">
        <Header />
        <h1>It is Working!</h1>
      </div>
    );
  }
}
