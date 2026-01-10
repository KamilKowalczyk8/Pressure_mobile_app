import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'; 
import { addMeasurement } from '../../services/measurementService'; 
import { MeasurementFormData } from '../../types/forms';
import { useTranslation } from 'react-i18next';

export const useAddMeasurementScreen = () => {
  const navigation = useNavigation();
  const [isSaving, setIsSaving] = useState(false);
  const { t } = useTranslation();

  const handleFormSubmit = async (formData: MeasurementFormData) => {
    setIsSaving(true);
    
    try {
      const result = await addMeasurement({
        systolic: parseInt(formData.systolic, 10), 
        diastolic: parseInt(formData.diastolic, 10),
        pulse: parseInt(formData.pulse, 10),
        timeOfDay: formData.timeOfDay,
        note: formData.note.trim() === '' ? null : formData.note, 
      });

      if (result.success) {
        Toast.show({
          type: 'success',
          text1: t('success.save_success_title'),
          text2: t('success.save_success_msg'),
          visibilityTime: 3000,
        });
        
        navigation.goBack(); 
      } else {
        Toast.show({
          type: 'error',
          text1: t('errors.save_error_title'),
          text2: t('errors.save_error_msg'),
        });
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        type: 'error',
        text1: t('errors.unexpected_error_title'),
        text2: t('errors.unexpected_error_msg'),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    handleFormSubmit
  };
};