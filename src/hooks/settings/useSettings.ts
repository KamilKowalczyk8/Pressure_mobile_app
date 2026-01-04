import { useState } from 'react';
import { Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const useSettings = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Logika usuwania bazy
  const handleClearDatabase = () => {
    Alert.alert(
      "Usuwanie danych",
      "Czy na pewno chcesz usunąć WSZYSTKIE pomiary? Tej operacji nie można cofnąć.",
      [
        { text: "Anuluj", style: "cancel" },
        { 
          text: "Usuń wszystko", 
          style: "destructive", 
          onPress: () => console.log("DELETE * FROM measurements") 
        }
      ]
    );
  };

  // Logika ustawień systemowych
  const openSystemSettings = () => {
    Linking.openSettings();
  };

  // Placeholder na przyszłe funkcje
  const handleExportPDF = () => Alert.alert("Eksport", "Generowanie PDF w przygotowaniu...");
  const handleExportCSV = () => Alert.alert("Eksport", "Generowanie CSV w przygotowaniu...");
  
  // Nawigacja
  const navigateToReminders = () => {
      Alert.alert("Nawigacja", "Tu otworzymy ekran ReminderSettings");
      // navigation.navigate('ReminderSettings');
  };

  return {
    state: {
      isDarkMode,
      appVersion: "1.0.0 (Beta)",
      dbStatus: "Online"
    },
    actions: {
      setIsDarkMode,
      handleClearDatabase,
      openSystemSettings,
      handleExportPDF,
      handleExportCSV,
      navigateToReminders
    }
  };
};