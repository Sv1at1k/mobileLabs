import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  Text
} from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import OfflineNotice from '../../OfflineNotice';
import { FloatingAction } from "react-native-floating-action";


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
      loading: true,
      object: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  openItemList(item) {
    this.props.navigation.navigate('ItemList',item);
  }

  getData = () => {
    fetch('http://db1c8cdf.ngrok.io/object')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          object: responseJson,
          refreshing: false
        });
      });
     
  };

  renderItem = (item) => (
    <TouchableOpacity onPress={() => { this.openItemList(item.item);}}>
      <ListItem
        title={item.item.name}
        leftAvatar={{ source: { uri: "http://conservatory.lviv.ua/wp-content/uploads/2015/09/hurtozhytok_2.jpg" } }}
        bottomDivider
        chevron
      />
    </TouchableOpacity>
  );

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getData();
    });
  };

  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  openCreateObject = ()=>{
    console.log("awasddasdas");
    this.props.navigation.navigate("NewObject");

  }

  render() {
   return (this.state.loading ? 
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View> :
         <View style={styles.container}>
        <Header
          leftComponent={{ text: 'Objects', style: { color: '#fff', fontSize: 19 } }}
        />
        <View>
          <OfflineNotice />
          <FlatList
            data={this.state.object}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={item => item.name}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </View> 
            <FloatingAction
             actions={actions}
             onPressItem={() => this.openCreateObject()}
             />

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

const actions = [
  {
    text: "Add new object",
    icon: require("../list/img/plus.png"),
    name: "btn_add",
    position: 0
  },
  
 
];
