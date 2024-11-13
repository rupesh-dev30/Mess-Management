import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

export default function index() {
  // @ts-ignore
  return <Redirect href={"/(admin)/menu/"} />;
}
