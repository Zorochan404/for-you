import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../utils/styles";
import Modal from "../components/Modal";
import ChatComponent from "../components/ChatComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../GlobalStyles";
import db from "../config/firebase"; // Import the initialized Firebase instance
import { CollectionReference, addDoc, collection } from "firebase/firestore";

const Chat = () => {
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState(""); // Add state for roomName

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (roomName.trim() === "") {
      return; // Don't create room if the name is empty
    }
    const newRoomRef = database().ref('rooms').push(); // Generate a new unique key for the room
    const newRoomKey = newRoomRef.key;
  
    newRoomRef.set({
      id: newRoomKey,
      name: roomName.trim(),
      createdAt: database.ServerValue.TIMESTAMP
    })
    .then(() => {
      console.log("Room created successfully");
    })
    .catch((error) => {
      console.error("Error creating room:", error);
    });

    //     db.collection("rooms")
    //       .add({
    //         name: roomName,
    //       })
    //       .then(() => {
    //         console.log("Room created successfully");
    //         setRoomName(""); // Clear the input field after creating the room
    //       })
    //       .catch((error) => {
    //         console.error("Error creating room: ", error);
    //       });
    //     setVisible(true);
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>
          <Pressable onPress={handleCreateGroup}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View style={styles.createRoomContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter room name"
          value={roomName}
          onChangeText={setRoomName}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Create Room
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} /> : ""}
    </SafeAreaView>
  );
};

export default Chat;
