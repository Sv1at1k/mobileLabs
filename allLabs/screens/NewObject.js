import React from 'react';
import {
  TextInput, View, StyleSheet, TouchableOpacity, Text, Button, Alert, KeyboardAvoidingView
} from 'react-native';
import firebaseApp from '../navigation/config/firebase.js';
import OfflineNotice from '../OfflineNotice';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',  
      roomName: '',
      sensorName: '',
      
      roomNameError: null,
      sensorNameError: null,
      nameError: null,
      canSend: false
    };
  }

  validate = () => {
    const { name,roomName,sensorName } = this.state;
    let nameError = null;
    let roomNameError = null;
    let sensorNameError = null;

    if (!name ) {
        nameError = 'Cant be empty';
    } 
    if(!roomName){
        roomNameError = 'Cant be empty';
    }
    if(!sensorName){
        sensorNameError = 'Cant be empty';
    }

    this.setState({
      nameError,
      roomNameError,
      sensorNameError,
      canSend: true
    });

    if (nameError|| roomNameError||sensorNameError ) {
      this.setState({ canSend: false });
      return;
    }
   
  }

  doMagic = () =>{
    this.validate();
    this.sendData();
   
  }

  sendData =() => {
    fetch('http://db1c8cdf.ngrok.io/object', {
        method: 'POST',
        headers: { 
                 'Accept': 'application/json',
                 'Content-Type': 'application/json' 
                 },
        body: JSON.stringify({
            name: this.state.name,
            rooms: this.state.roomName,
            sensors: this.state.sensorName
        })
      })
      .then((response) => JSON.stringify(response.json())) 
      .then((responseData) => { 
        this.props.navigation.navigate('ObjectList');  
        console.log("response: " + responseData);
    })
      .catch((err) => { console.log(err); });
      
  }
 
  


  setName = (name) => this.setState({ name });
  setRoomName = (roomName) => this.setState({ roomName });
  setSensorName = (sensorName) => this.setState({ sensorName });

  renderNameError = () => this.state.nameError
      && (
      <Text style={{ color: 'red' }}>
        {this.state.nameError}
      </Text>
      );
      
  renderRoomNameError = () => this.state.roomNameError
      && (
      <Text style={{ color: 'red' }}>
        {this.state.roomNameError}
      </Text>
      );

   renderSensorNameError = () => this.state.sensorNameError
      && (
      <Text style={{ color: 'red' }}>
        {this.state.sensorNameError}
      </Text>
      );



  render() {
    const { nameError,sensorNameError,roomNameError, canSend } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >

        <View style={styles.offlineContainer}>
          <OfflineNotice />
        </View>

        <TextInput
          style={[styles.inputBox, nameError ? styles.error : '']}
          value={this.state.name}
          onChangeText={this.setName}
          placeholder="Name"
          autoCapitalize="none"
          returnKeyType="done"
        />
        {this.renderNameError()}

        <TextInput
          style={[styles.inputBox, roomNameError ? styles.error : '']}
          value={this.state.roomName}
          onChangeText={this.setRoomName}
          placeholder="Room name"
          autoCapitalize="none"
          returnKeyType="done"
        />
        {this.renderRoomNameError()}

        <TextInput
          style={[styles.inputBox, sensorNameError ? styles.error : '']}
          value={this.state.sensorName}
          onChangeText={this.setSensorName}
          placeholder="Sensor name"
          autoCapitalize="none"
          returnKeyType="done"
        />
        {this.renderSensorNameError()}
      

        <TouchableOpacity
          disabled={canSend}
          style={styles.button}
          onPress={this.doMagic}
        >
          <Text style={styles.buttonText}>
            Save
          </Text>
        </TouchableOpacity>

        <Button
          title="Back"
          onPress={() => this.props.navigation.navigate('ObjectList')}
        />

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  offlineContainer: {
    position: 'absolute',
    top: 30,
    alignItems: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 5,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1
  },
  error: {
    borderColor: 'red'
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#00FF00',
    borderColor: '#00FF00',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  buttonSignup: {
    fontSize: 12
  }
});

export default Login;
