import React, { Component } from 'react';
import './App.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import ImageUploader from 'react-images-upload';

class ContactInput extends Component {
  render () {
    const actions = [
  <FlatButton label="Cancel"  secondary={true} onClick={() => this.props.changeOpen()}/>,
  <FlatButton label="Submit"  primary={true} onClick={()=> this.props.addContact()}/>,
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
          <ImageUploader id='ConPicture'
                withIcon={true}
                buttonText='Add a profile picture'
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                onChange={this.props.onDrop}
                maxFileSize={5242880}
            />
          <Divider />
      </Dialog>
      </div>
    )
  }
}

export default ContactInput;
