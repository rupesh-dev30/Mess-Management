import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Button from "@/components/application/Button";

export default function index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>

      {/* @ts-ignore  */}
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  );
}
