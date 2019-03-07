import React, { Component } from 'react'

export default class Message extends Component {
  render() {
    return (
      <div className="message">
        <p>{this.props.message}</p>
      </div>
    )
  }
}
