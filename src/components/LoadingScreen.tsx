import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message = "Ładowanie..." }: LoadingScreenProps) => (
  <View className="flex-1 justify-center items-center bg-blue-600 absolute inset-0 z-50 w-full h-full">
    <Text className="text-white text-3xl font-bold mb-4">Ciśnieniomierz ❤️</Text>
    <ActivityIndicator size="large" color="#ffffff" />
    <Text className="text-white/80 mt-2 text-sm">{message}</Text>
  </View>
);