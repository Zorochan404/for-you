import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';    
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../GlobalStyles';
import SearchBar from '../components/SearchBar';
import SearchedSong from '../components/SearchedSong';




const HomeScreen = () => {
    const [searchText, setSearchText] = useState('');

    const navigation = useNavigation()


    

 
    

 

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={{ flex: 1 }}>
            <SearchBar/>
            <SearchedSong/>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
