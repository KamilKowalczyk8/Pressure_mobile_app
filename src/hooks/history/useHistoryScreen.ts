import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { deleteMeasurement, getAllMeasurements } from '../../services/measurementService';
import { Measurement } from '../../models/Measurement';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';

export const useHistoryScreen = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        const data = await getAllMeasurements();
        if (isActive) {
          setMeasurements(data as unknown as Measurement[]);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Usuń pomiar",
      "Czy na pewno chcesz usunąć ten wynik? Tej operacji nie można cofnąć.",
      [
        { text: "Anuluj", style: "cancel" },
        { 
          text: "Usuń", 
          style: "destructive", 
          onPress: async () => {
            const result = await deleteMeasurement(id);
            
            if (result.success) {
              Toast.show({
                type: 'success',
                text1: 'Usunięto',
                text2: 'Pomiar został trwale usunięty.'
              });
              setMeasurements(prevMeasurements => 
                prevMeasurements.filter(item => item.id !== id)
              );
            } else {
              Toast.show({
                type: 'error',
                text1: 'Błąd',
                text2: 'Nie udało się usunąć pomiaru.'
              });
            }
          }
        }
      ]
    );
  };

  return {
    selectedDate,
    measurements,
    handleDateChange,
    handleDelete
  };
};