import React from 'react';
import {
    StyleSheet,
    Button,
    View,
    TextInput,
    Alert,
    Text,
} from 'react-native';
import firebase from './src/firebase'

export default class HomeActivity extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            email: "",
            emailValid: true,

            password: "",
            passwordValid: true,
        };
    }

    signIn = async (email, password) => {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        this.props.navigation.navigate("signIn");
    };


    render() {
        return (

            <View style={styles.container}>

                <Text style={styles.text}>Email</Text>
              
                <TextInput
                    style={[styles.inputContainer, !this.state.emailValid ? styles.error : null]}
                    autoCapitalize="none"
                    autoCorrect={false}
                  
                    onChangeText={email => this.validate(email, "email")}
                />

                <Text style={[styles.errorMessage, this.state.emailValid ? styles.setInvisible : null]}>Email is not valid</Text>

                <Text style={styles.text}>Password</Text>
               
                <TextInput
                    style={[styles.inputContainer, !this.state.passwordValid ? styles.error : null]}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}

                    onChangeText={password => this.validate(password, "password")}
                />

                <Text style={[styles.errorMessage, this.state.passwordValid ? styles.setInvisible : null]}>Password must be more than 8 characters long</Text>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            this.signIn(this.state.email, this.state.password);
                              }
                         }
                        title="Sign In"
                    />

                </View>

                <View style={styles.buttonContainer} >
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('signUp');
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

}