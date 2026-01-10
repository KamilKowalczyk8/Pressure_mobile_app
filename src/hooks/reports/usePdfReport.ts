import { useState } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message'; 
import { format } from 'date-fns'; 
import { pl, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { getAllMeasurements } from '../../services/measurementService'; 
import { generateReportHtml, ReportLabels } from '../../services/htmlGenerator';

export const usePdfReport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { t, i18n } = useTranslation();

  const generateAndSharePdf = async () => {
    try {
      setIsGenerating(true);

      const dbData = await getAllMeasurements();

      if (dbData.length === 0) {
        Toast.show({
          type: 'error',
          text1: t('pdf.empty_title'),
          text2: t('pdf.empty_msg'),
          topOffset: 60,
        });
        return;
      }

      const isEnglish = i18n.language.startsWith('en');
      const currentLocale = isEnglish ? enUS : pl;
      
      const dateFormat = isEnglish ? 'MM/dd/yyyy' : 'dd.MM.yyyy';
      const timeFormat = isEnglish ? 'h:mm aa' : 'HH:mm';

      const reportData = dbData.map(item => {
        const dateObj = new Date(item.createdAt);
        return {
          id: item.id,
          systolic: item.systolic,
          diastolic: item.diastolic,
          pulse: item.pulse,
          date: format(dateObj, dateFormat, { locale: currentLocale }),
          time: format(dateObj, timeFormat, { locale: currentLocale })
        };
      });

      const labels: ReportLabels = {
        title: t('pdf.pdf_report_title'),
        generatedBy: t('pdf.pdf_generated_by'),
        headerTime: t('pdf.pdf_header_time'),
        headerPressure: t('pdf.pdf_header_pressure'),
        headerPulse: t('pdf.pdf_header_pulse'),
        footer: t('pdf.pdf_footer')
      };

      const html = generateReportHtml(reportData, labels);

      const { uri } = await Print.printToFileAsync({
        html: html,
        base64: false
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { 
            UTI: '.pdf', 
            mimeType: 'application/pdf',
            dialogTitle: t('pdf.share_title')
        });
                
      } else {
        Toast.show({
          type: 'error',
          text1: t('errors.general_title'),
          text2: t('pdf.share_not_available'),
          topOffset: 60,
        });
      }

    } catch (error) {
      console.error("Błąd generowania PDF:", error);
      
      Toast.show({
        type: 'error',
        text1: t('pdf.generate_error_title'),
        text2: t('pdf.generate_error_msg'),
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