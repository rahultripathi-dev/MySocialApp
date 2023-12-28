import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

   const Icons = ({name}) => {
  switch (name) {
    case 'circle':
      return <Icon name={'circle-thin'} size={45} color="#F4C724" />;
    case 'cross':
      return <Icon name={'times'} size={45} color="#10A881" />;
    default:
      return <Icon name={name?name:'pencil'} size={22} color="#000" />;
  }
};

export default Icons


