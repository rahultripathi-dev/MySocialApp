import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width;

const CommonButton = ({
  buttonText,
  requestCameraPermission,
  screenName,
  onPress,
  navigation,
  buttonTextStyle,
  buttonContainerStyle,
  children = () => <View />,
  mainContainer
}) => {
  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
        } else if (name === 'CameraApp') {
          requestCameraPermission();
        } else {
          if (screenName) navigation?.navigate(screenName);
        }
      }}
      style={({pressed}) => ({
        ...mainContainer,
        opacity: pressed ? 0.5 : 1,
      })}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: -1}}
        colors={['rgba(5, 5, 5, 1)', '#fd0202']}
        style={buttonContainerStyle}>
        {children()}
        <Text style={buttonTextStyle}>{buttonText}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default CommonButton;

export const styles = StyleSheet.create({});
