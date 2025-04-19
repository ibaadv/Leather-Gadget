import { useRouter } from "expo-router";
import { Button, Text, View, StyleSheet } from "react-native";

export default function menu() {
  const router = useRouter();

  function naviagtetoCreate() {
    router.replace("/seller");
  }
  return (
    <View>
      <Text>Hello world</Text>
      <View style={styles.add}>
        <Button title="+" onPress={naviagtetoCreate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#3D90D7",
    justifyContent: "center",
    alignItems: "center",
  },
});
