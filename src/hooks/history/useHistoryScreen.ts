import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native'; 
import Toast from 'react-native-toast-message'; 
import { deleteMeasurement, getAllMeasurements } from '../../services/measurementService';
import { Measurement } from '../../models/Measurement';
import { useTranslation } from 'react-i18next';

export const useHistoryScreen = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          const data = await getAllMeasurements();
          if (isActive) {
            setMeasurements(data as unknown as Measurement[]);
          }
        } catch (error) {
          console.error(error);
          Toast.show({
            type: 'error',
            text1: t('errors.fetch_error_title'),
            text2: t('errors.fetch_error_msg'),
          });
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [t]) 
  );

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      t('alerts.delete_title'),
      t('alerts.delete_msg'),
      [
        { text: t('alerts.cancel'), style: "cancel" },
        { 
          text: t('alerts.delete'), 
          style: "destructive", 
          onPress: async () => {
            try {
              const result = await deleteMeasurement(id);
              
              if (result.success) {
                setMeasurements(prevMeasurements => 
                  prevMeasurements.filter(item => item.id !== id)
                );

                Toast.show({
                  type: 'success',
                  text1: t('success.delete_success_title'),
                  text2: t('success.delete_success_msg'),
                  visibilityTime: 3000,
                });
              } else {
                throw new Error('Delete returned false');
              }
            } catch (error) {
              console.error(error);
              Toast.show({
                type: 'error',
                text1: t('errors.delete_error_title'),
                text2: t('errors.delete_error_msg'),
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