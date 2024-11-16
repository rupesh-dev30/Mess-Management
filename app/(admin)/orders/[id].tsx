import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderList from "@/components/application/OrderList";
import OrderItemList from "@/components/application/OrderItemList";
import Colors from "@/constants/Colors";
import { getOrderById, updateOrder } from "@/app/api/orders";

export default function OrderDetails() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = getOrderById(id);
  const { mutate: updateOrderStatus } = updateOrder();

  const updateStatus = (status: string) => {
    updateOrderStatus({ id, updatedFields: { status } });
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if(!order) {
    return <Text style={styles.notFoundText}>Order not found</Text>;
  }

  if (error) {
    return <Text>Error : Failed to fetched the detail of order</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemList item={item} />}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => <OrderList order={order} />}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <Text style={styles.statusTitle}>Status</Text>
            <View style={styles.statusContainer}>
              {["New", "Cooking", "Delivering", "Delivered"].map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={[
                    styles.statusButton,
                    order.status === status && styles.activeStatusButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      order.status === status && styles.activeStatusText,
                    ]}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  notFoundText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    gap: 20,
    paddingBottom: 20,
  },
  footerContainer: {
    marginTop: 20,
    padding: 10,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusButton: {
    borderColor: Colors.light.tint,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  activeStatusButton: {
    backgroundColor: Colors.light.tint,
  },
  statusText: {
    color: Colors.light.tint,
    fontSize: 14,
    fontWeight: "500",
  },
  activeStatusText: {
    color: "white",
  },
});
