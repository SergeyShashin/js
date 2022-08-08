import React from 'react';
import ReactDom from 'react-dom';



let messages = ['Привет', 'Как дела?'];

const Message = (props) => <div>{props.text}</div>
const MessagesList = (props) => {
  return props.messages.map(message => <Message text={message} />)
}

ReactDom.render(
  <MessagesList messages={messages} />,
  document.getElementById('root')
);