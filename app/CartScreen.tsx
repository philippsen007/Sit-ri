import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const router = useRouter();
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState<number[]>([]); 
  const [loading, setLoading] = useState(true);
  const deliveryFee = 5.00;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("https://apifakedelivery.vercel.app/foods");
        const data = await response.json();
        setFoods(data.slice(0, 3));
        setQuantities(data.slice(0, 3).map(() => 1));
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar comidas:", error);
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleQuantityChange = (index: number, increment: boolean) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.max(1, newQuantities[index] + (increment ? 1 : -1));
      return newQuantities;
    });
  };

  const subtotal = foods.reduce((sum, item, index) => sum + item.price * quantities[index], 0);
  const total = subtotal + deliveryFee;

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-30">
        <ActivityIndicator size="large" color="#59483E" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-30">
      <View className="flex-1 px-4 py-6">
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.push("/Home")} className="p-2">
            <Feather name="arrow-left" size={24} color="#59483E" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/Profile")}>
            <Image
              source={{ uri: "https://thumbs.dreamstime.com/b/homem-cinzento-do-placeholder-da-foto-pessoa-132818487.jpg" }}
              className="w-10 h-10 rounded-full"
            />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 mb-4">
          {foods.map((food, index) => (
            <View key={food.id} className="flex-row items-center mb-4 p-4 bg-gray-10 rounded-xl shadow">
              <Image
                source={{ uri: food.image }}
                className="w-20 h-20 rounded-lg mr-4"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-30">{food.name}</Text>
                <Text className="text-sm text-gray-30">{food.description}</Text>
                <Text className="text-lg font-bold text-orange-10">R$ {food.price.toFixed(2)}</Text>
              </View>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => handleQuantityChange(index, false)}
                  className="bg-gray-30 p-2 rounded-2xl"
                >
                  <Feather name="minus" size={20} color="#59483E" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold mx-2 text-gray-30">{quantities[index]}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(index, true)}
                  className="bg-gray-30 p-2 rounded-2xl"
                >
                  <Feather name="plus" size={20} color="#59483E" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>


      </View>
      <View className="p-4 bg-gray-10 rounded-t-3xl shadow">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-30">Subtotal</Text>
          <Text className="text-gray-30">R$ {subtotal.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-30">Entrega</Text>
          <Text className="text-gray-30">R$ {deliveryFee.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg font-bold text-gray-30">Total</Text>
          <Text className="text-lg font-bold text-gray-30">R$ {total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          className="bg-orange-10 py-3 rounded-lg items-center mb-4 shadow-lg shadow-orange-10/100"
          onPress={() => router.push("/ConfirmOrderScreen")}
        >
          <Text className="text-white text-lg font-semibold">ACERTO</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row bg-gray-10 items-center justify-between px-4 py-0 h-16">
        <TouchableOpacity onPress={() => router.push("/Home")}>
          <Feather name="home" size={24} color="#A69989" /> 
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="search" size={24} color="#A69989" /> 
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-orange-10 mb-6 p-10 h-2 w-2 rounded-full flex justify-center items-center shadow-lg shadow-orange-10/100"
        >
          <Feather name="shopping-cart" className="absolute" size={32} color="#FFFFFF" /> 
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
