import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { useDispatch } from 'react-redux';
import { setSong } from '../features/searchSlice';
import { useNavigation } from '@react-navigation/native';


const SearchedSong = ({id, url, thumbnail, title, uploaderName, duration, uploaderUrl}) => {
    const dispatch = useDispatch()



    const navigation = useNavigation()


    const handleSong = () => {
        dispatch(setSong({
            url,
            title,
            thumbnail,
            uploaderName,
            uploaderUrl,
            duration,
          }))
          navigation.navigate('song')
    }


  return (
    <View>
        <TouchableOpacity onPress={handleSong}>
         <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
         
    <Image style={{ width: 70, height: 70, marginRight: 10 }} source={{uri: thumbnail}}/>
    <View style={{flexDirection: "column"}}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={{fontSize: 15}}>
        {title}
       
      </Text>
      <Text style={{marginLeft: 20}}>
            {duration}
        </Text>
        </View>
      
        <Text style={{fontSize: 12}}>
            {uploaderName}
        </Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default SearchedSong