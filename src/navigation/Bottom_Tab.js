import React, {useRef, useLayoutEffect, useEffect} from 'react';
import {Image, StyleSheet, Animated, Platform, StatusBar,View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from '../screens/mainScreens/home/Feed';
import Chat from '../screens/mainScreens/chat/Chat';
import Notification, {
  getNotifications,
} from '../screens/mainScreens/notification/Notification';
import Profile from '../screens/mainScreens/profile/Profile';
import {ImageConstants} from '../assets/ImagePath';
import Login from '../screens/authScreens/Login';
import SignUp from '../screens/authScreens/SignUp';
import NotificationModal from '../components/NotificationModal';
import {useDispatch, useSelector} from 'react-redux';
import {storage, width} from '../screens/mainScreens/home/Data';
import {
  onGetNotification,
  gettingNotificationData,
} from '../redux/reducers/notificationSlice';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {notifications} from '../api/Endpoints';
import apiCall from '../api/ApiCall';
import { colors } from '../styles/styles';
import LinearGradient from 'react-native-linear-gradient';
import CustomStatusBar from '../components/StatusBar';
import NetError from '../components/NetError';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Feed}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}
const AuthStack = createNativeStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <HomeStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Signup"
        component={SignUp}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Bottom_Tab() {
  const [userdata] = useMMKVStorage('user', storage, '');
  const translateX = useRef(new Animated.Value(width)).current;
  const notificationData = useSelector(state => state.notificationReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(notificationData);
    if (notificationData.isVisible) {
      openModal();
    }
    callNotification();
  }, [notificationData.isVisible]);



  const closeModal = () => {
    Animated.timing(translateX, {
      toValue: width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => dispatch(onGetNotification('')));
  };

  const openModal = async () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        setTimeout(() => closeModal(), 5000);
      }
    });
  };

  const callNotification = async () => {
    const response = await apiCall(
      notifications,
      'get',
      '',
      userdata?.accessToken,
    );
    dispatch(gettingNotificationData(response));
  };
  return (
    <>
       
      
      <View style={{marginBottom:Platform.OS === 'android' ? StatusBar.currentheight : 20}}>
      <CustomStatusBar />
      {/* <NetError/> */}

      </View>
      {notificationData.isVisible && (
        <Animated.View style={[styles.container, {transform: [{translateX}], marginTop:StatusBar.currentHeight}]}>
          <NotificationModal notificationData={notificationData} />
        </Animated.View>
      )}
      <Tab.Navigator
        safeAreaInsets={{bottom: 0}}
        screenOptions={({focused}) => ({
          headerShown: false,
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: '#000',
          tabBarStyle: styles.tabBarStyle(Platform),
          tabBarLabelStyle: styles.tabBarLabelStyle,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'HOME',
            tabBarIcon: ({focused}) => (
              <Image
                style={styles.tab_Icon}
                source={
                  focused ? ImageConstants.home_active : ImageConstants.home
                }
              />
            ),
            // headerBackVisible:false
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: 'CHAT',
            tabBarIcon: ({focused}) => (
              <Image
                style={styles.tab_Icon}
                source={focused ? ImageConstants.chat : ImageConstants.chat}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarLabel: 'NOTIFICATION',
            tabBarIcon: ({focused}) => (
              <Image
                style={styles.tab_Icon}
                source={
                  focused
                    ? ImageConstants.notification
                    : ImageConstants.notification
                }
              />
            ),
          }}
         
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'PROFILE',
            tabBarIcon: ({focused}) => (
              <Image
                style={styles.tab_Icon}
                source={
                  focused
                    ? ImageConstants.profile_active
                    : ImageConstants.profile
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default Bottom_Tab;

const styles = StyleSheet.create({
  tab_Icon: {height: 20, width: 20, resizeMode: 'contain'},
  tab_Icon_Ae: {height: 66, width: 70, resizeMode: 'contain', bottom: 30},
  container: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 200,
    zIndex: 9999,
    elevation: 5,
  },
  tabBarStyle: Platform => ({
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
  }),
  tabBarLabelStyle: {
    paddingBottom: 10,
    fontSize: 10,
    // fontFamily: FONTS.DMSansMedium,
  },
});
