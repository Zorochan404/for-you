import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../GlobalStyles";
import SearchedSong from "./SearchedSong";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    const url = `https://beatbump.io/api/v1/search.json?q=${searchText}&filter=songs`;
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
        const formattedResults = apiResponse.results[0].contents.map(item => ({
            id: item.videoId,
            playlistId: item.playlistId,
            thumbnail: item.thumbnails[0].url,
            title: item.title,
            uploaderName: item.artistInfo.artist[0].text,
            duration: item.subtitle[item.subtitle.length-1].text
        }));
        setSearchResults(formattedResults);
        console.log(formattedResults)
        
    })
    .catch((error) => {
        console.error('Error fetching search results:', error);
    });
};


const handleItemClick = (item) => {
    navigation.navigate('song', { songData: item })
    console.log('Clicked item:', item);
};


  return (
    <View style={{marginBottom: 50}}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
        }}
      >
        ForU
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: 10,
          padding: 5,
          backgroundColor: "#d3d3d3",
          borderRadius: 5,
        }}
      >
        <TextInput
          placeholder="Search music..."
          keyboardType="default"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={{ flex: 1, marginLeft: 10 }}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Text
            style={{
              backgroundColor: "black",
              color: "white",
              padding: 8,
              borderRadius: 5,
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50, marginHorizontal: 10 }}
      >
        {searchResults?.map((song) => (
          <SearchedSong
            key={song.id}
            id={song.id}
            playlistId={song.playlistId}
            thumbnail={song.thumbnail}
            title={song.title}
            uploaderName={song.uploaderName}
            // uploaderUrl={song.uploaderUrl}
            duration={song.duration}
            onPress={() => handleItemClick(song)}
          />
        ))}
      </ScrollView>
    </View>
  );
    
};

export default SearchBar;
