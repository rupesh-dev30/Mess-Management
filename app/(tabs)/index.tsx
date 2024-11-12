import { Image, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { dummyProduct } from "@/data/dummy";

const dummy = dummyProduct[1];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={dummy.image} style={styles.image} />
      <Text style={styles.title}>{dummy.name}</Text>
      <Text style={styles.price}>Rs.{dummy.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "red",
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
    borderRadius: 10,
  },
});
