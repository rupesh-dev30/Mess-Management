import { FlatList, Image, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import Product from "@/components/application/ProductList";
import { dummyProduct } from "@/data/dummy";

export default function MenuScreen() {
  return (
    <FlatList
      data={dummyProduct}
      renderItem={({ item }) => <Product product={item} />}
      numColumns={2}
      contentContainerStyle={{gap: 5}}
      style={styles.flat}
    />
  );
}

const styles = StyleSheet.create({
  flat: {
    backgroundColor: "#fff",
  }
});
