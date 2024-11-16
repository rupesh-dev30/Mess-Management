import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, RelativePathString, useSegments } from "expo-router";
import { Tables } from "@/types/types";

type Status = "New" | "Cooking" | "Delivering" | "Delivered";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Tables<"orders">;
};

const OrderList = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  const getStatusColor = (status: Status) => {
    const statusColors = {
      New: "#0EA5E9", // Blue
      Cooking: "#F59E0B", // Orange
      Delivering: "#8B5CF6", // Purple
      Delivered: "#10B981", // Green
    };
    return statusColors[status];
  };

  const isValidStatus = (status: string): status is Status => {
    return ["New", "Cooking", "Delivering", "Delivered"].includes(status);
  };

  return (
    <Link href={`/${segments[0]}/orders/${order.id}` as RelativePathString} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.contentContainer, // Correct style reference
          pressed && styles.pressed, // Applied when pressed
        ]}
      >
        <View style={styles.contentContainer}>
          <View style={styles.leftContent}>
            <Text style={styles.title}>Order #{order.id}</Text>
            <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
          </View>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor: `${
                  isValidStatus(order.status)
                    ? getStatusColor(order.status)
                    : "#6B7280"
                }15`,
              },
            ]}
          >
            <Text
              style={[
                styles.status,
                {
                  color: isValidStatus(order.status)
                    ? getStatusColor(order.status)
                    : "#6B7280",
                },
              ]}
            >
              {order.status}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1, // Added border width
    borderColor: "#E5E7EB", // Light gray border color
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  leftContent: {
    flex: 1,
    marginRight: 12,
    paddingBottom: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: "#6B7280",
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default OrderList;
