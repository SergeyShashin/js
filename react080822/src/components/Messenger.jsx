import React, { Component } from 'react';

let messages = ['Привет!', 'Как дела?', 'Как погода?', 'Как настроение?'];

export class Messenger extends Component {

  state = {
    messages: ['Привет всем!']
  };

  interval = null;

  componentDidMount() {

    this.interval = setInterval(() => {

      let randomIdx = Math.floor(Math.random * this.messages.length);
      this.setState({
        messages: messages.concat(messages[randomIdx])
      })

    }, 5000);

  }



  render() {
    let { messages } = this.state;
    return (
      <div>
        <ul>
          {messages.map(message => <li>{message}</li>)}
        </ul>
      </div>
    );
  }
}