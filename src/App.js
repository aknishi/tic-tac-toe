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
      history: [],
      winner: "",
      gameEnd: false,
      winningTiles: []
    }

    this.addMark = this.addMark.bind(this);
    this.reset = this.reset.bind(this);
    this.undo = this.undo.bind(this);
  }

  addMark(childNumber) {
    if (!this.state.gameEnd) {
      if (this.state.grid[childNumber] !== "") {
        alert("That square is already taken. Undo or try a different one")
      } else {
        const gridDup = Array.from(this.state.grid)
        gridDup[childNumber] = this.state.currentPlayer;
        this.setState({ grid: gridDup, history: [...this.state.history, childNumber] }, () => this.checkForWinner())
        setTimeout(() => {
          if (!this.state.winner) {
            this.switchPlayers()
          }
        }, 0)
      }
    } else {
      alert("Click Reset to start a new Game")
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
      winner: "",
      history: [],
      grid: [
        '', '', '',
        '', '', '',
        '', '', ''
      ],
      gameEnd: false,
      winningTiles: []
    })
  }

  checkForWinner() {
    const grid = this.state.grid;
    const horizontals = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    const verticals = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    const diagonals = [[0, 4, 8], [2, 4, 6]]
    let all = horizontals.concat(verticals).concat(diagonals);
    for (let i = 0; i < all.length; i++) {
      if (grid[all[i][0]] && grid[all[i][1]] && grid[all[i][2]]) {
        if (grid[all[i][0]] === grid[all[i][1]] && grid[all[i][1]] === grid[all[i][2]]) {
          return this.setWinner(grid[all[i][0]], all[i])
        }
      }
    }
    return false;
  }

  setWinner(mark, tiles) {
    let winner = '';
    if (mark === "X") {
      winner = 'Player1 (X)';
    } else {
      winner = 'Player2 (O)';
    }
    this.setState({
      winner: winner,
      message: `${winner} Wins!`,
      gameEnd: true,
      winningTiles: tiles
    })
  }

  undo() {
    if (!this.state.gameEnd) {
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
    } else {
      alert("Undo not possible. Please Start a new Game")
    }
  }

  draw() {
    this.setState({
      gameEnd: true,
      message: `It's a Draw!`,
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">TIC-TAC-TOE</h1>
        <Board
          grid={this.state.grid}
          addMark={this.addMark}
          winningTiles={this.state.winningTiles}
        />
        <Message message={this.state.message} />
        <div className="btns">
          <button id="reset-btn" onClick={this.reset}>Reset</button>
          <button id="undo-btn" onClick={this.undo}>Undo</button>
        </div>
      </div>
    );
  }
}

export default App;
// export { addMark };
