import React, { Component } from 'react'
import Square from './Square';

export default class Board extends Component {
  render() {
    const children = []
    for (let i = 0; i < 9; i++) {
      children.push(
        <Square key={i} />
      )
    }
    return (
      <div className="board">
        {children}
      </div>
    )
  }
}
