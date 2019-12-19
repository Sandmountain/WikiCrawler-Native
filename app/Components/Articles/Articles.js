import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, BackHandler, Alert} from 'react-native';
import {connect} from 'react-redux';
import {setQuery, getArticles} from '../../Actions/gameDataAction';
import ArticleCard from './ArticleCard/ArticleCard';
import axios from 'axios';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
//import {getConsoleOutput} from '@jest/console';

var Spinner = require('../../../node_modules/react-native-spinkit');

class Articles extends Component {
  constructor() {
    super();
    this.state = {
      newArticle: [],
      searchWord: 'greek',
      noArticles: false,
    };
  }

  render() {
    if (this.props.loadingArticles) {
      <View style={styles.container}>
        <Spinner
          type={'Circle'}
          style={styles.spinner}
          color="#8E8E8E"></Spinner>
      </View>;
    }

    if (this.state.newArticle.length > 0) {
      return this.state.newArticle.map((article, index) => {
        return (
          <View key={index}>
            <ArticleCard articleData={article} updateData={this.updateQuery} />
            {index == this.state.newArticle.length - 1 ? (
              <View>
                <Button
                  type="clear"
                  onPress={() => {
                    this.scrollToTop();
                  }}
                  title="To The Top"></Button>
              </View>
            ) : null}
          </View>
        );
      });
    } else {
      return (
        <View style={styles.container}>
          <Spinner
            type={'Circle'}
            style={styles.spinner}
            color="#8E8E8E"></Spinner>
        </View>
      );
    }
  }
  //no wait for other things to load
  updateQuery = query => {
    this.LoadArticles(query);
  };
  scrollToTop() {
    this.props.scroll();
  }
  //Load the initial articles
  componentDidMount() {
    console.log(this.props.query);
    this.LoadArticles(this.props.query);
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    if (true) {
      //TODO: Say what the previous article is
      Alert.alert(
        'Precious Article',
        'Do you want to go back to previous article? (This operation lowers your high score)',
        [
          {text: 'CANCEL', style: 'cancel'},
          {
            text: 'OK',
            onPress: () => {
              //TODO: lower score
              console.log('Lower score and add click');
              return true;
            },
          },
        ],
      );
    }

    return true;
  };

  //Load articles from wiki API
  async LoadArticles(query) {
    let theWordWow = this.props.goal;
    if (query.length > 2) {
      try {
        axios
          .get(
            `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`,
          )
          .then(res => {
            if (
              res.data[1][0].toUpperCase() === this.props.goal.toUpperCase()
            ) {
              //TODO: Fix everything with goal and high score
              Alert.alert('YOU WIN BABA!', 'Press any button beacuse fun', [
                {
                  text: 'SEE HIGH SCORE',
                  onPress: () => {
                    //Use a seperate function to be able to send to next page.
                    this.sendToHighScore();
                  },
                },
              ]);
              //Don't load the winning article
              return 0;
            }

            if (res.data[1].length > 0) {
              this.setState({newArticle: ''});
              this.props.setQuery(query);

              //Regex
              const lists = /(<li>)/g;
              const regex = /(<([^>]+)>)/gi;
              const math = /({([^>]+)})/g;

              //getting the full articles
              res.data[1].map((title, index) => {
                let tempArticle = {
                  title: '',
                  text: '',
                  imageUrl: '',
                };
                axios
                  .all([
                    //https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles= <--- PLAIN TEXT
                    //https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles= <--- WITH HTML
                    axios.get(
                      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${title}`,
                    ),
                    axios.get(
                      `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${title}`,
                    ),
                  ])
                  .then(
                    axios.spread((textRes, imageRes) => {
                      let artPage = textRes.data.query.pages;
                      let imgPage = imageRes.data.query.pages;

                      //The article/image contentent needs its id.
                      let pageId = Object.keys(artPage)[0]; //retrives the id from the first item in the set  (the wiki structure)

                      //Only do operations if there are text in the article
                      if (
                        artPage[pageId].extract !== '' &&
                        !artPage[pageId].extract.includes('may refer to')
                      ) {
                        this.setState({noArticles: false});

                        let paragraphs = artPage[pageId].extract.split('<p>');

                        //console.log(paragraphs);
                        let newtextArticle = '';
                        paragraphs.forEach((paragraph, index) => {
                          if (index == 1)
                            newtextArticle =
                              newtextArticle + paragraph.replace(/\n/g, '');
                          else if (index > 1)
                            newtextArticle =
                              newtextArticle +
                              '\n\n' +
                              paragraph.replace(/\n/g, '');
                        });

                        tempArticle.text =
                          newtextArticle
                            .replace(lists, '\n   ‣ ')
                            .replace(regex, '')
                            .replace(math, '') + '\n';

                        //To calculate all missed words. (Much quicker than last game)
                        const theWord = new RegExp(theWordWow, 'g' + 'i');
                        console.log(newtextArticle.match(theWord));

                        //Setting the image url
                        if (imgPage[pageId].original) {
                          tempArticle.imageUrl =
                            imgPage[pageId].original['source'];
                        }
                        //Setting the title
                        tempArticle.title = title;

                        this.setState({
                          newArticle: [...this.state.newArticle, tempArticle],
                        });
                      } else {
                        //Do not add "empty articles"
                        if (index === res.data[1].length - 1) {
                          if (this.state.newArticle.length == 0) {
                            let emptySerach = {
                              title: res.data[1][0],
                              text:
                                '\nThere were no extra information about ' +
                                res.data[1][0] +
                                ', you can go back to previous article without any extra cost. \n',
                              imageUrl: '',
                            };
                            this.setState({
                              newArticle: [emptySerach],
                            });
                          }
                        }
                      }
                    }),
                  );
              });
            } else {
              Alert.alert(
                'Selection Error',
                'Your selection was not an article',
                [
                  {
                    text: 'I got it!',
                    onPress: () => {
                      return true;
                    },
                  },
                ],
              );
            }
          });
      } catch (error) {
        console.log('getArticles', error);
      }
    } else {
      //TODO: USe nicer modals for alerts.  https://github.com/maxs15/react-native-modalbox
      Alert.alert(
        'Selection Error',
        'You need to enter a query longer than 2 letters',
        [
          {
            text: 'I got it!',
            onPress: () => {
              return true;
            },
          },
        ],
      );
    }
  }
  sendToHighScore = () => {
    this.props.navigation.navigate('Highscore');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginTop: '70%',
  },
});

const mapStateToProps = state => ({
  query: state.gameData.query,
  goal: state.gameData.goalArticle,
  articles: state.gameData.articles,
  loadingArticles: state.gameData.loadingArticles,
});

export default connect(
  mapStateToProps,
  {setQuery, getArticles},
)(withNavigation(Articles));
