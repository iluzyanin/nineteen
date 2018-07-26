import React, { Component } from 'react';
import Field from './components/field/field';
import logo from './logo.svg';
import './App.css';

/*
123456789
111213141
516171819
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <br />
          <Field></Field>
      </div>
    );
  }
}

export default App;
