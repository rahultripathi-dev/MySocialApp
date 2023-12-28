import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Alert, Modal, View, Text} from 'react-native';
import Login from '../screens/authScreens/Login';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storage} from '../screens/mainScreens/home/Data';
import Feed from '../screens/mainScreens/home/Feed';
import messaging from '@react-native-firebase/messaging';
import Bottom_Tab from './Bottom_Tab';
import {useDispatch} from 'react-redux';
import notificationReducer, {
  onGetNotification,
} from '../redux/reducers/notificationSlice';
// import Bottom_Tab from './Bottom_Tab';

const RootNavigation = () => {
  const [userdata, setUserData] = useMMKVStorage('user', storage, '');
  const [notificationData, setNotificationData] = useState('');
  const dispatch = useDispatch();

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
      console.log('Authorization status:', enabled);
      getDeviceToken();
    }
  }

  const getDeviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token, '====fcmtoken=====');
    setUserData({...userdata, fcmToken: token});
  };

  const onNotification = () => {
    messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage.data.notifee, 'notification data===');
      setNotificationData(() => remoteMessage.data.notifee);
      dispatch(onGetNotification(JSON.parse(remoteMessage.data.notifee)));
    });
  };

  useEffect(() => {
    const unsubscribe = onNotification();
    return unsubscribe;
  }, []);
  return userdata?.accessToken ? <Bottom_Tab /> : <Login />;
};

export default RootNavigation;
