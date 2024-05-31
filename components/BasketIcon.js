import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation, useNavigationBuilder } from "@react-navigation/native";
import { selectBasketItems, selectBasketTotal } from "../store/basketSlice";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className="absolute z-50 w-full bottom-5">
      <TouchableOpacity
        className="bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1"
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 rounded-lg">
          {items.length}
        </Text>
        <Text className="flex-1 text-lg font-extrabold text-center text-white">
          장바구니 보기
        </Text>
        <Text className="text-lg font-extrabold text-white">
          ${basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;

const styles = StyleSheet.create({});
