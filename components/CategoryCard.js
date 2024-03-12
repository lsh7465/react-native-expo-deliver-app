import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image source={{ uri: imgUrl }} className="w-24 h-24 rounded-lg" />
      <Text className="absolute top-0 w-full h-full pl-1 overflow-hidden font-bold text-white bg-gray-900/50">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

