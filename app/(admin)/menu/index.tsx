import { FlatList, StyleSheet } from "react-native";
import Product from "@/components/application/ProductList";
import { dummyProduct } from "@/data/dummy";

export default function MenuScreen() {
  return (
    <FlatList
      data={dummyProduct}
      renderItem={({ item }) => <Product product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 5 }}
      columnWrapperStyle={{gap: 5}}
    />
  );
}

const styles = StyleSheet.create({});
