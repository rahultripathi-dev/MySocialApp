import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {storage, width} from '../home/Data';
import apiCall, { baseIP } from '../../../api/ApiCall';
import {notifications} from '../../../api/Endpoints';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import useReferesh from '../../../hooks/useReferesh';
import { useDispatch, useSelector } from 'react-redux';
import { gettingNotificationData } from '../../../redux/reducers/notificationSlice';
import Header from '../../../components/Header';

const Notification = ({navigation}) => {
  const {notificactionListingData} = useSelector(state => state.notificationReducer);
  const [userdata] = useMMKVStorage('user', storage, '');
  const {onRefresh, refreshing} = useReferesh(callNotification);

  useEffect(() => {
   
  }, [notificactionListingData]);

  const callNotification = async () => {
    const response = await apiCall(
      notifications,
      'get',
      '',
      userdata?.accessToken,
    );
    useDispatch(gettingNotificationData(response));
  };


  const DateString = date => {
    if (date && new Date(date).getDate() == new Date().getDate()) {
      return 'Today';
    } else if (date && new Date(date).getDate() == new Date().getDate()-1) {
      return '1 day ago';
    }
     else  {
     return new Date(date).getDate().toString() +
        '-' +
        new Date(date).toLocaleString('default', {month: 'short'});
    }
  };

  const renderItem = ({item, index}) => {
    // console.log(item.notifications.data.image);
    return (
      <Pressable style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width:width
          }}>
            <View style={{flexDirection:"row", width:"50%"}}>
          <Image
            source={{
              uri: item?.notifications?.data?.image?.replace(
                'localhost',
               baseIP,
              ),
            }}
            style={styles.cardImage}
          />
          <View style={{paddingLeft: 10}}>
            <Text style={styles.cardTitle}>{item?.notifications?.title}</Text>
            <Text style={styles.cardBody}>{item?.notifications?.body}</Text>
          </View>
          </View>
          <View
            style={{
              width:"20%",
              alignSelf: 'flex-start',
              marginTop: -2,
              right: 20,
            }}>
            <Text style={styles.cardTime}>{DateString(item.createdAt)}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LinearGradient
        start={{x: 0.6, y: 0.2}}
        end={{x: -2, y: 1.4}}
        colors={['rgba(0,0,0,1)', '#fc0303']}
        style={styles.mainContainer}>
          <Header navigation={navigation}   heading={'Notifications'}/>
        <FlatList
          data={[...notificactionListingData].reverse()??[]}
          ItemSeparatorComponent={
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.4)']}
              start={{x: 0.7, y: 0}}
              end={{x: 0, y: 0}}
              style={{height: 0.6, width: '100%'}}
            />
          }
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Notification;


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  card: {
    paddingVertical: 10,
    width: '94%',
    elevation: 0,
    alignSelf: 'center',
    marginVertical: 10,
  },
  cardImage: {
    height: 55,
    width: 55,
    borderRadius: 99,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: 25,
    color: '#fff',
  },
  cardBody: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 25,
    color: '#fff',
  },
  cardTime: {
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 1,
    lineHeight: 25,
    color: '#fff',
  },
});
