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
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
      canSignIn: false
    };
  }

  login = () => {
    const { email, password } = this.state;
    let emailError = null;
    let passwordError = null;

    if (!email || !this.emailIsValid(email) ) {
      emailError = 'Email is not valid.';
    } 

    if (!password || !this.passwordIsValid(password) ) {
      passwordError = 'Password is not valid (min 8 characters).';
    } 

    this.setState({
      emailError,
      passwordError,
      canSignIn: true
    });

    if (emailError || passwordError) {
      this.setState({ canSignIn: false });
      return;
    }
    this.signIn(email,password);
  }


  signIn = (email,password) =>{
    firebaseApp.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => this.props.navigation.navigate('ObjectList'))
    .catch((error) => {
      this.setState({ canSignIn: false });
      Alert.alert('Error', error.message);
    });
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

  setEmail = (email) => this.setState({ email });
  setPassword = (password) => this.setState({ password });

  renderEmailError = () => this.state.emailError
      && (
      <Text style={{ color: 'red' }}>
        {this.state.emailError}
      </Text>
      );
  renderPasswordError = () => !!this.state.passwordError
      && (
      <Text style={{ color: 'red' }}>
        {this.state.passwordError}
      </Text>
      );

  render() {
    const { emailError, passwordError, canSignIn } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >

        <View style={styles.offlineContainer}>
          <OfflineNotice />
        </View>

        <TextInput
          style={[styles.inputBox, emailError ? styles.error : '']}
          value={this.state.email}
          onChangeText={this.setEmail}
          placeholder="Email"
          autoCapitalize="none"
          returnKeyType="done"
        />
        {this.renderEmailError()}

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
          disabled={canSignIn}
          style={styles.button}
          onPress={this.login}
        >
          <Text style={styles.buttonText}>
            Sign in
          </Text>
        </TouchableOpacity>

        <Button
          title="Sign up"
          onPress={() => this.props.navigation.navigate('Signup')}
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
