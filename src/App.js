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
      message: "Player 1's Turn",
      history: []
    }

    this.addMark = this.addMark.bind(this);
    this.reset = this.reset.bind(this);
  }

  addMark(childNumber) {
    if (this.state.grid[childNumber] !== "") {
      alert("That square is already taken. Undo or try a different one")
    } else {
      const gridDup = Array.from(this.state.grid)
      gridDup[childNumber] = this.state.currentPlayer;
      this.setState({ grid: gridDup, history: [...this.state.history, childNumber] })
      this.switchPlayers()
    }
  }

  switchPlayers() {
    if (this.state.currentPlayer === 'X') {
      this.setState({ currentPlayer: 'O', message: "Player 2's Turn" })
    } else {
      this.setState({ currentPlayer: 'X', message: "Player 1's Turn" })
    }
  }

  reset() {
    this.setState({
      message: "Player 1's Turn",
      currentPlayer: "X",
      grid: [
        '', '', '',
        '', '', '',
        '', '', ''
      ],
    })
  }

  undo() {
    const historyDup = Array.from(this.state.history);
    if (historyDup.length === 0) {
      alert("Theres nothing to undo")
    } else {
      const pos = historyDup.pop()
      const gridDup = Array.from(this.state.grid);
      gridDup[pos] = "";
      this.setState({
        grid: gridDup,
        history: historyDup,
      })
      this.switchPlayers();
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">TIC-TAC-TOE</h1>
        <Board
          grid={this.state.grid}
          addMark={this.addMark}
        />
        <Message message={this.state.message} />
        <div className="btns">
          <button id="reset-btn" onClick={this.reset}>Reset</button>
          <button>Undo</button>
        </div>
      </div>
    );
  }
}

export default App;
// export { addMark };
