import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CommonInput} from '../../components/TextInput';
import CommonButton from '../../components/Button';
import {height, signUpData, width} from '../mainScreens/home/Data';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {AlertBottomSnackbar} from 'react-native-bottom-snackbar';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storage} from '../mainScreens/home/Data';
import {googleLogin, signin, signup} from '../../api/Endpoints';
import apiCall from '../../api/ApiCall';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {ImageConstants} from '../../assets/ImagePath';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../styles/styles';
import CustomStatusBar from '../../components/StatusBar';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, Setpassword] = useState();
  const [userdata, setUserData] = useMMKVStorage('user', storage, '');
  const [userInfo, setUserInfo] = useState('');
  const [gettingLoginStatus, setGettingLoginStatus] = useState(false);

  const webClientId =
    '28821822364-qjqlaj790nh9jt3io22n7jbhoefjofs7.apps.googleusercontent.com';

  useEffect(() => {
    console.log(userdata.fcmToken)
    GoogleSignin.configure({
      webClientId: webClientId,
      // androidClientId: GOOGLE_ANDROID_CLIENT_ID,
      // iosClientId: GOOGLE_IOS_CLIENT_ID,
      scopes: ['profile', 'email'],
    });

    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      // alert('User is already signed in');
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

  const _onGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      await GoogleSignin.signOut();
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

  const handleLogin = async (googleLoginData = undefined) => {
    let loginData = {};
    if (googleLoginData) {
      loginData = {
        fcmToken: userdata?.fcmToken,
        idToken: googleLoginData?.idToken,
        email: googleLoginData?.user.email,
      };
    } else {
      loginData = {
        email,
        password,
        fcmToken: userdata?.fcmToken,
      };
    }
    console.log(loginData, 'loginData');
    try {
      const response = await apiCall(
        googleLoginData ? googleLogin : signin,
        'POST',
        loginData,
      );
      console.log(response, 'response===');
      AlertBottomSnackbar.show('login successfull', 'success', () => {});
      setUserData(response);
      // navigation.navigate('Feed');
    } catch (error) {
      // console.error('Error fetching data:', error.message);
      AlertBottomSnackbar.show(error.message, 'success', () => {
        console.log('snackbar closed.');
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <CustomStatusBar />
      <LinearGradient
        start={{x: 0.6, y: 0.2}}
        end={{x: -2, y: 1.4}}
        colors={['rgba(0,0,0,1)', '#fc0303']}
        style={[styles.mainContainer]}>
        <Image source={ImageConstants.welcome} style={styles.image} />
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
          buttonText={'Login'}
          screenName={'Feed'}
          mainContainer={{
            marginTop: 20,
            elevation: 5,
            shadowColor: '#fff',
            shadowOffset: {width: 2, height: 25},
            shadowOpacity: 9,
            shadowRadius: 20,
          }}
          buttonContainerStyle={{
            width: width / 2,
            alignSelf: 'center',
            flexDirection: 'row',
            borderRadius: 20,
            marginHorizontal: 5,
            padding: 5,
            borderColor: colors.color6,
            borderWidth: 1,
            justifyContent: 'center',
          }}
          buttonTextStyle={{
            fontSize: 20,
            color: colors.color6,
            fontWeight: 'bold',
            textAlign: 'center',
            letterSpacing: -1,
            lineHeight: 20,
            paddingLeft: 20,
            paddingHorizontal: 12,
            paddingVertical: 5,
          }}
          onPress={handleLogin}
        />
        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
          <Text style={{textAlign: 'center', fontSize: 18, color: 'gray'}}>
            Don't have account?
          </Text>
          <Text
            style={styles.text1}
            onPress={() => navigation.navigate('SignUp')}>
            SignUp here
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={[styles.text2, {paddingTop: 10}]}>Or</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.text2]} onPress={() => navigate('SignUp')}>
              Continue with
            </Text>
            <TouchableOpacity onPress={_onGoogleSignIn}>
              <Image
                source={ImageConstants.google_login}
                style={{
                  height: width / 9,
                  width: width / 9,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <AlertBottomSnackbar />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#3C415E',
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
  text2: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 1,
    lineHeight: 25,
  },
});
