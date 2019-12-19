import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Card, Button, Divider, Input, Tooltip} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faRandom} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {setQuery, setGoal, setSummary} from '../../../Actions/gameDataAction/';

import axios from 'axios';
import {TextField} from 'react-native-material-textfield';
import RNPickerSelect from 'react-native-picker-select';

class RandomArticle extends Component {
  state = {
    RandomArticleValue: '',
    StartingArticle: 'Starting Article:',
    GoalArticle: 'Finishing Article',
    StartArticleError: false,
    GoalArticleError: false,
    GoalArticleSummary: '',
    gotSummary: false,
  };

  render() {
    let data = [
      {
        label: 'Adjectives',
        value: 0,
      },
      {
        label: 'Nature',
        value: 1,
      },
      {
        label: 'Things',
        value: 2,
      },
      {
        label: 'Technology',
        value: 3,
      },
      {
        label: 'People',
        value: 4,
      },
    ];
    const placeholder = {
      label: 'Select a category',
      value: '',
      color: '#b3b3b3',
    };
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={styles.body}>
          <Text style={{fontWeight: 'bold', paddingBottom: 5}}>
            RANDOM ARTICLE
          </Text>
          <Text style={{paddingBottom: 5, fontSize: 12}}>
            Please choose a category from the dropdown menu below. Your goal
            article will be randomly chosen from that category and a random
            article from another category will also be chosen for you.
          </Text>
          <Divider />
          <View
            style={{
              width: '80%',
              alignSelf: 'center',
              paddingTop: 25,
              paddingBottom: 25,
            }}>
            {/* https://www.npmjs.com/package/react-native-picker-select */}

            <RNPickerSelect
              placeholder={placeholder}
              style={{
                width: 600,
                color: '#344953',
              }}
              onValueChange={value => this.getArticleSetup(value)}
              items={data}
            />
          </View>

          {this.state.RandomArticleValue !== '' ? (
            <View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <View style={{paddingBottom: 20}}>
                  {this.state.StartArticleError !== true ? (
                    <View>
                      <Text>
                        <Text
                          style={{
                            fontStyle: 'italic',
                            color: 'gray',
                            fontSize: 12,
                          }}>
                          Starting at:
                        </Text>{' '}
                        <Text style={styles.ArticleInputText}>
                          {this.state.StartingArticle}
                        </Text>
                      </Text>
                      <Divider></Divider>
                    </View>
                  ) : (
                    <View>
                      <Text>
                        <Text style={(styles.ArticleInputText, {color: 'red'})}>
                          Not a valid Wikipedia article
                        </Text>
                      </Text>
                      <Divider
                        style={{
                          borderRadius: 4,
                          height: 2,
                          backgroundColor: 'red',
                        }}></Divider>
                    </View>
                  )}
                </View>
                {this.state.GoalArticleError !== true ? (
                  <View>
                    <Text>
                      <Text
                        style={{
                          fontStyle: 'italic',
                          color: 'gray',
                          fontSize: 12,
                        }}>
                        Finishing at:
                      </Text>{' '}
                      <Text style={styles.ArticleInputText}>
                        {this.state.GoalArticle}
                      </Text>
                    </Text>
                    <Divider></Divider>
                  </View>
                ) : (
                  <View>
                    <Text>
                      <Text style={(styles.ArticleInputText, {color: 'red'})}>
                        Not a valid Wikipedia article
                      </Text>
                    </Text>
                    <Divider
                      style={{
                        borderRadius: 4,
                        height: 2,
                        backgroundColor: 'red',
                      }}></Divider>
                  </View>
                )}
              </View>
              <View style={{alignSelf: 'center', paddingTop: 10}}>
                <Button
                  icon={<FontAwesomeIcon icon={faRandom} />}
                  type="clear"
                  buttonStyle={{
                    height: 30,
                    width: 60,
                    backgroundColor: 'white',
                    elevation: 1,
                  }}
                  onPress={() =>
                    this.getArticleSetup(this.state.RandomArticleValue)
                  }></Button>
              </View>
              {this.state.gotSummary !== false ? (
                <View style={{paddingTop: 10}}>
                  <Text style={{fontWeight: 'bold', paddingBottom: 5}}>
                    SUMMERY OF {this.state.GoalArticle.toUpperCase()}
                  </Text>
                  {this.state.GoalArticleSummary !== '' ? (
                    <Text>{this.state.GoalArticleSummary}</Text>
                  ) : (
                    //TODO: add spinner
                    <Text> Spinner </Text>
                  )}
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
        {this.state.RandomArticleValue !== '' ? (
          <View style={{paddingTop: 5}}>
            {this.state.gotSummary !== false ? (
              <Button
                title="GO"
                type="clear"
                style={{margin: 2}}
                onPress={() => this.props.navigation.navigate('Main')}></Button>
            ) : (
              <Button
                title="VALIDATE ARTICLE"
                type="clear"
                style={{margin: 2}}
                onPress={() => this.validateArticle()}></Button>
            )}
            {/* */}
          </View>
        ) : null}
      </View>
    );
  }

  validateArticle = () => {
    //this.setState({GoalArticleError: true});
    //this.setState({StartArticleError: true});
    this.setState({gotSummary: false});
    this.setState({GoalArticleSummary: ''});
    this.articleQuery(this.state.GoalArticle, 'GoalArticle');
    this.articleQuery(this.state.StartingArticle, 'StartArticle');
  };

  async articleQuery(query, method) {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`,
      )
      .then(res => {
        if (res.data[2].length > 0) {
          if (method === 'GoalArticle') {
            res.data[2].forEach((element, index) => {
              if (
                !element.includes('may refer to:') &&
                element !== '' &&
                this.state.GoalArticleSummary === ''
              ) {
                this.setState({GoalArticleSummary: res.data[2][index]});
                this.props.setSummary(res.data[2][index]);
              }
            });
          }
        } else {
          if (method === 'GoalArticle') {
            this.setState({GoalArticleError: true});
          } else {
            this.setState({StartArticleError: true});
          }
        }
      });
  }

  componentDidUpdate(nextProps, prevState) {
    if (prevState.GoalArticleSummary !== this.state.GoalArticleSummary) {
      this.setState({gotSummary: true});
    }
  }

  getArticleSetup = value => {
    if (value !== '') {
      this.setState({gotSummary: false});
      this.setState({RandomArticleValue: value});
      const categories = require('./scripts/categories.js');

      categoriesArray = Object.values(categories.default);

      let exceptIndex = value;
      let filteredItems = categoriesArray.filter(
        (value, index) => index !== exceptIndex,
      );

      let start = this.getRandomArticle(
        filteredItems[Math.floor(Math.random() * filteredItems.length)],
      );
      let goal = this.getRandomArticle(categoriesArray[value]);

      // Make redux:
      this.setState({StartingArticle: start});
      this.setState({GoalArticle: goal});
      this.props.setQuery(start);
      this.props.setGoal(goal);
    } else {
      this.setState({RandomArticleValue: value});
    }
  };

  getRandomArticle = words => {
    this.setState({gotSummary: false});
    this.setState({StartArticleError: false});
    this.setState({GoalArticleError: false});
    return words[Math.floor(Math.random() * words.length)];
  };
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    marginBottom: 0,
    padding: 5,
    borderRadius: 4,
    width: '140%',
    elevation: 2,
  },
  ArticleInputText: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  query: state.gameData.query,
  goal: state.gameData.goalArticle,
  goalSummary: state.gameData.GoalArticleSummary,
});

export default connect(mapStateToProps, {setQuery, setGoal, setSummary})(
  withNavigation(RandomArticle),
);
