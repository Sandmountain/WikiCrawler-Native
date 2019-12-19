import React, {Component} from 'react';
import {View, Keyboard} from 'react-native';
import {Item, Input, Text, Label, Body, Button} from 'native-base';
import {withNavigation} from 'react-navigation';

class LogIn extends Component {
  state = {
    textOnFocus: false,
  };
  render() {
    return (
      <Body style={{alignItems: 'center'}}>
        <Text style={{paddingBottom: 10, color: '#00000080'}}>
          Sign in with your WikiCrawler account
        </Text>
        <Item
          style={{
            backgroundColor: '#00000032',
            borderColor: '#00000032',
            paddingLeft: 5,
          }}
          regular>
          <Label>Username</Label>
          <Input onSubmitEditing={Keyboard.dismiss} />
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
            onSubmitEditing={Keyboard.dismiss}
            secureTextEntry
          />
        </Item>
        <Item style={{paddingTop: 5}}></Item>
        <Button block>
          <Text>LOGIN</Text>
        </Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Button
            transparent
            onPress={() => {
              this.props.changeView('CreateAccount');
            }}>
            <Text>Create account</Text>
          </Button>
          <Button
            transparent
            onPress={() => {
              this.props.changeView('ForgotPassword');
            }}>
            <Text>Forgot password</Text>
          </Button>
        </View>

        {!this.state.textOnFocus ? (
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'center',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              ──────── or ────────
            </Text>
            <Button
              bordered
              block
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text>LOGIN WITH FACEBOOK</Text>
            </Button>
          </View>
        ) : null}
      </Body>
    );
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.showOrHide,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.showOrHide,
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  showOrHide = () => {
    this.setState({textOnFocus: !this.state.textOnFocus});
  };
}

export default withNavigation(LogIn);
