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
      <ul style={{ background: "#32CD32", width: "90%", height: "50vh", textAlign: "left", overflowY: "scroll" }}>
        {items.map((item, idx)=> <Message key={idx} {...item} />)}
      </ul>
    );
  }
}