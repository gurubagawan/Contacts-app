import React, { Component } from 'react';
import './App.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

class LoginField extends Component {
  render () {
    const actions = [
  <FlatButton secondary={true} label="Log In" onClick={() => this.props.login()}/>,
  <FlatButton secondary={true} label="Sign Up" onClick={() => this.props.signUp()}/>
];
    return (
      <div>
      <Dialog title="Login" actions={actions} modal={true} open={!(this.props.user)} >
          <TextField hintText='Email' id='loginEmail' underlineShow={false} />
          <Divider />
          <TextField hintText="Password" id='loginPassword' underlineShow={false} />
      </Dialog>
      </div>
    )
  }
}

export default LoginField;
