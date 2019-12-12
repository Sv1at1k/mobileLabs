import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabIcon = (props) => (
  <Ionicons
    name="md-key"
    size={30}
    color={props.focused ? '#2196F3' : 'darkgrey'}
  />
);

export default class ScreenTwo extends React.Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  render() {
    return (
      <View style={styles.container}>
         <Text>Empty Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
