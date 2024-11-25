import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";

type Food = {
  id: number;
  name: string;
  description: string;
  price: number;
  delivery_time: number;
  rating: string;
  image: string;
  time: string;
};

export default function FoodDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [food, setFood] = useState<Food | null>(null);

  useEffect(() => {
    fetch(`https://apifakedelivery.vercel.app/foods/${id}`)
      .then((response) => response.json())
      .then((data: Food) => setFood(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!food) {
    return (
      <View className="flex-1 bg-gray-10 justify-center items-center">
        <Text className="text-gray-30 font-bold text-lg">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-10">
      <View className="flex-1 px-4 py-6">
        <View className="flex-row justify-between items-center mb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#A69989" /> 
          </TouchableOpacity>
          <Image
            source={require('../assets/images/logositari.png')}
            className="w-20 h-8"
          />
          <TouchableOpacity>
            <Feather name="heart" size={24} color="#A69989" /> 
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="font-bold text-2xl text-gray-30 mt-4">{food.name}</Text>
          <Text className="text-gray-30 text-lg mt-2">{food.description}</Text>

          <Text className="font-medium text-orange-10 text-lg mt-4">Ingredientes</Text>
          <View className="flex-row  mt-2">
            <Text className="px-4 py-2 mr-2 bg-gray-30 rounded-full text-gray-10">Bife</Text>
            <Text className="px-4 py-2 mr-2 bg-gray-30 rounded-full text-gray-10">Pomodori</Text>
            <Text className="px-4 py-2 mr-2 bg-gray-30 rounded-full text-gray-10">Pimenta</Text>
          </View>

          <View className="flex-row justify-between items-start mt-6">
            <View>
              <Text className="font-medium text-gray-30">Rating</Text>
              <Text className="font-bold text-lg text-gray-30">{food.rating} <Feather name="star" size={16} color="#A69989" /></Text>
            </View>
            <View>
              <Text className="font-medium text-gray-30">Valor</Text>
              <Text className="font-bold text-lg text-gray-30">R$ {food.price}</Text>
            </View>
            <View>
              <Text className="font-medium text-gray-30">Delivery em</Text>
              <Text className="font-bold text-lg text-gray-30">{food.time}</Text>
            </View>
          </View>

          <Image
            source={{ uri: food.image }}
            className="w-full h-64 rounded-lg mt-6"
            resizeMode="cover"
          />

          <View className="flex-row items-center justify-between mt-6">
            <View className="flex-row items-center bg-gray-30 px-1 py-2 rounded-full space-x-4">
              <TouchableOpacity className="bg-gray-30 px-4 py-2 rounded-full">
                <Feather name="minus" size={16} color="#A69989" /> 
              </TouchableOpacity>
              <Text className="font-bold text-lg text-gray-10">1</Text>
              <TouchableOpacity className="bg-gray-30 px-4 py-2 rounded-full">
                <Feather name="plus" size={16} color="#A69989" /> 
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="bg-orange-10 px-6 py-3 rounded-full">
              <Text className="font-bold text-gray-10">Adicionar ao carrinho</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
      <View className="flex-row bg-gray-30 rounded-t-3xl items-center justify-between px-4 py-0 h-16 w-full">
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
