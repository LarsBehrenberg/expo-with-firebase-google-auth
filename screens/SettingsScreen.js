import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import UserContext from "../context/UserContext";
import { onSignOut } from "../firebase/firebase.utils";

const SettingsScreen = () => {
  const { resetUser } = useContext(UserContext);

  const handleLogout = () => {
    onSignOut();
    resetUser();
  };
  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={handleLogout} style={styles.button}>
          <Text style={styles.text}>Sign out</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#5EA7FF",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
