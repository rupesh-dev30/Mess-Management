import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/components/application/Button";
import { useCart } from "@/app/providers/CartProvider";
import { getProductById } from "@/app/api/products";
import RemoteImage from "@/components/application/RemoteImage";
import { defaultFoodImage } from "@/constants/Colors";

export default function ProductDetails() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = getProductById(id);
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
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#ffffff" },
        }}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <RemoteImage
          path={product?.image}
          fallback={defaultFoodImage}
          style={styles.image}
        />

        <View style={styles.detailsContainer}>
          <View style={styles.headerSection}>
            <Text style={styles.name}>{product.name}</Text>
            <View style={styles.priceCard}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
              <Text style={styles.taxInfo}>Inclusive of all taxes</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              "Experience premium quality with our signature product. Made with
              the finest materials and expert craftsmanship, this item combines
              style, durability, and functionality. Perfect for everyday use and
              designed to exceed your expectations."
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.cartButtonContainer}>
          <Button
            onPress={addToCart}
            text="Add to cart"
            style={styles.addToCartButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  priceCard: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#007AFF",
  },
  taxInfo: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    paddingBottom: 20,
    lineHeight: 22,
    color: "#444",
  },
  disabledButton: {
    backgroundColor: "#f8f8f8",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: "center",
  },
  totalPriceContainer: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 80,
  },
  totalPriceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  footer: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  cartButtonContainer: {
    padding: 16,
  },
  addToCartButton: {
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
