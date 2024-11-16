import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
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
    } catch (error: any) {
      // console.warn(error);
      Alert.alert(error);
    } finally {
      setSignOutLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome Dost!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Link href={"/(user)"} asChild>
            <Button text="User" />
          </Link>

          {/* @ts-ignore  */}
          <Link href={"/(admin)"} asChild>
            <Button text="Admin" />
          </Link>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <Button
            disabled={signOutLoading}
            onPress={signOut}
            text={signOutLoading ? "Signing Out" : "Sign out"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  dividerText: {
    color: "#666666",
    paddingHorizontal: 16,
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: "#ffffff",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
});
