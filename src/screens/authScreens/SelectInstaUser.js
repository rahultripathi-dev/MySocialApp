import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {CommonInput} from '../../components/TextInput';

const SelectInstaUser = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        animated={true}
        backgroundColor="#3C415E"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      {/* <Header
        navigation={navigation}
        //   showModal={showModal}
        //   setShowModal={setShowModal}
        //   addanimation={() =>
        //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        //   }
      /> */}
    {/* <Text style={{color:"#fff",fontSize:18}}>Search Username</Text> */}
      <CommonInput
        editable={true}
        onChange={text => {
          console.log(text);
        }}
        label={'Search Username'}
      />
    </View>
  );
};

export default SelectInstaUser;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3C415E',
  },
});
