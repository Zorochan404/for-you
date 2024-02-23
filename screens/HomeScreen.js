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
import SearchBar from "../components/SearchBar";
import SearchedSong from "../components/SearchedSong";
import PlayerIcon from "../components/PlayerIcon";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSearch = async () => {
    const url = `https://beatbump.io/home.json?itct=CBAQybcCIhMI8L7Zv5nBhAMVnT-3AB1cogKE&ctoken=4qmFsgKhAhIMRkVtdXNpY19ob21lGpACQ0FONnh3RkhUbEEwTmpjdFduZFpVVVJYYjBWQ1EyNDRTMHBJYkRCWU0wSm9XakpXWm1NeU5XaGpTRTV2WWpOU1ptSllWbnBoVjA1bVkwZEdibHBXT1hsYVYyUndZakkxYUdKQ1NXWlBSamwwVjFWd05WUXhXbGxpUmtadFVWVlNSR0pZV25oalZtaHFXVzVHV0ZaVVNtRldlazVUV25odk1sUllWbnBoVjA1RllWaE9hbUl6V214amJteFJXVmRrYkZVeVZubGtiV3hxV2xNeFNGcFlVa2xpTWpGc1ZVZEdibHBSUVVKQlIxWjFRVUZHU2xSblFVSlRWVFJCUVZGRlJDMXdla2gyVVd0RFEwRlI%253D&type=next&visitorData=CgtYUGJMeUFLX0RsSSih2OGuBjIKCgJJThIEGgAgKA%3D%3D`
    await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
          Connection: "keep-alive",
          "User-Agent": "MY-UA-STRING",
        },
      })
      .then((res) => res.json())
      .then((apiResponse) => {
        const formattedResults = apiResponse.results[0].contents.map(
          (item) => ({
            id: item.videoId,
            playlistId: item.playlistId,
            thumbnail: item.thumbnails[0].url,
            title: item.title,
            uploaderName: item.artistInfo.artist[0].text,
            duration: item.subtitle[item.subtitle.length - 1].text,
          })
        );
        setSearchResults(formattedResults);
        console.log(formattedResults);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      {/* <PlayerIcon/> */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            color: "#fff",
          }}
        >
          For U
        </Text>
        {/* <SearchBar /> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("search")}>
            <Ionicons
              name="search-outline"
              style={{ color: "white", fontSize: 30 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigation.navigate('Chat')}>
            <Text style={{ color: "#fff" }}>Create Room</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "#fff", margin: 10, fontSize: 30 }}>Quick Picks</Text>
        <Text style={{ color: "#fff", margin: 10, fontSize: 30 }}>Recommended Music</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
