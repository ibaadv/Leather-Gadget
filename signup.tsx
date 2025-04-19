import { useFonts } from "expo-font";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import axios, { AxiosError } from "axios";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Load fonts
  const [fontsLoaded] = useFonts({
    Montserrat: require("../assets/Fonts/Montserrat-VariableFont_wght.ttf"),
    MontserratBold: require("../assets/Fonts/Montserrat-Bold.ttf"),
    MontserratSemiBold: require("../assets/Fonts/Montserrat-SemiBold.ttf"),
    MontserratRegular: require("../assets/Fonts/Montserrat-Regular.ttf"),
  });

  const validateInputs = useCallback((): boolean => {
    if (formData.name.length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  }, [formData]);

  const handleSignup = useCallback(async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setError("");

    try {
      // For Android emulator use "http://10.0.2.2:8080"
      // For iOS simulator use your computer's local IP "http://192.168.x.x:8080"
      // For production, use your actual backend URL
      const API_URL = "http://localhost:8080/api/users/signup";
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 10000,
      });

      console.log("Signup successful:", response.data);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/login");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Signup error:", axiosError);

      if (axiosError.response) {
        // Server responded with error status
        const errorData = axiosError.response.data as { message?: string };
        setError(errorData?.message || "Signup failed");
      } else if (axiosError.request) {
        // Request was made but no response
        setError("Cannot connect to server. Check your network.");
      } else {
        // Other errors
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateInputs]);

  const handleInputChange = useCallback(
    (field: keyof SignupData) => (text: string) => {
      setFormData((prev) => ({ ...prev, [field]: text }));
    },
    []
  );

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8a2be2" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/Images/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.overlay}>
            <View style={styles.formBox}>
              <Text style={styles.title}>Create Account</Text>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TextInput
                style={styles.input}
                onChangeText={handleInputChange("name")}
                value={formData.name}
                placeholder="Full Name"
                placeholderTextColor="#A9A9A9"
                autoCapitalize="words"
                autoCorrect={false}
              />

              <TextInput
                style={styles.input}
                onChangeText={handleInputChange("email")}
                value={formData.email}
                placeholder="Email Address"
                placeholderTextColor="#A9A9A9"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
              />

              <TextInput
                style={styles.input}
                onChangeText={handleInputChange("password")}
                value={formData.password}
                placeholder="Password"
                placeholderTextColor="#A9A9A9"
                secureTextEntry
                autoComplete="password"
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={[styles.button, isLoading && styles.disabledButton]}
                onPress={handleSignup}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginLink}
                onPress={() => router.push("/login")}
              >
                <Text style={styles.loginText}>
                  Already have an account?{" "}
                  <Text style={styles.loginLinkText}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    color: "#FFFFFF",
    fontFamily: "MontserratBold",
    marginBottom: 25,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    color: "#FFFFFF",
    fontFamily: "MontserratRegular",
  },
  button: {
    backgroundColor: "#8a2be2",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
  },
  errorText: {
    color: "#FF6B6B",
    fontFamily: "MontserratRegular",
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: "#CCCCCC",
    fontFamily: "MontserratRegular",
    textAlign: "center",
    fontSize: 14,
  },
  loginLinkText: {
    color: "#8a2be2",
    fontFamily: "MontserratSemiBold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default Signup;
