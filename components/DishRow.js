import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  clearBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../store/basketSlice";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items2 = useSelector((state) => state.basket.items);
  const items = items2.filter((item) => item.id === id);
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };

  const clearItemsFromBasket = () => {
    dispatch(clearBasket());
  };

  return (
    <>
      <View
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="mb-1 text-lg font-semibold">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="mt-2 text-gray-400">${price}</Text>

            <TouchableOpacity
              onPress={() => {
                addItemToBasket();
                setIsPressed(true);
              }}
              className="rounded-lg mt-2 bg-[#00CCBB]"
            >
              <Text className="px-4 py-3 font-bold text-center text-white">
                장바구니에 추가하기
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                clearItemsFromBasket();
                setIsPressed(false);
              }}
              className={`rounded-lg mt-2 border ${
                items.length > 0 ? "border-[#00CCBB]" : "border-gray-200"
              }`}
            >
              <Text
                className={`px-4 py-3 font-bold text-center ${
                  items.length > 0 ? "text-[#00CCBB]" : "text-gray-200"
                }`}
              >
                장바구니에서 모든 아이템 삭제하기
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="object-cover w-20 h-20 bg-gray-300"
              style={{ borderWidth: 1, borderColor: "#f3f3f4" }}
            />
          </View>
        </View>
      </View>
      {isPressed && (
        <View className="px-4 bg-white">
          <View className="flex-row items-center pb-3 space-x-2">
            <TouchableOpacity
              onPress={removeItemFromBasket}
              disabled={!items.length}
            >
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? "#00CCBB" : "gray"}
              />
            </TouchableOpacity>

            <Text className="text-lg font-semibold">{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color={"#00CCBB"} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;

const styles = StyleSheet.create({});
