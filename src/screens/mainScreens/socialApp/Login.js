import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CommonInput} from '../../../components/TextInput';
import CommonButton from '../../../components/Button';
import {height, signUpData, width} from '../Data';
import Welcome from '../../../assets/socialapp/Welcome.png';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {AlertBottomSnackbar} from 'react-native-bottom-snackbar';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storage} from '../Data';
import {signin, signup} from '../../../api/Endpoints';
import apiCall from '../../../api/ApiCall';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = () => {
  const {navigate, replace} = useNavigation();
  const [email, setEmail] = useState();
  const [password, Setpassword] = useState();
  const [userdata, setUserData] = useMMKVStorage('user', storage, '');
  const [userInfo, setUserInfo] = useState('');
  const [gettingLoginStatus, setGettingLoginStatus] = useState(false);

  useEffect(() => {
    GoogleSignin.configure();
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      _signOut();
      // _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    // setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      handleLogin(userInfo);
      // setUserInfo(userInfo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  const _signOut = async () => {
    // setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  const handleLogin = async data => {
    let loginData={}
    if(data){
       loginData = {
        name: data.user.name,
        email: data.user.email,
        password: data.user.email,
        instaUserName: '',
        shortBio: '',
        country: '',
        role: ['user', 'moderator'],
      };
    }
   
    try {
      // const response = await apiCall(signin, 'POST', {email, password});
      const response = await apiCall(
        data ? signup : signin,
        'POST',
        data ? loginData : {email, password},
      );
      // if( response[0].toString()==='Error: Failed! Username is already in use!'){
      //   const response = await apiCall(
      //      signin,
      //     'POST',
      //     {email:data.user.email, password:data.user.email},
      //   ); 
      // }
      console.log(response,"response===");
      AlertBottomSnackbar.show('login successfull', 'success', () => {});
      setUserData(response);
      navigate('Feed');
    } catch (error) {
      // console.error('Error fetching data:', error.message);
      AlertBottomSnackbar.show(error.message, 'success', () => {
        console.log('snackbar closed.');
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{flex: 1}}>
        <Image source={Welcome} style={styles.image} />
        <CommonInput
          value={email}
          onChange={text => setEmail(text)}
          label={'Enter Your registered email'}
        />
        <CommonInput
          value={password}
          onChange={text => Setpassword(text)}
          label={'Enter Your password'}
          secureTextEntry={true}
        />

        <CommonButton
          name={'Login'}
          screenName={'Feed'}
          backgroundColor={'#BB2525'}
          customStyle={{alignSelf: 'center', width: '70%'}}
          onPress={handleLogin}
        />
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 18, color: 'gray'}}>
            Don't have account?
          </Text>
          <Text style={styles.text1} onPress={() => navigate('SignUp')}>
            SignUp here
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{color: '#fff', fontSize: 18}}
            onPress={() => navigate('SignUp')}>
            Or Continue with
          </Text>
          <TouchableOpacity onPress={_signIn}>
            <Image
              source={require('../../../assets/socialapp/google_login.png')}
              style={{height: width / 9, width: width / 9, resizeMode: 'cover'}}
            />
          </TouchableOpacity>
        </View>
        <AlertBottomSnackbar />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3C415E',
  },
  image: {
    width: width,
    height: height / 2,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text1: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    paddingLeft: 5,
  },
});
