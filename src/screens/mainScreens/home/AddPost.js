import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';
import {Card, Text} from 'react-native-paper';
import {descriptionText, height, options, width} from './Data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CommonInput} from '../../../components/TextInput';
import {launchImageLibrary} from 'react-native-image-picker';
import CommonButton from '../../../components/Button';

const AddPost = ({navigation, onPress, onClose}) => {
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState('');
 

  const handleImagePicker = async () => {
    const {assets} = await launchImageLibrary(options);
    setImage(assets);
  };

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={onClose}
      activeOpacity={1}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.modalContainer}>
          <CommonInput
            // key={item.toSting()}
            value={location}
            onChange={text => {
              setLocation(text);
            }}
            label={'location'}
            customStyle={{backgroundColor: '#EEEDED'}}
          />
          {image ? (
            <Image
              source={{uri: image[0]?.uri}}
              style={styles.imageStyle(width,height)}
            />
          ) : null}
          <TouchableOpacity
            style={styles.chooseImage}
            onPress={() => handleImagePicker()}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="insert-photo" size={25} color={'#fff'} />
              <Text style={styles.chooseImageText}>Choose Image</Text>
            </View>
            <Icon
              name="highlight-remove"
              size={25}
              color={'#fff'}
              onPress={() => setImage('')}
            />
          </TouchableOpacity>
          <CommonInput
            // key={item.toSting()}
            value={description}
            onChange={text => {
              setDescription(text);
            }}
            label={'Some Description'}
            customStyle={styles.customTextInput}
            // secureTextEntry={true}
          />
          <CommonButton
            name={'Add Post'}
            backgroundColor={'#3A1078'}
            textColor={image && location && description ? '#fff' : "gray"}
            customStyle={styles.customButton}
            onPress={() => {
              // console.log(location,description,image.uri);
              if (image && location && description) {
                onPress({location, description, image, likes:[]});
              }else{
                Alert.alert("Warning","Please Fill all data")
              }
            }}
          />
        </View>
      </ScrollView>
    </TouchableOpacity>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  mainContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  modalContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#3C415E',
    width: width - 20,
    borderBottomEndRadius: 35,
    borderTopStartRadius: 25,
  },
  chooseImage: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 1,
    width: width - 40,
  },
  customButton: {
    width: width - 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    alignSelf: 'center',
  },
  customTextInput: {
    display: 'flex',
    width: width - 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 1,
    alignSelf: 'center',
    paddingBottom: 20,
  },
  chooseImageText: {color: '#fff', paddingHorizontal: 10, paddingVertical: 10},
  imageStyle: () => ({
    height: height / 2,
    width: width - 40,
    alignSelf: 'center',
    resizeMode: 'contain',
  }),
});
