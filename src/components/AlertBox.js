import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useImperativeHandle, useRef, useState} from 'react';
import {height, width} from '../screens/mainScreens/home/Data';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/styles';

export const AlertBox = React.forwardRef((props, ref) => {
  // alert(JSON.stringify(props.visible))
  const [modalVisible, setModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setModalVisible(true);
    },
    closeModal: () => {
      setModalVisible(false);
    },
  }));
  if (modalVisible) {
    return (
      <LinearGradient
        ref={ref}
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}
        colors={['rgba(0, 0, 0, 1)', '#fa0404']}
        style={[
          StyleSheet.absoluteFillObject,
          {
            top: '35%',
            height: height / 4,
            width: width / 1.3,
            borderRadius: 22,
            marginHorizontal: (width - width / 1.3) / 2,
            // elevation:5,
            // shadowColor:"yellow",
            // shadowOffset:{
            //   width:1,height:2
            // },
            // shadowOpacity:0.5,
            // shadowRadius:99
          },
        ]}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{alignSelf: 'center', marginTop: 25}}>
            <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>
              {props.title}
            </Text>
          </View>
          <View style={{}}>
            <View
              style={{backgroundColor: '#fff', height: 0.9, width: width / 1.3}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  width: width / 1.4 / 2,
                  marginVertical: 5,
                }}
                onPress={props.opessCancel}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#f10202',
                    fontWeight: '500',
                    paddingVertical: 8,
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <View style={{backgroundColor: '#fff', width: 1}} />

              <TouchableOpacity
                style={{
                  backgroundColor: colors.color3,
                  borderRadius: 12,
                  width: width / 1.4 / 2,
                  marginVertical: 5,
                }}
                onPress={props.onPressOK}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    fontWeight: '500',
                    paddingVertical: 8,
                    textAlign: 'center',
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
});

// const styles = StyleSheet.create({})
