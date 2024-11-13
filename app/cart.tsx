import { View, Text, Platform, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "./providers/CartProvider";
import CartListItem from "@/components/application/CartList";
import Button from "@/components/application/Button";

export default function Cart() {
  const { items, total } = useCart();

  if (!items || items.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={[{ paddingBottom: 16 }, { gap: 10 }]}
      />
      <Text style={{fontSize: 20, fontWeight: "bold"}}>Total: &#8377;{total}</Text>
      <Button text="Checkout" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
