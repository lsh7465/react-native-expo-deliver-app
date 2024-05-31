import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../store/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../store/basketSlice";
import { XCircleIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">장바구니</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="absolute bg-gray-100 rounded-full top-3 right-5">
          <XCircleIcon color={"#00CCBB"} height={50} width={50} />
        </TouchableOpacity>

        <View className="flex-row items-center px-4 py-3 my-5 space-x-4 bg-white">
          <Image
            source={require("../assets/images/no-profile-picture.png")}
            className="p-4 bg-gray-300 rounded-full h-7 w-7"
          />
          <Text>배송 시간 50-75분</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">변경</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center px-5 py-2 space-x-3 bg-white"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="w-12 h-12 rounded-full"
              />
              <Text className="flex-1 font-semibold">{items[0]?.name}</Text>
              <Text className="font-bold text-gray-600">
                ${items[0]?.price}
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  삭제
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 mt-5 space-y-4 bg-white">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">금액</Text>
            <Text className="text-gray-400">${basketTotal}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">배송 비용</Text>
            <Text className="text-gray-400">$ 5.7</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>총 금액</Text>
            <Text className="font-extrabold">$ {basketTotal + 5.7}</Text>
          </View>
        </View>

        <TouchableOpacity
          className="rounded-lg bg-[#00CCBB] p-4"
          onPress={() => navigation.navigate("PreparingOrder")}
        >
          <Text className="text-lg font-bold text-center text-white">
            주문하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({});
