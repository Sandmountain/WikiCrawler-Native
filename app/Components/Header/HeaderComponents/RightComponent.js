import React, {Component} from 'react';
import {Text, View, StatusBar, StyleSheet} from 'react-native';
import {
  faEllipsisV,
  faQuestionCircle,
  faPauseCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Button, Overlay, Tooltip} from 'react-native-elements';

import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

class RightComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.toggleOverlay.bind(this);
  }
  toggleOverlay() {
    this.setState((prevState, props) => ({isVisible: !prevState.isVisible}));
  }

  render() {
    const {isVisible} = this.state.isVisible;

    return (
      <View>
        <Button
          icon={
            <FontAwesomeIcon
              style={{
                color: '#cccccc',
              }}
              icon={faEllipsisV}></FontAwesomeIcon>
          }
          type="clear"
          style={{}}
          onPress={() => this.toggleOverlay()}></Button>
        {/* MODAL*/}
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(0, 0, 0, .3)"
          containerStyle={{}}
          overlayBackgroundColor="white"
          width="97%"
          height="60%"
          onBackdropPress={() => this.setState({isVisible: false})}>
          <View style={{height: '100%'}}>
            {/* Fix to get statusbar same color as modal overlay */}
            <StatusBar backgroundColor={'rgba(0, 0, 0, .3)'}></StatusBar>
            <View
              style={{
                flex: 1,
                alignItems: 'stretch',
                justifyContent: 'space-between',
                flexWrap: 'nowrap',
                flexDirection: 'column',
                padding: 5,
              }}>
              <View style={{alignItems: 'center'}}>
                <FontAwesomeIcon
                  style={{color: 'black'}}
                  icon={faPauseCircle}
                  size={20}></FontAwesomeIcon>
                <Text style={styles.header}>GAME PAUSED</Text>

                <View style={{flexDirection: 'row'}}>
                  <Tooltip
                    withPointer={false}
                    popover={<Text>{this.props.goalSummary}</Text>}>
                    <Text style={styles.searching}>SEARCHING FOR </Text>
                  </Tooltip>
                  <Text style={styles.searchingArticle}>
                    {this.props.goal}{' '}
                  </Text>

                  {/* TODO: Använd Tooltip från elements */}

                  <FontAwesomeIcon
                    style={{color: '#cccccc'}}
                    size={13}
                    icon={faQuestionCircle}></FontAwesomeIcon>
                </View>
              </View>
              <View>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Button
                    title="RESTART"
                    type="outline"
                    color=""
                    containerStyle={{
                      width: '50%',
                    }}
                  />
                  <Button
                    title="NEW GAME"
                    type="outline"
                    onPress={() => {
                      this.toggleOverlay();
                      this.resetGame();
                      this.props.navigation.navigate('Home');
                    }}
                    containerStyle={{width: '50%', marginTop: 20}}
                  />
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',

                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text>Time Elapsed</Text>
                  <Text>Previous Article</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text>13:20</Text>
                  <Text style={styles.previousArticle}>CHICKEN</Text>
                </View>
              </View>
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
  //TODO: fix a reset game funciton
  resetGame = () => {
    console.log('reset variables');
  };
}
const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  searching: {
    textAlign: 'left',
    color: '#cccccc',
    fontSize: 11,
  },
  searchingArticle: {
    color: '#5bb5cd',
    fontSize: 11,
  },
  previousArticle: {
    color: '#5bb5cd',
    fontSize: 13,
  },
});

const mapStateToProps = state => ({
  query: state.gameData.query,
  goal: state.gameData.goalArticle,
  goalSummary: state.gameData.goalArticleSummary,
});

export default connect(mapStateToProps)(withNavigation(RightComponent));
