import {View, Text, StyleSheet,Image,Dimensions} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const Loader = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subcontainer1}>
        <View style={styles.subcontainer}>
          <Text style={styles.text}>Please wait</Text>
          <ActivityIndicator
            animating={true}
            size={32}
            color={'blue'}
            style={styles.loader}
          />
        </View>
      </View>
      {/* <Image source={{uri:"https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"}}
       style={{ tintColor:'rgba(255, 255, 255, 0.5)', height:Dimensions.get("window").height, width:Dimensions.get("window").width,}}  blurRadius={9999}/> */}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the color and opacity as needed
    // backdropFilter: 'blur(10px)', // Adjust the blur radius as needed
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  subcontainer1: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  subcontainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 12,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  loader: {
    alignSelf: 'center', 
    marginVertical: 5, 
    paddingTop: 10
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});