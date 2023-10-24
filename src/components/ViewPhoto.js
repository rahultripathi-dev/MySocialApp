import { View, Text ,Pressable,Image} from 'react-native'
import React from 'react'

const ViewPhoto = ({uri}) => {
  return (
    <View>
       <Pressable
            onPress={v => setOpenImage({...openImage, isActive: false})}
            style={{flex: 1}}>
            <Image
              source={{uri: uri}}
              style={{
                width: width,
                height: 800,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
          </Pressable>
    </View>
  )
}

export default ViewPhoto