import React, {useRef, useState} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {CommonInput} from './TextInput';

const BottomSheet = ({isVisible, onClose, data}) => {
  const translateY = useRef(new Animated.Value(500)).current;

  // Animate the bottom sheet when `isVisible` changes
  Animated.timing(translateY, {
    toValue: isVisible ? 0 : 500,
    duration: 300,
    useNativeDriver: true,
  }).start();
  const [filterList, setFilterList] = useState();
  return (
    <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text>Close</Text>
      </TouchableOpacity>
      {/* Render your data here */}
      <View style={styles.content}>
        {/* Render your data items */}
        <FlatList
          data={filterList ? filterList: []}
          ListHeaderComponent={() => (
            <CommonInput
              label={'search country here'}
              onChange={text => {
                let result = data?.filter(
                  e => e?.name?.toUpperCase()?.includes(text.toUpperCase()) 
                );
                console.log(result);
                setFilterList(result);
              }}
            />
          )}
          renderItem={({item}, index) => {
            return <Text key={item.id.toString()}>{item.name}</Text>;
          }}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 16,
    elevation: 4,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  content: {
    marginTop: 10,
    height: 200,
  },
});

export default BottomSheet;
