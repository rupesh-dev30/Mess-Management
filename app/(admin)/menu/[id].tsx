import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "@/app/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors, { defaultFoodImage } from "@/constants/Colors";
import { getProductById } from "@/app/api/products";
import RemoteImage from "@/components/application/RemoteImage";

export default function ProductDetails() {
  const { id: idString } = useLocalSearchParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = getProductById(id);

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

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.light.tint} />;
  }

  if (error) {
    return <Text>Error: Failed to fetch product data</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage
        path={product?.image}
        fallback={defaultFoodImage}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <Text style={styles.description}>Savor the delicious taste of our freshly prepared dish, made with high-quality ingredients to bring you a perfect blend of flavors. Ideal for any time of day, this meal will leave you satisfied and craving for more.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    color: "red",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 15,
    lineHeight: 22,
    marginBottom: 30, // Adds spacing before the next section
  },
});
