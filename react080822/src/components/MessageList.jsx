import React, { Component } from 'react';
import { Message } from 'components/Message';

import PropTypes from 'prop-types';


export class MessageList extends Component {


  render() {
    let { messages } = this.props;
    return (
      <div style={{ background: "#32CD32", width: "300px", height: "300px", textAlign: "left", padding: "30px", overflowY: "scroll" }}>
        <Message messages={messages} />
      </div>
    );
  }
}