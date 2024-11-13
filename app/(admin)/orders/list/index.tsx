import { View, Text, FlatList } from "react-native";
import React from "react";
import orders from "@/data/orders";
import OrderList from "@/components/application/OrderList";

export default function OrderScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderList order={item} />}
      contentContainerStyle={{gap: 10, padding: 10}}
    />
  );
}
