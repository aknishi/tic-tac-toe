import React, { Component } from 'react'

export default class Square extends Component {
  render() {
    return (
      <div className={`square sq${this.props.id}`}>

      </div>
    )
  }
}
