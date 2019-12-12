import React from 'react';
import {
  View, StyleSheet, Text, Image
} from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import OfflineNotice from '../../OfflineNotice';


export default class SensorDetails extends React.Component {
  render() {
    const details =  this.props.navigation.getParam("item");
    
    
    console.log();
    return (
      <View style={styles.container}>
        <Header
          leftComponent={(
            <Ionicons
              style={styles.backButton}
              name="md-arrow-back"
              size={30}
              onPress={() => this.props.navigation.navigate('ObjectList')}
            />
          )}
        />
        <View>
          <OfflineNotice />
          <View>
            <Text>{details.name}</Text>
            <Text>Сповіщення:</Text>
          <Text>{details.notifications}</Text>
           
            <Text>Статус сповіщень:</Text>
            {details.notificationsOn?
            <Text>Увімкнені</Text>:Вимкнені}
           
            <Text>Статус системних сповіщень:</Text>
            {details.systemNotificationsOn?
            <Text>Увімкнені</Text>:Вимкнені}
              <Image
          style={{width: 505, height: 505}}
          source={{uri: 'http://conservatory.lviv.ua/wp-content/uploads/2015/09/hurtozhytok_2.jpg'}}
        />
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backButton: {
    color: '#fff'
  }
});