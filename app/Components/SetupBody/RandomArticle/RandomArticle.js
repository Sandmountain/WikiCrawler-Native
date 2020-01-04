import React, {Component} from 'react';
import {
  Modal,
  Alert,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Card, Button, Divider, Input, Tooltip} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faRandom} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {setQuery, setGoal, setSummary} from '../../../Actions/gameDataAction/';

import axios from 'axios';
import {TextField} from 'react-native-material-textfield';
import HTML from 'react-native-render-html';
import RNPickerSelect from 'react-native-picker-select';

class RandomArticle extends Component {
  state = {
    RandomArticleValue: '',
    StartingArticle: 'Starting Article:',
    GoalArticle: 'Finishing Article',
    StartArticleError: false,
    GoalArticleError: false,
    GoalArticleSummary: '',
    GoalArticleSummaryHTML: '',
    GoalAvatarURL: '',
    modalVisible: false,
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
                  {this.state.StartArticleFound !== true ? (
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
                {this.state.GoalArticleFound !== true ? (
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
            </View>
          ) : null}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({modalVisible: !this.state.modalVisible});
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 5,
                  elevation: 3,
                  width: 350,
                }}>
                <Text style={{fontWeight: 'bold', paddingBottom: 5}}>
                  SUMMERY OF {this.state.GoalArticle.toUpperCase()}
                </Text>

                <HTML
                  html={this.state.GoalArticleSummaryHTML}
                  imagesMaxWidth={Dimensions.get('window').width}
                />

                <View
                  style={{
                    flexDirection: 'row-reverse',
                  }}>
                  <Button
                    type="clear"
                    title="Start Game"
                    onPress={() => {
                      this.setState({modalVisible: !this.state.modalVisible});
                      this.props.navigation.navigate('Main');
                    }}></Button>
                  <Button
                    type="clear"
                    titleStyle={{color: 'gray'}}
                    title="Return"
                    onPress={() => {
                      this.setState({modalVisible: !this.state.modalVisible});
                    }}></Button>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View style={{paddingTop: 5}}>
          <Button
            title="VALIDATE ARTICLE"
            type="clear"
            style={{margin: 2}}
            onPress={() => this.validateArticle()}></Button>
        </View>
      </View>
    );
  }

  validateArticle = () => {
    //this.setState({GoalArticleError: true});
    //this.setState({StartArticleError: true});

    this.setState({gotSummary: false});
    this.setState({GoalArticleSummary: ''});
    this.setState({GoalArticleSummaryHTML: ''});
    this.setState({GoalAvatarURL: ''});
    this.articleQuery(this.state.GoalArticle, 'GoalArticle');
    //this.articleQuery(this.state.StartingArticle, 'StartArticle');
  };

  async articleQuery(query, method) {
    axios
      .get(
        //`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`,
        `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`,
      )
      .then(res => {
        console.log(res);
        if (res.data.description !== '') {
          let modalText = '';
          if (
            res.data.extract_html.includes('refer to') ||
            res.data.extract_html.includes('refers to')
          ) {
            modalText =
              res.data.extract_html + '<b>Do you wish to continue?</b>';
          } else {
            modalText = res.data.extract_html;
          }
          this.setState({GoalArticleSummary: modalText});
          this.setState({GoalArticleSummaryHTML: modalText});
          this.setState({GoalAvatarURL: 'disc'});

          this.props.setSummary(modalText);
          //alert(res.data.description);
          this.setState({modalVisible: true});
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
