import React, {useEffect, useState} from 'react';
import {View, Image, Dimensions} from 'react-native';
import {Root, Routes} from './src/navigation/Routes';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './src/navigation/RootNavigation';


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
        <RootNavigation />
  );
}

export default App;
