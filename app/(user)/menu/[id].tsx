import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/components/application/Button";
import { useCart } from "@/app/providers/CartProvider";
import { gerProductById, getProductsList } from "@/app/api";

export default function ProductDetails() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = gerProductById(id);
  const router = useRouter();
  const { addItem } = useCart();

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product);
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: Failed to fetch products data</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.price}>Price : ₹{product.price}</Text>

      <View style={styles.cartButtonContainer}>
        <Button onPress={addToCart} text="Add to cart" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  quantityButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  totalPriceContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  totalPriceLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 22,
    color: "#007bff",
    fontWeight: "bold",
    marginTop: 5,
  },
  cartButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    padding: 10,
  },
});
