import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft, Settings } from 'lucide-react-native';
import { MeasurementForm } from '../../src/components/add_measurement/MeasurementForm';
import { useAddMeasurementScreen } from '../../src/hooks/add_measurement/useAddMeasurementScreen';
import { useAppHeader } from '../hooks/useAppHeader';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export const AddMeasurementScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const { handleGoBack } = useAppHeader();
  const { 
    isSaving, 
    handleFormSubmit 
  } = useAddMeasurementScreen();

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
          Dodaj pomiar
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')} 
          className="bg-background-paper p-3 rounded-full border border-border shadow-sm active:bg-border-light"
          >
          <Settings
          size={24} color="#111827" strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <MeasurementForm 
          onSubmit={handleFormSubmit} 
          isSaving={isSaving} 
        />
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};