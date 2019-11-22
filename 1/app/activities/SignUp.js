import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    TextInput,
    Text,
} from 'react-native';
import firebase from './src/firebase'
import validate from './src/validator'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailValid: true,
            name: "",
            nameValid: true,
            phone: "",
            phoneValid: true,
            password: "",
            passwordValid: true,
        };
    }
    signUp = async (email, password, name, phone) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: name,
                phoneNumber: phone
            });
        });
        await firebase.auth().signInWithEmailAndPassword(email, password);
        this.props.navigation.navigate('Welcome');
    }
    goToHome = () =>{
        this.props.navigation.navigate('Home');
    } 
    
    render() {
        return (
            <View style={styles.container}>
             
                <Text style={styles.text}>Email</Text> 
                <TextInput
                    style={styles.inputContainer}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={
                        email => {
                            this.setState({
                                emailValid:validate(email,"email"),
                                email:email
                            })
                        } 
                    }
                
                /> 
                <Text style={[styles.errorMessage, this.state.emailValid ? styles.setInvisible : null]}>Email is not valid</Text>

                <Text style={styles.text}>Name</Text>
                <TextInput
                    style={styles.inputContainer}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={name =>  { 
                        this.setState({
                            nameValid: validate(name,"name"),
                            name: name
                         })
                    }
                }
                />
               <Text style={[styles.errorMessage, this.state.nameValid ? styles.setInvisible : null]}>Name is required</Text>
              
                <Text style={styles.text}>Phone</Text>
                <TextInput
                    style={styles.inputContainer}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={'numeric'}
                    onChangeText={phone =>  { 
                            this.setState({
                                phoneValid: validate(phone,"phone"),
                                phone: phone
                             })
                        }
                    }
                />
                <Text style={[styles.errorMessage, this.state.phoneValid ? styles.setInvisible : null]}>Phone is not valid</Text>

                <Text style={styles.text}>Password</Text>
                <TextInput
                    style={styles.inputContainer}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={password => { 
                        this.setState({
                            passwordValid: validate(password,"password"),
                            password: password
                         })
                    }
                }
                />
                <Text style={[styles.errorMessage, this.state.passwordValid ? styles.setInvisible : null]}>Password must be more than 8 characters long</Text>
                <View style={styles.buttonContainer} >
                    <Button
                        onPress={() => {
                            this.signUp(this.state.email, this.state.password, this.state.name, this.state.phone);
                            }
                    }
                        title="Sign Up"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress= { () =>this.goToHome()}
                        title="Back to Home"
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 10
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
        margin: 10
    }, error: {
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