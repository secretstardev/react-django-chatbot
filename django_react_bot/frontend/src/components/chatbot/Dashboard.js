import React, { Fragment } from 'react';
import MessageWindow from './MessageWindow';
import MessageBox from './MessageBox';
import '../../../static/css/chat_interface.css';
import '../../../static/css/temporary.css';



export default function Dashboard() {
  return(
    <Fragment>
      <div className="chat_window col-md-6 m-auto">
        <MessageWindow />
        <MessageBox />
      </div>
    </Fragment>
  )
}
