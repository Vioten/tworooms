import React, { PropTypes } from 'react'
import User from './User.jsx';

class Lobby extends React.Component {

  renderUsers() {
    return this.getUsers().map((user) => (
      <User key={user._id} user={user} />
    ));
  }
  render () {
    <ul>ds
      {this.renderUsers()}
    </ul>
  }
}

export default Lobby;
