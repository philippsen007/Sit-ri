import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

type Food = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function Home() {
  const router = useRouter();
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    fetch("https://apifakedelivery.vercel.app/foods")
      .then((response) => response.json())
      .then((data) => setFoods(data))
      .catch((error) => console.error(error));
  }, []);

  const featuredFood = foods.length > 0 ? foods[0] : null;
  const remainingFoods = foods.slice(1);

  return (
    <View className="flex-1 bg-gray-10 font-philosopher">
      <View className="flex-row items-center justify-between px-4 py-6">
        <View>
          <Text className="text-gray-30 font-regular text-lg">
            Olá, User.
          </Text>
          <Text className="text-gray-30 font-bold text-2xl">
            Menu de ofertas para você
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Image
            source={{ uri: "https://thumbs.dreamstime.com/b/homem-cinzento-do-placeholder-da-foto-pessoa-132818487.jpg" }}
            className="w-12 h-12 rounded-full"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row px-4 h-12 space-x-4 mb-4"
      >
        <Text className="px-4 py-2 mr-4 self-center bg-gray-30 rounded-full text-gray-10">
          Pratos
        </Text>
        <Text className="px-4 py-2 mr-4 self-center bg-gray-30 rounded-full text-gray-10">
          Sobremesas
        </Text>
        <Text className="px-4 py-2 mr-4 self-center bg-gray-30 rounded-full text-gray-10">
          Surpreenda-me
        </Text>
      </ScrollView>



      <ScrollView className="px-4">
        <Text className="text-gray-30 font-bold text-xl mt-2 mb-2">
          Destaque do dia
        </Text>
        {featuredFood && (
          <TouchableOpacity
            onPress={() => router.push(`/FoodDetail?id=${featuredFood.id}`)}
            className="mb-6"
          >
            <View className="bg-gray-30 rounded-lg p-4">
              <Image
                source={{ uri: featuredFood.image }}
                className="w-full h-56 rounded-lg"
              />
              <Text className="text-gray-10 font-bold text-xl mt-2">
                {featuredFood.name}
              </Text>
              <Text className="text-gray-10 font-medium text-lg">
                R$ {featuredFood.price}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <Text className="text-gray-30 font-bold text-xl mt-2 mb-2">
          Recomendado
        </Text>
        <View className="flex flex-wrap flex-row -mx-2">
          {remainingFoods.map((food) => (
            <TouchableOpacity
              key={food.id}
              onPress={() => router.push(`/FoodDetail?id=${food.id}`)}
              className="w-1/2 px-2 mb-4"
            >
              <View className="bg-gray-30 rounded-lg p-4">
                <Image
                  source={{ uri: food.image }}
                  className="w-full h-40 rounded-lg"
                />
                <Text className="text-gray-10 font-medium text-lg mt-2">
                  {food.name}
                </Text>
                <Text className="text-gray-10 text-sm">R$ {food.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row bg-gray-30 rounded-t-3xl items-center justify-between px-4 py-0 h-16">
        <TouchableOpacity onPress={() => router.push("/Home")}>
          <Feather name="home" size={24} color="#FFFFFF" /> 
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="search" size={24} color="#A69989" /> 
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/CartScreen")}
          className="bg-orange-10 mb-6 p-10 h-2 w-2 rounded-full flex justify-center items-center"
        >
          <Feather name="shopping-cart" className="absolute" size={32} color="#A69989" /> 
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="heart" size={24} color="#A69989" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="bell" size={24} color="#A69989" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
