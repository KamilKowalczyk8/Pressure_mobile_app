import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { isSameDay } from 'date-fns';
import { ClipboardList } from 'lucide-react-native';
import { Measurement } from '../../../models/Measurement';
import { MeasurementCard } from './MeasurementCard';

interface MeasurementListProps {
  selectedDate: Date;
  data: Measurement[]; 
}
export const MeasurementList = ({ selectedDate, data }: MeasurementListProps) => {
  const dailyMeasurements = useMemo(() => {
    const safeData = data || [];
    const sortedData = [...safeData].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sortedData.filter(m => {
      return isSameDay(new Date(m.createdAt), selectedDate);
    });
  }, [selectedDate, data]); 

  return (
    <View className="flex-1 mt-4">
      {dailyMeasurements.length > 0 ? (
        <FlatList
          data={dailyMeasurements}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => <MeasurementCard measurement={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="items-center justify-center mt-10 opacity-60">
          <View className="bg-border-light p-4 rounded-full mb-3">
            <ClipboardList size={32} color="#6B7280" />
          </View>
          
          <Text className="text-typography-secondary font-medium text-base">
            Brak pomiarów dla tego dnia
          </Text>
        </View>
      )}
    </View>
  );
};