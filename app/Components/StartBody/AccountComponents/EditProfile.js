import React, {Component} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {withNavigation} from 'react-navigation';
import {
  Body,
  Button,
  Text,
  Item,
  Label,
  Textarea,
  Form,
  Input,
  Thumbnail,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Firebase from '../../../config/Firebase';

const options = {
  title: 'Choose Action',
  // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: '',
      photoName: '',
      displayName: '',
      imageData: '',
    };
  }

  render() {
    const user = Firebase.auth().currentUser;
    return (
      <Body style={{paddingBottom: 30, alignItems: 'center'}}>
        <Item style={{paddingBottom: 10}}>
          {user.imageData ? (
            <TouchableWithoutFeedback onPress={this.handleChoosePhoto}>
              <Thumbnail
                source={
                  user.photoURL
                    ? {uri: user.photoURL}
                    : {
                        uri:
                          'https://upload.wikimedia.org/wikipedia/commons/3/37/Sus_Barbatus%2C_the_Bornean_Bearded_Pig_%2812616351323%29.jpg',
                      }
                }></Thumbnail>
            </TouchableWithoutFeedback>
          ) : (
            <Button block onPress={this.handleChoosePhoto}>
              <Text>Choose profile picture</Text>
            </Button>
          )}
        </Item>
        <Text style={{paddingBottom: 10, color: '#00000080'}}>
          Enter your WikiCrawler account details
        </Text>
        <Item
          style={{
            backgroundColor: '#00000032',
            borderColor: '#00000032',
            paddingLeft: 5,
          }}
          regular>
          <Label>Display name</Label>
          <Input onChangeText={text => this.setState({displayName: text})} />
        </Item>
        <Item style={{paddingTop: 5}}></Item>
        <Item
          style={{
            backgroundColor: '#00000032',
            borderColor: '#00000032',
            paddingLeft: 5,
          }}
          regular>
          <Textarea
            style={{
              width: '100%',
              borderBottomWidth: 0,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
            }}
            rowSpan={5}
            bordered
            placeholder="Biography"
          />
        </Item>
        <Item style={{paddingTop: 5}}></Item>
        <Button block transparent onPress={this.saveToDatabase}>
          <Text>Save Profile</Text>
        </Button>
      </Body>
    );
  }

  saveToDatabase = () => {
    const user = Firebase.auth().currentUser;
    if (!this.state.displayName) {
      this.setState({displayName: Firebase.auth().currentUser.email});
    }
    if (!this.state.photoData) {
      alert("Are you sure you don't want to upload a profile image?");
    }
    if (user) {
      this.updateDataBase(user);
      this.updateUserData(user);
    }
  };
  updateUserData = user => {};
  updateDataBase = user => {
    console.log('uploading');
    let blob = this.state.photoData;

    return new Promise((resolve, reject) => {
      const path = `Images/${user.uid}/avatar.jpg`;
      var storageRef = Firebase.storage().ref();

      //Add Image to storage
      storageRef
        .child(path)
        .put(blob, {
          contentType: 'image/jpeg',
        })
        .then(snapshot => {
          blob.close(); // let's free up the blob
          snapshot.ref.getDownloadURL().then(function(downloadURL) {
            user
              .updateProfile({
                displayName: 'Jane Q. User',
                photoURL: downloadURL,
                languageCode: Firebase.auth().useDeviceLanguage(),
              })
              .then(function() {
                // Update successful.
                console.log('User Updated');
              })
              .catch(function(error) {
                console.log(Error);
              });
          });
          resolve(snapshot);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  handleChoosePhoto = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({imageData: response});
        this.setState({photoName: response.fileName});

        this.uriToBlob(response.uri).then(blob =>
          this.setState({photoData: blob}).catch(err => {
            console.log(err);
          }),
        );
      }
    });
  };
  //Creates a blob to send to Firebase
  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };
}

export default withNavigation(EditProfile);
