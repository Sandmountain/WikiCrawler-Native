import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faRandom} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-native-elements';
import Svg, {Circle} from 'react-native-svg';

export default class LargeIconButton extends Component {
  state = {
    active: this.props.active,
  };

  render() {
    return (
      <View>
        {this.props.iconPosition === 'left' ? (
          <Button
            disabled
            disabledStyle={{backgroundColor: 'white'}}
            buttonStyle={{
              position: 'absolute',
              height: 35,
              width: 35,
              borderRadius: 35,
              left: -22,
              top: 0,
            }}
            icon={
              <FontAwesomeIcon
                style={{
                  zIndex: 30,
                  color: this.props.active == true ? '#ffae42' : '#000',
                }}
                icon={this.props.iconType === 'Random' ? faRandom : faEdit}
              />
            }></Button>
        ) : (
          <Button
            disabled
            disabledStyle={{backgroundColor: 'white'}}
            buttonStyle={{
              position: 'absolute',
              height: 35,
              width: 35,
              borderRadius: 35,
              right: -22,
              top: 0,
            }}
            icon={
              <FontAwesomeIcon
                style={{
                  zIndex: 30,
                  color: this.props.active === true ? '#ffae42' : '#000',
                }}
                icon={this.props.iconType === 'Random' ? faRandom : faEdit}
              />
            }></Button>
        )}

        <Button
          titleStyle={{
            color: this.props.active === true ? '#ffae42' : '#000',
            fontSize: 14,
          }}
          onPress={() => this.sendData(this.props.iconType)}
          buttonStyle={{
            backgroundColor: 'white',
            height: 27,
            width: 141,
            margin: 4,
          }}
          title={`${this.props.buttonTitle}`}></Button>
      </View>
    );
  }

  sendData = name => {
    this.props.parentCallback(name);
  };
}

const styles = StyleSheet.create({});
