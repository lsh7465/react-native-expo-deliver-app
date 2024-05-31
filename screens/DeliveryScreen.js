import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  PhoneArrowUpRightIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../store/restaurantSlice";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row items-center justify-between p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color={`white`} size={30} />
          </TouchableOpacity>
          <Text className="text-lg font-light text-white">도움 받기</Text>
        </View>

        <View className="z-50 p-6 mx-5 my-2 bg-white rounded-lg shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">예상 도착 시간</Text>
              <Text className="text-3xl font-bold">45-55분</Text>
            </View>
            <Image
              source={require("../assets/images/no-profile-picture.png")}
              className="w-20 h-20"
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            {restaurant.title}에서 주문하신 음식을 준비 중입니다.
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        className="z-20 flex-1 -mt-10"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>

      <SafeAreaView className="flex-row items-center space-x-5 bg-white h-28">
        <Image
          source={require("../assets/images/no-profile-picture.png")}
          className="w-12 h-12 p-4 ml-5 bg-gray-300 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-lg">홍길동</Text>
          <Text className="text-gray-400">배달원</Text>
        </View>
        <TouchableOpacity className="flex-row items-center border border-[#00CCBB] mr-5 px-4 py-2 rounded-lg">
          <PhoneArrowUpRightIcon color={`#00CCBB`} size={25} />
          <Text className="text-[#00CCBB] text-sm font-bold ml-2">
            전화하기
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
