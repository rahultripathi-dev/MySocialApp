import {
  View,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CommonInput} from '../../components/TextInput';
import CommonButton from '../../components/Button';
import {height, signUpData, storage, width} from '../mainScreens/home/Data';
import {Text} from 'react-native-paper';
import {countries, signup} from '../../api/Endpoints';
import {AlertBottomSnackbar} from 'react-native-bottom-snackbar';
import {apiCall} from '../../api/ApiCall';
import BottomSheet from '../../components/BottomSheet';
import {ImageConstants} from '../../assets/ImagePath';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../styles/styles';
import CustomStatusBar from '../../components/StatusBar';

const SignUp = ({navigation}) => {
  const [profileData, setProfileData] = useState([...signUpData]);
  const [userdata, setUserData] = useMMKVStorage('user', storage, '');
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [contryList, setCountryList] = useState();

  const handleSignUp = async () => {
    // let data = {
    //   country: 'India ',
    //   email: 'rahultripathit89@gmail.com',
    //   instaUserName: 'Rahultripathi',
    //   name: 'Rahul tripathi ',
    //   password: 'Ecbkzssh8c',
    //   role: ['user', 'moderator'],
    //   shortBio: ' I am a react native developer ',
    // };
    let data = {};
    profileData.forEach((e, i) => {
      data[Object.keys(e)[0]] = Object.values(e)[0];
    });

    console.log(data);

    try {
      const response = await apiCall(signup, 'POST', {
        ...data,
        fcmToken: userdata.fcmToken || '',
      });
      console.log(response.message);
      AlertBottomSnackbar.show(
        response.message || 'Signup successfull',
        'success',
        () => {
          navigation.navigate('Login');
          console.log('snackbar closed.');
        },
      );
    } catch (error) {
      console.error('Error fetching data:', error.message);
      AlertBottomSnackbar.show(error.message, 'success', () => {
        console.log('snackbar closed.');
      });
    }
  };

  const handleNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'RootNavigation'}],
    });
  };
  useEffect(() => {
    // getCountries()
  }, []);

  const getCountries = async () => {
    setCountryList(await apiCall(countries, 'get'));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomStatusBar />
     
       <LinearGradient
        start={{x: 0.6, y: 0.2}}
        end={{x: -2, y: 1.4}}
        colors={['rgba(0,0,0,1)', '#fc0303']}
        style={[styles.mainContainer]}>
       
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image source={ImageConstants.create_account} style={styles.image} />
        {profileData?.map(
          (item, index) =>
            !Array.isArray(item[Object.keys(item)[0]]) && (
              <CommonInput
                editable={index === 3 || index === 5 ? false : null}
                navigation={navigation}
                index={index}
                key={index}
                value={item[Object.keys(item)[0]]}
                onChange={text => {
                  let data = [...profileData];
                  item[Object.keys(profileData[index])[0]] = text;
                  setProfileData(data);
                }}
                label={item[Object.keys(item)[1]]}
                // secureTextEntry={item[Object.keys(item)[1]]==='password'?true:false}
                setOpenBottomSheet={setOpenBottomSheet}
              />
            ),
        )}
        <View style={{}}>
        <CommonButton
          buttonText={'SignUp'}
          screenName={'Feed'}
          buttonContainerStyle={{
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
          }}
          buttonTextStyle={{
            fontSize: 20,
            color: colors.color6,
            fontWeight: 'bold',
            textAlign: 'center',
            letterSpacing: -1,
            lineHeight: 20,
            paddingLeft: 20,
            paddingHorizontal:12,
            paddingVertical:5
          }}
          onPress={handleSignUp}
          // onPress={()=>navigation.navigate('VerifyOtp')}
        />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              paddingTop:20
            }}>
            <Text style={{textAlign: 'center', fontSize: 18, color: 'gray'}}>
              Already have an account?
            </Text>
            <Text style={styles.text1} onPress={() => handleNavigation()}>
              Login here
            </Text>
          </View>
        </View>
      </View>
      {/* <BottomSheet
        isVisible={openBottomSheet}
        onClose={()=>setOpenBottomSheet(false)}
        data={contryList}
      /> */}
      </LinearGradient>
      <AlertBottomSnackbar />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3C415E',
  },
  text1: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    paddingLeft: 5,
  },
  image: {
    width: width,
    height: height / 5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
