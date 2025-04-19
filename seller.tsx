import axios, { AxiosError } from "axios";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

// Configure Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust based on your environment
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const SellerForm = () => {
  const [fontsLoaded] = useFonts({
    Montesserat: require("../assets/Fonts/Montserrat-VariableFont_wght.ttf"),
    MontesseratBold: require("../assets/Fonts/Montserrat-Bold.ttf"),
    MontesseratBlack: require("../assets/Fonts/Montserrat-Black.ttf"),
    MontesseratExtraBold: require("../assets/Fonts/Montserrat-ExtraBold.ttf"),
    MontesseratLight: require("../assets/Fonts/Montserrat-Light.ttf"),
    MontesseratMedium: require("../assets/Fonts/Montserrat-Medium.ttf"),
    MontesseratRegular: require("../assets/Fonts/Montserrat-Regular.ttf"),
    MontesseratSemiBold: require("../assets/Fonts/Montserrat-SemiBold.ttf"),
    MontesseratThin: require("../assets/Fonts/Montserrat-Thin.ttf"),
  });

  const [formData, setFormData] = useState({
    storeName: "",
    storeType: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const businessTypes = [
    { label: "Select Business Type", value: "" },
    { label: "Manufacturer", value: "manufacturer" },
    { label: "Wholesaler", value: "wholesaler" },
    { label: "Retailer", value: "retailer" },
    { label: "Online Seller", value: "online_seller" },
    { label: "Exporter", value: "exporter" },
    { label: "Importer", value: "importer" },
    { label: "Distributor", value: "distributor" },
  ];

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = useCallback(() => {
    if (!formData.storeName || formData.storeName.length < 2) {
      setError("Store name must be at least 2 characters");
      return false;
    }
    if (!formData.storeType) {
      setError("Please select a business type");
      return false;
    }
    if (!formData.phone || formData.phone.length !== 10) {
      setError("Phone must be 10 digits");
      return false;
    }
    if (!formData.address || formData.address.length < 5) {
      setError("Please enter a valid address");
      return false;
    }
    if (!formData.city || formData.city.length < 2) {
      setError("Please enter a valid city");
      return false;
    }
    if (!formData.state || formData.state.length < 2) {
      setError("Please enter a valid state");
      return false;
    }
    if (!formData.zip || formData.zip.length !== 6) {
      setError("ZIP code must be 6 digits");
      return false;
    }
    setError("");
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/seller/add", formData);

      console.log("Form submitted successfully:", response.data);
      Alert.alert("Success", "Seller information saved successfully!");
      router.replace("/purchase");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Submission error:", axiosError);

      if (axiosError.response) {
        // Server responded with error status
        const errorData = axiosError.response.data as { message?: string };
        setError(errorData?.message || "Submission failed");
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

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>SELLER INFORMATION</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Store Name"
          value={formData.storeName}
          onChangeText={(text) => handleChange("storeName", text)}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.storeType}
            onValueChange={(itemValue) => handleChange("storeType", itemValue)}
            style={styles.picker}
          >
            {businessTypes.map((type, index) => (
              <Picker.Item key={index} label={type.label} value={type.value} />
            ))}
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Phone (10 digits)"
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <TextInput
          style={styles.input}
          placeholder="Website (optional)"
          value={formData.website}
          onChangeText={(text) => handleChange("website", text)}
          keyboardType="url"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => handleChange("address", text)}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={formData.city}
          onChangeText={(text) => handleChange("city", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="State"
          value={formData.state}
          onChangeText={(text) => handleChange("state", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="ZIP Code (6 digits)"
          value={formData.zip}
          onChangeText={(text) => handleChange("zip", text)}
          keyboardType="numeric"
          maxLength={6}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description (optional)"
          value={formData.description}
          onChangeText={(text) => handleChange("description", text)}
          multiline
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>SUBMIT</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContainer: { padding: 20, paddingBottom: 40, flexGrow: 1 },
  heading: {
    fontSize: 28,
    color: "black",
    fontFamily: "MontesseratBold",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "MontesseratRegular",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "MontesseratRegular",
    letterSpacing: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "MontesseratRegular",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SellerForm;
