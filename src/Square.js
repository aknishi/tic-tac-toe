import React, { Component } from 'react'

export default class Square extends Component {
  render() {
    return (
      <div
        className={`square sq${this.props.id} ${this.props.color}`}
        onClick={() => this.props.addMark(this.props.id)}
      >
        <p className="mark">
          {this.props.mark}
        </p>
      </div >
    )
  }
}
