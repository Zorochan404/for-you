import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const HomeCard = ({ header }) => {
  console.log(header)

  return (
    <View style={{ flex: 1 }}>

      
        <Text style={{ color: "#fff", margin: 10, fontSize: 30 }}>{header}</Text>

    
    </View>
  )
}

export default HomeCard
