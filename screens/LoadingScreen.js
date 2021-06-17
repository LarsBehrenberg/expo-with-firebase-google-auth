import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { auth } from "../firebase/firebase.utils";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("Login");
      }
    });
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
