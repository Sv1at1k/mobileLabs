import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import firebase from './src/firebase'



export default class SignInActivity extends React.Component {
    signOut = async () => {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Home');
       
    }
   

    render() {
        name = firebase.auth().currentUser.displayName
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome {name}</Text>

                <Button
                    onPress={() => {
                        this.signOut();
                       
                    }}
                    title="Sign Out"
                />
            </View>

        )





    }



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        margin: 20,


    },
    buttonContainer: {
        margin: 20
    },

});