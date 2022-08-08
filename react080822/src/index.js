import React from 'react';
import ReactDom from 'react-dom';

let element = <h1 className="jsx">JSX работает!</h1>

let messages = ['Привет', 'Как дела?', 'Ох'];

const Message = (props) => <div>{props.text}</div>
const MessagesList = (props) => {
  return props.messages.map(message => <Message text={message} />)
}

ReactDom.render(
  <MessagesList messages={messages} />,
  document.getElementById('root')
);