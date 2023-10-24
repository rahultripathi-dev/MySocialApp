import {
  MMKVLoader,
  MMKVStorage,
  useMMKVStorage,
} from 'react-native-mmkv-storage';



import {Dimensions} from 'react-native';

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;

export const soundList = [
  require('../../assets/spanishNumber/one.wav'),
  require('../../assets/spanishNumber/two.wav'),
  require('../../assets/spanishNumber/three.wav'),
  require('../../assets/spanishNumber/four.wav'),
  require('../../assets/spanishNumber/five.wav'),
  require('../../assets/spanishNumber/six.wav'),
  require('../../assets/spanishNumber/seven.wav'),
  require('../../assets/spanishNumber/eight.wav'),
  require('../../assets/spanishNumber/nine.wav'),
  require('../../assets/spanishNumber/ten.wav'),
];

export const images = {
  id: 2014422,
  width: 3024,
  height: 3024,
  url: 'https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/',
  photographer: 'Joey Farina',
  photographer_url: 'https://www.pexels.com/@joey',
  photographer_id: 680589,
  avg_color: '#978E82',
  src: {
    original:
      'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg',
    large2x:
      'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    large:
      'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    medium:
      'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=350',
    small:
      'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=130',
    portrait:
      'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    landscape:
      'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    tiny: 'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
  },
  liked: false,
  alt: 'Brown Rocks During Golden Hour',
};

export const storage = new MMKVLoader().initialize();


export const customHook = () => {
  const [item, setItem] = useMMKVStorage('array', storage, 'robert');

  return;
  item, setItem;
};

export const buttons = [
  {
    name: 'Tic Tac Toe',
    backgroundColor: '#CD1818',
    screenName: 'Tic_Tac_Toe',
  },
  {
    name: 'Social App',
    backgroundColor: '#700961',
    screenName: 'SocialApp',
  },
  {
    name: 'Password Generator',
    backgroundColor: '#550A46',
    screenName: 'PasswordGenerator',
  },
  {
    name: 'Profile Generator',
    backgroundColor: '#3D0000',
    screenName: 'ProfileMaker',
  },
  {
    name: 'Netflix App',
    backgroundColor: '#643A6B',
    screenName: 'HomeUI',
  },
  {
    name: 'Currency App',
    backgroundColor: '#FF4C29',
    screenName: 'CurrencyApp',
  },
  {
    name: 'SpanishNumber',
    backgroundColor: '#A91079',
    screenName: 'SpanishNumber',
  },
  {
    name: 'CameraApp',
    backgroundColor: '#CD1818',
    screenName: 'requestCameraPermission',
  },
  {
    name: 'Color Flicker',
    backgroundColor: '#5F264A',
    screenName: 'BgChanger',
  },
  {
    name: 'Dice Roller',
    backgroundColor: '#FB2576',
    screenName: 'DiceRoller',
  },
];


export const options = {
  mediaType: 'photo',
  quality: 1,
  maxWidth: 600,
  maxHeight: 600,
  allowsEditing: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

 export const descriptionText=` It is a long established fact that a reader will be distracted by the
 readable content of a page when looking at its layout. The point of
 using Lorem Ipsum is that it has a more-or-less normal distribution of
 letters, as opposed to using 'Content here, content here', making it
 look like readable English.`

 export const signUpData=[
  {
    name: '',
    label: 'name',
  },
  {
    email: '',
    label: 'email',
  },

  {
    password: '',
    label: 'password',
  },
  {
    instaUserName: '',
    label: 'Instagram User Name',
  },
  {
    shortBio: '',
    label: 'Your short bio',
  },
  {
    country: '',
    label: 'Country',
  },
  {
    role: ['user', 'moderator'],
  },
]