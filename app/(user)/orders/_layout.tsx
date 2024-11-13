import { useColorScheme } from "@/components/useColorScheme";import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function OrdersStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Orders" }}/>
    </Stack>
  );
}
