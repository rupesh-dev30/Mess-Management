import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>ProductDetails {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
