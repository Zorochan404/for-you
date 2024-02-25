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
// import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      {/* <PlayerIcon/> */}
      <View style={{ flex: 1, backgroundColor: "#000" }}>
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
            {/* <Ionicons
              name="search-outline"
              style={{ color: "white", fontSize: 30 }}
            /> */}
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigation.navigate('Chat')}>
            <Text style={{ color: "#fff" }}>Create Room</Text>
          </TouchableOpacity>
        </View>

        <SearchedSong />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
