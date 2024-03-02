import { View, Text, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';

const HomeCard = ({ header, thumbnail }) => {
  return (
    <View>
      <Text style={{ color: "#fff", margin: 10, fontSize: 30 }}>{header}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}>
        {thumbnail.map((item, index) => {
          if (item.musicTwoRowItemRenderer) {
            return (
              <View key={index} style={{ width: 110, marginRight: 25 , marginLeft: 10}}>
                <Image style={{ height: 120, width: 120, borderRadius: 20 }} source={{ uri: item.musicTwoRowItemRenderer?.thumbnailRenderer.musicThumbnailRenderer.thumbnail.thumbnails[0].url }} />
                <Text style={{ color: "#fff", maxWidth: 100, marginTop: 5 }} numberOfLines={1} ellipsizeMode="tail">
                  {item.musicTwoRowItemRenderer?.title.runs[0].text}
                </Text>
              </View>
            );
          } else {
            return (
              <View style={{ flexDirection: 'row' ,  marginLeft: 10}}>
                {Array.from({ length: Math.ceil(thumbnail.length / 5) }, (_, columnIndex) => (
                  <View key={columnIndex} style={{ marginRight: 25 }}>
                    {thumbnail.slice(columnIndex * 5, (columnIndex + 1) * 5).map((song, i) => (
                      <View key={i} style={{ width: 110, marginBottom: 5 ,  flexDirection: 'row',
                      alignItems: 'center',
                      width: Dimensions.get('screen').width * 0.8,
                      paddingHorizontal: 4,
                      paddingVertical: 8, }}>
                        <Image style={{ height: 56, width: 56, borderRadius: 10 }} source={{ uri: song.musicResponsiveListItemRenderer?.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url }} />
                        <Text style={{ color: "#fff", maxWidth: "100%", paddingLeft: 10 }} numberOfLines={1} ellipsizeMode="tail">
                          {song.musicResponsiveListItemRenderer?.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

export default HomeCard;
