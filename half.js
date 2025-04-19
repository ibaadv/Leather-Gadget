import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import BTNS from "../Components/BTNS";
import React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Half() {
  const router = useRouter();

  React.useEffect(() => {
    console.log("Half: Mounted");
    return () => console.log("Half: Unmounted");
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Half: Logging out");
      // await AsyncStorage.removeItem("isLoggedIn");
      router.replace("/welcome");
    } catch (err) {
      console.error("Half: Logout error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>No Products Yet!</Text>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
