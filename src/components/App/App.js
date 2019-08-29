import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import Form from '../Form/';
import firebase from 'firebase';
import firebaseConfig from '../../config';
firebase.initializeApp(firebaseConfig);

const App = props => {
  const [user, setUser] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const handleChange = event => {
    setUser(event.target.value);
  }

  const handleSignIn = () => {
    setSignedIn(true);
  }

  return (
    <div className="app">
      <div className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
        <h2>
          SIMPLE APP WITH REACT
        </h2>
        { !signedIn ? (
          <div>
            <input
                // className="form__input"
                type="text"
                placeholder="Create username"
                value={user}
                onChange={handleChange}
            />
            <button
                className="app__button"
                onClick={handleSignIn}
            >
                Sign in
            </button>
          </div>
        ) : null }
      </div>
      <div className="app__list">
        <Form userName={user} />
      </div>
    </div>
  );
}

export default App;