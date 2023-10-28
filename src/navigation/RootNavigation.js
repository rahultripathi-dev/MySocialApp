import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import Login from '../screens/authScreens/Login';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storage} from '../screens/mainScreens/home/Data';
import Feed from '../screens/mainScreens/home/Feed';import messaging from '@react-native-firebase/messaging';
import Bottom_Tab from './Bottom_Tab';

const RootNavigation = () => {
  const [userdata] = useMMKVStorage('user', storage, '');

  useEffect(() => {
    requestUserPermission();
    return () => {
      messaging().onTokenRefresh(async token => {
        console.log('onTokenRefresh', token);
        // const authToken = await AsyncStorage.getItem('token');
        // if (authToken) {
        //   // updatePushToken(token, authToken);
        // }
      });
    };
  }, []);

  async function requestUserPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getDeviceToken();
    }
  }

  const getDeviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token, '====fcmtoken=====');
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return userdata?.accessToken ? <Bottom_Tab /> : <Login />;
};

export default RootNavigation;
