import { StyleSheet, Platform } from "react-native";
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
    paddingTop: Platform.OS === "android" ? 0 : 0,
  },
});
