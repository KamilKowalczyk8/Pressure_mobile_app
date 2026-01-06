import { useState } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message'; 
import { format } from 'date-fns'; 
import { pl } from 'date-fns/locale';

import { getAllMeasurements } from '../../services/measurementService'; 
import { generateReportHtml } from '../../services/htmlGenerator';

export const usePdfReport = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndSharePdf = async () => {
    try {
      setIsGenerating(true);

      const dbData = await getAllMeasurements();

      if (dbData.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'Pusty raport',
          text2: 'Brak pomiarów do wysłania. Dodaj najpierw wynik.',
          topOffset: 60,
        });
        return;
      }

      const reportData = dbData.map(item => ({
        id: item.id,
        systolic: item.systolic,
        diastolic: item.diastolic,
        pulse: item.pulse,
        createdAt: format(new Date(item.createdAt), 'dd.MM.yyyy HH:mm', { locale: pl })
      }));

      const html = generateReportHtml(reportData);

      const { uri } = await Print.printToFileAsync({
        html: html,
        base64: false
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { 
            UTI: '.pdf', 
            mimeType: 'application/pdf',
            dialogTitle: 'Udostępnij raport ciśnienia'
        });
                
      } else {
        Toast.show({
          type: 'error',
          text1: 'Błąd',
          text2: 'Udostępnianie nie jest dostępne na tym urządzeniu.',
          topOffset: 60,
        });
      }

    } catch (error) {
      console.error("Błąd generowania PDF:", error);
      
      Toast.show({
        type: 'error',
        text1: 'Błąd generowania',
        text2: 'Nie udało się stworzyć pliku PDF.',
        topOffset: 60,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAndSharePdf,
    isGenerating
  };
};