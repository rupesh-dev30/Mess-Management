import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { getProductsList } from "@/app/api";
import ProductList from "@/components/application/ProductList";

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
      renderItem={({ item }) => <ProductList product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 5 }}
      columnWrapperStyle={{ gap: 5 }}
    />
  );
}

const styles = StyleSheet.create({});
