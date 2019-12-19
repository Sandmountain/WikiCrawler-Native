import React, {Component} from 'react';
import {View, BackHandler, Alert, Image} from 'react-native';
import Header from '../Header/HeaderProfile';
import {
  Content,
  Item,
  Input,
  Text,
  Label,
  Card,
  CardItem,
  Body,
  Center,
  Thumbnail,
  Button,
  Left,
} from 'native-base';

export default class HighScoreBody extends Component {
  state = {
    highscoreColor: 'blue',
  };
  render() {
    return (
      <View style={{alignContent: 'center'}}>
        <Header style={{width: '100%'}} />
        <View
          style={{
            top: '80%',
          }}>
          <Card
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <Left>
              <Image
                source={require('../../Images/example.jpg')}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 80,
                  top: -43,
                  zIndex: 5,
                }}
              />
            </Left>
            <View style={{textAlign: 'center', paddingTop: 35}}>
              <Text style={{textAlign: 'center'}}>
                Your total score this game:{' '}
              </Text>
              <Text style={this.handleHighScoreColor()}>450 </Text>
            </View>
          </Card>
        </View>
      </View>
    );
  }

  handleHighScoreColor = options => {
    //TODO calculate the highscore and define if good or bad result.
    return {
      textAlign: 'center',
      fontSize: 50,
      color: this.state.highscoreColor,
    };
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    //TODO:

    Alert.alert('Confirm exit', 'Do you want to return to the main menu?', [
      {text: 'CANCEL', style: 'cancel'},
      {
        text: 'OK',
        onPress: () => {
          this.props.navigation.navigate('Home');
          return true;
        },
      },
    ]);

    return true;
  };
}
