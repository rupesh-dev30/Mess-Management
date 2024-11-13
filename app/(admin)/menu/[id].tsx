import { TouchableOpacity, Image, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { dummyProduct } from "@/data/dummy";
import Button from "@/components/application/Button";
import { useCart } from "@/app/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

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
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  // const totalPrice = product.price * quantity;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            // @ts-ignore
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product.name }} />
      <Image source={product.image} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>Price : ₹{product.price}</Text>
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
    textAlign: "center",
    color: "red",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },
});
