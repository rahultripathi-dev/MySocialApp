import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { storage } from '../screens/mainScreens/Data';

const Header = ({navigation, showModal, setShowModal,addanimation}) => {
  const [userdata,setUserData] = useMMKVStorage('user', storage, '');


  const iconProps={
    size:22,
    color:"#fff"
  }


  const handleLogOut=()=>{
    let data={...userdata}
    data.accessToken=""
    setUserData({...data})
    navigation.reset({
      index: 0,
      routes: [{name: 'SocialApp'}],
    })    
  }
  return (
    <View
      style={styles.headerContainer}>
      <Text style={{color: '#fff', fontSize: 20}}> Social App</Text>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          // navigation.navigate('AddPost');
          addanimation()
          setShowModal(!showModal);
        }}>
        <Icon name="plus-circle" {...iconProps}/>
        <Text style={styles.addPostText}>Add Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLogOut()}>
        <Icon name="power-off" {...iconProps} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles=StyleSheet.create({
  headerContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 8,
  },
addPostText:  {color: '#fff', paddingLeft: 10}
})
