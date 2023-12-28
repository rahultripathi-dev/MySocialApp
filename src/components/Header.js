import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storage, width} from '../screens/mainScreens/home/Data';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from '../styles/styles';
export const iconProps = {
  size: 22,
  color: '#fff',
};
const Header = ({navigation, showModal, setShowModal, addanimation,heading}) => {
  const [userdata, setUserData] = useMMKVStorage('user', storage, '');



  // const handleLogOut = () => {
  //   let data = {...userdata};
  //   data.accessToken = '';
  //   setUserData({...data});
  //   // navigation.reset({
  //   //   index: 0,
  //   //   routes: [{name: 'RootNavigation'}],
  //   // })
  // };
  return (
    <View
      style={[
        styles.headerContainer,
        {paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0},
      ]}>
      <Text style={styles.headerText}> {heading}</Text>
      {setShowModal &&
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          addanimation();
          setShowModal(showModal => !showModal);
        }}>
        <Icon name="plus-circle" {...iconProps} />
        <Text style={styles.addPostText}>Add Post</Text>
      </TouchableOpacity>}
      {/* <TouchableOpacity onPress={() => handleLogOut()}>
        <Icon name="power-off" {...iconProps} />
      </TouchableOpacity> */}
      {/* <View style={{width:width,backgroundColor:colors.color6,height:1}} /> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
    // marginTop: 8,
    height:80,
    // backgroundColor:colors.color5
  },
  addPostText: {color: '#fff', paddingLeft: 10},
  headerText: {color: '#fff', fontSize: 20},
});
