import React from 'react';
import {
    StyleSheet,
    Button,
    View,
    TextInput,
    Text,
} from 'react-native';
import firebase from './src/firebase'
import regex from './src/emailRegex'
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailValid: true,
            password: "",
            passwordValid: true,
        };
    }
    signIn = async () => {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        this.props.navigation.navigate("Welcome");
    };
    
    goToSignIn = ()=>{
        this.props.navigation.navigate('signUp');
    }
    goToSignUp = ()=>{
        this.props.navigation.navigate('signUp');
    }
    validate = (text, type) => {
        if (type == "email") {
            if (regex.test(text)) {
                this.setState({
                    emailValid: true,
                    email: text
                })
    
            } else {
                this.setState({
                    emailValid: false
                })
            }
        }
        if (type == "password") {
            if (text.length < 8) {
                this.setState({
                    passwordValid: false
                })
    
            } else {
                this.setState({
                    passwordValid: true,
                    password: text
                })
            }
        }
    }
    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={[styles.inputContainer, !this.state.emailValid ? styles.error : null]}
                    onChangeText={email => this.validate(email, "email",this.state)}
                />
                <Text style={[styles.errorMessage, 
                    this.state.emailValid ? styles.setInvisible : null]}>Email is not valid</Text>

                <Text style={styles.text}>Password</Text>              
                <TextInput
                    style={[styles.inputContainer,
                         !this.state.passwordValid ? styles.error : null]}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={password => this.validate(password, "password",this.state)}
                />
                <Text style={[styles.errorMessage,
                     this.state.passwordValid ? styles.setInvisible : null]}>Password must be more than 8 characters long</Text>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            this.goToSignUp();
                              }
                         }
                        title="Sign In"
                    />
                </View>

                <View style={styles.buttonContainer} >
                    <Button
                        onPress={() => {
                            this.goToSignUp();
                              }   
                        }
                        title="Sign Up"
                    />
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20
    },
    inputContainer: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 15,
    },
    text: {
        paddingLeft: 20,
    },
    signUpButton: {
        margin: 20
    },
    error: {
        borderWidth: 1,
        borderColor: "red",
    },
    setInvisible: {
        display: "none"
    },
    errorMessage: {
        paddingLeft: 20,
        color: "red"
    }
});