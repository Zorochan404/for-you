import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { useDispatch } from "react-redux";
import { setSong } from "../features/searchSlice";
import { useNavigation } from "@react-navigation/native";
import { setPlaylist } from "../features/playlistSlice";

const SearchedSong = ({
  id,
  playlistId,
  thumbnail,
  title,
  uploaderName,
  duration,
  uploaderUrl,
}) => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState();

  const navigation = useNavigation();

  const handleSong = async () => {
    const url = `https://beatbump.io/api/v1/next.json?videoId=${id}&playlistId=${playlistId}&configType=MUSIC_VIDEO_TYPE_ATV`;
    console.log(url);
    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
            "Connection": "keep-alive",
            "User-Agent": "MY-UA-STRING"
        }
    })
    .then(res => res.json())
    .then((apiResponse) => {
        const formattedResults = apiResponse.results.map(item => ({
            id: item.videoId,
            playlistId: item.playlistId,
            thumbnail: item.thumbnails[0].url,
            title: item.title,
            uploaderName: item.artistInfo.artist[0].text,
            duration: item.subtitle[item.subtitle.length-1].text
        }));
        setSearchResults(formattedResults);
        console.log(formattedResults)
        dispatch(
          setSong(formattedResults)
        );
        
    })
    .catch((error) => {
        console.error('Error fetching search results:', error);
    });
    

    navigation.navigate("song");
  };

  return (
    <View>
      <TouchableOpacity onPress={handleSong}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            backgroundColor: "#d3d3d3",
            padding: 5,
            borderRadius: 10,
          }}
        >
          <Image
            style={{ width: 70, height: 70, marginRight: 10, borderRadius: 10 }}
            source={{ uri: thumbnail }}
          />
          <View style={{ flexDirection: "column", width: "70%" }}>
            <View >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>{title}</Text>
              <Text style={{fontSize: 10}}>{duration}</Text>
            </View>

            <Text style={{ fontSize: 12 }}>{uploaderName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchedSong;
