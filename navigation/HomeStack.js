import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// Screens
import { HomeScreen } from "../screens";

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#5EA7FF" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
