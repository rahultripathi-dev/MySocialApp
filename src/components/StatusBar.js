import { View, Text,StatusBar,Platform } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

 const CustomStatusBar = () => {
  return (
    <LinearGradient
    start={{x: 0.6, y: 0.2}}
    end={{x: -2, y: 1.4}}
    colors={['rgba(0,0,0,1)', '#fc0303']}
    // style={{height:Platform.OS === 'android' ? StatusBar.currentheight : 20}}
  >
  <StatusBar
    animated={true}
    translucent={true}
    backgroundColor={'transparent'}
    setBarStyle={{height:Platform.OS === 'android' ? StatusBar.currentheight : 20}}
    hidden={false}
  />
  </LinearGradient>
  )
}

export default CustomStatusBar