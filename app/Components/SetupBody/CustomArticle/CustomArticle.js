import React, {Component} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import {Button, Divider, Input} from 'react-native-elements';

import {HeaderBackButton, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {setQuery, setGoal} from '../../../Actions/gameDataAction/';

import axios from 'axios';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';

import HTML from 'react-native-render-html';

const navigationOptions = ({navigation}) => ({
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
});

const GREEN = 'rgba(0, 210, 82, .87)';
const GRAY = 'rgba(0, 0, 0, .87)';

class CustomArticle extends Component {
  Starting = React.createRef();
  Goal = React.createRef();

  state = {
    RandomArticleValue: '',
    StartingArticle: '',
    GoalArticle: '',
    StartArticleError: false,
    StartArticleErrorHelp: '',
    GoalArticleError: false,
    GoalArticleErrorHelp: '',
    GoalArticleSummary: '',
    GoalArticleSummaryHTML: '',
    gotSummary: false,
    testStart: '',
    modalVisible: false,
    StartingArticleTextColor: GRAY,
    GoalArticleTextColor: GRAY,
  };
  render() {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={styles.cardBody}>
          <Text style={{fontWeight: 'bold', paddingBottom: 5}}>
            CUSTOM ARTICLE
          </Text>
          <Text style={{paddingBottom: 5, fontSize: 12}}>
            Please write two articles in the fields below and validate to see if
            they are Wikipedia articles to start the game.
          </Text>
          <Divider style={{marginBottom: 25}} />

          <Input
            fontSize="24"
            style={{fontSize: 5}}
            containerStyle={{height: 25, marginBottom: 25}}
            inputContainerStyle={{height: 25}}
            onChangeText={text => {
              this.setState({StartingArticle: text});
            }}
            placeholder="Enter starting article"
            errorStyle={{color: 'red'}}
            errorMessage={this.state.StartArticleError ? 'fail' : ''}></Input>

          <Input
            fontSize="24"
            style={{fontSize: 5}}
            containerStyle={{height: 25, marginBottom: 25}}
            inputContainerStyle={{height: 25}}
            placeholder="Enter goal article"
            onChangeText={text => {
              this.setState({GoalArticle: text});
            }}
            errorStyle={{color: 'red'}}
            errorMessage={this.state.GoalArticleError ? 'fail' : ''}></Input>
        </View>
        {this.state.GoalArticle !== '' && this.state.StartingArticle !== '' ? (
          <View style={{paddingTop: 5}}>
            {this.state.gotSummary !== false ? null : (
              <Button
                title="VALIDATE ARTICLE"
                type="clear"
                style={{margin: 2}}
                onPress={() => {
                  Keyboard.dismiss();
                  this.validateArticle();
                }}></Button>
            )}
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
    );
  }

  resetError = () => {
    this.setState({StartArticleErrorHelp: ''});
    this.setState({GoalArticleErrorHelp: ''});
  };

  onSubmitStartingArticle = () => {
    //New user input
    if (this.StartingArticle !== this.Starting.current.state.text) {
      this.setState({StartingArticle: ''});
      this.setState({StartArticleErrorHelp: ''});
      this.setState({StartingArticleTextColor: GRAY});
    }

    if (this.Starting.current.state.text) {
      this.setState({StartingArticle: this.Starting.current.state.text});
    }
  };
  onSubmitGoalArticle = () => {
    //New user input
    if (this.GoalArticle !== this.Goal.current.state.text) {
      this.setState({gotSummary: false});
      this.setState({GoalArticle: ''});
      this.setState({GoalArticleErrorHelp: ''});
      this.setState({GoalArticleTextColor: GRAY});
    }
    if (this.Goal.current.state.text) {
      this.setState({StartArticleErrorHelp: ''});
      this.setState({GoalArticle: this.Goal.current.state.text});
    }
  };

  validateArticle = () => {
    //this.setState({GoalArticleError: true});
    //this.setState({StartArticleError: true});

    if (this.state.GoalArticle === this.state.StartingArticle) {
      this.setState({GoalArticleErrorHelp: 'Choose two different articles'});
      this.setState({StartArticleErrorHelp: 'Choose two different articles'});
    } else {
      this.setState({gotSummary: false});
      this.setState({GoalArticleSummary: ''});
      this.articleQuery(this.state.GoalArticle, 'GoalArticle');
      //this.articleQuery(this.state.StartingArticle, 'StartArticle');
    }
  };

  async articleQuery(query, method) {
    axios
      .get(
        //`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`,
        `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`,
      )
      .then(res => {
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

          //this.props.setSummary(modalText);
          //alert(res.data.description);
          this.setState({modalVisible: true});
        } else {
          this.setState({GoalArticleSummaryHTML: 'ERROR OMG'});
          this.setState({modalVisible: true});
          if (method === 'GoalArticle') {
            this.setState({GoalArticleError: true});
          } else {
            this.setState({StartArticleError: true});
          }
        }
      })
      .catch(err => {
        //TODO: FIX NICER
        this.setState({GoalArticleSummaryHTML: 'ERROR OMG'});
        this.setState({modalVisible: true});
      });

    /*
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`,
      )
      .then(res => {
        if (res.data[2].length > 0) {
          if (method === 'GoalArticle') {
            res.data[2].forEach((element, index) => {
              if (
                !element.includes('refer to:') &&
                !element.includes('refers to:') &&
                element !== '' &&
                this.state.GoalArticleSummary === ''
              ) {
                this.setState({GoalArticleSummary: res.data[2][index]});

                //TODO: Setting the goal article to the one that is not "refers to" could be bad, but also good.
                //this.setState({GoalArticle: res.data[1][index]});
                this.setState({gotSummary: true});
                this.setState({GoalArticleTextColor: GREEN});
              }
            });
          } else {
            this.setState({StartingArticleTextColor: GREEN});
          }
        } else {
          if (method === 'GoalArticle') {
            this.setState({GoalArticleError: true});
            this.setState({GoalArticleErrorHelp: 'Not a Wikipedia Article'});
          } else {
            this.setState({StartArticleError: true});
            this.setState({StartArticleErrorHelp: 'Not a Wikipedia Article'});
          }
        }
      });
      */
  }
}

const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: 'white',
    margin: 5,
    marginBottom: 0,
    padding: 5,
    borderRadius: 4,
    width: '140%',
    elevation: 2,
  },
});

const mapStateToProps = state => ({
  query: state.gameData.query,
  goal: state.gameData.goalArticle,
});

export default connect(mapStateToProps, {setQuery, setGoal})(
  withNavigation(CustomArticle),
);

/* Backuppuururu


 <View style={{alignItems: 'center', paddingBottom: 23}}>
            <View style={{width: '90%'}}>
              {
                //TODO: check into if https://callstack.github.io/react-native-paper/text-input.html#selectionColor is better than elements
                // or even https://nativebase.io/
                // Recommend to use a "check box" instead of green text when verified article
              }
              <TextField
                fontSize={12}
                //onSubmitEditing={this.onSubmitStartingArticle}
                baseColor={this.state.StartingArticleTextColor}
                onBlur={this.onSubmitStartingArticle}
                onFocus={this.resetError}
                ref={this.Starting}
                error={this.state.StartArticleErrorHelp}
                label="Enter starting article: "></TextField>
              <TextField
                fontSize={12}
                baseColor={this.state.GoalArticleTextColor}
                onBlur={this.onSubmitGoalArticle}
                onFocus={this.resetError}
                ref={this.Goal}
                error={this.state.GoalArticleErrorHelp}
                label="Enter goal article: "></TextField>
            </View>
            {this.state.gotSummary !== false ? (
              <View style={{paddingTop: 10}}>
                <Button
                  title="START GAME"
                  buttonStyle={{height: 30}}
                  onPress={() => {
                    this.props.setQuery(this.state.StartingArticle);
                    this.props.setGoal(this.state.GoalArticle);
                    this.props.navigation.navigate('Main');
                  }}></Button>
              </View>
            ) : null}
          </View>


*/
