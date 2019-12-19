import React, {Component} from 'react';
import {Text, View} from 'react-native';
import HeaderSettings from '../Header/HeaderSettings';
import {Button} from 'native-base';
import {withNavigation} from 'react-navigation';
import Firebase from '../../config/Firebase';

class EditProfile extends Component {
  render() {
    return (
      <View>
        <HeaderSettings />
        <Text> This page let's u change stuff on your profile </Text>
        <Button style={{top: 550}} onPress={() => this.logoutUser()}>
          <Text>Log Out</Text>
        </Button>
      </View>
    );
  }

  logoutUser = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('actually logged out');
        this.props.navigation.navigate('Start');
      })
      .catch(() => {
        // An error happened
        alert('Error occured');
      });
  };
}

export default withNavigation(EditProfile);
