import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getCategories } from "../api";
import CategoryCard from "./CategoryCard";
import { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;

