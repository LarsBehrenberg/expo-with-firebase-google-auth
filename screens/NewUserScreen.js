import React from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const NewUserScreen = ({ navigation, route: { params } }) => {
  console.log(params.user);

  if (!params.user) {
    navigation.navigate("Login");
  }

  return (
    <View>
      <Text>News User</Text>
    </View>
  );
};

export default NewUserScreen;

const styles = StyleSheet.create({});
