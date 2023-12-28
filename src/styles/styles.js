import {StyleSheet, Platform, StatusBar} from 'react-native';

export const homesScreenStyle = {
  screenContainer: {
    flex: 1,
    backgroundColor: '#2C3333',
  },

  fabStyle: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
    backgroundColor: '#ff4081',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export const addScreenStyle = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#303841',
  },
  textInput: {
    padding: 0,
    marginHorizontal: 10,
    marginVertical: 14,
    backgroundColor: '#fff',
  },
};

export const editScreenStyle = {};

export const colors = {
  color1: '#c70049',
  color1_light: 'rgba(227,25,99,1)',
  color1_light2: 'rgba(199,0,73,0.9)',
  color2: 'white',
  color3: 'rgb(45,45,45)',
  color4: 'transparent',
  color5: '#f2f2f2',
  color6: '#f7f7f7',
};

export const defaultStyle = StyleSheet.create({
  flex: 1,
  backgroundColor: colors.color2,
});

export const inputStyling = StyleSheet.create({
  marginVertical: 10,
  marginHorizontal: 20,
  height: 50,
  backgroundColor: colors.color2,
});

export const formHeading = {
  fontSize: 25,
  fontWeight: '500',
  textAlign: 'center',
  backgroundColor: colors.color3,
  color: colors.color2,
  padding: 5,
  borderRadius: 5,
};

export const inputOptions = {
  style: inputStyling,
  mode: 'outlined',
  activeOutlineColor: colors.color1,
};

export const formStyle = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    justifyContent: 'center',
    elevation: 10,
  },
  forget: {
    color: colors.color2,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: 'flex-end',
    fontWeight: '100',
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 5,
  },
  or: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '100',
    color: colors.color2,
  },
  link: {
    alignSelf: 'center',
    fontSize: 18,
    color: colors.color2,
    textTransform: 'uppercase',
    marginVertical: 10,
    marginHorizontal: 20,
  },
};

export const defaultImg =
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600';
