import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  BackHandler,
  Alert,
  StatusBar,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {
  Content,
  Item,
  Input,
  Text,
  Label,
  Card,
  CardItem,
  Body,
  Button,
} from 'native-base';

import Firebase from '../../config/Firebase';
import LogIn from './AccountComponents/LogIn';
import CreateAccount from './AccountComponents/CreateAccount';
import ForgotPassword from './AccountComponents/ForgotPassword';
import EditProfile from './AccountComponents/EditProfile';

class StartBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewItem: 'default',
    };
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'flex-end', left: -2, bottom: -5}}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Image
          style={{
            alignSelf: 'center',
            backgroundColor: 'transparent',
            flex: 1,
            height: undefined,
            width: '90%',
          }}
          source={require('../../../app/Images/Logo2Transparent.png')}
          resizeMode="center"></Image>

        <Card
          transparent
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            alignContent: 'center',
          }}>
          <CardItem
            center
            style={{
              backgroundColor: 'transparent',
              alignSelf: 'center',
              width: '90%',
            }}>
            {this.renderSwitch()}
          </CardItem>
        </Card>
      </View>
    );
  }
  renderSwitch() {
    let state = this.state.viewItem;

    switch (state) {
      case 'default':
        return <LogIn changeView={this.handleChange} />;
      case 'CreateAccount':
        return <CreateAccount changeView={this.handleChange} />;
      case 'EditProfile':
        return <EditProfile changeView={this.handleChange} />;
      case 'ForgotPassword':
        return <ForgotPassword />;
    }
  }
  handleChange = change => {
    this.setState({viewItem: change});
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    //TODO:
    if (this.state.viewItem !== 'default') this.setState({viewItem: 'default'});
    else {
      Alert.alert('Confirm exit', 'Do you want to return to the main menu?', [
        {text: 'CANCEL', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            return true;
          },
        },
      ]);
    }
    return true;
  };
}

const styles = StyleSheet.create({
  center: {
    backgroundColor: 'white',
    marginBottom: 0,
    padding: 5,
    borderRadius: 4,
    elevation: 2,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export default withNavigation(StartBody);
