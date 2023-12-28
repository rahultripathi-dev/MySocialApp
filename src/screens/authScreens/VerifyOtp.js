import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {defaultStyle} from '../../styles/styles';
import LinearGradient from 'react-native-linear-gradient';

const VerifyOtp = () => {
  return (
    <View style={defaultStyle}>
      <LinearGradient
        start={{x: 0.6, y: 0.2}}
        end={{x: -2, y: 1.4}}
        colors={['rgba(0,0,0,1)', '#fc0303']}
        style={defaultStyle}>
        <Text>VerifyOtp</Text>
      </LinearGradient>
    </View>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({});
