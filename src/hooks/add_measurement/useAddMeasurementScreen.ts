import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { addMeasurement } from '../../services/measurementService'; 
import { MeasurementFormData } from '../../components/add_measurement/MeasurementForm';

export const useAddMeasurementScreen = () => {
  const navigation = useNavigation();
  const [isSaving, setIsSaving] = useState(false);

  const handleFormSubmit = async (formData: MeasurementFormData) => {
    setIsSaving(true);
    
    try {
      const result = await addMeasurement({
        systolic: parseInt(formData.systolic),
        diastolic: parseInt(formData.diastolic),
        pulse: parseInt(formData.pulse),
        timeOfDay: formData.timeOfDay,
        note: formData.note.trim() === '' ? null : formData.note, 
      });

      if (result.success) {
        navigation.goBack(); 
      } else {
        Alert.alert('Błąd', 'Nie udało się zapisać pomiaru w bazie.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Krytyczny błąd', 'Wystąpił nieoczekiwany błąd aplikacji.');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    handleFormSubmit
  };
};