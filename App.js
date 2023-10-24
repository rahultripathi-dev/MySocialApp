import React, {useEffect, useState} from 'react';
import {View, Image, Dimensions} from 'react-native';
import {Root} from './src/Root';
import SplashScreen from 'react-native-splash-screen';
import { NativeModules } from 'react-native';


// const nativeModule = NativeModules.DeviceIdModule;

function App() {

  useEffect(() => {
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 10000);
    // const deviceId=nativeModule?.getDeviceId()
    // console.log(nativeModule,"deviceId============")
  }, []);

  return (
        <Root />
  );
}

export default App;
