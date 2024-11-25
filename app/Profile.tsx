import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function Profile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-10 px-4 pt-8">
      <View className="items-start">
        <TouchableOpacity onPress={() => router.push("/Home")}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" /> 
        </TouchableOpacity>
      </View>

      <View className="items-center mb-6">
        <Image
          source={{ uri: "https://thumbs.dreamstime.com/b/homem-cinzento-do-placeholder-da-foto-pessoa-132818487.jpg" }} 
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className="color-gray-30 font-bold text-lg">USERNAME</Text>
      </View>

      <View className="bg-gray-30 rounded-lg p-4 flex-row justify-between items-center mb-6">
        <View className="flex-row items-center">
          <Feather name="credit-card" size={24} color="#5C4635" />
          <Text className="ml-3 text-gray-10">Saldo depositado</Text>
        </View>
        <Text className="text-gray-10 font-bold">R$ 50,00</Text>
      </View>

      <Text className="text-gray-30 mb-4">Extras</Text>
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity className="bg-gray-30 rounded-lg p-4 items-center w-[30%]">
          <Feather name="gift" size={24} color="c" /> 
          <Text className="text-gray-10 mt-2 text-sm">Cupons</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-gray-30 rounded-lg p-4 items-center w-[30%]">
          <Feather name="star" size={24} color="#5C4635" />
          <Text className="text-gray-10 mt-2 text-sm">Avaliações</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-30 rounded-lg p-4 items-center w-[30%]">
          <Feather name="phone" size={24} color="#5C4635" /> 
          <Text className="text-gray-10 mt-2 text-sm">Suporte</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-gray-30 mb-4">Histórico de compras</Text>
      <ScrollView>
        <View className="bg-gray-30 rounded-lg p-4 flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-gray-10">Combo Whopper</Text>
          </View>
          <Text className="text-orange-20 font-bold">R$ 34.5</Text>
        </View>
        <View className="bg-gray-30 rounded-lg p-4 flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-gray-10">Marmita</Text>
          </View>
          <Text className="text-orange-20 font-bold">R$ 19.9</Text>
        </View>
      </ScrollView>
    </View>
  );
}
