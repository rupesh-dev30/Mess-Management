import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Link, useSegments } from "expo-router";
import { Tables } from "@/types/types";
import RemoteImage from "./RemoteImage";
import { defaultFoodImage } from "@/constants/Colors";

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

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product?.image}
          fallback={defaultFoodImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    color: "red",
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
