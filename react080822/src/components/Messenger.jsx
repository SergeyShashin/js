import React, { Component } from 'react';
import { MessageForm } from 'components/MessageForm';
import { MessageList } from 'components/MessageList';

let messages = ['Привет!', 'Как дела?', 'Как погода?', 'Как настроение?'];

export class Messenger extends Component {

  state = {
    messages: [
      { text: 'Привет всем!', author: 'Автор' }
    ],
  };

  interval = null;

  /**
   * Добавляем в стейт рандомное сообщение из массива messages за пределами класса.
   */
  componentDidMount() {

    this.interval = setInterval(() => {

      let randomIdx = Math.floor(Math.random() * messages.length);
      this.setState({
        messages: this.state.messages.concat([{ text: messages[randomIdx], author: 'Автор' }]),
      })

    }, 5000);

  }

  /**
   * Добавляет в стейт сообщение из компонента MessageForm
   */
  handleSend = (message) => {
    this.setState({
      messages: this.state.messages.concat([{ text: message.text, author: message.author }]),
    })
  }

  /**
   * Добавляет в стейт соообщение `Привет ${author}. Это сообщение от бота.`, author: 'Бот'
   */
  componentDidUpdate() {

    this.interval = setInterval(() => {

      let author = this.state.messages[this.state.messages.length - 1].author;

      if (author !== 'Бот') {
        this.setState({
          messages: this.state.messages.concat({ text: `Привет ${author}. Это сообщение от бота.`, author: 'Бот' }),
        })
      }

    }, 3000);

  }

  /**
   * Очищает интервал после удаления компонента Messenger из Dom
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
    let { messages } = this.state;
    return (
      <div>
        <MessageList messages={messages} />
        <MessageForm onsend={this.handleSend} />
      </div>
    );
  }
}