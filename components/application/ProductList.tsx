import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

interface ProductData {
  id: number;
  price: number;
  image: object | undefined;
  name: string;
}

interface Props {
  product: ProductData;
}

export default function Product({ product }: Props) {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={product.image} style={styles.image} />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>Rs.{product.price}</Text>
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
