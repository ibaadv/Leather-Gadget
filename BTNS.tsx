import { View, Text, StyleSheet, Pressable } from "react-native";

interface BTNSProps {
  children: string;
  onPress: () => void;
}

export default function BTNS({ children, onPress }: BTNSProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 13,
    paddingHorizontal: 140,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#005BB5",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "MontesseratMedium",
    fontWeight: "bold",
  },
});
