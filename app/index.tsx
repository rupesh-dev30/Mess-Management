import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Link, Redirect } from "expo-router";
import Button from "@/components/application/Button";
import { useAuth } from "./providers/AuthProvider";
import { supabase } from "@/lib/supabase";

export default function index() {
  const { session, loading, isAdmin } = useAuth();
  const [signOutLoading, setSignOutLoading] = useState(false);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)"} />;
  }

  async function signOut() {
    setSignOutLoading(true);
    try {
      await supabase.auth.signOut();
      setSignOutLoading(false);
    } catch (error) {
      console.warn(error);
    } finally {
      setSignOutLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      {/* @ts-ignore  */}
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>

      {/* @ts-ignore  */}
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Button
        disabled={signOutLoading}
        onPress={signOut}
        text={signOutLoading ? "Signing Out" : "Sign out"}
      />
    </View>
  );
}
