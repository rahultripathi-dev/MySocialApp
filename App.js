import React, {useEffect, useState,useRef,useLayoutEffect} from 'react';
import {View, Image, Dimensions,Animated} from 'react-native';
import {Root, Routes} from './src/navigation/Routes';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './src/navigation/RootNavigation';
import { store } from './src/redux/store'
import { Provider, useSelector } from 'react-redux'
import NotificationModal from './src/components/NotificationModal';
import { width } from './src/screens/mainScreens/home/Data';


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
    <Provider store={store}>
        <Routes />
     </Provider>
  );
}

export default App;
