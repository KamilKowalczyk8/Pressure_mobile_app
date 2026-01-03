import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Settings } from 'lucide-react-native';
import { DateSlider } from '../components/history/DateSlider/DateSlider';
import { MeasurementList } from '../components/history/MeasurementList/MeasurementList';
import { useAppHeader } from '../hooks/useAppHeader';
import { useHistoryScreen } from '../hooks/history/useHistoryScreen';

export const HistoryScreen = () => {
  const { handleGoBack, handleGoToSettings } = useAppHeader();
  const { selectedDate, measurements, handleDateChange } = useHistoryScreen();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 mt-14 pb-4 pt-2 bg-background-paper border-b border-border-light">
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
          onPress={handleGoToSettings}
          className="p-2 -mr-2 rounded-full active:bg-border-light"
        >
          <Settings size={24} color="#111827" />
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
      />
    </SafeAreaView>
  );
};