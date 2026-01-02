import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export const HomeScreen = () => {
  // Prosta nawigacja do testów
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-6 text-blue-600">Ekran Główny</Text>
      
      <View className="gap-4 w-full px-10">
        <Button 
          title="➕ Idź do Dodaj Pomiar" 
          onPress={() => navigation.navigate('AddMeasurement')} 
        />
        <Button 
          title="📜 Idź do Historii" 
          onPress={() => navigation.navigate('History')} 
        />
        <Button 
          title="⚙️ Idź do Ustawień" 
          onPress={() => navigation.navigate('Settings')} 
        />
      </View>
    </View>
  );
};