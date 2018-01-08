import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ContactInput extends Component {
  constructor() {
    super ()

  };
  render () {
    return (
      <div>
        <div>First Name:
        <input id='firstname' type='text'/>
       Last Name:
        <input id='lastname' type='text'/>
        </div>

        <div> Phone Number:
        <input id='phone' type='text'/>
          Email Address:
        <input id='email' type='text'/>
      </div>
      <button type="submit" form="form1" value="Submit">Submit</button>
      </div>
    )
  }
}

export default ContactInput;
