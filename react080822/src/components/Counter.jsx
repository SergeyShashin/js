import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Counter extends Component {

  static propTypes = {
    initial: PropTypes.number.isRequired
  };

  static defaultProps = {
    initial: 0
  };

  state = {
    counter: this.props.initial,
    interval: null
  };

  handleClick = (event) => {
    this.setState(
      prevState => (
        {
          counter: prevState.counter + +event.target.dataset.operation,
        }
      )
    );
  }

  componentDidMount() {
    this.state.interval = setInterval(() => { console.log('Fired') }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    let { counter } = this.state;
    return (
      <div>
        <button data-operation="-1" onClick={this.handleClick}>-</button>
        {counter}
        <button data-operation="1" onClick={this.handleClick}>+</button>
      </div>
    );
  }
}