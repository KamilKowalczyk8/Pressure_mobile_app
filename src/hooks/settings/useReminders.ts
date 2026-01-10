import { useState } from 'react';
import { Platform } from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message'; 
import { scheduleReminder, cancelAllReminders } from '../../services/NotificationService';
import { useTranslation } from 'react-i18next';

export const useReminders = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { t } = useTranslation();

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
        t('notification.title'),
        t('notification.body'),
        hour,
        minute
      );

      Toast.show({
        type: 'success', 
        text1: t('reminders.success_title'),
        text2: t('reminders.success_msg', { time: timeString }),
        visibilityTime: 4000, 
        topOffset: 60, 
      });
      
    } catch (error) {
      console.error(error);
      
      Toast.show({
        type: 'error', 
        text1: t('reminders.error_title'),
        text2: t('reminders.error_msg'),
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