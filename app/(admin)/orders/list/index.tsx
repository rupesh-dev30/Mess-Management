import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import OrderList from "@/components/application/OrderList";
import { getAdminOrderList } from "@/app/api/orders";
import { useCreateOrderSubscription } from "@/app/api/orders/subscriptions";

export default function OrderScreen() {
  const {
    data: orders,
    error,
    isLoading,
  } = getAdminOrderList({ archived: false });

  useCreateOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch the order</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderList order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
