import React, { Component } from 'react';
import { MessageForm } from 'components/MessageForm';
import { MessagesList } from 'components/MessagesList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

import './Messenger.css';

// let messages = ['Привет!', 'Как дела?', 'Как погода?', 'Как настроение?'];


export class Messenger extends Component {

  state = {
    messages: [
      // { text: 'Привет всем!', author: 'Автор' }
    ],
    chats: {
      '1': [
        {
          id: 1,
          messages: [{ text: `Привет! Это чат №1`, author: `Бот` }],
          name: 'Chat 1',
        }
      ],
      '2': [
        {
          id: 2,
          messages: [{ text: `Привет! Это чат №2`, author: `Бот` }],
          name: 'Chat 2',
        }
      ],
      '3': [
        {
          id: 1,
          messages: [{ text: `Привет! Это чат №3`, author: `Бот` }],
          name: 'Chat 3',
        }
      ],
    }
  };

  interval = null;

  /**
   * Добавляем в стейт рандомное сообщение из массива messages за пределами класса.
   */
  // componentDidMount() {

  //   this.interval = setInterval(() => {

  //     let randomIdx = Math.floor(Math.random() * messages.length);
  //     this.setState({
  //       messages: this.state.messages.concat([{ text: messages[randomIdx], author: 'Автор' }]),
  //     })

  //   }, 5000);

  // }

  /**
   * Добавляет в стейт сообщение из компонента MessageForm
   */
  handleSend = (message) => {
    this.setState(
      ({ messages }) => ({ messages: messages.concat([message]) })
      // { messages: this.state.messages.concat([{ text: message.text, author: message.author }]), }
    );
  }

  /**
   * Добавляет в стейт соообщение `Привет ${author}. Это сообщение от бота.`, author: 'Бот'
   */
  componentDidUpdate() {

    this.interval = setInterval(() => {

      let { author } = this.state.messages[this.state.messages.length - 1];

      if (author !== 'Бот') {
        this.setState({
          messages: this.state.messages.concat({ text: `Привет, ${author}. Это сообщение от бота.`, author: 'Бот' }),
        })
      }

    }, 1000);

  }

  /**
   * Очищает интервал после удаления компонента Messenger из Dom
   */
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }


  render() {
    console.log(this.props.match);

    let { messages } = this.state;
    return (
      <div className='messenger'>
        {/* <div className='layout'> */}
          <List>
            <ListItem>
              <Link to='/chats/1'>
                <ListItemText primary='Chat 1' />
              </Link>
            </ListItem>
            <ListItem>
              <Link to='/chats/2'>
                <ListItemText primary='Chat 2' />
              </Link>
            </ListItem>
            <ListItem>
              <Link to='/chats/3'>
                <ListItemText primary='Chat 3' />
              </Link>
            </ListItem>
          </List>
          <MessagesList items={messages} />
        {/* </div> */}
        <MessageForm onsend={this.handleSend} />
      </div>
    );
  }
}