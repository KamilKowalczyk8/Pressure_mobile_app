import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
// IMPORT 1: Lokale dla formatowania czasu (pamiętaj o zainstalowaniu date-fns jeśli nie masz pełnej paczki)
import { pl, enUS } from 'date-fns/locale';
import { Heart, Clock, StickyNote, Trash2 } from 'lucide-react-native'; 
import { Measurement } from '../../../models/Measurement';
// IMPORT 2: Hook do tłumaczeń
import { useTranslation } from 'react-i18next';

interface MeasurementCardProps {
  measurement: Measurement;
  onDelete: (id: number) => void;
}

export const MeasurementCard = ({ measurement, onDelete }: MeasurementCardProps) => {
  const { t, i18n } = useTranslation();
  
  const { systolic, diastolic, pulse, createdAt, timeOfDay, note } = measurement;
  const dateObject = new Date(createdAt);

  const isEnglish = i18n.language.startsWith('en');
  
  const timeFormatString = isEnglish ? 'h:mm aa' : 'HH:mm';
  const currentLocale = isEnglish ? enUS : pl;
  
  const timeString = format(dateObject, timeFormatString, { locale: currentLocale });

  const timeOfDayLabels: Record<string, string> = {
    'Rano': t('time_of_day_morning'),
    'Popołudnie': t('time_of_day_afternoon'),
    'Wieczór': t('time_of_day_evening'),
  };

  const displayTimeOfDay = timeOfDayLabels[timeOfDay] || timeOfDay;

  return (
    <View className="bg-background-paper px-5 py-4 pb-6 rounded-3xl shadow-md border border-border-light mb-4 mx-4">
      
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-2">
          <Clock size={14} color="#6B7280" />
          <Text className="text-typography-secondary text-sm font-medium">
            {timeString}
          </Text>

          <View className="bg-border-light px-2 py-0.5 rounded-md ml-2">
            <Text className="text-[10px] font-semibold uppercase tracking-wider text-typography-secondary">
              {displayTimeOfDay}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onDelete(measurement.id)}
          className="p-2 rounded-full active:bg-danger-bg"
          hitSlop={10}
        >
          <Trash2 size={18} color="#DC2626" />
        </TouchableOpacity>
      </View>
      
      <View className="flex-row justify-between items-end">
        <View className="flex-row items-baseline">
          <Text className="text-4xl font-bold text-typography-main">
            {systolic}
          </Text>
          <Text className="text-2xl text-typography-secondary mx-1">/</Text>
          <Text className="text-4xl font-bold text-typography-main">
            {diastolic}
          </Text>
          <Text className="text-sm text-typography-secondary ml-2 mb-1">
            mmHg
          </Text>
        </View>

        <View className="flex-row items-center justify-center gap-2 bg-danger-bg px-4 pl-2 py-1 pb-3 rounded-xl">
          <Heart size={18} color="#DC2626" fill="#DC2626" />
          <Text className="text-danger-text font-bold text-lg">
            {pulse}
          </Text>
          <Text className="text-danger text-xs font-medium">
            BPM
          </Text>
        </View>
      </View>
      {note && (
        <View className="mt-4 pt-3 border-t border-border-light flex-row items-start gap-2">
          <StickyNote size={14} color="#2563EB" />
          <Text className="text-typography-secondary text-sm italic flex-1">
            {note}
          </Text>
        </View>
      )}
    </View>
  );
};