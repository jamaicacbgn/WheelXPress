import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles'; 

const NotificationScreen = ({ navigation }) => {
  const notifications = [
    {
      id: '1',
      message: 'Your order 010101001 is successfully placed.',
      productImage: require('../assets/anakeeproduct1.jpg'),
    },
    {
      id: '2',
      message: 'Your order 010101002 is out for delivery.',
      productImage: require('../assets/road6product1.jpg'),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
          Notifications
        </Text>
      </View>
      <ScrollView>
        {notifications.map(notif => (
          <View key={notif.id} style={styles.notificationItem}>
            <Image source={notif.productImage} style={styles.notificationImage} />
            <Text style={styles.notificationMessage}>{notif.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
