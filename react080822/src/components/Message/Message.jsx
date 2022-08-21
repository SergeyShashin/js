import './Message.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export const messageType = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}


export class Message extends Component {

  static propTypes = messageType;

  get direction() {
    return this.props.author === 'Бот' ? 'start' : 'end';
  }

  render() {
    let { author, text } = this.props;

    const classes = classNames ('message', {
      'message-owner': author !== 'Бот',
      'message-companion': author == 'Бот'
    });

    return (
      <div className={classes}>
      {/* // <div className='message' style={{ alignSelf: `flex-${this.direction}` }}> */}
        <div>{text}</div>
        <div className='message-sender'>{author}</div>
      </div>
    );
  }
}