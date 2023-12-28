import {View, Text, Pressable, StyleSheet, Image, StatusBar} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import { baseIP } from '../api/ApiCall';

const NotificationModal = ({notificationData}) => {
  const {title, body, data} = notificationData?.notificationData;
  return notificationData?.isVisible ? (
    <View style={[styles.modalView,{}]}>
      <View style={styles.centeredView}>
        <Image
          source={{
            uri: data?.image?.replace('localhost', baseIP),
          }}
          style={styles.imageStyle}
        />
        <View style={{paddingLeft: 10}}>
          <Text style={styles.modalText}>{title}</Text>
          <Text style={[styles.modalText, {fontWeight: '400'}]}>{body}</Text>
        </View>
      </View>
    </View>
  ) : null;
};

export default NotificationModal;

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  modalView: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 5,
    alignSelf: 'center',
  },

  modalText: {
    fontWeight: '700',
    color: '#000',
    lineHeight: 25,
    letterSpacing: 1,
    fontSize: 18,
  },
  imageStyle: {
    height: 50,
    width: 50,
    resizeMode: 'center',
    overflow: 'hidden',
    borderRadius: 5,
  },
});
