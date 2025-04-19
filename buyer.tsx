import axios from "axios";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import ModalSelector from "react-native-modal-selector";

interface FormData {
  type: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface BusinessType {
  key: number;
  label: string;
  value: string;
}

function Buyer() {
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

  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    type: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const businessTypes: BusinessType[] = [
    { key: 0, label: "FootWear", value: "FootWear" },
    { key: 1, label: "Bags", value: "Bags" },
    {
      key: 2,
      label: "Wallets And Accessories",
      value: "Wallets And Accessories",
    },
    { key: 3, label: "Apparel", value: "Apparel" },
    {
      key: 4,
      label: "Office And Travel Gear",
      value: "Office And Travel Gear",
    },
    { key: 5, label: "Home Decor", value: "Home Decor" },
    { key: 6, label: "Custom Products", value: "Custom Products" },
  ];

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting data:", formData);

      if (!formData.type) {
        console.warn("Please select a product type");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8080/api/buyer/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      router.push("/Products");

      // Reset form after successful submission
      setFormData({
        type: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading fonts...</Text>
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
        <Text style={styles.heading}>BUYER INFORMATION</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
          keyboardType="phone-pad"
        />
        {/* 
        <ModalSelector
          data={businessTypes}
          onChange={(option) => {
            if (option?.value) {
              handleChange("type", option.value);
            }
          }}
          style={styles.modalSelector}
          initValue="Select Product Type"
          selectedKey={
            businessTypes.find((item) => item.value === formData.type)?.key
          }
        >
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Product Type"
            value={
              businessTypes.find((item) => item.value === formData.type)
                ?.label || ""
            }
          />
        </ModalSelector> */}

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
          placeholder="ZIP Code"
          value={formData.zip}
          onChangeText={(text) => handleChange("zip", text)}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, !formData.type && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!formData.type}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
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
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  modalSelector: {
    marginBottom: 15,
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
});

export default Buyer;
