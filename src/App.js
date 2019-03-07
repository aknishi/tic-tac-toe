import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      grid: ['', '', '', '', '', '', '', '', ''],
    }
  }
  render() {
    return (
      <div className="App">
        <h1 className="title">TIC-TAC-TOE</h1>
        <Board />
      </div>
    );
  }
}

export default App;
