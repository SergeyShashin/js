import './MessageForm.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';


export class MessageForm extends Component {

  static propTypes = {
    onsend: PropTypes.func
  }

  state = {
    author: '',
    text: ''
  };

  handleChange = (event) => {
    let nameField = event.target.name;

    this.setState({
      [nameField]: event.target.value,
    })


  }

  handleButtonSend = () => {
    let { onsend } = this.props;

    if (typeof (onsend) === 'function') {
      onsend(this.state);

      this.setState({
        text: ''
      })
    }

  }

  handleEnterDown = (event) => {
    if (event.ctrlKey && event.keyCode == '13') {
      this.handleButtonSend();
    }
  }



  render() {
    let { author, text } = this.state;
    return (
      <div className='message-form'>
        <TextField label="Author" name='author' value={author} type="text" onChange={this.handleChange} />
        {/* <input name='author' value={author} type="text" placeholder='Author' onChange={this.handleChange} /> */}
        <TextField label="Text" name='text' value={text} onChange={this.handleChange} onKeyDown={this.handleEnterDown} />
        {/* <textarea name='text' value={text} cols="20" rows="3" placeholder='Text' onChange={this.handleChange} onKeyDown={this.handleEnterDown}></textarea> */}
        <Fab onClick={this.handleButtonSend} variant="contained" color="primary" ><SendIcon/></Fab>
        {/* <Button onClick={this.handleButtonSend} variant="contained" color="primary" >Send</Button> */}

      </div>
    );
  }
}