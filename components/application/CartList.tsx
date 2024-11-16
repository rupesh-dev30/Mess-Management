import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { CartItem } from "@/types/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors, { defaultFoodImage } from "@/constants/Colors";
import { useCart } from "@/app/providers/CartProvider";
import RemoteImage from "./RemoteImage";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();

  return (
    <View style={styles.container}>
      <RemoteImage
        path={cartItem?.product?.image}
        fallback={defaultFoodImage}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            &#8377;{cartItem.product.price.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => {
            updateQuantity(cartItem.id, -1);
          }}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />
        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => {
            updateQuantity(cartItem.id, 1);
          }}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebdef0',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  image: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "#ebdef0",
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  quantity: {
    fontWeight: '600',
    fontSize: 16,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  price: {
    color: "black",
    fontWeight: '600',
    fontSize: 15,
  },
});

export default CartListItem;
