import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import OfflineNotice from '../../OfflineNotice';

const TabIcon = (props) => (
  <Ionicons
    name="md-list"
    size={30}
    color={props.focused ? '#2196F3' : 'darkgrey'}
  />
);

export default class Source extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: this.props.navigation.getParam("rooms").concat(this.props.navigation.getParam("halls")),
    };
  }

  onItemPress(sensors) {
    this.props.navigation.navigate('SensorList', sensors);
  }
  
  renderItem = (item) => (
    <TouchableOpacity onPress={() => { this.onItemPress(item.item)}}>
      <ListItem
        title={item.item.name}
        bottomDivider
        chevron
      />
    </TouchableOpacity>
  );


  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ text: 'Item List', style: { color: '#fff', fontSize: 19 } }}
        />
        <View>
          <OfflineNotice />
          <FlatList
            data={this.state.items}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 88
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});