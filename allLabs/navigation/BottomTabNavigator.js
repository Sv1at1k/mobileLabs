import { createBottomTabNavigator } from 'react-navigation-tabs';
import ObjectList from '../screens/list/ObjectList';
import ScreenTwo from '../screens/ScreenTwo';
import Profile from '../screens/Profile';

const BottomTabNavigator = createBottomTabNavigator({
  ObjectList,
  ScreenTwo,
  Profile
});

export default BottomTabNavigator;
