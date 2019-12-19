import React, {Component} from 'react';
import {Header} from 'react-native-elements';
import {
  ToolbarAndroid,
  StyleSheet,
  ImageBackground,
  StatusBar,
  View,
  TextInput,
  Text,
} from 'react-native';
import Svg, {
  Defs,
  Ellipse,
  ClipPath,
  Stop,
  RadialGradient,
} from 'react-native-svg';

import CenterComponent from './HeaderComponents/CenterComponent';
import LeftComponent from './HeaderComponents/LeftComponent';
import RightComponent from './HeaderComponents/RightComponent';

export default class HeaderBody extends Component {
  render() {
    return (
      <View>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <Svg height="72" width="100%" style={styles.svg}>
          {/* 'Shadow' elipse, rendered under the main  */}
          <Ellipse
            cx="50%"
            cy="22"
            rx="95%"
            ry="50"
            fillOpacity="0.2"
            fill="black"
          />
          {/* Main Header Elipse */}
          <Defs>
            <Defs>
              <RadialGradient
                id="grad"
                cx="50%"
                cy="10"
                rx="100%"
                ry="50"
                fx="150"
                fy="75"
                gradientUnits="userSpaceOnUse">
                <Stop offset="0" stopColor="#50585b" stopOpacity="1" />
                <Stop offset="1" stopColor="#42494b" stopOpacity="1" />
              </RadialGradient>
            </Defs>
          </Defs>
          <Ellipse
            cx="50%"
            cy="20"
            rx="100%"
            ry="50"
            fill="url(#grad)"
            stroke="black"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
        </Svg>
        <Header
          placement="center"
          leftComponent={<LeftComponent />}
          centerComponent={<CenterComponent />}
          rightComponent={<RightComponent />}
          containerStyle={{
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            backgroundColor: 'transparent',
            paddingLeft: 20,
            height: 80,
            paddingBottom: 10,
            paddingRight: 20,
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,
          }}
        />
      </View>
    );
  }
  testFunction() {
    console.log('hello');
  }
}

const styles = StyleSheet.create({
  svg: {},
  circlll: {
    height: 0,
  },
});
