import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class MessageForm extends Component {

  static propTypes = {
    onsend: PropTypes.func
  }

  state = {
    author: '',
    text: ''
  };

  handleChange = (event) => {
    console.log(this.state.author + ':' + ' ' + this.state.text);
    let nameField = event.target.name;

    this.setState({
      [nameField]: event.target.value,
    })


  }

  handleButtonSend = () => {
    let { onsend } = this.props;

    console.log();
    if (typeof (onsend) === 'function') {
      onsend(this.state);

      this.setState({
        text: ''
      })
    }

  }



  render() {
    let { author, text } = this.state;
    return (
      <div >
        <input name='author' value={author} type="text" placeholder='Author' onChange={this.handleChange} />
        <br />
        <textarea name='text' value={text} cols="20" rows="3" placeholder='Text' onChange={this.handleChange}></textarea>
        <br />
        <button onClick={this.handleButtonSend}>Send</button>

      </div>
    );
  }
}