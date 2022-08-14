import React, { Component } from 'react';


export class Message extends Component {


  render() {
    let { messages } = this.props;
    return (
      <ul style={{ listStyleType: "none" }}>
        {messages.map((message, idx) => <li key={idx}>{message.author}: {message.text}</li>)}
      </ul>
    );
  }
}