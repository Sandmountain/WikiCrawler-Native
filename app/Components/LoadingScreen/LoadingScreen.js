import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import Firebase from '../../config/Firebase';

class LoadingScreen extends Component {
  render() {
    return (
      <View>
        <Text>
          {' '}
          This is a loading screen that doesnt call the shit function{' '}
        </Text>
      </View>
    );
  }

  componentDidMount() {
    this.authListner();
  }
  authListner = () => {
    //TODO: Make a spinner/Loading screen here when logging in and only show the WikiCrawler logo with that.
    console.log('loading');
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('logged in! wow');
        console.log(user);
        this.props.navigation.navigate('Home');
      } else {
        console.log('log in!');
        this.props.navigation.navigate('Start');
      }
    });
  };
}

export default withNavigation(LoadingScreen);
