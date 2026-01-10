import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScanLine } from 'lucide-react-native';
import { useMeasurementScanner } from '../../hooks/add_measurement/useMeasurementScanner';
import { ScannedMeasurement } from '../../services/ocrService';
import { useTranslation } from 'react-i18next';

interface MeasurementScannerProps {
  onScanComplete: (data: ScannedMeasurement) => void;
  disabled?: boolean;
}

export const MeasurementScanner = ({ onScanComplete, disabled }: MeasurementScannerProps) => {
  const { isScanning, scan } = useMeasurementScanner();
  const { t } = useTranslation();

  const handlePress = async () => {
    const data = await scan();
    if (data) {
      onScanComplete(data);
    }
  };

  const isDisabled = disabled || isScanning;

  return (
    <View className="mb-8">
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        className={`
          flex-row items-center justify-center rounded-xl p-6 border-2 border-dashed
          ${isScanning 
              ? 'bg-gray-50 border-gray-300' 
              : 'bg-background-paper border-primary active:bg-blue-50'
          }
        `}
      >
        {isScanning ? (
          <View className="flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#2563EB" />
            <Text className="text-typography-secondary font-bold text-sm uppercase">
              {t('scan_processing')}
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center gap-2">
            <ScanLine size={20} color="#2563EB" />
            <Text className="text-primary font-bold text-sm uppercase">
              {t('picture_result')}
            </Text>
          </View>
        )}

      </TouchableOpacity>
      
      {!isScanning && (
          <Text className="text-center text-typography-secondary text-[10px] mt-2">
            {t('picture_result_sugestion')}
          </Text>
       )}
    </View>
  );
};