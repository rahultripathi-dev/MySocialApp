import React from 'react';
import Login from './Login';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { storage } from '../Data';
import Feed from './Feed';
import SignUp from './SignUp';

const SocialApp = () => {
  const [userdata] = useMMKVStorage('user', storage, '');

  return  userdata?.accessToken? <Feed /> : <Login /> ;
};

export default SocialApp;
