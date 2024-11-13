import { View, Text, FlatList } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/data/orders";
import OrderList from "@/components/application/OrderList";
import OrderItemList from "@/components/application/OrderItemList";

export default function OrderDetails() {
  const { id } = useLocalSearchParams();

  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <Text>Order not found</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      {/* <OrderList order={order} /> */}
      {/* use ListHeaderComponent below */}

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemList item={item} />}
        contentContainerStyle={{ gap: 20 }}
        ListHeaderComponent={() => <OrderList order={order} />}
      />
    </View>
  );
}
