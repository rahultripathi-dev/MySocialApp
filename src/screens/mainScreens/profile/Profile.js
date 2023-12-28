import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {storage, width} from '../home/Data';
import Header, {iconProps} from '../../../components/Header';
import {colors} from '../../../styles/styles';
import {ImageConstants} from '../../../assets/ImagePath';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {handleImagePicker} from '../home/AddPost';
import CommonButton from '../../../components/Button';
import apiCall from '../../../api/ApiCall';
import {getUserData} from '../../../api/Endpoints';

const Profile = () => {
  const [ProfileData, setProfileData] = useState();
  const [userdata, setUserData] = useMMKVStorage('user', storage, '');
  useEffect(() => {
    getProfileData();
  }, []);
  const handleLogOut = () => {
    let data = {...userdata};
    data.accessToken = '';
    setUserData({...data});
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'RootNavigation'}],
    // })
  };
  const getProfileData = async () => {
    const response = await apiCall(
      getUserData,
      'GET',
      '',
      userdata.accessToken,
    );
    // console.log(response);
    setProfileData(response)
  };
  const openGallery = async () => {
    const res = await handleImagePicker();
    alert(JSON.stringify(res));
    setProfileData(res[0].uri);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LinearGradient
        start={{x: 0.6, y: 0.2}}
        end={{x: -2, y: 1.4}}
        colors={['rgba(0,0,0,1)', '#fc0303']}
        style={styles.mainContainer}>
        <ImageBackground
          source={{
            uri: ProfileData?.coverPhoto?? 'https://www.shutterstock.com/image-photo/young-adult-profile-picture-red-260nw-1655747050.jpg',
          }}
          imageStyle={{
            borderBottomRightRadius: 22,
            borderBottomLeftRadius: 22,
            overflow: 'visible',
          }}
          style={{
            height: 240,
            width: width - 2,
            backgroundColor: colors.color3,
            justifyContent: 'flex-end',
          }}
          blurRadius={5}>
          {/* <Header heading={"Profile"} /> */}
          <View
            style={{
              alignSelf: 'center',
              bottom: -50,
              // shadowColor: '#fff',
              // shadowOffset: { width: 2, height: 8 },
              // shadowOpacity: 0.2,
              // shadowRadius: 3,
            }}>
            <Image
              source={{
                uri: ProfileData?.profilePhoto??'https://www.shutterstock.com/image-photo/young-adult-profile-picture-red-260nw-1655747050.jpg'
              }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 99,
                borderWidth: 1,
                borderColor: colors.color2,
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                alignSelf: 'center',
                zIndex: 9999,
                top: 100,
                right: 5,
              }}
              onPress={openGallery}>
              <Image
                source={ImageConstants.changePhoto}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 99,
                  borderWidth: 1,
                  borderColor: colors.color2,
                  tintColor: '#fff',
                }}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={{top: 50}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{...styles.userName, fontSize: 18, paddingLeft: 10}}>
               {ProfileData?.name??""}
              </Text>
              <Image
                source={
                  !!true ? ImageConstants.verified : ImageConstants.warning
                }
                style={{
                  height: 25,
                  width: 25,
                  // aspectRatio:20,
                  resizeMode: 'contain',
                  tintColor: !!true ? '#fff' : '#cacaca',
                  marginLeft: 5,
                }}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={ImageConstants.location}
                style={{width: 25, height: 25, tintColor: colors.color6}}
              />
              <Text style={styles.userName}> Allahabad,</Text>
              <Text style={styles.userName}> India</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
              width: '70%',
              alignSelf: 'center',
            }}>
            <View>
              <Text style={styles.userName}>Posts</Text>
              <Text style={styles.userName}>400</Text>
            </View>
            <View>
              <Text style={styles.userName}>Likes</Text>
              <Text style={styles.userName}>400</Text>
            </View>
            <View>
              <Text style={styles.userName}>followers</Text>
              <Text style={styles.userName}>400</Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 280,
            }}>
            <CommonButton
              buttonText={'Logout'}
              buttonContainerStyle={styles.buttonContainerStyle}
              buttonTextStyle={[styles.userName, {paddingLeft: 20}]}
              onPress={handleLogOut}
              children={() => <Icon name="power-off" {...iconProps} />}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Profile;

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    color: colors.color6,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  buttonContainerStyle: {
    width: width / 2,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 5,
    borderColor: colors.color6,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
