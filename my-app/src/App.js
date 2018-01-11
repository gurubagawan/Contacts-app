import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ContactInput from './contact-input';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const muiTheme = getMuiTheme({
  Table: {
    color: '#E53935'
  },

});


class App extends Component {
  constructor () {
    super();
    this.state = {
      contacts: [],
      open: false,
    }
    this.addContact = this.addContact.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
    this.changeOpen = this.changeOpen.bind(this)
    this.sortContacts = this.sortContacts.bind(this)
  }

  sortContacts(property) {
    let origList = this.state.contacts
    function compare(a,b) {
  if (a[property] < b[property])
    return -1;
  if (a[property] > b[property])
    return 1;
  return 0;
}
let sortedList = origList.sort(compare);
this.setState({
  contacts: sortedList
})
  }

  addContact (object) {
    let contactArray = this.state.contacts
    contactArray.push(object)
    this.setState ({
      contacts: contactArray,
    })
    this.changeOpen()
  }

  changeOpen() {
    let isOpen= this.state.open;
    this.setState({
      open:!isOpen
    })
  }

  tempContact() {
    var singleContact =  {
      firstName: document.getElementById('firstname').value,
      lastName: document.getElementById('lastname').value,
      email: document.getElementById('email').value,
      number: document.getElementById('phone').value,
    }
    this.addContact(singleContact)
  }

  deleteContact(num) {
    let shortList = this.state.contacts
    shortList.splice(num, 1)
    this.setState({
      contacts: shortList
    })
  }

  render() {
    let mycontacts = this.state.contacts
    const contactList = mycontacts.map ((contact, i) => {
      return (
        <TableRow key ={i}>
          <TableRowColumn>{contact.firstName}</TableRowColumn>
          <TableRowColumn>{contact.lastName}</TableRowColumn>
          <TableRowColumn>{contact.number}</TableRowColumn>
          <TableRowColumn>{contact.email}</TableRowColumn>
          <TableRowColumn> <RaisedButton label=" Delete " onClick= {() => this.deleteContact(i)} labelColor='white' backgroundColor='#ed5555' /></TableRowColumn>
        </TableRow>
      )
    })
    return (
      <div className="App">
      <MuiThemeProvider muiTheme={muiTheme}>
        <header >
        <AppBar title="My Contacts" />
        </header>
    <Table>
      <TableHeader displaySelectAll= {false} adjustForCheckbox={false} 	>
        <TableRow selectable='false'>
          <TableHeaderColumn><FlatButton label='First Name' onClick= {() => this.sortContacts("firstName")}/> </TableHeaderColumn>
          <TableHeaderColumn><FlatButton label='Last Name' onClick= {() => this.sortContacts("lastName")}/>  </TableHeaderColumn>
          <TableHeaderColumn><FlatButton label='Phone Number' onClick= {() => this.sortContacts("number")}/>  </TableHeaderColumn>
          <TableHeaderColumn><FlatButton label='Email Address' onClick= {() => this.sortContacts("email")}/>  </TableHeaderColumn>
          <TableHeaderColumn> <RaisedButton label="Add New"  labelColor='white' primary={true} onClick={this.changeOpen} /> </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody  displayRowCheckbox={false}>
        {contactList}
      </TableBody>
    </Table>
        <ContactInput tempContact={this.tempContact} changeOpen={this.changeOpen} addContact={this.addContact} open={this.state.open} contacts={this.state.contacts}/>
        <p className="App-intro">
          <button onClick= {()=> this.sortContacts()}> Click me </button>
          <button onClick= {()=> this.printList()}> Print List </button>
        </p>
        </MuiThemeProvider>
      </div>

    );
  }
}

export default App;
