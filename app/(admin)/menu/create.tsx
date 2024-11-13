import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/components/application/Button";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

export default function create() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(
    "https://cdn-icons-png.flaticon.com/512/1598/1598638.png"
  );

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [12, 10],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const reset = () => {
    setName("");
    setPrice("");
    setError("");
  };

  const validateInput = () => {
    setError("");
    if (!name) {
      setError("Name is required");
      return false;
    }
    if (!price) {
      setError("Price is required");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      // Update existing item
      onUpdateCreate();
    } else {
      onCreate();
    }
  };

  const onUpdateCreate = () => {
    if (!validateInput()) {
      return;
    }

    console.warn("Updating Product", name);

    reset();
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    reset();
  };

  const onDelete = () => {
    console.warn("DELETE");
  }

  const confirmDelete = () => {
    Alert.alert("Confirm","Are you sure you want to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      {/* @ts-ignore */}
      <Image source={{ uri: image }} style={styles.image} />
      <Text onPress={pickImage} style={styles.selectImageButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        placeholder="&#8377;"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Text style={{ color: "red", paddingTop: 10 }}>{error}</Text>
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating ? <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text> : ""}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "gray",
    fontSize: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    marginTop: 2,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
    aspectRatio: 1,
    alignSelf: "center",
  },
  selectImageButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  textButton: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginTop: 5
  }
});
