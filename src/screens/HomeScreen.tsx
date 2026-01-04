import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Settings, Plus, Activity, Heart, History } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppHeader } from '../hooks/useAppHeader';

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { handleGoToSettings } = useAppHeader();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <ScrollView 
        className="flex-1 px-6 pt-4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
                <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-typography-secondary text-xs font-bold uppercase tracking-widest mb-1">
              Witaj w aplikacji
            </Text>
            <Text className="text-typography-main text-3xl font-bold">
              Twoje Serce ❤️
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')} 
            className="bg-background-paper p-3 rounded-full border border-border shadow-sm active:bg-border-light"
          >
            <Settings
            size={24} color="#111827" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View className="bg-primary rounded-3xl p-6 mb-8 shadow-md relative overflow-hidden">
            <View className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full" />
            <View className="absolute -bottom-10 -left-6 w-48 h-48 bg-white opacity-5 rounded-full" />

            <View className="flex-row items-center gap-4">
                <View className="bg-white/20 p-3 rounded-2xl">
                    <Activity size={32} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                    <Text className="text-white text-lg font-bold">
                        Zadbaj o zdrowie
                    </Text>
                    <Text className="text-blue-100 text-sm mt-1 leading-5">
                        Regularne pomiary pomagają wcześnie wykryć nadciśnienie.
                    </Text>
                </View>
            </View>
        </View>

        <Text className="text-typography-main text-lg font-bold mb-4 ml-1">
            Dostępne akcje
        </Text>

        <View className="flex gap-4 items-center justify-center">
            <TouchableOpacity 
                onPress={() => navigation.navigate('AddMeasurement')}
                className="bg-background-paper p-4 pb-8 rounded-2xl border border-border shadow-sm flex-row items-center gap-4 active:scale-[0.99]"
            >
                <View className="bg-primary-bg p-4 rounded-xl">
                    <Plus size={32} color="#2563EB" strokeWidth={3} />
                </View>
                
                <View className="flex-1">
                    <Text className="text-typography-main text-lg font-bold">
                        Nowy Pomiar
                    </Text>
                    <Text className="text-typography-secondary text-xs mt-0.5">
                        Zeskanuj kamerą lub wpisz ręcznie
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => navigation.navigate('History')}
                className="bg-background-paper p-4 pb-9 rounded-2xl border border-border shadow-sm flex-row items-center gap-4 active:scale-[0.99]"
            >
                 <View className="bg-background-backlight p-4 rounded-xl">
                    <History size={32} color="#4B5563" strokeWidth={2.5} />
                </View>

                <View className="flex-1">
                    <Text className="text-typography-main text-lg font-bold">
                        Historia Wyników
                    </Text>
                    <Text className="text-typography-secondary text-xs mt-0.5">
                        Sprawdź swoje statystyki i wykresy
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};