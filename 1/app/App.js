import React from 'react';
import {
  Text,
} from 'react-native';
import { createAppContainer,NavigationActions } from 'react-navigation';
import { createStackNavigator, StackActions } from 'react-navigation-stack';

import HomeActivity from './activities/HomeActivity.js';
import SignUpActivity from './activities/SignUpActivity.js';
import SignInActivity from './activities/SignInActivity.js';


export default function App() {
 
    return (

       <AppContainer />

    );
 
}


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeActivity
  },
  signUp: {
    screen: SignUpActivity
  },
  signIn: {
    screen:SignInActivity
  },
},{
        initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppNavigator);

