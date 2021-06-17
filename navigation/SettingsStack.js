import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

// Screens
import { SettingsScreen } from "../screens";

const Stack = createStackNavigator();

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: { backgroundColor: "#5EA7FF" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      {/* <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Details Page' }}
        /> */}
    </Stack.Navigator>
  );
}

export default SettingsStack;
