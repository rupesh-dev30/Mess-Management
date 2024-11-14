import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import OrderList from "@/components/application/OrderList";
import { getUserOrderList } from "@/app/api/orders";

export default function OrderScreen() {
  const {data: orders, isLoading, error} = getUserOrderList();

  if(isLoading) {
    return <ActivityIndicator />
  }

  if(error) {
    return <Text>Error: Order not fetched</Text>
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderList order={item} />}
      contentContainerStyle={{gap: 10, padding: 10}}
    />
  );
}
