import { View, Text } from "react-native";
import React, { useState } from "react";
import Button from "@/components/application/Button";
import { supabase } from "@/lib/supabase";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signOutFn = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      router.replace("/(auth)/sign-in");
    }
  };

  return (
    <View>
      <Button text="Sign out" onPress={signOutFn} />
    </View>
  );
}
