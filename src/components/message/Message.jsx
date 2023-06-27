import React from 'react'
import './message.css'
import {format} from 'timeago.js'
const Message = ({ message, own }) => {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img src="/assets/ad.png" alt="" className="messageImg" />
        <p className="messageText">
         {message.text}
        </p>
      </div>
      <div className="messageBottom">
        {format(message.createdAt)}
      </div>
    </div>
  )
}

export default Message