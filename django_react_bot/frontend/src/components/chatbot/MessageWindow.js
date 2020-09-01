import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getChats } from '../../actions/chats';

import '../../../static/css/chat_interface.css';
import '../../../static/css/temporary.css';


class Avatar extends Component {
  render(){
    return(
      <div className="avatar"/>
    );
  }
}

class UserMessageBox extends Component{

  render(){
    return(
      <li className={`message ${this.props.appearance} appeared`}>
        <Avatar></Avatar>
        <div className="text_wrapper">
            <div className="text">{this.props.message}</div>
        </div>
      </li>
    );
  }
}

class MessagesContainer extends Component{
  constructor(props) {
    super(props);
    this.createBotMessages = this.createBotMessages.bind(this);
  }

  scrollToBottom = () => {
    var el = this.refs.scroll;
    el.scrollTop = el.scrollHeight;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  createBotMessages(){
    return this.props.messages.map(message =>
       <UserMessageBox key={message.index} message={message.message} appearance={message.isbotmessage ? "left": "right"}/>
    );
  }

  render(){

    return(
      <ul className="messages" ref="scroll">
        {this.createBotMessages()}
      </ul>
    );
  }
}


export class MessageWindow extends Component {
  static propTypes = {
    getChats: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    newMessage: PropTypes.object
  };

  componentDidMount() {
    this.props.getChats();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newMessage) {
       this.props.messages.push(nextProps.newMessage);
    }
  }

  render() {
    return (
        <div className="container">
          <MessagesContainer messages={this.props.messages}/>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.chats.messages,  //Now we can use this.props.messages
  newMessage: state.chats.current_message
});


export default connect(mapStateToProps, { getChats })(MessageWindow);
