import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import EditContact from './edit-contact';
import ContactInput from './contact-input';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
import { auth, provider } from './index';
import LoginField from './login'
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
      currentContact: 1,
      user: null,

    }
    this.addContact = this.addContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.changeOpen = this.changeOpen.bind(this);
    this.sortContacts = this.sortContacts.bind(this);
    this.printList = this.printList.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.editContact = this.editContact.bind(this);
    this.handleEditContact = this.handleEditContact.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.login = this.login.bind (this);
    this.logout = this.logout.bind(this);
    this.signUp = this.signUp.bind(this);
    this.saveToFireBase = this.saveToFireBase.bind(this);
    this.loadContacts = this.loadContacts.bind(this);
  }

  //Functions for login/out
  handleChange(e) {
  /* ... */
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  login() {
    let email = document.getElementById('loginEmail').value
    let password = document.getElementById('loginPassword').value
    //console.log(email, password)
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise
      .then(user => {
      this.setState({
        user: user
      })
      this.loadContacts()
    })
      .catch (e=> console.log(e.message))


  }

  signUp() {
    let email = document.getElementById('loginEmail').value
    let password = document.getElementById('loginPassword').value
    //console.log(email, password)
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .then(user => {
      console.log(user)
      this.setState({
        user: user
      })
    })
      .catch (e=> console.log(e.message))
  }


  //Functions related to Adding a New contact
  addContact (object) {
    let contactArray = this.state.contacts
    let singleContact =  {
      firstName: document.getElementById('firstname').value,
      lastName: document.getElementById('lastname').value,
      email: document.getElementById('email').value,
      number: document.getElementById('phone').value,
    }
    contactArray.push(singleContact)
    this.setState ({
      contacts: contactArray,
    })
    this.changeOpen()
  }

  //Opens/closes box to add new contact. Useful to keep as seperate function, so it can be called on it's own when necessary
  changeOpen() {
    this.setState({
      open:!(this.state.open)
    })
  }

  //Functions Related to Editing a Contact
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
    }
    oldList.splice(location,1,object)
    this.setState ({
      contacts: oldList,
    });
    this.handleEditContact();
  }


  //Functions Related to Deleting Contact
  deleteContact(num) {
    let shortList = this.state.contacts
    shortList.splice(num, 1)
    this.setState({
      contacts: shortList
    })
  }

//Misceallaneous functions that stand on their own
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

//Good quick function useful in troubleshooting
printList() {
  console.log(this.state.contacts)
}

  onDrop(picture) {
    this.setState({
      tempPicture: picture,
    });
}

saveToFireBase() {
  let contactsToSave = this.state.contacts
  let user = this.state.user
  const userBase = firebase.database().ref().child(String(user.uid));
  //firebase.database().ref(user.tostring)
  for (let i=0; i<contactsToSave.length; i++) {
  userBase.set(contactsToSave)
}
}

loadContacts() {
  //if (this.state.user){
    console.log('after user')
  let user = this.state.user
  const rootRef = firebase.database().ref().child(user.uid);
  //console.log(rootRef)
  //if (rootRef.hasOwnProperty()) {
    console.log('after first if')
  rootRef.on('value', snap => {
    let userContacts = []
    let response = snap.val()
    let length = Object.keys(response).length
    for (var key in response) {
  // skip loop if the property is from prototype
    if (!response.hasOwnProperty(key)) continue;
    console.log('after second if')
    var obj = response[key];
    //console.log(obj)
    userContacts.push(obj)
    }
    this.setState({
      contacts: userContacts
    })
    // console.log(Object.keys(response).length)
    // console.log(response.contact1)
    // console.log(userContacts)
  });
  console.log(this.state.contacts)
//}
}
//}

  render() {
    let mycontacts = this.state.contacts
    console.log(mycontacts)
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
        <LoginField login={this.login} user={this.state.user} signUp={this.signUp}/>
        <ContactInput addContact={this.addContact} onDrop={this.onDrop} changeOpen={this.changeOpen} addContact={this.addContact} open={this.state.open} contacts={this.state.contacts}/>
        <EditContact editingContact={this.state.editingContact} saveEdit={this.saveEdit} handleEditContact={this.handleEditContact} contact={this.state.contacts[this.state.currentContact]}/>
        <p className="App-intro">
          <button onClick= {()=> this.sortContacts()}> Click me </button>
          <button onClick= {()=> this.printList()}> Print List </button>
        </p>
        </MuiThemeProvider>
  <button onClick={this.saveToFireBase}> Save to Firebase </button>
}

      </div>

    );
  }
}

export default App;
