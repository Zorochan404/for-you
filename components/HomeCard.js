import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const HomeCard = ({ header, thumbnail }) => {
  // console.log(header)
  // console.log(thumbnail[0].musicResponsiveListItemRenderer?.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url)

  return (
    <View >
<Text style={{ color: "#fff", margin: 10, fontSize: 30 }}>{header}</Text>
<ScrollView 
    contentContainerStyle={{
      paddingTop: 10,
      paddingHorizontal: 15,
    }}
    horizontal 
    showsHorizontalScrollIndicator={false}>
        
        {thumbnail.map((item, index) => {
            if(item.musicTwoRowItemRenderer){
              return (
                <View key={index} style={{width: 110, marginRight: 25}}>
                 
                 <Image style={{"height": 120, "width": 120, borderRadius: 20}} source={{uri: item.musicTwoRowItemRenderer?.thumbnailRenderer.musicThumbnailRenderer.thumbnail.thumbnails[0].url}}/>
                 <Text style={{ color: "#fff", maxWidth: 100, marginTop: 5 }} numberOfLines={1} ellipsizeMode="tail">
                  {item.musicTwoRowItemRenderer?.title.runs[0].text}
                </Text>                 
                  {/* Render more properties here */}
                </View>
              );
            } else {
              return (
                <View key={index} style={{width: 110, marginRight: 25}}>
                <Image style={{"height": 120, "width": 120, borderRadius: 20}} source={{uri: item.musicResponsiveListItemRenderer?.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[1].url}}/>
                <Text style={{ color: "#fff", maxWidth: 100, marginTop: 5 }} numberOfLines={1} ellipsizeMode="tail">
                  {item.musicResponsiveListItemRenderer?.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text}
                </Text>    
                </View>
              );
            }
        })}
          {/* // <View key={index} style={{}}>
          // <Image style={{"height": 100, "width": 100,}} source={{uri: item.musicTwoRowItemRenderer?.thumbnailRenderer.musicThumbnailRenderer.thumbnail.thumbnails[0].url}}/>
          // </View>
         */}

</ScrollView>
    
    </View>
  )
}

export default HomeCard
