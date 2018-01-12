import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import EditContact from './edit-contact';
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
      editingContact: false,
      currentContact: 0,
    }
    this.addContact = this.addContact.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
    this.changeOpen = this.changeOpen.bind(this)
    this.sortContacts = this.sortContacts.bind(this)
    this.tempContact = this.tempContact.bind(this)
    this.printList = this.printList.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.editContact = this.editContact.bind(this)
    this.handleEditContact = this.handleEditContact.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
  }

  //Functions related to Adding a New contact

  //Functions Related to Editing a Contact

  //Functions Related to Deleting Contact

  handleEditContact() {
    this.setState ({
      editingContact: !this.state.editingContact,
    })
  }

  editContact(num) {
    this.setState({
      currentContact: num,
    });
    this.handleEditContact();
  }

  saveEdit() {
    let location = this.state.currentContact
    let oldList= this.state.contacts
    let object =  {
      firstName: document.getElementById('editFirst').value,
      lastName: document.getElementById('editLast').value,
      email: document.getElementById('editEmail').value,
      number: document.getElementById('editPhone').value,
      picture: this.state.tempPicture
    }
    oldList.splice(location,1,object)
    this.setState ({
      contacts: oldList,
    });
    this.handleEditContact();
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

printList() {
  console.log(this.state.contacts)
}

  onDrop(picture) {
    this.setState({
      tempPicture: picture,
    });
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
    let singleContact =  {
      firstName: document.getElementById('firstname').value,
      lastName: document.getElementById('lastname').value,
      email: document.getElementById('email').value,
      number: document.getElementById('phone').value,
      picture: this.state.tempPicture
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
          <TableRowColumn> <FlatButton label="Edit" primary={true} onClick= {() => this.editContact(i)} />
          <br/>
          <FlatButton label="Delete" secondary={true} onClick= {() => this.deleteContact(i)}   /></TableRowColumn>
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
        <ContactInput tempContact={this.tempContact} onDrop={this.onDrop} changeOpen={this.changeOpen} addContact={this.addContact} open={this.state.open} contacts={this.state.contacts}/>
        <EditContact editingContact={this.state.editingContact} saveEdit={this.saveEdit} handleEditContact={this.handleEditContact} contact={this.state.contacts[this.state.currentContact]}/>
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
