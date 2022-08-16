import './Message.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';


export const messageType = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}


export class Message extends Component {

  static propTypes = messageType;

  render() {
    let { author, text } = this.props;
    return (
        <li className='message'>{author}: {text}</li>
    );
  }
}