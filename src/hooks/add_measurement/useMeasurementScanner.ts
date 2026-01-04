import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { scanMeasurementFromImage, ScannedMeasurement } from '../../services/ocrService';

export const useMeasurementScanner = () => {
  const [isScanning, setIsScanning] = useState(false);

  const scan = async (): Promise<ScannedMeasurement | null> => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Brak uprawnień", "Wymagany jest dostęp do aparatu, aby zrobić zdjęcie wyniku.");
      return null;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true, 
      quality: 1,
    });

    if (pickerResult.canceled) {
      return null;
    }

    setIsScanning(true);
    try {
      const imageUri = pickerResult.assets[0].uri;
      const scannedData = await scanMeasurementFromImage(imageUri);

      if (!scannedData.systolic && !scannedData.diastolic && !scannedData.pulse) {
         Alert.alert("Niepowodzenie", "Nie udało się odczytać wyników ze zdjęcia.");
         return null;
      }
      return scannedData;

    } catch (error) {
      console.error(error);
      Alert.alert("Błąd", "Wystąpił problem podczas analizy zdjęcia.");
      return null;
    } finally {
      setIsScanning(false);
    }
  };

  return {
    isScanning,
    scan
  };
};