import React from 'react';
import {
  TextInput, StyleSheet, TouchableOpacity, Text, Button, Alert, KeyboardAvoidingView, View
} from 'react-native';
import firebaseApp, { db } from '../navigation/config/firebase';
import OfflineNotice from '../OfflineNotice';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/mobiledev-2000.appspot.com/o/avatar.png?alt=media&token=3574a740-164d-4fc6-8b01-c4a44f4b55de',
      name: '',
      email: '',
      phone: '',
      password: '',
      nameError: null,
      emailError: null,
      phoneError: null,
      passwordError: null,
      canSignUp: false
    };
  }

  emailIsValid = (email) => {
    const emeilRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if(emeilRegex.test(email)){
      return true
    } else {
      return false
    }
  };
  passwordIsValid = (password) => {
    return password.length >= 8;
  } 

  signUp = () => {
    const {
      name, email, phone, password
    } = this.state;

    this.validate( name, email, phone, password);

    db.ref('users').orderByChild('phone').equalTo(phone).on('value', (snapshot) => {
      const phoneIsUsed = Object.keys(snapshot.val() || {}).length;
      if (!phoneIsUsed) {
        firebaseApp.auth()
          .createUserWithEmailAndPassword(email, password)
          .then((authData) => {
            db.ref(`users/${authData.user.uid}`).set({
              imageURL: this.state.imageURL,
              name,
              email,
              phone
            });
            this.props.navigation.navigate('ObjectList');
          })
          .catch((error) => {
            this.setState({ canSignUp: false });
            Alert.alert('Error', error.message);
          });
      } else {
        this.setState({ canSignUp: false });
        this.setState({ phoneError: 'This phone number is already in use by another account.' });
      }
    });
  };

  validate = (name, email, phone, password) => {
    let nameError = null;
    let emailError = null;
    let phoneError = null;
    let passwordError = null;

    if (!name) {
      nameError = 'Name is required.';
    }
    if (!email || !this.emailIsValid(email)) {
      emailError = 'Email is not valid.';
    } 
    if (!phone ) {
      phoneError = 'Phone is required.';
    }
    if (!password|| !this.passwordIsValid(password)) {
      passwordError = 'Password is not valid (min 8 characters).';
    }

    this.setState({
      nameError,
      emailError,
      phoneError,
      passwordError,
      canSignUp: true
    });

    if (nameError || emailError || phoneError || passwordError) {
      this.setState({ canSignUp: false });
      return;
    }
  }

  setName = (name) => this.setState({ name });
  setEmail = (email) => this.setState({ email });
  setPhone = (phone) => this.setState({ phone });
  setPassword = (password) => this.setState({ password });

  renderNameError = () => this.state.nameError
      && (
      <Text style={{ color: 'red' }}>
        {this.state.nameError}
      </Text>
      );

  renderEmailError = () => this.state.emailError
      && (
      <Text style={{ color: 'red' }}>
        {this.state.emailError}
      </Text>
      );

  renderPhoneError = () => this.state.phoneError
      && (
      <Text style={{ color: 'red' }}>
        {this.state.phoneError}
      </Text>
      );

  renderPasswordError = () => this.state.passwordError
      && (
      <Text style={{ color: 'red' }}>
        {this.state.passwordError}
      </Text>
      );

  render() {
    const {
      nameError, emailError, phoneError, passwordError, canSignUp
    } = this.state;
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
          returnKeyType="done"
        />
        {this.renderNameError()}

        <TextInput
          style={[styles.inputBox, emailError ? styles.error : '']}
          value={this.state.email}
          onChangeText={this.setEmail}
          placeholder="Email"
          returnKeyType="done"
          autoCapitalize="none"
        />
        {this.renderEmailError()}

        <TextInput
          style={[styles.inputBox, phoneError ? styles.error : '']}
          value={this.state.phone}
          onChangeText={this.setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
        {this.renderPhoneError()}

        <TextInput
          style={[styles.inputBox, passwordError ? styles.error : '']}
          value={this.state.password}
          onChangeText={this.setPassword}
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry
        />
        {this.renderPasswordError()}

        <TouchableOpacity
          disabled={canSignUp}
          style={styles.button}
          onPress={this.signUp}
        >
          <Text style={styles.buttonText}>
            Sign up
          </Text>
        </TouchableOpacity>

        <Button
          title="Back to Login"
          onPress={() => this.props.navigation.navigate('Login')}
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

export default Signup;
