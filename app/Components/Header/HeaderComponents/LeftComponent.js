import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

class LeftComponent extends Component {
  render() {
    return (
      <View>
        <Text style={styles.clicks}>
          {this.chooseColor(this.props.nrClicks)} CLICKS
        </Text>
      </View>
    );
  }
  chooseColor = nrClicks => {
    if (nrClicks <= 10) {
      return (
        <Text
          style={{
            color: '#5bb5cd',
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: {width: 0, height: 1},
            textShadowRadius: 5,
          }}>
          {nrClicks}
        </Text>
      );
    } else if (nrClicks > 10) {
      return (
        <Text
          style={{
            color: '#3A3A3A',
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: {width: 0, height: 1},
            textShadowRadius: 5,
          }}>
          {nrClicks}
        </Text>
      );
    } else if (nrClicks > 15) {
      return (
        <Text
          style={{
            color: '#ffae42',
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: {width: 0, height: 1},
            textShadowRadius: 5,
          }}>
          {nrClicks}
        </Text>
      );
    } else if (nrClicks > 30) {
      return (
        <Text
          style={{
            color: '#ff5042',
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: {width: 0, height: 1},
            textShadowRadius: 5,
          }}>
          {nrClicks}
        </Text>
      );
    }
  };
}

const styles = StyleSheet.create({
  clicks: {
    textAlign: 'left',
    color: '#cccccc',
    fontSize: 11,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 5,
  },
  clicksNr: {
    color: 'green',
  },
  time: {
    textAlign: 'left',
    color: '#373737',
    fontSize: 8,
  },
});

const mapStateToProps = state => ({
  nrClicks: state.gameData.numberOfClicks,
});

export default connect(mapStateToProps)(LeftComponent);
