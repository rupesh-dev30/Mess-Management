import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import Product from "@/components/application/ProductList";
import { getProductsList } from "@/app/api";

export default function MenuScreen() {
  const { data: products, error, isLoading } = getProductsList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: Failed to fetch products data</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <Product product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 5 }}
      columnWrapperStyle={{ gap: 5 }}
    />
  );
}

const styles = StyleSheet.create({});
