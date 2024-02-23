import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSong, setSong } from "../features/searchSlice";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";

const PlayerIcon = () => {
    const [songInfo, setSongInfo] = useState(null);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songUrl, setSongUrl] = useState('');
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playNextSongUrl, setPlayNextSongUrl] = useState([]);
    const [previousSongs, setPreviousSongs] = useState([]); // Track previously played songs
    const items = useSelector(selectSong);
    const dispatch = useDispatch()
    const [searchResults, setSearchResults] = useState([]);


   

 // Get the navigation object

    
















  return (
    <View style={{position: "absolute", bottom: 0, width: "100%", zIndex: 50}}>
        <TouchableOpacity style = {{ height: 65, backgroundColor: '#00CCBB', padding: 16,  borderRadius: 8,  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} onPress={() => {navigation.navigate('song')}}> 
        <Text>PlayerIcon</Text>
        </TouchableOpacity>
      
    </View>
  )
}

export default PlayerIcon