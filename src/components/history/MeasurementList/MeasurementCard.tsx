import React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';
import { Heart, Clock, StickyNote } from 'lucide-react-native'; 
import { Measurement } from '../../../models/Measurement';

interface MeasurementCardProps {
  measurement: Measurement;
}
export const MeasurementCard = ({ measurement }: MeasurementCardProps) => {
  const { systolic, diastolic, pulse, createdAt, timeOfDay, note } = measurement;
  const dateObject = new Date(createdAt);
  const timeString = format(dateObject, 'HH:mm');

  return (
    <View className="bg-background-paper p-4 rounded-2xl shadow-sm border border-border-light mb-3 mx-4">
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center gap-1.5">
          <Clock size={14} color="#9CA3AF" />
          <Text className="text-typography-secondary text-xs font-medium">
            {timeString}
          </Text>
        </View>
        
        <View className="bg-border-light px-2 py-0.5 rounded-md">
          <Text className="text-typography-secondary text-[10px] font-bold uppercase tracking-wider">
            {timeOfDay}
          </Text>
        </View>
      </View>

      <View className="flex-row items-end justify-between">
        <View className="flex-row items-baseline">
          <Text className="text-3xl font-bold text-typography-main">{systolic}</Text>
          <Text className="text-xl text-typography-secondary font-medium mx-1">/</Text>
          <Text className="text-3xl font-bold text-typography-main">{diastolic}</Text>
          <Text className="text-xs text-typography-secondary ml-1 mb-1 font-medium">mmHg</Text>
        </View>

        <View className="flex-row items-center gap-1.5 bg-danger-bg px-3 py-1.5 rounded-lg">
          <Heart size={16} color="#EF4444" fill="#EF4444" />
          <Text className="text-danger-text font-bold text-base">{pulse}</Text>
          <Text className="text-danger text-[10px] font-medium">BPM</Text>
        </View>
      </View>

      {note && (
        <View className="mt-3 pt-2 flex-row items-center gap-2">
          <StickyNote size={12} color="#2563EB" />
          <Text className="text-typography-secondary text-xs italic truncate" numberOfLines={1}>
            {note}
          </Text>
        </View>
      )}

    </View>
  );
};