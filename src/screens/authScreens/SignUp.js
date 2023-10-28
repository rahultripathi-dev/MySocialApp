import {
  View,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {CommonInput} from '../../components/TextInput';
import CommonButton from '../../components/Button';
import {height, signUpData, width} from '../mainScreens/home/Data';
import {Text} from 'react-native-paper';
import {countries, signup} from '../../api/Endpoints';
import {AlertBottomSnackbar} from 'react-native-bottom-snackbar';
import {apiCall} from '../../api/ApiCall';
import BottomSheet from '../../components/BottomSheet';
import {ImageConstants} from '../../assets/ImagePath';

const SignUp = ({navigation}) => {
  const [profileData, setProfileData] = useState([...signUpData]);

  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [contryList, setCountryList]=useState()

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
      const response = await apiCall(signup, 'POST', data);
      console.log(response.message);
      AlertBottomSnackbar.show(
        response.message || 'Signup successfull',
        'success',
        () => {
          navigation.navigate('SocialApp');
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
      routes: [{name: 'SocialApp'}],
    });
  };
useEffect(() => {
  getCountries()
}, [])

const getCountries=async ()=>{
setCountryList(await apiCall(countries,'get'))
}

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image source={ImageConstants.create_account} style={styles.image} />
      <ScrollView
        style={{}}
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}>
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
            name={'Create account'}
            screenName={'SocialApp'}
            backgroundColor={'#BB2525'}
            customStyle={{alignSelf: 'center', width: '70%'}}
            onPress={handleSignUp}
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginBottom: 50,
            }}>
            <Text style={{textAlign: 'center', fontSize: 18, color: 'gray'}}>
              Already have an account?
            </Text>
            <Text style={styles.text1} onPress={() => handleNavigation()}>
              Login here
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        isVisible={openBottomSheet}
        onClose={()=>setOpenBottomSheet(false)}
        data={contryList}
      />
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
