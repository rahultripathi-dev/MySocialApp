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
} from 'react-native';
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import Header from '../../../components/Header';
import {Card, Text} from 'react-native-paper';
import {descriptionText, height, storage, width} from '../Data';
import like from '../../../assets/socialapp/like.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddPost from './AddPost';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import {dislikes, getFeedData, likes, uploads} from '../../../api/Endpoints';
import apiCall from '../../../api/ApiCall';
import Loader from '../../../components/Loader';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {count} from '../../../../server/app/models/user.model';
import {ImageConstants} from '../../../assets/ImagePath';
const iconProps = {name: 'instagram', size: 25, color: '#fff'};

const Feed = () => {
  const navigation = useNavigation();
  let uri =
    'https://media.gettyimages.com/id/1333203094/photo/an-aerial-view-of-vidhan-soudha-and-high-court-building-in-bangalore.jpg?s=612x612&w=gi&k=20&c=f9u2VLRvy0LN5W0Rocv14jhrsxcTLuCCVOuFwibOWbU=';
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [feedData, setFeedData] = useState([
    {
      _id: '0',
      image: uri,
      description: descriptionText,
      likes: 1,
      dislikes: 0,
      location: 'Bangluru(Karnataka)',
    },
  ]);
  const [userdata] = useMMKVStorage('user', storage, '');
  const [fullviewState, setFullViewState] = useState(false);

  useEffect(() => {
    setLoader(true);
    getFeeds();
  }, []);

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
        image: e?.url?.replace('localhost', '192.168.0.104') || '',
        description: e?.description,
        likes: e?.likes || 0,
        dislikes: e?.dislikes || 0,
        location: e?.location,
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
      formData.append('dislikes', dislikes);
      console.log(formData._parts[0], '1====');
      setLoader(true);
      const response = await apiCall(uploads, 'POST', formData);
      setLoader(false);
      getFeeds();
      // console.log(response, 'response====');
      // if (response.data) {
      //   let data = [...feedData];
      //   setFeedData([
      //     ...data,
      //     {
      //       _id: response.data._id,
      //       image:
      //         response.data.url.replace('localhost', '192.168.0.105') || '',
      //       description: response.data.description,
      //       likes: response.data.likes || 0,
      //       dislikes: response.data.dislikes || 0,
      //       location: response.data.location,
      //     },
      //   ]);
      // }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleLikeDisLike = async (data, status) => {
    console.log(data, status);

    try {
      // response.message==="Likes updated successfully"||response.message==="dislikes updated successfully"
      // if (true) {
      //   let index = feedData.findIndex(e => e._id === data?._id);
      //   if (index != -1) {
      //     let data = feedData;
      //     data[index][status] = !data[index][status];
      //     setFeedData([...data]);
      //   }
      // }
      const response = await apiCall(
        likes(data?._id),
        'put',
        '',
        userdata?.accessToken,
      );
      console.log(response, 'response====');

      getFeeds();
      // const updatedLikeCount = response.data.likes;
      // Update the UI with the new like count
    } catch (error) {
      // Handle errors
      console.warn(error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loader ? <Loader /> : null}
      <>
        <StatusBar
          animated={true}
          backgroundColor="#3C415E"
          // barStyle={statusBarStyle}
          // showHideTransition={statusBarTransition}
          showHideTransition={'slide'}
        />
        <Header
          navigation={navigation}
          showModal={showModal}
          setShowModal={setShowModal}
          addanimation={() =>
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          }
        />

        <FlatList
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
        />

        {showModal && (
          <View style={{...StyleSheet.absoluteFillObject}}>
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
          </View>
        )}
      </>
    </SafeAreaView>
  );
};

const RenderItem = ({
  item,
  userdata,
  fullviewState,
  setFullViewState,
  handleLikeDisLike,
}) => {
  // console.log(item._id);
  return (
    <Card style={styles.card}>
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
        onPress={() => alert('image pressed')}
        activeOpacity={1}
        onLongPress={() => alert('long pressed')}>
        <Image source={{uri: item?.image}} style={styles.postImage} />
      </TouchableOpacity>
      <View style={styles.descriptionTextContainer(width)}>
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => handleLikeDisLike(item, 'likes')}>
            <Image
              source={
                Array.isArray(item?.likes)
                  ? item?.likes?.includes(userdata.id)
                    ? ImageConstants.liked
                    : ImageConstants.unLiked
                  : ''
              }
              style={[styles.likeDislike,{tintColor:item?.likes?.includes(userdata.id)?null:"#fff"}]}
            />
          </TouchableOpacity>
          <Text style={styles.likes}>{item?.likes?.length}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#fff', marginRight: 25}}>Open in </Text>
          <Icon {...iconProps} />
        </View>
      </View>
    </Card>
  );
};

export default React.memo(Feed);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3C415E',
  },
  card: {
    display: 'flex',
    width: width,
    backgroundColor: null,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 1,
    marginVertical: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  prfileImage: {
    height: height / 14,
    width: width / 7,
    borderRadius: 100,
    margin: 10,
  },
  postImage: {
    // flex:1,
    height: height / 4,
    width: width / 1.1,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  descriptionText: {color: '#fff', padding: 5, fontSize: 16, textAlign: 'left'},
  bardBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  likeDislike: {
    height: height / 25,
    width: width / 12,
    // tintColor: '#fff',
  },
  profileName: {color: '#fff'},
  userlocation: {color: '#fff'},
  cardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  likes: {color: '#fff', paddingRight: 10},
  viewFull: {
    color: 'red',
    fontSize: 17,
    fontWeight: '600',
    alignItems: 'center',
  },
  descriptionTextContainer: width => ({
    width: width - 30,
    paddingHorizontal: 2,
    // alignItems: 'center',
    paddingLeft: 10,
  }),
});
