import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuthState } from "./hooks/useAuthState";
import BTNS from "./Components/BTNS";
import React, { useEffect } from "react";
import { ErrorBoundary } from "expo-router";

const log = (message: string) => {
  console.log(`Index: ${message}`);
};

export default function Index() {
  const router = useRouter();
  const { isFirstTime, isLoggedIn, isLoading, markAsOpened } = useAuthState();

  useEffect(() => {
    log("Mounted");
    return () => log("Unmounted");
  }, [isFirstTime, isLoggedIn, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      // log("Navigation logic triggered", { isLoggedIn, isFirstTime });
      if (isLoggedIn) {
        log("Navigating to /tabs");
        router.replace("/tabs");
      } else if (!isFirstTime) {
        log("Navigating to /welcome");
        router.replace("/welcome");
      }
    } else {
      log("Waiting for loading to complete");
    }
  }, [isLoading, isLoggedIn, isFirstTime, router]);

  const continueToWelcome = async () => {
    try {
      log("Continuing to welcome");
      await markAsOpened();
      log("Marking as opened, navigating to /welcome");
      router.replace("/welcome");
    } catch (err) {
      // log("Navigation error", err);
    }
  };

  if (isLoading) {
    log("Rendering loading state");
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (isFirstTime) {
    log("Rendering first-time user state");
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Leather Gadgets!</Text>
        <Text style={styles.subTitle}>First Time Here</Text>
        <BTNS onPress={continueToWelcome}>Get Started</BTNS>
      </View>
    );
  }

  log("Rendering fallback state");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Initializing... Check logs.</Text>
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
  title: {
    fontSize: 30,
    fontFamily: "MontesseratSemiBold",
    color: "#333",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: "MontesseratRegular",
    color: "#333",
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
