import {
  LayoutAnimation,
  UIManager,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
  NativeModules,
  RefreshControl,
  Linking,
  Pressable,
  BackHandler,
} from 'react-native';
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
  useRef,
} from 'react';
import Header from '../../../components/Header';
import {Card, Text} from 'react-native-paper';
import {descriptionText, height, storage, width} from './Data';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddPost from './AddPost';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import {dislikes, getFeedData, likes, uploads} from '../../../api/Endpoints';
import apiCall, {baseIP} from '../../../api/ApiCall';
import Loader from '../../../components/Loader';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {ImageConstants} from '../../../assets/ImagePath';
import {useSelector} from 'react-redux';
import NotificationModal from '../../../components/NotificationModal';
import LinearGradient from 'react-native-linear-gradient';
import useReferesh from '../../../hooks/useReferesh';
import {colors} from '../../../styles/styles';
import {AlertBox} from '../../../components/AlertBox';
const iconProps = {name: 'instagram', size: 25, color: '#fff'};

const Feed = ({navigation}) => {
  const notificationData = useSelector(state => state.notificationReducer);
  const {onRefresh, refreshing} = useReferesh(getFeeds);
  const backRef = useRef(null);
  const modalRef = useRef(null);
  const flatListRef = useRef(null);

  let uri =
    'https://media.gettyimages.com/id/1333203094/photo/an-aerial-view-of-vidhan-soudha-and-high-court-building-in-bangalore.jpg?s=612x612&w=gi&k=20&c=f9u2VLRvy0LN5W0Rocv14jhrsxcTLuCCVOuFwibOWbU=';
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [userdata] = useMMKVStorage('user', storage, '');
  const [fullviewState, setFullViewState] = useState(false);

  useEffect(() => {
    setLoader(true);
    getFeeds();
  }, []);

  useEffect(() => {
    // modalRef?.current?.setModalVisible(false);
    console.log(modalRef?.current, '=====modalRef=====');
    const pressHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => pressHandler.remove();
  }, []);

  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const handleBackPress = () => {
    const dilayTiming = 200;
    let pressTiming = Date.now();
    console.log(pressTiming);
    if (backRef.current && pressTiming - backRef.current < dilayTiming) {
      modalRef?.current?.openModal();
    } else {
      backRef.current = pressTiming;
      toTop();
    }
    return true;
  };

  const getFeeds = async () => {
    console.log(userdata);
    try {
      const response = await apiCall(
        getFeedData,
        'get',
        '',
        userdata?.accessToken,
      );
      let data = response.map(e => ({
        _id: e?._id,
        image: e?.url?.replace('localhost', baseIP) || '',
        description: e?.description,
        likes: e?.likes || 0,
        dislikes: e?.dislikes || 0,
        location: e?.location,
        userId: e.userId,
      }));
      setFeedData(() => [feedData[0], ...data].reverse());
    } catch (error) {
      console.warn(error);
    } finally {
      setLoader(false);
    }
  };

  const handleAddPost = async props => {
    try {
      const {
        location,
        description,
        image: [{fileName, type, uri}],
        likes,
        dislikes,
      } = props;
      console.log(
        uri,
        type,
        fileName,
        description,
        location,
        likes,
        dislikes,
        'props==',
      );
      // Create a new FormData object
      const formData = new FormData();
      formData.append('image', {
        name: fileName || 'profileImage',
        type: type || 'image/jpeg',
        uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
      });
      formData.append('description', description);
      formData.append('location', location);
      formData.append('likes', likes);
      formData.append('likes', likes);
      console.log(formData._parts[0], '1====');
      setLoader(true);
      const response = await apiCall(
        uploads,
        'POST',
        formData,
        userdata?.accessToken,
      );
      setLoader(false);
      getFeeds();
    } catch (error) {
      console.warn(error);
    }
  };

  const handleLikeDisLike = async (data, status) => {
    try {
      const response = await apiCall(
        likes(data?._id),
        'put',
        '',
        userdata?.accessToken,
      );
      console.log(response, 'response====');
      //  ||response.message==="dislikes updated successfully"
      if (response.message == 'Likes updated successfully') {
        let index = feedData.findIndex(e => e._id === data?._id);
        if (index != -1) {
          let data = [...feedData];
          data[index]['likes'] = response.likes;
          setFeedData([...data]);
        }
      } else {
        console.warn('failed to update like');
      }
    } catch (error) {
      // Handle errors
      console.warn(error);
    }
  };

  const RenderHeader = () => (
    <Header
      navigation={navigation}
      // showModal={showModal}
      // setShowModal={setShowModal}
      // addanimation={() =>
      //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      // }
      heading={'Home'}
    />
  );

  return (
    <>
      <SafeAreaView style={[styles.mainContainer]}>
        <LinearGradient
          start={{x: 0.6, y: 0.2}}
          end={{x: -2, y: 1.4}}
          colors={['rgba(0,0,0,1)', '#fc0303']}
          style={[styles.mainContainer]}>
          <RenderHeader />
          <FlatList
            ref={flatListRef}
            data={feedData}
            key={(_, i) => i.toString()}
            renderItem={({item}) => (
              <RenderItem
                item={item}
                userdata={userdata}
                fullviewState={fullviewState}
                setFullViewState={setFullViewState}
                handleLikeDisLike={handleLikeDisLike}
              />
            )}
            // maxToRenderPerBatch={3}
            ItemSeparatorComponent={
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,0.4)']}
                start={{x: 0.7, y: 0}}
                end={{x: 0, y: 0}}
                style={{height: 1, width: '100%'}}
              />
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />

          {showModal && (
            <>
              <BlurView
                style={{...StyleSheet.absoluteFillObject}}
                blurType="light"
                blurAmount={2}
                reducedTransparencyFallbackColor="white"
              />
              <AddPost
                onPress={data => {
                  setShowModal(!showModal);
                  handleAddPost(data);
                }}
                setFeedData={setFeedData}
                feedData={feedData}
                onClose={() => setShowModal(false)}
              />
            </>
          )}
          {loader ? <Loader /> : <View />}
          <Pressable
            style={{position: 'absolute', bottom: 110, right: 20}}
            onPressIn={() => setShowModal(true)}>
            <LinearGradient
              start={{x: 0.6, y: 0.2}}
              end={{x: -2, y: 1.5}}
              colors={['rgba(224, 203, 203, 1)', '#ff0000']}
              style={{borderRadius: 99, padding: 10}}>
              <Image
                source={ImageConstants.plus}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  tintColor: '#000',
                  borderRadius: 99,
                }}
              />
            </LinearGradient>
          </Pressable>
            <AlertBox
              ref={modalRef}
              opessCancel={() => {
                modalRef?.current?.closeModal();
              }}
              onPressOK={() => {
                modalRef?.current?.closeModal();
                BackHandler.exitApp();
              }}
              title={'Are you sure want to exit?'}
            />
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const RenderItem = React.memo(
  ({item, userdata, fullviewState, setFullViewState, handleLikeDisLike}) => {
    const [liked, setLiked] = useState(item?.likes);
    // console.log(item._id);
    return (
      <View style={styles.card}>
        <View>
          <View style={styles.cardHeaderContainer}>
            <View style={{margin: 5}}>
              <Image
                source={{
                  uri: 'https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg',
                }}
                style={styles.prfileImage}
              />
            </View>

            <View
              style={{
                // marginVertical: 10,
                alignItems: 'flex-start',
              }}>
              <Text style={styles.profileName}>{userdata?.name}</Text>
              <Text style={styles.userlocation}>{item?.location}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
            }}
            onPress={() => {
              console.log(item?.image);
              Linking.openURL(item?.image);
            }}
            activeOpacity={1}
            onLongPress={() => alert('long pressed')}>
            <Image source={{uri: item?.image}} style={styles.postImage} />
          </TouchableOpacity>
          <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionText}>
              {!fullviewState
                ? item?.description?.slice(0, 100)
                : item?.description}
              {item?.description?.length > 50 ? (
                <Text
                  style={styles.viewFull}
                  onPress={() => setFullViewState(!fullviewState)}>
                  {fullviewState ? 'view less' : 'see more'}...
                </Text>
              ) : null}
            </Text>
          </View>
          <View style={styles.bardBottomContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor:
                  Array.isArray(item?.likes) &&
                  item?.likes?.includes(userdata.id)
                    ? colors.color5
                    : colors.color3,
                paddingHorizontal: 5,
                paddingVertical: 3,
                borderRadius: 99,
              }}>
              <TouchableOpacity
                onPress={() => handleLikeDisLike(item, 'likes')}>
                <Image
                  source={
                    Array.isArray(item?.likes) &&
                    item?.likes?.includes(userdata.id)
                      ? ImageConstants.liked
                      : ImageConstants.unLiked
                  }
                  style={[
                    styles.likeDislike,
                    {
                      tintColor:
                        Array.isArray(item?.likes) &&
                        item?.likes?.includes(userdata.id)
                          ? null
                          : '#fff',
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.likes,
                    {
                      color:
                        Array.isArray(item?.likes) &&
                        item?.likes?.includes(userdata.id)
                          ? colors.color3
                          : '#fff',
                    },
                  ]}>
                  {item?.likes?.length}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#fff', marginRight: 25}}>Open in </Text>
              <Icon {...iconProps} />
            </View>
          </View>
        </View>
      </View>
    );
  },
);

export default React.memo(Feed);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  card: {
    width: width - 10,
    marginHorizontal: 10,
    marginVertical: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderColor: colors.color3,
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  prfileImage: {
    height: height / 14,
    width: width / 7,
    borderRadius: 100,
    margin: 10,
  },
  postImage: {
    height: height / 4,
    width: width / 1.1,
    borderRadius: 10,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  descriptionText: {
    color: '#fff',
    padding: 5,
    fontSize: 16,
    textAlign: 'left',
  },
  bardBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  likeDislike: {
    height: height / 35,
    width: width / 16,
  },
  profileName: {color: '#fff'},
  userlocation: {color: '#fff'},
  cardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  likes: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
  },
  viewFull: {
    color: 'red',
    fontSize: 17,
    fontWeight: '600',
    alignItems: 'center',
  },
  descriptionTextContainer: {
    width: width - 30,
    paddingHorizontal: 2,
    // alignItems: 'center',
    paddingLeft: 10,
  },
});
