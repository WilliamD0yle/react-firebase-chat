import React, { useEffect, useState } from 'react';
import './form.css';
import Message from '../Message/';
import firebase from 'firebase';

const Form = props => {
    const [userName, setUsername] = useState('Homer');
    const [message, setMessage] = useState('');
    const [list, setList] = useState([]);
    let messageRef = firebase.database().ref().child('messages');

    useEffect(() => {
        listenMessages();
        if (props.userName !== userName) {
            setUsername(props.userName);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userName]);

    const handleChange = event => {
        setMessage(event.target.value);
    }

    const handleSend = () => {
        if (message) {
            const newItem = {
                userName: userName,
                message: message
            }
            messageRef.push(newItem);
            setMessage('');
        }
    }

    const handleKeyPress = event => {
        if (event.key !== 'Enter') return;
        handleSend();
    }

    const listenMessages = () => {
        messageRef.limitToLast(10).on('value', message => {
            setList(Object.values(message.val() || []));
        });
    }

    return (
        <div className="form">
            <div className="form__message">
                { list.map((item, index) =>
                    <Message key={index} message={item} />
                )}
            </div>
            <div className="form__row">
                <input
                    className="form__input"
                    type="text"
                    placeholder="Type message"
                    value={message}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="form__button"
                    onClick={handleSend}
                >
                send
                </button>
            </div>
        </div>
    );
}

export default Form;