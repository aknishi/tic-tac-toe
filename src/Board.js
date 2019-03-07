import React, { Component } from 'react'
import Square from './Square';

export default class Board extends Component {
  render() {
    const { grid, addMark, winningTiles } = this.props;
    const children = []
    let tileColor;
    for (let i = 0; i < grid.length; i++) {
      if (winningTiles) {
        if (winningTiles.includes(i)) {
          tileColor = 'green-square';
        } else {
          tileColor = 'white-square'
        }
      }
      children.push(
        <Square
          key={i}
          id={i}
          mark={grid[i]}
          addMark={addMark}
          color={tileColor}
        />
      )
    }
    return (
      <div className="board">
        {children}
      </div>
    )
  }
}
