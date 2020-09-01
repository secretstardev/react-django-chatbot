import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addChat } from '../../actions/chats';

import '../../../static/css/chat_interface.css';
import '../../../static/css/temporary.css';


class SendButton extends Component{
    render(){
      return (<div className="send_message" onClick={this.props.onClick}>
                <div className="text">send</div>
              </div>);
    }
}

class MessageTextBoxContainer extends Component{
  render(){
    return(
      <div className="message_input_wrapper">
        <input id="msg_input" className="message_input" placeholder="Type your messages here..." value={this.props.message} onChange={this.props.onChange} onKeyPress={this.props._handleKeyPress}/>
      </div>
    );
  }
}


export class MessageBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      "messages": [],
      "current_message":""
    }

    this.onClick = this.onClick.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addMessageBox = this.addMessageBox.bind(this);
  }

  static propTypes = {
    addChat: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired
  };


  addMessageBox(enter=true){
    const index = this.props.messages.length+1;
    const chat = {
      index: index,
      message: this.state.current_message,
      isbotmessage: false
    };

    this.props.addChat(chat);
    
    this.setState({
      current_message: ""
    });

  }


  onClick(){
    this.addMessageBox();
  }

  onChange(e) {
    this.setState({
      current_message: e.target.value
    });
  }

  _handleKeyPress(e) {
    let enter_pressed = false;
    if(e.key === "Enter"){
      enter_pressed = true;
      this.addMessageBox(enter_pressed)
    }
  }

  render() {
    return (
        <div className="bottom_wrapper clearfix">
          <MessageTextBoxContainer
            _handleKeyPress={this._handleKeyPress}
            onChange={this.onChange}
            message={this.state.current_message}></MessageTextBoxContainer>
          <SendButton onClick={this.onClick}/>
        </div>
    );
  }
}


const mapStateToProps = state => ({
  messages: state.chats.messages
});


export default connect(mapStateToProps, { addChat })(MessageBox);
