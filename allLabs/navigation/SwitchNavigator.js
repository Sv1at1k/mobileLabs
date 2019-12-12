import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ItemDetailed from '../screens/list/SensorList';
import ItemList from "../screens/list/ItemList";
import SensorList from "../screens/list/SensorList";
import SensorDetailed from "../screens/list/SensorDetails"
import AddNewObject from "../screens/NewObject"
import BottomTabNavigator from './BottomTabNavigator';

const SwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    Signup: {
      screen: Signup
    },
    ObjectList: BottomTabNavigator,
    ItemDetailed: {
      screen: ItemDetailed
    },
    ItemList:{
      screen:ItemList
    },
    SensorList: {
      screen:SensorList
    },
    SensorDetailed: {
      screen: SensorDetailed
    },
    NewObject:{
      screen:AddNewObject
    }
  },
  {
    initialRouteName: 'Login'
  }
);

export default createAppContainer(SwitchNavigator);
