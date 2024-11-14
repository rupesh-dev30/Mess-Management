import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderList from "@/components/application/OrderList";
import OrderItemList from "@/components/application/OrderItemList";
import { getOrderById } from "@/app/api/orders";
import { useUpdateOrderSubscription } from "@/app/api/orders/subscriptions";

export default function OrderDetails() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = getOrderById(id);

  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !order) {
    return <Text>Error : Failed to fetched the detail of order</Text>;
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
