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

    const handleSongPlay = async () => {
        const url = `https://pipedapi.kavin.rocks/streams/${playNextSongUrl}&autoplay=true`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain',
                "Connection": "keep-alive",
                "User-Agent": "MY-UA-STRING"
            }
        });
        const apiResponse = await response.json();
        const audioStreamUrl = apiResponse.audioStreams[1].url;
        setSongUrl(apiResponse); // Update this line to setSongUrl
        const newSound = new Audio.Sound();
        await newSound.loadAsync({ uri: audioStreamUrl },{ shouldPlay: true, isLooping: false },);
        setSound(newSound);
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    };

    const navigation = useNavigation(); // Get the navigation object

    const PlayNext = async () => {
        const nextSong = songUrl.relatedStreams[0];
        dispatch(setSong({
            url: nextSong.url,
            title: nextSong.title,
            thumbnail: nextSong.thumbnail,
            uploaderName: nextSong.uploaderName,
            uploaderUrl: nextSong.uploaderUrl,
            duration: nextSong.duration,
        }));
        if (sound) {
            await sound.stopAsync();
        }
        navigation.navigate('song');
    };



    const onPlaybackStatusUpdate = (status) => {
        setIsPlaying(status.isPlaying);
        setPosition(status.positionMillis);
        setDuration(status.durationMillis);
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
        setPlayNextSongUrl(items.url.split('=')[1]);
    }, [items.url]);

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
            <Button title='next' onPress={PlayNext} />
            {/* <Button title='previous' onPress={PlayPrevious} /> */}
        </View>
    );
};

export default Player;
