import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface DatePickerButtonProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

export const DatePickerButton = ({ currentDate, onDateSelect }: DatePickerButtonProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      onDateSelect(selectedDate);
    } else {
      setShowPicker(false);
    }
  };

  return (
    <View>
      <TouchableOpacity 
        onPress={() => setShowPicker(true)}
        className="mt-6 h-10 px-4 pb-2 flex-row items-center justify-center gap-2 bg-border-light rounded-full active:bg-border"
      >
        <CalendarIcon size={18} color="#6B7280" />
        <Text 
          style={{ includeFontPadding: false, textAlignVertical: 'center' }}
          className="text-typography-secondary font-medium text-sm"
        >
          Wybierz datę
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display="default" 
          maximumDate={new Date()} 
          onChange={handleChange}
        />
      )}
    </View>
  );
};