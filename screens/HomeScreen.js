import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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

import HomeCard from "../components/HomeCard";
// import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [Contents, setContents] = useState([]);
  const [continuation, setContinuation] = useState([]);

  const handleSearch = async () => {

    try {
      const response = await fetch('https://music.youtube.com/youtubei/v1/browse?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30', {
        method: 'POST',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0',
          'accept': '/',
          'accept-encoding': 'gzip, deflate',
          'content-type': 'application/json',
          'content-encoding': 'gzip',
          'origin': 'https://music.youtube.com',
          'cookie': 'CONSENT=YES+1',
          'X-Goog-Visitor-Id': 'CgthcFMwMnltQ3VDMCjns_6uBjIKCgJJThIEGgAgRg%3D%3D',
          'Authorization': 'Bearer ya29.a0AfB_byBzvpiupHC-ghv_nOU7SvzdXKmIEGls9wi3SL8f-KprhvNEUB4NgLJQTB--oZ3y68pAFxjarbCxBiDiGUcpn8dN_pphb_HgXDRaUt6dRQKO68_M1im34fwZOdxYhR9KnV-hbCFT2msW0_plgZXF1sO0D35uFAWB56AtUhTqHXi2aCgYKAccSARASFQHGX2Mib5hf1xJZyZaHxYabFik8Qg0183'
      },
        body: JSON.stringify({
          context: {
            client: {
              clientName: 'WEB_REMIX',
              clientVersion: '1.20240229.01.00',
              hl: 'en'
            },
            user: {}
          },
          "browseId": "FEmusic_home",
          // "continuation": "4qmFsgKhAhIMRkVtdXNpY19ob21lGpACQ0FONnh3RkhUSEZJT0RaTWRURkpVVVJYYjBWQ1EyNDRTMHBJYkRCWU0wSm9XakpXWm1NeU5XaGpTRTV2WWpOU1ptSllWbnBoVjA1bVkwZEdibHBXT1hsYVYyUndZakkxYUdKQ1NXWmplVEZ4VjFSQ1IxVlViRTloU0dSb1YxVTFiMUpIV25CYVJUbEpWMGRTUzJKdFNrbFpWRTQwV25odk1sUllWbnBoVjA1RllWaE9hbUl6V214amJteFJXVmRrYkZVeVZubGtiV3hxV2xNeFNGcFlVa2xpTWpGc1ZVZEdibHBSUVVKQlIxWjFRVUZHU2xSblFVSlRWVFJCUVZGRlJDMXdla2gyVVd0RFEwRlI%3D"
        })
      });

      const response2 = await fetch('https://music.youtube.com/youtubei/v1/browse?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30', {
        method: 'POST',
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0',
          'accept': '/',
          'accept-encoding': 'gzip, deflate',
          'content-type': 'application/json',
          'content-encoding': 'gzip',
          'origin': 'https://music.youtube.com',
          'cookie': 'CONSENT=YES+1',
          'X-Goog-Visitor-Id': 'CgthcFMwMnltQ3VDMCjns_6uBjIKCgJJThIEGgAgRg%3D%3D',
          'Authorization': 'Bearer ya29.a0AfB_byBzvpiupHC-ghv_nOU7SvzdXKmIEGls9wi3SL8f-KprhvNEUB4NgLJQTB--oZ3y68pAFxjarbCxBiDiGUcpn8dN_pphb_HgXDRaUt6dRQKO68_M1im34fwZOdxYhR9KnV-hbCFT2msW0_plgZXF1sO0D35uFAWB56AtUhTqHXi2aCgYKAccSARASFQHGX2Mib5hf1xJZyZaHxYabFik8Qg0183'
      },
        body: JSON.stringify({
          context: {
            client: {
              clientName: 'WEB_REMIX',
              clientVersion: '1.20240229.01.00',
              hl: 'en'
            },
            user: {}
          },
          "browseId": "FEmusic_home",
          "continuation": "4qmFsgKhAhIMRkVtdXNpY19ob21lGpACQ0FONnh3RkhUSEZJT0RaTWRURkpVVVJYYjBWQ1EyNDRTMHBJYkRCWU0wSm9XakpXWm1NeU5XaGpTRTV2WWpOU1ptSllWbnBoVjA1bVkwZEdibHBXT1hsYVYyUndZakkxYUdKQ1NXWmplVEZ4VjFSQ1IxVlViRTloU0dSb1YxVTFiMUpIV25CYVJUbEpWMGRTUzJKdFNrbFpWRTQwV25odk1sUllWbnBoVjA1RllWaE9hbUl6V214amJteFJXVmRrYkZVeVZubGtiV3hxV2xNeFNGcFlVa2xpTWpGc1ZVZEdibHBSUVVKQlIxWjFRVUZHU2xSblFVSlRWVFJCUVZGRlJDMXdla2gyVVd0RFEwRlI%3D"
        })
      });


  
      if (!response.ok && !response2.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const data2 = await response2.json();
  
      const contents = data.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents;
      const contents2 = data2.continuationContents.sectionListContinuation.contents
      setContents (contents)
      setContinuation(contents2)


      
  
     

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(()=>{
    handleSearch()
  },[])



  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      {/* <PlayerIcon/> */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate("signin")}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            color: "#fff",
          }}
        >
          For U
        </Text>
          </TouchableOpacity>
      
        {/* <SearchBar /> */}
        <ScrollView>
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

        </View>
        {Contents.map((item, index) => {
            if(item.musicCarouselShelfRenderer){
              return (
                <View key={index}>
                 
                  <HomeCard header = {item.musicCarouselShelfRenderer.header.musicCarouselShelfBasicHeaderRenderer.title.runs[0].text}
                  
                  thumbnail = {item.musicCarouselShelfRenderer.contents}/>
                 
                  {/* Render more properties here */}
                </View>
              );
            } else {
              return (
                null
              );
            }
        })}
        {continuation.map((item, index) => {
            if(item.musicCarouselShelfRenderer){
              return (
                <View key={index}>
                 
                  <HomeCard header = {item.musicCarouselShelfRenderer.header.musicCarouselShelfBasicHeaderRenderer.title.runs[0].text}
                  
                  thumbnail = {item.musicCarouselShelfRenderer.contents}/>
                 
                  {/* Render more properties here */}
                </View>
              );
            } else {
              return (
                null
              );
            }
        })}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
