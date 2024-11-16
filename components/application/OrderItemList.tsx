import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Tables } from "@/types/types";
import Colors, { defaultFoodImage } from "@/constants/Colors";
import RemoteImage from "./RemoteImage";

type OrderItemListItemProps = {
  item: Tables<"order_items"> & { products: Tables<"products"> };
};

const OrderItemList = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <RemoteImage
        path={item?.products?.image}
        fallback={defaultFoodImage}
        style={styles.image}
        resizeMode="contain"
      />
     <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.products.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>₹{item.products.price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b2babb',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#ebdef0',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 7,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  image: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#ebdef0',
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
  quantityContainer: {
    backgroundColor: '#ebdef0',
    borderRadius: 8,
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  quantity: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1a1a1a',
  },
  price: {
    color: Colors.light.tint,
    fontWeight: '600',
    fontSize: 15,
  },
});

export default OrderItemList;