import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Link, useSegments } from "expo-router";
import { Tables } from "@/types/types";
import RemoteImage from "./RemoteImage";
import { defaultFoodImage } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

interface ProductData {
  id: number;
  price: number;
  image: string | null;
  name: string;
}

interface Props {
  product: Tables<"products">;
}

export default function ProductList({ product }: Props) {
  const segments = useSegments();

  type Route = `/menu/${number}`;

  return (
    <Link href={`/menu/${product.id}` as Route} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product?.image}
          fallback={defaultFoodImage}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>4.2</Text>
              <AntDesign name="star" size={12} color="#FFC300" />
            </View>
            <Text style={styles.time}>30-35 min</Text>
          </View>
          <Text style={styles.price}>₹{product.price}</Text>
          <View style={styles.offerContainer}>
            <AntDesign name="tagso" size={16} color="#8A2BE2" />
            <Text style={styles.offerText}>50% off up to Rs.100</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#ebdef0",
    borderRadius: 12,
    overflow: "hidden",
    margin: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1C1C1C",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#48C479",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  rating: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  time: {
    fontSize: 13,
    color: "#686B78",
  },
  price: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
    marginBottom: 8,
  },
  offerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  offerText: {
    fontSize: 13,
    color: "#8A2BE2",
    fontWeight: "500",
  },
});
