import { Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'; 
import { usePdfReport } from '../reports/usePdfReport';
import { clearDatabase } from '../../services/measurementService';
import { useReminders } from './useReminders';
import { useState } from 'react';

export const useSettings = () => {
  const navigation = useNavigation();
  const { generateAndSharePdf, isGenerating } = usePdfReport();
  const { reminderState, reminderActions } = useReminders(); 
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const confirmClearDatabase = async () => {
    setDeleteModalVisible(false);
    
    const result = await clearDatabase();
    
    if (result.success) {
      Toast.show({
        type: 'success', 
        text1: 'Baza wyczyszczona 🗑️',
        text2: 'Wszystkie pomiary zostały trwale usunięte.',
        topOffset: 60,
      });
    } else {
      Toast.show({
        type: 'error', 
        text1: 'Błąd',
        text2: 'Nie udało się wyczyścić bazy danych.',
        topOffset: 60
      });
    }
  };

  const handlePrivacyPolicy = async () => {
    const url = 'https://sites.google.com/view/pressureapp-privacy'; 
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        throw new Error("Cannot open URL");
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Błąd',
        text2: 'Nie udało się otworzyć strony z polityką.',
        topOffset: 60
      });
    }
  };

  const openSystemSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Błąd',
        text2: 'Nie udało się otworzyć ustawień systemowych.'
      });
    }
  };

  const handleExportPDF = async () => await generateAndSharePdf();

  return {
    state: {
      appVersion: "1.4.0",
      dbStatus: "Lokalna",
      isProcessing: isGenerating,
      reminderPicker: reminderState,
      isDeleteModalVisible
    },
    actions: {
      handlePrivacyPolicy,
      openDeleteModal,      
      closeDeleteModal,    
      confirmClearDatabase,
      openSystemSettings,
      handleExportPDF,
      reminders: reminderActions
    }
  };
};