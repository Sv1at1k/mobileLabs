import React from 'react';
import { createAppContainer,NavigationActions } from 'react-navigation';
import { createStackNavigator, StackActions } from 'react-navigation-stack';
import Home from './activities/Home.js';
import SignUp from './activities/SignUp.js';
import Welcome from './activities/Welcome.js';

const App = () =>  {
    return (
       <AppContainer />
    );
}
export default App
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  signUp: {
    screen: SignUp
  },
  Welcome: {
    screen:Welcome
  },
},{
        initialRouteName: "Home"
});
const AppContainer = createAppContainer(AppNavigator);