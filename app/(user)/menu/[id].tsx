import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { dummyProduct } from "@/data/dummy";
import Button from "@/components/application/Button";
import { useCart } from "@/app/providers/CartProvider";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = dummyProduct.find((item) => item.id.toString() === id);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product);
    router.push('/cart')
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  // const totalPrice = product.price * quantity;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={product.image} style={styles.image} />
      <Text style={styles.price}>Price : ₹{product.price}</Text>

      {/* <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={decreaseQuantity}
          disabled={quantity <= 1}
          style={[
            styles.quantityButton,
            quantity <= 1 && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{quantity}</Text>

        <TouchableOpacity
          onPress={increaseQuantity}
          style={styles.quantityButton}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceLabel}>Total Price:</Text>
        <Text style={styles.totalPrice}>₹{totalPrice}</Text>
      </View> */}

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
