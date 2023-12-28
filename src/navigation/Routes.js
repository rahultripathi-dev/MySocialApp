import {View, Text, Image, Dimensions, } from 'react-native';
import React, {useEffect, useRef,useLayoutEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import Login from '../screens/authScreens/Login';
import SignUp from '../screens/authScreens/SignUp';
import SelectInstaUser from '../screens/authScreens/SelectInstaUser';
import Feed from '../screens/mainScreens/home/Feed';
import Bottom_Tab from './Bottom_Tab';
import RootNavigation from './RootNavigation';
import VerifyOtp from '../screens/authScreens/VerifyOtp';




const Stack = createNativeStackNavigator();

export const Routes = () => {
 
  return (
    <PaperProvider>
        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
              name="RootNavigation"
              component={RootNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Bottom_Tab"
              component={Bottom_Tab}
              options={{headerShown: false}}
            />
           <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            
            <Stack.Screen
              name="Feed"
              component={Feed}
              options={{headerShown: false}}
            />
             
             <Stack.Screen
              name="SelectUser"
              component={SelectInstaUser}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VerifyOtp"
              component={VerifyOtp}
              options={{headerShown: false}}
            />
        </Stack.Navigator>
        </NavigationContainer>
        
    </PaperProvider>
  );
};
