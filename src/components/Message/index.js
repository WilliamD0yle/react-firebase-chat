import React, {Component} from 'react';
import './message.css';

const Message = props => (
    <div className="message">
            <span className="message__author">
                {props.message.userName}:
            </span>
    {props.message.message}
    </div>
);

export default Message;