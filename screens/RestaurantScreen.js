import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../store/restaurantSlice";
import BasketIcon from "../components/BasketIcon";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import { MapIcon } from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";

const RestaurantScreen = () => {
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      shortDescription,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description: shortDescription,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  return (
    <>
      <BasketIcon />

      <ScrollView>
        <StatusBar hidden />
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 p-4 bg-gray-300"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute p-2 bg-gray-100 rounded-full top-5 left-5"
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>

          <View className="bg-white">
            <View className="px-4 pt-4">
              <Text className="text-3xl font-bold">{title}</Text>
              <View className="flex-row my-1 space-x-2">
                <View className="flex-row items-center space-x-1">
                  <StarIcon color="green" opacity={0.5} size={22} />
                  <Text className="text-xs text-gray-500">
                    <Text className="text-green-500">{rating}</Text>
                    {genre}
                  </Text>
                </View>
                <View className="flex-row items-center space-x-1">
                  <MapIcon color="gray" opacity={0.4} size={22} />
                  <Text className="text-xs">Nearby {address}</Text>
                </View>
              </View>
              <Text className="pb-4 mt-2 text-gray-500">
                {shortDescription}
              </Text>
            </View>
            <TouchableOpacity className="flex-row items-center p-4 space-x-2 border-gray-300 border-y">
              <QuestionMarkCircleIcon size={20} color="gray" opacity={0.6} />
              <Text className="flex-1 pl-2 font-bold text-md">
                음식 알레르기가 있나요?
              </Text>
              <ChevronRightIcon color="#00CCBB" />
            </TouchableOpacity>
          </View>

          <View className="pb-36">
            <Text className="px-4 py-3 text-xl font-bold">Menu</Text>
            {dishes?.map((dish) => (
              <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                price={dish.price}
                image={dish.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({});
