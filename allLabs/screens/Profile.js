import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, Button, TextInput, Alert,
} from 'react-native';

import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid';
import OfflineNotice from '../OfflineNotice';
import { db } from '../navigation/config/firebase';

const TabIcon = (props) => (
  <Ionicons
    name="md-person"
    size={30}
    color={props.focused ? '#2196F3' : 'darkgrey'}
  />
);

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/mobiledev-2000.appspot.com/o/avatar.png?alt=media&token=3574a740-164d-4fc6-8b01-c4a44f4b55de',
      editable: false
    };

    this.currentUser = firebase.auth().currentUser;
    this.toggleEditable = this.toggleEditable.bind(this);
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.displayDATA();
  }

  getPermissionAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert('Error', 'Sorry, we need camera roll permissions to make this work!');
      }
    
  };

  pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.handleImagePicked(pickerResult);

    if (!pickerResult.cancelled) {
      this.setState({ imageURL: pickerResult.uri });
    }
    this.updateDATA();
  };

  handleImagePicked = async (pickerResult) => {
    if (!pickerResult.cancelled) {
      const uploadUrl = await uploadImageAsync(pickerResult.uri);
      this.setState({ imageURL: uploadUrl });
    }
  };

  displayDATA = () => {
    if (this.currentUser && this.currentUser.uid) {
      firebase.database().ref(`users/${this.currentUser.uid}`)
        .on('value', (snapshot) => {
          if (snapshot.exists()) {
            this.setState({ imageURL: snapshot.val().imageURL });
            this.setState({ name: snapshot.val().name });
            this.setState({ email: snapshot.val().email });
          } else {
            this.setState({ imageURL: snapshot.val().defaultAvatar });
          }
        });
    }
  };

  toggleEditable() {
    this.setState({
      editable: !this.state.editable
    });
    this.input.focus();
    this.updateDATA();
  }

  updateDATA = () => {
    if (this.currentUser && this.currentUser.uid) {
      firebase.database().ref(`users/${this.currentUser.uid}`).update({
        imageURL: this.state.imageURL,
        name: this.state.name,
        email: this.state.email
      });
    }
  };

  static navigationOptions = {
    tabBarIcon: TabIcon
  };


  render() {
    const { imageURL } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.offlineContainer}>
          <OfflineNotice />
        </View>

        <View>
          {imageURL
          && <Image style={styles.avatar} source={{ uri: imageURL }} />}

          <TouchableOpacity style={styles.editAvatar} onPress={this.pickImage}>
            <Text style={styles.editAvatarText}>Change avatar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>

          <View style={styles.bodyContent}>

            <TextInput
              style={styles.name}
              value={this.state.name}
              onChangeText={(value) => this.setState({ name: value })}
              ref={(x) => this.input = x}
              returnKeyType="next"
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
              editable={this.state.editable}
            />

            <TextInput
              style={styles.email}
              value={this.state.email}
              onChangeText={(value) => this.setState({ email: value })}
              ref={(input) => { this.secondTextInput = input; }}
              editable={this.state.editable}
            />

            <TouchableOpacity style={styles.editFields} onPress={this.toggleEditable}>
              <Text style={styles.editFieldsText}>{ this.state.editable ? 'Save' : 'Edit fields' }</Text>
            </TouchableOpacity>

            <Button
              title="Exit"
              onPress={() => this.props.navigation.navigate('Login')}
            />

          </View>

        </View>

      </View>
    );
  }
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  offlineContainer: {
    position: 'absolute',
    top: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  editAvatar: {
    marginTop: 275,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 5,
    width: 150
  },
  editAvatarText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  body: {
    marginTop: 0,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
    textAlign: 'center'
  },
  email: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
    textAlign: 'center'
  },
  editFields: {
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  editFieldsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
});
