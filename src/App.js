import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import Message from './Message';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: "X",
      message: "Player 1's Turn"
    }
  }
  render() {
    return (
      <div className="App">
        <h1 className="title">TIC-TAC-TOE</h1>
        <Board grid={this.state.grid} />
        <Message message={this.state.message} />
      </div>
    );
  }
}

export default App;
