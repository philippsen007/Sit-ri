import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function ConfirmOrderScreen() {
    const router = useRouter();
    const [foods, setFoods] = useState([]);

    // Fetch data from the API
    useEffect(() => {
        fetch("https://apifakedelivery.vercel.app/foods")
            .then((response) => response.json())
            .then((data) => setFoods(data.slice(0, 3)))
            .catch((error) => console.error("Error fetching foods:", error));
    }, []);

    return (
        <View className="flex-1 bg-gray-10 p-4">
            <View className="flex-row justify-between items-center mb-4">
                <TouchableOpacity onPress={() => router.push("/CartScreen")}>
                    <Feather name="arrow-left" size={24} color="#F1D7B6" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-30">Confirmar Pedido</Text>
                <View style={{ width: 24 }} />
            </View>

            <View className="bg-gray-30 p-4 rounded-lg mb-4 flex-row items-center">
                <ScrollView horizontal className="flex-row mr-4">
                    {foods.map((food, index) => (
                        <Image
                            key={index}
                            source={{ uri: food.image }}
                            className="w-16 h-16 rounded-lg mr-2"
                            style={{ backgroundColor: "#A69989" }} 
                        />
                    ))}
                </ScrollView>

                <Text className="text-gray-10 font-semibold text-lg">Total: R$215</Text>
            </View>

            <View className="mb-4">
                <Text className="text-gray-30 font-medium mb-2">
                    Método de Pagamento
                </Text>
                <View className="flex-row justify-between">
                    <TouchableOpacity className="flex-1 bg-orange-10 py-2 rounded-lg mr-2">
                        <Text className="text-center text-white font-semibold">Crédito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-gray-20 py-2 rounded-lg mx-2">
                        <Text className="text-center text-gray-10 font-semibold">Pix</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-gray-20 py-2 rounded-lg ml-2">
                        <Text className="text-center text-gray-10 font-semibold">Dinheiro</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-gray-30 p-4 rounded-lg mb-4">
                <Text className="text-gray-10 font-medium mb-2">Cartão de Crédito</Text>
                <TextInput
                    placeholder="Número do cartão"
                    className="border-b border-gray-10 p-3 rounded-lg mb-2 text-gray-10"
                />
                <TextInput
                    placeholder="Nome do titular"
                    className="border-b border-gray-10  p-3 rounded-lg mb-2 text-gray-10"
                />
                <View className="flex-row justify-between">
                    <TextInput
                        placeholder="Validade"
                        className="border-b border-gray-10  p-3 rounded-lg flex-1 mr-2 text-gray-10"
                    />
                    <TextInput
                        placeholder="CVC"
                        className="border-b border-gray-10  p-3 rounded-lg flex-1 ml-2 text-gray-10"
                    />
                </View>
            </View>

            <View className="bg-gray-30 p-4 rounded-lg mb-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-10 font-medium">Endereço</Text>
                    <TouchableOpacity>
                        <Feather name="edit-3" size={18} color="#59483E" />
                    </TouchableOpacity>
                </View>
                <Text className="text-gray-10 mt-2">Rua Vera Cruz 71</Text>
            </View>

            <TouchableOpacity
                className="bg-orange-10 shadow-lg shadow-orange-10/100 p-4 rounded-lg flex-row justify-center items-center mt-auto"
            >
                <Text className="text-white font-semibold text-lg mr-2">Confirmar</Text>
                <Feather name="check-circle" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
}
