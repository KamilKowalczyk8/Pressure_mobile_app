import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Settings } from 'lucide-react-native';
import { DateSlider } from '../components/history/DateSlider/DateSlider';
import { MeasurementList } from '../components/history/MeasurementList/MeasurementList';
import { useAppHeader } from '../hooks/useAppHeader';
import { useHistoryScreen } from '../hooks/history/useHistoryScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export const HistoryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const { handleGoBack } = useAppHeader();
  const { selectedDate, measurements, handleDateChange, handleDelete } = useHistoryScreen();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 mt-8 pb-4 pt-2 bg-background-paper border-b border-border-light">
        <TouchableOpacity 
          onPress={handleGoBack}
          className="p-2 -ml-2 rounded-full active:bg-border-light"
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-typography-main">
          Historia
        </Text>
         <TouchableOpacity
            onPress={() => navigation.navigate('Settings')} 
            className="bg-background-paper p-3 rounded-full border border-border shadow-sm active:bg-border-light"
            >
            <Settings
            size={24} color="#111827" strokeWidth={2} />
         </TouchableOpacity>
      </View>
      <View className="mt-2">
        <DateSlider
          initialDate={selectedDate} 
          onDateChange={handleDateChange} 
        />
      </View>
      
      <MeasurementList 
        selectedDate={selectedDate} 
        data={measurements} 
        onDelete={handleDelete}
      />
    </SafeAreaView>
  );
};