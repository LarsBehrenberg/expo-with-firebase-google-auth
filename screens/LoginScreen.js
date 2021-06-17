import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { SocialIcon } from "react-native-elements";

import { signInWithGoogle, onSignOut } from "../firebase/firebase.utils";
import UserContext from "../context/UserContext";

const LoginScreen = () => {
  const { setUser } = useContext(UserContext);

  StatusBar.setBarStyle("light-content", true);

  const onButtonPress = () => signInWithGoogle({ setUser });

  useEffect(() => {
    onSignOut();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/backgrounds/background-login.jpg")}
      >
        <SafeAreaView>
          <SocialIcon
            button
            title="Login With Google"
            type="google"
            style={styles.googleButton}
            onPress={onButtonPress}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  googleButton: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
});
