import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SongScreen from './screens/SongScreen';
import { Provider } from 'react-redux';
import store from './store';


const Stack = createNativeStackNavigator();


export default function App() {




  return (
    <NavigationContainer>
      <Provider store= {store}>
      <Stack.Navigator>
      <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="song"
          component={SongScreen}
          options={{
            headerShown:false
          }}
        />
        </Stack.Navigator>
        </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
