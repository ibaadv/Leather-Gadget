import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import BTNS from "./Components/BTNS";
import React from "react";

export default function Welcome() {
  const router = useRouter();

  React.useEffect(() => {
    console.log("Welcome: Mounted");
    return () => console.log("Welcome: Unmounted");
  }, []);

  const navigateToLogin = () => {
    try {
      console.log("Welcome: Navigating to /login");
      router.push("/login");
    } catch (err) {
      console.error("Welcome: Navigation to login failed:", err);
    }
  };

  const navigateToSignup = () => {
    try {
      console.log("Welcome: Navigating to /signup");
      router.replace("/signup");
    } catch (err) {
      console.error("Welcome: Navigation to signup failed:", err);
    }
  };

  return (
    <LinearGradient colors={["#000", "#fff"]} style={styles.linear}>
      <ImageBackground
        source={require("../assets/Images/background.jpg")}
        resizeMode="cover"
        style={styles.linear}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.linear}>
          <View style={styles.parent}>
            <View>
              <Text style={styles.title}>LEATHER GADGETS</Text>
            </View>
            <Text style={styles.subTitle}>Welcome To Our App</Text>
            <View>
              <BTNS onPress={navigateToSignup}>SignUp</BTNS>
              <BTNS onPress={navigateToLogin}>Login</BTNS>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  linear: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.6,
  },
  title: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: "white",
    fontSize: 30,
    marginVertical: 10,
    fontFamily: "MontesseratSemiBold",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 5,
    color: "white",
    fontFamily: "MontesseratRegular",
  },
});
