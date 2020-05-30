import React from 'react'
import Message from './Message/Message'

const Messages = ({ messages }) => (
  <div className="messages">
    {messages.map((message, i) => (
      <div>
        <Message key={i} message={message} />
      </div>
    ))}
  </div>
)

export default Messages
