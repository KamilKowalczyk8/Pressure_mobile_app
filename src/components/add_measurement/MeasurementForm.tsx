import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { TIME_OF_DAY_OPTIONS } from '../../types/domain';
import { MeasurementFormData } from '../../types/forms';
import { useMeasurementForm } from '../../hooks/add_measurement/useMeasurementForm'; 
import { MeasurementScanner } from './MeasurementScanner';

interface MeasurementFormProps {
  onSubmit: (data: MeasurementFormData) => void;
  isSaving: boolean;
}

export const MeasurementForm = ({ onSubmit, isSaving }: MeasurementFormProps) => {
  const { formState, errors, setters, submit } = useMeasurementForm(onSubmit);
  const renderLabel = (text: string) => (
    <View className="h-8 justify-end mb-2">
      <Text className="text-typography-secondary text-[10px] font-bold uppercase text-center" numberOfLines={1}>
        {text}
      </Text>
    </View>
  );

  const renderError = (error?: string) => {
    if (!error) return null;
    return (
      <Text className="text-danger text-[10px] text-center mt-1 font-medium">
        {error}
      </Text>
    );
  };

  return (
    <ScrollView 
      className="flex-1 px-4 pt-6" 
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    > 
      <View className="flex-row gap-4 mb-6">
        <View className="flex-1">
          {renderLabel("Skurczowe (SYS)")}
          <TextInput
            value={formState.systolic}
            onChangeText={setters.setSystolic}
            keyboardType="numeric"
            placeholder="120"
            maxLength={3}
            className={`
              bg-background-paper border rounded-xl p-4 text-2xl font-bold text-typography-main text-center shadow-sm 
              ${errors.systolic ? 'border-danger bg-danger-bg text-danger' : 'border-border focus:border-primary focus:bg-blue-50'}
            `}
          />
          {renderError(errors.systolic)}
        </View>

        <View className="flex-1">
          {renderLabel("Rozkurczowe (DIA)")}
          <TextInput
            value={formState.diastolic}
            onChangeText={setters.setDiastolic}
            keyboardType="numeric"
            placeholder="80"
            maxLength={3}
            className={`
              bg-background-paper border rounded-xl p-4 text-2xl font-bold text-typography-main text-center shadow-sm 
              ${errors.diastolic ? 'border-danger bg-danger-bg text-danger' : 'border-border focus:border-primary focus:bg-blue-50'}
            `}
          />
          {renderError(errors.diastolic)}
        </View>

        <View className="flex-1">
          {renderLabel("Puls (BPM)")}
          <TextInput
            value={formState.pulse}
            onChangeText={setters.setPulse}
            keyboardType="numeric"
            placeholder="70"
            maxLength={3}
            className={`
              bg-background-paper border rounded-xl p-4 text-2xl font-bold text-center shadow-sm 
              ${errors.pulse ? 'border-danger bg-danger-bg text-danger' : 'border-border text-danger focus:border-danger focus:bg-danger-bg'}
            `}
          />
          {renderError(errors.pulse)}
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-typography-secondary text-xs font-bold uppercase mb-2 ml-1">Pora dnia</Text>
        <View className="flex-row bg-background-paper p-1 rounded-xl border border-border shadow-sm">
          {TIME_OF_DAY_OPTIONS.map((option) => {
            const isSelected = formState.timeOfDay === option;
            return (
              <TouchableOpacity
                key={option}
                onPress={() => setters.setTimeOfDay(option)}
                className={`flex-1 py-3 rounded-lg items-center ${isSelected ? 'bg-primary shadow-sm' : 'bg-transparent'}`}
              >
                <Text className={`font-medium text-sm ${isSelected ? 'text-white font-bold' : 'text-typography-secondary'}`}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View className="mb-6">
        <View className="flex-row justify-between items-end mb-2 ml-1 mr-1">
            <Text className="text-typography-secondary text-xs font-bold uppercase">Notatka (Opcjonalne)</Text>
            <Text className={`text-[10px] font-medium ${formState.note.length === 40 ? 'text-danger' : 'text-typography-disabled'}`}>
              {formState.note.length}/40
            </Text>
        </View>
        <TextInput
          value={formState.note}
          onChangeText={setters.setNote}
          placeholder="Np. po kawie, stres, lekach..."
          multiline
          numberOfLines={3}
          maxLength={40}
          style={{ textAlignVertical: 'top' }} 
          className={`
            bg-background-paper border rounded-xl p-4 text-typography-main text-base shadow-sm min-h-[100px]
            ${errors.note ? 'border-danger' : 'border-border focus:border-primary'}
          `}
        />
        {renderError(errors.note)}
      </View>

      <MeasurementScanner 
        onScanComplete={setters.setScannedData} 
        disabled={isSaving}
      />
      <TouchableOpacity
        onPress={submit}
        disabled={isSaving}
        className={`
          w-full py-4 rounded-full items-center shadow-md mb-10
          ${isSaving ? 'bg-typography-secondary' : 'bg-primary active:bg-primary-dark'}
        `}
      >
        <Text className="text-white font-bold text-lg uppercase tracking-wide">
          {isSaving ? 'Zapisywanie...' : 'Zapisz Wynik'}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};