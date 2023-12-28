import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {addScreenStyle as style} from '../styles/styles';
import {Text, TextInput, Button} from 'react-native-paper';
import Icons from './Icon';

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
  right,
}) => {
  const [view, setView] = useState(false);
  return (
    <View style={{}}>
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
          editable={editable === undefined || editable === null ? true : false}
          label={label}
          value={value}
          onChangeText={text => onChange(text)}
          style={[style.textInput, {...customStyle}]}
          enablesReturnKeyAutomatically={true}
          mar
          secureTextEntry={!view && secureTextEntry}
          multiline={multiline}
          key={index}
          right={right ? <TextInput.Affix text="Copy" /> : null}
        />
      </TouchableOpacity>
      {secureTextEntry ? (
        <TouchableOpacity
          style={{position: 'absolute', right: 20, top: 30}}
          onPress={() => setView(view => !view)}>
          <Icons name={view ? 'eye' : 'eye-slash'} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
