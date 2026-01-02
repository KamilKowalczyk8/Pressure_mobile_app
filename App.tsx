import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAppInitalization } from './src/hooks/useAppInitialization'; 

export default function App() {
  const { isReady } = useAppInitalization();

  if (!isReady) {
    return(
      <View className="flex-1 justify-center items-center bg-blue-600">
        <Text className="text-white text-3xl font-bold mb-4">Ciśnieniomierz ❤️</Text>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white/80 mt-2 text-sm">Przygotowywanie bazy danych...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  )
}