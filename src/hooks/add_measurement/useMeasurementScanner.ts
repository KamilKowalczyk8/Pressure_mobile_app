import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message'; 
import { scanMeasurementFromImage, ScannedMeasurement } from '../../services/ocrService';
import { useTranslation } from 'react-i18next';

export const useMeasurementScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const { t } = useTranslation();

  const scan = async (): Promise<ScannedMeasurement | null> => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Toast.show({
          type: 'error',
          text1: t('errors.permission_title'),
          text2: t('errors.camera_permission_msg'),
        });
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

      const imageUri = pickerResult.assets[0].uri;
      const scannedData = await scanMeasurementFromImage(imageUri);

      const hasData = scannedData.systolic || scannedData.diastolic || scannedData.pulse;

      if (!hasData) {
          Toast.show({
          type: 'error',
          text1: t('errors.scan_failed_title'),
          text2: t('errors.scan_failed_msg'),
          visibilityTime: 4000,
        });
        return null;
      }

      Toast.show({
        type: 'success',
        text1: t('success.scan_success_title'),
        text2: t('success.scan_complete'),
        visibilityTime: 3000,
      });

      return scannedData;

    } catch (error) {
      console.error(error);
      
      Toast.show({
        type: 'error',
        text1: t('errors.general_title'),
        text2: t('errors.scan_error_general'),
      });
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