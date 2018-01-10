import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class ContactInput extends Component {
  constructor() {
    super ()

  };
  render () {
    const actions = [
  <FlatButton
    label="Cancel"
    primary={true}
    onClick={() => this.props.changeOpen()}
  />,
  <FlatButton
    label="Submit"
    primary={true}
    onClick={()=> this.props.tempContact()}
  />,
];
    return (
      <div>
      <Dialog title="Add New Contact" actions={actions} modal={true} open={this.props.open} >
          <TextField hintText="First name" id='firstname' underlineShow={false} />
          <Divider />
          <TextField hintText="Last name" id='lastname' underlineShow={false} />
          <Divider />
          <TextField hintText="Phone Number" id='phone' underlineShow={false} />
          <Divider />
          <TextField hintText="Email address" id='email' underlineShow={false} />
          <Divider />
      </Dialog>
      </div>
    )
  }
}

export default ContactInput;
