import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAllMeasurements } from '../../services/measurementService';
import { Measurement } from '../../models/Measurement';

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

  return {
    selectedDate,
    measurements,
    handleDateChange
  };
};