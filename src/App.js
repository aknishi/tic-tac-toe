import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: "X",
    }
  }
  render() {
    return (
      <div className="App">
        <h1 className="title">TIC-TAC-TOE</h1>
        <Board grid={this.state.grid} />
      </div>
    );
  }
}

export default App;
