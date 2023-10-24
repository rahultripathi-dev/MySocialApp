import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const width = Dimensions.get('window').width;

const CommonButton = ({
  name,
  backgroundColor,
  textColor,
  requestCameraPermission,
  screenName,
  onPress,
  customStyle
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: backgroundColor,...customStyle}]}
        onPress={() => {
          if (onPress) {
            onPress();
          } else if (name === 'CameraApp') {
            requestCameraPermission();
          } else {
            if (screenName) navigation.navigate(screenName);
          }
        }}>
        <Text style={styles.buttonText(textColor)}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommonButton;

export const styles = StyleSheet.create({
  button: {
    width: width / 2.3,
    backgroundColor: '#C147E9',
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonText:(textColor)=>( {
    color:textColor?textColor:"#fff" ,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 5,
  }),
});
