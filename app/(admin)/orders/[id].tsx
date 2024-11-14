import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderList from "@/components/application/OrderList";
import OrderItemList from "@/components/application/OrderItemList";
import Colors from "@/constants/Colors";
import { getOrderById } from "@/app/api/orders";

export default function OrderDetails() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = getOrderById(id);

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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {["New", "Cooking", "Delivering", "Delivered"].map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
}
