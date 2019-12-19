import React, {Component} from 'react';
import {View, BackHandler, ImageBackground, ListView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Icon} from 'react-native-elements';
import HeaderSettings from '../Header/HeaderSettings';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  Separator,
} from 'native-base';
import Firebase from '../../config/Firebase';
const user = Firebase.auth().currentUser;
const datas = [
  {
    title: 'Obama -> Trump, 10 sec',
    score: '9089',
  },
  {
    title: 'Philosphy -> Dinosaur',
    score: '89',
  },
  {
    title: 'Pythagoras -> Einstein',
    score: '6089',
  },
  {
    title: 'Pythagoras -> Einstein',
    score: '6089',
  },
  {
    title: 'Pythagoras -> Einstein',
    score: '6089',
  },
  {
    title: 'Pythagoras -> Einstein',
    score: '6089',
  },
  {
    title: 'Pythagoras -> Einstein',
    score: '6089',
  },
  {
    title: 'Pythagoras -> Einstein',
    score: '6089',
  },
  {
    title: 'Pythagoras -> Einstein',
    score: '6089',
  },
  {
    title: 'Pythagoras -> Einstein',
    score: '6089',
  },
];

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: datas,
    };
  }
  render() {
    const user = Firebase.auth().currentUser;
    //<HeaderSettings />
    //TODO: Fix profile page

    return (
      <Container>
        <HeaderSettings />

        <Content>
          {/*TODO: Gör detta till något annat än en lista, eller listview. Sätt som ett statiskt element.
           */}
          <List>
            <ListItem
              thumbnail
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <Left>
                <Thumbnail
                  source={
                    user.photoURL
                      ? {uri: user.photoURL}
                      : {
                          uri:
                            'https://upload.wikimedia.org/wikipedia/commons/3/37/Sus_Barbatus%2C_the_Bornean_Bearded_Pig_%2812616351323%29.jpg',
                        }
                  }
                />
              </Left>
              <Body>
                <Text>{user.displayName}</Text>
                <Text note numberOfLines={1}>
                  Edit profile
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Icon
                    name="gear"
                    size={33}
                    type="evilicon"
                    color="#5bb5cd"
                    onPress={() =>
                      this.props.navigation.navigate('EditProfile')
                    }></Icon>
                </Button>
              </Right>
            </ListItem>
          </List>

          {/*TODO: Gör detta till en adaptiv lista
           */}
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.state.listViewData}
            renderRow={(listViewData, index) =>
              this.elementsToRender(listViewData, index)
            }
            renderLeftHiddenRow={listViewData => (
              <Button full onPress={() => alert(listViewData)}>
                <Icon active name="information-circle" />
              </Button>
            )}>
            {/*<Separator bordered style={{backgroundColor: '#474747'}}>
              <Text style={{color: 'white'}}>Highscores</Text>
            </Separator>
            {test.map(info => (
              <ListItem>
                {
                  //TODO: use https://docs.nativebase.io/Components.html#swipeable-multi-def-headref och visa bara highscoree och datum, trycker man på den kommer man till HS page typ
                }
                <Text>{info.title}</Text>
              </ListItem>
            ))}
              */}
          </List>
        </Content>
      </Container>
    );
  }

  elementsToRender = (test, index) => {
    console.log('test');
    if (index == 0)
      return (
        <ListItem>
          <Text> {test} </Text>
        </ListItem>
      );
    else {
      return (
        <ListItem>
          <Text> {test} </Text>
        </ListItem>
      );
    }
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.navigate('Home');
    return true;
  };
}

export default withNavigation(UserProfile);
