import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import React, { useCallback, useState } from "react";
import BTNS from "./Components/BTNS";

const Login = () => {
  // State hooks at the top
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Font loading
  const [fontsLoaded] = useFonts({
    Montesserat: require("../assets/Fonts/Montserrat-VariableFont_wght.ttf"),
    MontesseratSemiBold: require("../assets/Fonts/Montserrat-SemiBold.ttf"),
    MontesseratRegular: require("../assets/Fonts/Montserrat-Regular.ttf"),
  });

  const handleLogin = useCallback(async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setIsLoading(true);
    try {
      // Replace with actual authentication logic
      console.log("Login: Attempting login with username:", username);
      // await markAsLoggedIn();

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Login: Navigating to /tabs");
      router.replace("/tabs");
    } catch (err) {
      console.error("Login: Navigation error:", err);
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [username, password]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#8a2be2" />;
  }

  return (
    <ImageBackground
      source={require("../assets/Images/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <BTNS onPress={handleLogin}>
          {isLoading ? "Logging in..." : "Login"}
        </BTNS>
        <BTNS
          onPress={() => {
            console.log("Login: Navigating back");
            router.back();
          }}
        >
          Back
        </BTNS>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: "MontesseratSemiBold",
    marginBottom: 30,
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    fontFamily: "MontesseratRegular",
    color: "#fff",
  },
});
