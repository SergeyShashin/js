import React, { Component } from 'react';
import { Counter } from './Counter';

export class App extends Component {

  state = { isVisible: false };

  handleToggle = () => {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  render() {
    let { isVisible } = this.state
    return (
      <div>
        {isVisible && <Counter initial = {5} />}
        <button onClick={this.handleToggle}>Toggle</button>
      </div>
    );
  }
}