import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {setQuery, getArticles} from '../../../Actions/gameDataAction';
import {SelectableText} from '@astrocoders/react-native-selectable-text';
import ImageView from 'react-native-image-view';
import {Button} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faExpand} from '@fortawesome/free-solid-svg-icons';
import {Icon} from 'react-native-elements';

const images = [];

class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      title: '',
      currentClipBoard: 'value',
      query: '',
      isImageViewVisible: false,
    };
  }
  render() {
    return this.props.articleData ? (
      <View style={styles.body}>
        {
          ((fileFormat = this.props.articleData.imageUrl.substring(
            this.props.articleData.imageUrl.lastIndexOf('.'),
          )),
          fileFormat === '.jpg' ||
          fileFormat === '.jpeg' ||
          fileFormat === '.png' ? (
            <View>
              <TouchableOpacity
                onPress={() => this.setState({isImageViewVisible: true})}>
                <ImageBackground
                  progressiveRenderingEnabled={true}
                  source={{uri: this.props.articleData.imageUrl}}
                  PlaceholderContent={<ActivityIndicator />}
                  style={styles.image}
                  loadingIndicatorSource={require('../../../Images/bg.jpg')}></ImageBackground>
                <View
                  style={{
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    bottom: 0,
                    padding: 5,
                  }}>
                  <Icon
                    raised
                    size={15}
                    name="crop-free"
                    type="material"
                    color="#5bb5cd"></Icon>
                </View>
              </TouchableOpacity>
              <ImageView
                images={[
                  {
                    source: {
                      uri: this.props.articleData.imageUrl,
                    },
                  },
                ]}
                isPinchZoomEnabled={false}
                imageIndex={0}
                isVisible={this.state.isImageViewVisible}
                renderFooter={currentImage => (
                  <View>
                    <Text style={styles.imagefooter}>
                      {this.props.articleData.title}{' '}
                    </Text>
                  </View>
                )}
              />
              <SelectableText
                menuItems={['Search Article']}
                onSelection={({content}) => {
                  this.searchingContent(content);
                }}
                value={this.props.articleData.title}
                style={styles.title}
              />
              <View style={styles.horizontalLine} />

              {/*<HTML html={this.props.pro.text} textSelectable />*/}
            </View>
          ) : (
            <View>
              {/*If no image :*/}
              <SelectableText
                menuItems={['Search Article']}
                onSelection={({content}) => {
                  this.searchingContent(content);
                }}
                value={this.props.articleData.title}
                style={styles.titleNoImage}
              />
              <View style={styles.horizontalLine} />
            </View>
          ))
        }

        <SelectableText
          style={{marginTop: 20}}
          menuItems={['Search Article']}
          onSelection={({content}) => {
            this.searchingContent(content);
          }}
          value={this.props.articleData.text}
        />
      </View>
    ) : (
      <View>
        <Text> Something went wrong...</Text>
      </View>
    );
  }

  searchingContent(query) {
    //this.props.setQuery(query);
    this.props.updateData(query);
  }

  /*
  onClipBoardChange = async () => {
    var clipboardValue = await Clipboard.getString();
    await this.props.setQuery(clipboardValue);
    console.log(this.props.query);
  };
  */
}

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    width: '100%',
    zIndex: -1,
  },
  image: {
    height: 150,
    width: '100%',
    position: 'relative',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    paddingRight: 5,
    textAlignVertical: 'center',
  },
  titleNoImage: {
    fontSize: 25,
    paddingRight: 5,
  },
  imagefooter: {
    textAlign: 'center',
    color: 'white',
    paddingBottom: 40,
  },
  body: {
    maxWidth: 500,
    backgroundColor: 'white',
    margin: 5,
    marginBottom: 0,
    padding: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  imageView: {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
  },
  imageText: {
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBackground: {
    backgroundColor: 'white',
    position: 'absolute',
    height: 20,
    width: '100%',
    opacity: 0.5,
  },
});

const mapStateToProps = state => ({
  query: state.gameData.query,
  loadingArticles: state.gameData.loadingArticles,
});

export default connect(
  mapStateToProps,
  {setQuery, getArticles},
)(ArticleCard);

/*
Backup
state = {
    selection: [0, 0],
    text: "Super Aweomse Text",
    query: ""
  };

  render() {
    const {
      selection: [start, end],
      text
    } = this.state;
    const selected = text.substring(start, end);

    return (
      <View style={styles.body}>
        <View style={styles.image} />
        <Text style={styles.title}> This is the tile </Text>
        <Button title="hello" />

        <TextInput
          onSelectionChange={this.onSelectionChange}
          onChangeText={text => this.setState({ text })}
          value={text}
          keyboardType={null}
        />
        <Text>{` ${selected}`}</Text>
      </View>
    );
  }
onSelectionChange = event => {
    const selection = event.nativeEvent.selection;
    newQuery = this.state.text.substring(selection.start, selection.end);

    this.setState({ query: newQuery });
    this.setState({
      selection: [selection.start, selection.end]
    });
  };

*/
