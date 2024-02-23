import Slider from "@react-native-community/slider";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSong, setSong } from "../features/searchSlice";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { Audio } from "expo-av";

const Player = () => {
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


    const handleSongPlay = async () => {
        if (sound) {
            await sound.stopAsync(); 
        }
        const url = `https://pipedapi.kavin.rocks/streams/${playNextSongUrl}`;
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain',
                "Connection": "keep-alive",
                "User-Agent": "MY-UA-STRING"
            }
        });
        const apiResponse = await response.json();
        
        setSongUrl(apiResponse); // Update this line to setSongUrl
        const audioStreamUrl = apiResponse.audioStreams[1].url;
        const newSound = new Audio.Sound();
        await newSound.loadAsync({ uri: audioStreamUrl },{ shouldPlay: true, isLooping: false },);
        setSound(newSound);
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    };

    const navigation = useNavigation(); // Get the navigation object

    


    const onPlaybackStatusUpdate = (status) => {
        setIsPlaying(status.isPlaying);
        setPosition(status.positionMillis);
        setDuration(status.durationMillis);
        if (!status.isPlaying && status.didJustFinish) {
            handleNextsong();
        }
    };

    const handleNextsong = async () => {
        // Find the index of the current playing song in the items array
        const currentIndex = items?.findIndex(item => item.id === playNextSongUrl);
        
        // If the current playing song is not found in the items array, set the first song as the next song
        const nextIndex = currentIndex === -1 ? 0 : currentIndex + 1;
        
        // Set the id of the next song to playNextSongUrl
        setPlayNextSongUrl(items[nextIndex]?.id || '');
        navigation.navigate("song");
    };

    const handlePreviousSong = async () => {
        const currentIndex = items?.findIndex(item => item.id === playNextSongUrl);
        const prevIndex = currentIndex === -1 ? 0 : currentIndex - 1;
        setPlayNextSongUrl(items[prevIndex]?.id || '');
        navigation.navigate("song");
    };

    const handlePause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
        }
    };

    const handleSeek = async (value) => {
        if (sound) {
            await sound.setPositionAsync(value);
        }
    };

    useEffect(() => {
        // Find the index of the current playing song in the items array
        const currentIndex = items?.findIndex(item => item.id === playNextSongUrl);
        
        // If the current playing song is not found in the items array, set the first song as the next song
        const nextIndex = currentIndex === -1 ? 0 : currentIndex + 1;
        
        // Set the id of the next song to playNextSongUrl
        setPlayNextSongUrl(items[nextIndex]?.id || '');
    }, [items]);

    useEffect(() => {
        handleSongPlay();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [playNextSongUrl]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Song Screen</Text>
            {songUrl.thumbnailUrl && <Image style={{ width: 350, height: 350, marginRight: 10 }} source={{ uri: songUrl.thumbnailUrl }} />}
            <Text style={{ fontSize: 20 }}>Title: {songUrl.title}</Text>

            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                onSlidingComplete={handleSeek}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
            />

            <Button title={isPlaying ? "Pause" : "Play"} onPress={handlePause} />
            <Button title='next'  onPress={handleNextsong}/>
            <Button title='previous' onPress={handlePreviousSong} />
        </View>
    );
};

export default Player;
