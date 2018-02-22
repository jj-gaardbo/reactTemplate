import React from 'react';
import Img from 'react-image';

export default class WelcomeMessage extends React.Component {
  render() {
    return (
      <header className="welcome">
        <Img className="logo" src={require('../images/logo.png')} />
        <h1>Welcome to {this.props.data.title}.</h1>
      </header>
    )
  }
}
