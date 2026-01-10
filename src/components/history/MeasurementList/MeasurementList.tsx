import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { isSameDay } from 'date-fns';
import { Measurement } from '../../../models/Measurement';
import { MeasurementCard } from './MeasurementCard'; 
import { useTranslation } from 'react-i18next';

interface MeasurementListProps {
  data: Measurement[];
  selectedDate: Date;
  onDelete: (id: number) => void;
}

export const MeasurementList = ({ data, selectedDate, onDelete }: MeasurementListProps) => {
  const { t } = useTranslation();

  const filteredData = data.filter((item) => 
    isSameDay(new Date(item.createdAt), selectedDate)
  );

  const sortedData = filteredData.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (sortedData.length === 0) {
    return (
      <View className="flex-1 items-center justify-center mt-20 opacity-50">
        <Text className="text-typography-secondary text-lg font-medium mt-4">
           {t('history_text')}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sortedData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MeasurementCard 
          measurement={item} 
          onDelete={onDelete} 
        />
      )}
      contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
};