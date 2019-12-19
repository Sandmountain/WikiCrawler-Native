/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, ImageBackground} from 'react-native';
import {Provider, connect} from 'react-redux';
import store from './app/store';
import {colors, ThemeProvider} from 'react-native-elements';

import {createSwitchNavigator} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {createAppContainer, navigationOptions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Transition} from 'react-native-reanimated';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import MainBody from './app/Components/MainBody/MainBody';
import Setup from './app/Components/SetupBody/Setup';
import Start from './app/Components/StartBody/StartBody';
import HighScore from './app/Components/HighScore/HighScoreBody';
import UserProfile from './app/Components/UserProfile/UserProfile';
import EditProfile from './app/Components/UserProfile/EditProfile';
import Firebase from './app/config/Firebase';

import LoadingScreen from './app/Components/LoadingScreen/LoadingScreen';

const backgroundImage = require('./app/Images/bg.jpg');

//TODO: get themes to work! And chang eall those ugly button colors
const theme = {
  colors: {
    primary: '#5bb5cd',
    secondary: '#ffae42',
  },
};

const RootStack = createStackNavigator(
  {
    //TODO: change back to loading screen
    //Loading: LoadingScreen,
    Start: Start,
    Home: Setup,
    UserProfile: UserProfile,
    EditProfile: EditProfile,
    Highscore: HighScore,
    Main: MainBody,
  },
  {
    //misspelled "transparent" does the trick to get transparent background (i.e using custom background image)
    cardStyle: {backgroundColor: 'transperent'},
    headerMode: 'none',
    navigationOptions: {
      headerVisible: 'none',
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0, // Set the animation duration time as 0 !!
      },
    }),
  },
);

let AppContainer = createAppContainer(RootStack);

//register to compomentDidApperaListener to keep track on which screen is currently open. The componentName and Id are stored in my redux store
/*Navigation.events().registerComponentDidAppearListener(({ componentId, componentName }) => {
  store.dispatch(updateCurrentScreen({'name': componentName, 'id': componentId}))
})*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: 'Custom',
    };
  }
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <ImageBackground source={backgroundImage} style={styles.background}>
          <AppContainer />
        </ImageBackground>
      </Provider>
    );
  }

  /* For white BottomNavBar
  componentWillMount() {
    changeNavigationBarColor('white', true);
  }
  */
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
        //this.props.navigation.navigate('Home');
      } else {
        console.log('log in!');
        //this.props.navigation.navigate('Start');
      }
    });
  };
}

export default App;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center' /*space-between*/,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    padding: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

/*
const { height } = Dimensions.get("window");
<ScrollView onContentSizeChange={this.onContentSizeChange}></ScrollView>
state = {
  screenHeight: 0
};
onContentSizeChange = (contentWidth, contentHeight) => {
  this.setState({ screenHeight: contentHeight });
};
*/
