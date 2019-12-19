import React, {Component} from 'react';
import {Text, View, ScrollView, Clipboard, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class CenterComponent extends Component {
  render() {
    return (
      <View>
        <Text style={styles.centerText}>
          <Text style={styles.current}>CURRENT ARTICLE</Text>
          <Text style={styles.currentName}>
            {'\n'}
            {this.props.query.length > 24
              ? this.props.query.substring(0, 18).toUpperCase() + ' ...'
              : this.props.query.toUpperCase()}
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  current: {
    color: '#cccccc',
    fontSize: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 5,
  },
  currentName: {
    color: '#d8946d',
    fontSize: 15,
    paddingBottom: '10px',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 5,
  },
  searching: {
    color: '#373737',
    fontSize: 9,
  },
  searchingName: {
    color: '#5bb5cd',
    fontSize: 9,
  },
  centerText: {
    textAlign: 'center',
    paddingBottom: 15,
  },
});

const mapStateToProps = state => ({
  query: state.gameData.query,
});

export default connect(mapStateToProps)(CenterComponent);
