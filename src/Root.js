import {View, Text, Image, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import SocialApp from './screens/mainScreens/socialApp/SocialApp';
import Feed from './screens/mainScreens/socialApp/Feed';
import SignUp from './screens/mainScreens/socialApp/SignUp';
import AddPost from './screens/mainScreens/socialApp/AddPost';
import SelectInstaUser from './screens/mainScreens/socialApp/SelectInstaUser';


const Stack = createNativeStackNavigator();

export const Root = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
              name="SocialApp"
              component={SocialApp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Feed"
              component={Feed}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddPost"
              component={AddPost}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
             <Stack.Screen
              name="SelectUser"
              component={SelectInstaUser}
              options={{headerShown: false}}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
