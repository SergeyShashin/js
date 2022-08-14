import React, { Component } from 'react';

export class App extends Component {
  state = {
    counter: 0
  }

  handleClick = () => {
    let { counter } = this.state;

    this.setState({
      counter: counter + 1
    })
  }

  render() {
    let { counter } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>-</button>
          {counter}
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}