import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { getAllMeasurements } from '../../services/measurementService';
import { generateAndShareCsv } from '../../services/CsvExportService';

export const useCsvReport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportCsv = async () => {
    try {
      setIsExporting(true);

      const data = await getAllMeasurements();

      if (!data || data.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'Pusty raport',
          text2: 'Brak pomiarów do wyeksportowania.',
          topOffset: 60,
        });
        return;
      }

      await generateAndShareCsv(data);

    } catch (error) {
      console.error("Błąd eksportu CSV:", error);
      
      Toast.show({
        type: 'error',
        text1: 'Błąd eksportu',
        text2: 'Nie udało się wygenerować pliku CSV.',
        topOffset: 60,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportCsv,      
    isExporting    
  };
};