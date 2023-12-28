import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {width} from '../home/Data';
import NetError from '../../../components/NetError';

const Chat = () => {
 

  return (
    <SafeAreaView style={styles.mainContainer}>
        
      <LinearGradient
        start={{x: 0.6, y: 0.2}}
        end={{x: -2, y: 1.4}}
        colors={['rgba(0,0,0,1)', '#fc0303']}
        style={styles.mainContainer}>
        <NetError/>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  
});
