import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { isSameDay } from 'date-fns';
import { useDateSlider } from '../../../hooks/history/useDateSlider';
import { DateTile } from './DateTile';
import { DatePickerButton } from './DatePickerButton';

interface DateSliderProps {
  initialDate?: Date;
  onDateChange: (date: Date) => void;
}
export const DateSlider = ({ initialDate = new Date(), onDateChange }: DateSliderProps) => {
  
  const { 
    daysToRender, 
    centerDate, 
    goToPrevDay, 
    goToNextDay, 
    goToToday,
    selectDate,      
    isTodaySelected 
  } = useDateSlider(initialDate, onDateChange); 

  return (
    <View className="flex-col gap-4">
        <View className="flex-row items-center justify-between bg-background-paper p-2 rounded-xl shadow-sm">
        <TouchableOpacity onPress={goToPrevDay} className="p-3">
          <ChevronLeft size={24} color="#6B7280" />
        </TouchableOpacity>

        <View className="flex-row gap-2">
          {daysToRender.map((date) => (
            <DateTile
              key={date.toISOString()}
              date={date}
              isSelected={isSameDay(date, centerDate)}
              onPress={() => selectDate(date)}
            />
          ))}
        </View>

        <TouchableOpacity onPress={goToNextDay} className="p-3">
          <ChevronRight size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between px-5 mt-4">
        <View className="w-1/2 items-start">
          <TouchableOpacity 
            onPress={goToToday}
            disabled={isTodaySelected} 
            className={`
              h-10 px-6 rounded-full flex-row items-center justify-center
              ${isTodaySelected 
                ? 'bg-border' 
                : 'bg-primary shadow-sm active:bg-primary-dark' 
              }
            `}
          >
            <Text 
              style={{ includeFontPadding: false, textAlignVertical: 'center' }}
              className={`
                font-medium text-sm
                ${isTodaySelected 
                    ? 'text-typography-disabled' 
                    : 'text-white'
                }
              `}
            >
              Dzisiaj
            </Text>
          </TouchableOpacity>
        </View>
        
        <View className="w-1/2 items-end mt-2">
          <DatePickerButton 
            currentDate={centerDate}
            onDateSelect={selectDate} 
          />
        </View>
      </View>
    </View>
  );
};