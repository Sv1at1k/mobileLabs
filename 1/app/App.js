import React from 'react';
import { createAppContainer,NavigationActions } from 'react-navigation';
import { createStackNavigator, StackActions } from 'react-navigation-stack';
import Home from './components/Home.js';
import SignUp from './components/SignUp.js';
import Welcome from './components/Welcome.js';

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