import { useState } from 'react';
import { Platform } from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message'; 
import { scheduleReminder, cancelAllReminders } from '../../services/NotificationService';

export const useReminders = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const openPicker = () => {
    setShowPicker(true);
  };

  const handleTimeChange = async (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (event.type === 'dismissed' || !selectedDate) {
      return;
    }

    setDate(selectedDate);
    
    const hour = selectedDate.getHours();
    const minute = selectedDate.getMinutes();
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    try {
      await cancelAllReminders();
      await scheduleReminder(
        "Czas na pomiar! 🩺",
        "Zadbaj o swoje serce. Zmierz ciśnienie i zapisz wynik.",
        hour,
        minute
      );

      Toast.show({
        type: 'success', 
        text1: 'Przypomnienie ustawione! ⏰',
        text2: `Będę Ci przypominać codziennie o ${timeString}`,
        visibilityTime: 4000, 
        topOffset: 60, 
      });
      
    } catch (error) {
      console.error(error);
      
      Toast.show({
        type: 'error', 
        text1: 'Błąd zapisu',
        text2: 'Nie udało się ustawić powiadomienia.',
      });
    }
  };

  return {
    reminderState: {
      date,
      showPicker
    },
    reminderActions: {
      openPicker,
      handleTimeChange
    }
  };
};