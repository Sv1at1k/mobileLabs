import React from 'react';
import {
    StyleSheet,
    Button,
    View,
    TextInput,
    Text,
} from 'react-native';
import firebase from './src/firebase'
import validate from './src/validator'
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
        this.goToSignIn();
    };
    
    goToSignIn = ()=>{
        this.props.navigation.navigate('Welcome');
    }
    goToSignUp = ()=>{
        this.props.navigation.navigate('signUp');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={[styles.inputContainer, !this.state.emailValid ? styles.error : null]}
                    onChangeText={
                        email => {
                            this.setState({
                                emailValid:validate(email,"email"),
                                email:email
                            })
                        } 
                    }  
                />
                <Text style={[styles.errorMessage, 
                    this.state.emailValid ? styles.setInvisible : null]}>Email is not valid</Text>

                <Text style={styles.text}>Password</Text>              
                <TextInput
                    style={[styles.inputContainer,
                         !this.state.passwordValid ? styles.error : null]}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={
                        password => { 
                            this.setState({
                                passwordValid: validate(password,"password"),
                                password: password
                             })
                        }
                    }
                />
                <Text style={[styles.errorMessage,
                     this.state.passwordValid ? styles.setInvisible : null]}>Password must be more than 8 characters long</Text>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {this.signIn()}}
                        title="Sign In"
                    />
                </View>

                <View style={styles.buttonContainer} >
                    <Button
                        onPress={() => {this.goToSignUp()}}
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