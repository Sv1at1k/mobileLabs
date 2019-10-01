import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    TextInput,
    Text,
} from 'react-native';
import firebase from './src/firebase'



export default class SignUpActivity extends React.Component {
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
        this.props.navigation.navigate('signIn');

    }
   
    render() {

        return (

            <View style={styles.container}>

                <Text style={styles.text}>Email</Text>
              
                <TextInput
                    style={styles.inputContainer}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={email => this.validate(email, "email")}
                />
              
                <Text style={[styles.errorMessage, this.state.emailValid ? styles.setInvisible : null]}>Email is not valid</Text>

                <Text style={styles.text}>Name</Text>
             
                <TextInput
                    style={styles.inputContainer}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={name => this.validate(name, "name")}
                />
              
                <Text style={[styles.errorMessage, this.state.nameValid ? styles.setInvisible : null]}>Name is required</Text>
              
                <Text style={styles.text}>Phone</Text>
              
                <TextInput
                    style={styles.inputContainer}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={'numeric'}
                    onChangeText={phone => this.validate(phone, "phone")}
                />
              
                <Text style={[styles.errorMessage, this.state.phoneValid ? styles.setInvisible : null]}>Phone is not valid</Text>

                <Text style={styles.text}>Password</Text>
            
                <TextInput
                    style={styles.inputContainer}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={password => this.validate(password, "password")}
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
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('Home');
                        }
                    }
                        title="Back to Sign In"
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

validate = (text, type) => {
    if (type == "email") {
        regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
    if (type == "name") {
        if (text.length < 1) {
            this.setState({
                nameValid: false
            })

        } else {

            this.setState({
                nameValid: true,
                name: text
            })
        }
    }
    if (type == "number") {
        if (text.length < 6) {

            this.setState({
                phoneValid: false
            })

        } else {

            this.setState({
                phoneValid: true,
                phone: text
            })
        }
    }



}