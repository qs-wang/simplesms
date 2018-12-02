import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SMSSubmitForm from './components/SMSSubmitForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <SMSSubmitForm />
        </header>
      </div>
    );
  }
}

export default App;
