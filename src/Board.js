import React, { Component } from 'react'
import Square from './Square';

export default class Board extends Component {
  render() {
    const { grid, addMark } = this.props;
    const children = []
    for (let i = 0; i < grid.length; i++) {
      children.push(
        <Square
          key={i}
          id={i}
          mark={grid[i]}
          addMark={addMark} />
      )
    }
    return (
      <div className="board">
        {children}
      </div>
    )
  }
}
