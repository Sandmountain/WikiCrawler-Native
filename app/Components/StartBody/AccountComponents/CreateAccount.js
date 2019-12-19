import React, {Component} from 'react';
import {View, Keyboard, BackHandler} from 'react-native';
import {Item, Input, Text, Label, Body, Button} from 'native-base';
import Firebase from '../../../config/Firebase';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      confirmPassword: '',
      email: '',
      creatingUser: false,
    };
  }
  render() {
    return (
      <Body style={{paddingBottom: 30, alignItems: 'center'}}>
        <Text style={{paddingBottom: 10, color: '#00000080'}}>
          Create your WikiCrawler account
        </Text>

        <Item
          style={{
            backgroundColor: '#00000032',
            borderColor: '#00000032',
            paddingLeft: 5,
          }}
          regular>
          <Label>Email adress</Label>
          <Input onChangeText={text => this.setState({email: text})} />
        </Item>
        <Item style={{paddingTop: 5}}></Item>
        <Item
          style={{
            backgroundColor: '#00000032',
            borderColor: '#00000032',
            paddingLeft: 5,
          }}
          regular>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            onChangeText={text => this.setState({password: text})}
          />
        </Item>
        <Item style={{paddingTop: 5}}></Item>
        <Item
          style={{
            backgroundColor: '#00000032',
            borderColor: '#00000032',
            paddingLeft: 5,
          }}
          regular>
          <Label>Confirm Password</Label>
          <Input
            secureTextEntry={true}
            onChangeText={text => this.setState({confirmPassword: text})}
          />
        </Item>
        <Item style={{paddingTop: 5}}></Item>
        {!this.state.creatingUser ? (
          <Button block onPress={() => this.confirmPassword()}>
            <Text>Create Account</Text>
          </Button>
        ) : (
          <Text>Spinner</Text>
        )}

        <Button
          block
          transparent
          onPress={() => this.props.changeView('default')}>
          <Text>Back</Text>
        </Button>
      </Body>
    );
  }
  confirmPassword = () => {
    if (this.state.password === this.state.confirmPassword) {
      console.log('oke!');

      this.createNewUser();
    } else {
      //TODO: Send better error
      console.log('wrong pw');
    }
  };

  createNewUser = () => {
    console.log('creating user!');
    this.setState({creatingUser: true});
    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        console.log('user created!');
        console.log(res.user);
        this.createUserStorage(res.user);
      })
      .catch(error => {
        this.setState({creatingUser: false});
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });

    //https://github.com/react-native-community/async-storage
    //TODO: Create Account with email and password, then have a separate form where image, name and country can be added (maybe more/less)
    //Then if there is a user when it starts, don't show log in. Fix Facebook aswell
  };
  createUserStorage = user => {
    console.log('creating storage');
    Firebase.database()
      .ref(`/user/${user.uid}`)
      .set({
        username: '',
        biography: '',
        highscore: '',
      })
      .then(() => {
        this.setState({creatingUser: false});
        console.log('added empty user storage');
        this.props.changeView('EditProfile');
      })
      .catch(error => {
        this.setState({creatingUser: false});
        console.log(error);
      });
  };
}
