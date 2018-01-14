import React, { Component } from 'react';
import './App.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

class LoginField extends Component {
  render () {
    const actions = [
  <FlatButton  label="Log In" onClick={() => this.props.login()}/>,
  <FlatButton  label="Sign Up" onClick={() => this.props.signUp()}/>
];
    return (
      <div>
      <Dialog title="Login" actions={actions} modal={true} open={!(this.props.user)} >
          <TextField hintText='Email' id='loginEmail' underlineShow={false} />
          <Divider />
          <TextField hintText="Password" type='password' id='loginPassword' underlineShow={false} />
          { this.props.error ?
            <div> <br/> <font color="red">{this.props.error} </font> </div>
            : '' }
      </Dialog>
      </div>
    )
  }
}

export default LoginField;
