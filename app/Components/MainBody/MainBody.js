import React, {Component} from 'react';
import {
  Text,
  View,
  TextView,
  ScrollView,
  Clipboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {withTheme} from 'react-native-elements';
import {setQuery, getArticles} from '../../Actions/gameDataAction';
import {connect} from 'react-redux';

import Articles from '../Articles/Articles';
import Header from '../Header/HeaderBody';
// https://github.com/ocetnik/react-native-background-timer

/*
const intervalId = BackgroundTimer.setInterval((previousValue = ) => {
  // this will be executed every 200 ms
  // even when app is the the background
  //console.log("tic");
  const previousValue;
  if (previousValue !== state.props.query) {
    console.log("changed value");
    previousValue = state.props.query;
  }
  previousValue = state.prevProps.query;
}, 200);
*/

class MainBody extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    query: 'Copy a Word',
    confirmStyle: '',
    confirmed: false,
    confirmeValue: 0,
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };
  render() {
    styles = StyleSheet.create({
      defaultButton: {
        backgroundColor: this.state.confirmStyle
          ? this.state.confirmStyle
          : 'blue',
      },
    });
    const {search} = this.state;
    return (
      <View style={{flex: 1}}>
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={true}
          scrollsToTop={true}
          overScrollMode={'never'}
          ref="_scrollView">
          <Header />
          <Articles scroll={this.scrollToTop} />
        </ScrollView>
      </View>
    );
  }

  scrollToTop = () => {
    this.refs._scrollView.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  };
  // reset the values when entering app
  componentDidMount() {
    Clipboard.setString('');
  }
}

const mapStateToProps = state => ({
  query: state.gameData.query,
  articles: state.gameData.articles,
  loadingArticles: state.gameData.loadingArticles,
});

export default connect(
  mapStateToProps,
  {setQuery, getArticles},
)(withTheme(MainBody));

//TODO: Remove this code
/* SearchBar that will only work when dragging a word into it. Searching for function to check "whether a word is held"
        <SearchBar
          onFocus={Keyboard.dismiss}
          ref={search => (this.search = search)}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderWidth: 0,
          }}
          containerStyle={{
            height: 40,
          }}
          inputContainerStyle={{
            height: 10,
          }}
          inputStyle={{
            height: 10,
          }}
          placeholder="Drag Here..."
          disabled={true}
          onChangeText={this.updateSearch}
          value={search}></SearchBar>
         
         
         updateButton = async () => {
          //Getting the clibord value for updating directly
          var clipboardValue = await Clipboard.getString();
          await this.props.setQuery(clipboardValue);
      
          if (this.state.confirmed === false) {
            if (this.props.query) {
              this.setState({query: `Serach for ${this.props.query}?`});
              this.setState({confirmeValue: 1});
            } else {
              this.setState({query: `Nothing on Clipboard`});
              this.setState({confirmeValue: 0});
            }
      
            //Setting colors for the button
            this.props.query
              ? this.setState({confirmStyle: 'green'})
              : this.setState({confirmStyle: 'orange'});
      
            //Next time the button is called, the "confirmation" will be run
            this.setState({confirmed: true});
          } else {
            //Call update cards here because the word has been confirmed in (this.props.query)
            if (this.state.confirmeValue == 1) {
              await this.props.getArticles(this.props.query);
              this.setState({confirmeValue: 0});
            }
      
            //Resetting both the clipboard and the props to have no value
            this.props.setQuery('');
            Clipboard.setString('');
            this.setState({confirmStyle: 'blue'});
      
            //Changing the state.
            this.setState({query: `Copy a Word`});
            this.setState({confirmed: false});
          }
        };
*/
