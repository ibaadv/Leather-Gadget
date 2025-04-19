import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Button,
  Alert,
} from "react-native";
// import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
// import RNUpiPayment from "react-native-upi-payment";
// import RazorpayCheckout from "react-native-razorpay";

// Define interface for plan objects
interface Plan {
  title: string;
  price: string;
  amount: string;
  features: string[];
  colors: [string, string];
}

const { width } = Dimensions.get("window");

const plans: Plan[] = [
  {
    title: "30 Days Trial",
    price: "₹0",
    amount: "0.00",
    features: [
      "Add up to 2 products",
      "Basic visibility",
      "Limited support",
      "Standard layout",
      "Trial badge shown",
    ],
    colors: ["#83a4d4", "#b6fbff"],
  },
  {
    title: "Monthly Plan",
    price: "₹100",
    amount: "100.00",
    features: [
      "Add up to 25 products",
      "Enhanced visibility",
      "Priority support",
      "Analytics access",
      "Verified badge",
    ],
    colors: ["#f7971e", "#ffd200"],
  },
  {
    title: "Yearly Plan",
    price: "₹1200",
    amount: "1200.00",
    features: [
      "Unlimited products",
      "Top tier visibility",
      "24/7 support",
      "Advanced analytics",
      "Premium badge",
    ],
    colors: ["#43cea2", "#185a9d"],
  },
];

export default function Purchase() {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  // Android: UPI payment with react-native-upi-payment
  // const initiateAndroidPayment = (plan: Plan) => {
  //   if (plan.amount === "0.00") {
  //     Alert.alert("Info", "Trial plan does not require payment.");
  //     return;
  //   }

  //   if (!RNUpiPayment || !RNUpiPayment.initializePayment) {
  //     setStatus("ERROR");
  //     setMessage("UPI payment module is not available.");
  //     Alert.alert(
  //       "Error",
  //       "Payment module failed to load. Please try again later."
  //     );
  //     return;
  //   }

  //   try {
  //     RNUpiPayment.initializePayment(
  //       {
  //         vpa: "test@ybl", // Replace with a valid UPI ID
  //         payeeName: "Your Business Name",
  //         amount: plan.amount,
  //         transactionRef: `txn-${Date.now()}-${plan.title}`,
  //         transactionNote: `Payment for ${plan.title}`,
  //       },
  //       (data: { Status?: string; txnId?: string }) => {
  //         console.log("Success:", data);
  //         setStatus(data.Status || "SUCCESS");
  //         setMessage("Payment successful!");
  //         Alert.alert("Success", `Transaction ID: ${data.txnId || "N/A"}`);
  //       },
  //       (data: { Status?: string; status?: string; message?: string }) => {
  //         console.log("Failure:", data);
  //         setStatus(data.Status || data.status || "FAILURE");
  //         setMessage(data.message || "Payment failed or was cancelled.");
  //         Alert.alert(
  //           "Failure",
  //           data.message || "Payment failed. Please try again."
  //         );
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error initiating UPI payment:", error);
  //     setStatus("ERROR");
  //     setMessage("Failed to initiate payment.");
  //     Alert.alert("Error", "Unable to initiate payment. Please try again.");
  //   }
  // };

  // // iOS: Razorpay payment
  // const initiateIosPayment = async (plan: Plan) => {
  //   if (plan.amount === "0.00") {
  //     Alert.alert("Info", "Trial plan does not require payment.");
  //     return;
  //   }

  //   //   try {
  //   //     const options = {
  //   //       description: `Payment for ${plan.title}`,
  //   //       image: "https://your-logo-url.png", // Replace with your logo URL
  //   //       currency: "INR",
  //   //       key: "rzp_test_xxxxxxxxxxxx", // Replace with your Razorpay key
  //   //       amount: (parseFloat(plan.amount) * 100).toString(), // Convert to paise
  //   //       name: "Your Business Name",
  //   //       prefill: {
  //   //         email: "user@example.com",
  //   //         contact: "1234567890",
  //   //       },
  //   //       theme: { color: "#F37254" },
  //   //     };

  //   //     // const data = await RazorpayCheckout.open(options);
  //   //     setStatus("SUCCESS");
  //   //     setMessage("Payment successful!");
  //   //     Alert.alert("Success", `Payment ID: ${data.razorpay_payment_id}`);
  //   //   } catch (error: any) {
  //   //     console.error("Error initiating Razorpay payment:", error);
  //   //     setStatus("ERROR");
  //   //     setMessage(error.description || "Payment failed.");
  //   //     Alert.alert(
  //   //       "Error",
  //   //       error.description || "Payment failed. Please try again."
  //   //     );
  //   //   }
  //   // };

  //   // Unified payment handler
  //   const initiatePayment = (plan: Plan) => {
  //     if (Platform.OS === "android") {
  //       initiateAndroidPayment(plan);
  //     } else {
  //       initiateIosPayment(plan);
  //     }
  //   };

  const renderItem = ({ item }: { item: Plan }) => (
    <LinearGradient
      colors={item.colors}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <View style={styles.features}>
        {item.features.map((feature, index) => (
          <Text style={styles.feature} key={index}>
            • {feature}
          </Text>
        ))}
      </View>
      <View style={styles.button}>
        <Button
          title="PURCHASE"
          color={"white"}
          // onPress={() => initiatePayment(item)}
        />
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Your Plan</Text>
      {/* <Carousel
        loop
        width={width}
        height={420}
        autoPlay={false}
        data={plans}
        scrollAnimationDuration={800}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      /> */}
      {status ? (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Status: {status}</Text>
          <Text style={styles.statusText}>Message: {message}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    alignItems: "center",
  },
  header: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    height: 380,
    justifyContent: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  features: {
    marginTop: 10,
  },
  feature: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 4,
    textAlign: "center",
  },
  button: {
    backgroundColor: "transparent",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 10,
    marginTop: 20,
  },
  statusContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 4,
  },
});
