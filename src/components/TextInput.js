import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {addScreenStyle as style} from '../screens/mainScreens/styles/styles';
import {Text, TextInput, Button} from 'react-native-paper';
import {all} from 'axios';

export const CommonInput = ({
  value,
  onChange,
  label,
  secureTextEntry,
  customStyle = {},
  editable,
  navigation,
  multiline,
  index,
  setOpenBottomSheet,
  right
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (index === 3) {
          navigation.navigate('SelectUser');
        } else if (index === 5) {
          setOpenBottomSheet(true);
        }
      }}
      activeOpacity={1}
      disabled={editable === true}>
      <TextInput
        editable={editable===undefined || editable===null? true : false}
        label={label}
        value={value}
        onChangeText={text => onChange(text)}
        style={[style.textInput, {...customStyle}]}
        // right={<TextInput.Affix text="/100" />}
        enablesReturnKeyAutomatically={true}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        key={index}
        right={right?< TextInput.Affix text="Copy" />:null}
      />
    </TouchableOpacity>
  );
};
