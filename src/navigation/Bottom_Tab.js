import * as React from 'react';
import {Button, Text, View,Image,StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from '../screens/mainScreens/home/Feed';
import {NavigationContainer} from '@react-navigation/native';
import Chat from '../screens/mainScreens/chat/Chat';
import Notification from '../screens/mainScreens/notification/Notification';
import Profile from '../screens/mainScreens/profile/Profile';
import { ImageConstants } from '../assets/ImagePath';


const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Feed}   options={{headerShown: false}}/>
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Bottom_Tab() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      safeAreaInsets={{bottom: 0}}
      screenOptions={({focused}) => ({
        headerShown:false,
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          elevation: 3,
          borderTopWidth: 1,
          marginTop: 0.5,
          position: 'absolute',
          bottom: 15,
          height: Platform.OS === 'ios' ? 65 : 65,
          borderRadius: 100,
          backgroundColor: '#fff',
          overflow: 'hidden',
          marginHorizontal: 10,
        },
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
          // fontFamily: FONTS.DMSansMedium,
        },
      })}
      >
      <Tab.Screen name="Home" 
      component={HomeStackScreen} 
       options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.tab_Icon}
              source={focused ? ImageConstants.home_active:ImageConstants.home}
            />
          ),
        }} />
      <Tab.Screen name="Chat" 
      component={Chat}   
       options={{
          tabBarLabel: 'CHAT',
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.tab_Icon}
              source={focused ? ImageConstants.chat:ImageConstants.chat}
            />
          ),
        }} />
      <Tab.Screen name="Notification" 
      component={Notification}
       options={{
          tabBarLabel: 'NOTIFICATION',
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.tab_Icon}
              source={focused ? ImageConstants.notification:ImageConstants.notification}
            />
          ),
        }} />
      <Tab.Screen name="Profile" 
      component={Profile}  
      options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.tab_Icon}
              source={focused ? ImageConstants.profile_active:ImageConstants.profile}
            />
          ),
        }} /> 
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Bottom_Tab;


const styles = StyleSheet.create({
  tab_Icon: {height: 20, width: 20, resizeMode: 'contain'},
  tab_Icon_Ae: {height: 66, width: 70, resizeMode: 'contain', bottom: 30},
});