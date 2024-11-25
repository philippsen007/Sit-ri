import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AuthScreen() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    return (
        <ImageBackground
            source={{ uri: "https://hips.hearstapps.com/hmg-prod/images/flour-types-self-rising-flour-1637354452.jpg" }}
            style={{ flex: 1 }}
            className="bg-gray-30 justify-center items-center px-6"
        >
            <Image
                source={require('../assets/images/logositariblack.png')}
                className="w-72 h-28 mb-12"
            />

            <Text className="text-gray-10 text-2xl mb-4">{isLogin ? "Bem-vindo" : "Nova Conta"}</Text>

            <View className="flex-row justify-between space-x-4 mb-6 w-full">
                <TouchableOpacity className="bg-orange-10 w-6/12 px-4 py-2 rounded-full flex-row justify-around items-center">
                    <FontAwesome name="google" size={20} color="white" /> 
                    <Text className="text-white ml-2">Com Google</Text>
                </TouchableOpacity>

                <View className="w-6/12 flex-row justify-around">
                    <TouchableOpacity className="bg-gray-30 px-4 py-2 rounded-full">
                        <Feather name="facebook" size={20} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-gray-30 px-4 py-2 rounded-full">
                        <FontAwesome name="apple" size={20} color="black" /> 
                    </TouchableOpacity>
                </View>
            </View>

            <View className="w-full mb-4">
                <View className="flex-row items-center border-b border-gray-10 pb-2">
                    <Feather name="mail" size={20} color="#59483E" />
                    <TextInput
                        placeholder="E-mail"
                        className="ml-2 flex-1 text-gray-10"
                    />
                </View>
            </View>

            {!isLogin && (
                <View className="w-full mb-4">
                    <View className="flex-row items-center border-b border-gray-10 pb-2">
                        <Feather name="user" size={20} color="#59483E" />
                        <TextInput
                            placeholder="Nome completo"
                            className="ml-2 flex-1 text-gray-10"
                        />
                    </View>
                </View>
            )}

            <View className="w-full mb-4">
                <View className="flex-row items-center border-b border-gray-10 pb-2">
                    <Feather name="lock" size={20} color="#59483E" />
                    <TextInput
                        placeholder="Senha"
                        placeholderTextColor="#59483E"
                        secureTextEntry
                        className="ml-2 flex-1 text-gray-10"
                    />
                </View>
            </View>

            {isLogin && (
                <TouchableOpacity className="self-end mb-4">
                    <Text className="text-gray-10 underline">Esqueceu a senha?</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                className="bg-orange-10 w-full py-3 rounded-lg items-center mb-4"
                onPress={() => {
                    if (isLogin) {
                        router.push("/Home");
                    } else {
                        setIsLogin(true);
                    }
                }}
            >
                <Text className="text-white text-lg font-semibold">
                    {isLogin ? "Entrar" : "Criar"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text className="text-gray-10">
                    {isLogin ? "Crie sua conta →" : "Você já possui conta? ←"}
                </Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}
