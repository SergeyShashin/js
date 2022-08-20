import './MessagesList.css';

import React, { Component } from 'react';
import { Message, messageType } from 'components/Message';


import PropTypes from 'prop-types';


export class MessagesList extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape(messageType)
    )
  }


  render() {
    let { items } = this.props;
    return (
      <div>
        {items.map((item, idx)=> <Message key={idx} {...item} />)}
      </div>
    );
  }
}