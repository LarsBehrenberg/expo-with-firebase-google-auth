import React, { useContext } from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Stacks
import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";

// Screens
import { LoginScreen } from "../screens";

// Icons
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

// Context
import UserContext from "../context/UserContext";

const Tab = createBottomTabNavigator();
const LoginStack = createStackNavigator();
const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {!user?.uid ? (
        <LoginStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <LoginStack.Screen name="Login" component={LoginScreen} />
        </LoginStack.Navigator>
      ) : (
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen name="Main" component={MainNavigator} />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;

const MainNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: "#5EA7FF",
    }}
  >
    <Tab.Screen
      name="HomeStack"
      component={HomeStack}
      options={{
        title: "Some title",
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Entypo name="wallet" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsStack}
      options={{
        tabBarLabel: "Settings",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
