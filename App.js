import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./components/SearchBar";
import SongScreen from "./screens/SongScreen";
import { Provider } from "react-redux";
import store from "./store";
import SigninScreen from "./screens/SigninScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
        {/* <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen name='Signup' component={Signup} /> */}

          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="search"
            component={SearchScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="song"
            component={SongScreen}
            options={{
              headerShown: false,
            }}
          />
           <Stack.Screen
            name="signin"
            component={SigninScreen}
            options={{
              headerShown: false,
            }}
          />


                {/* <Stack.Screen
                    name='Chat'
                    component={ChatScreen}
                    options={{
                        title: "Chats",
                        headerShown: false,
                    }}
                />
                <Stack.Screen name='Messaging' component={MessagingScreen} /> */}
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
