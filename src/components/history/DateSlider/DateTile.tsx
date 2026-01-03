import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { format, isToday } from 'date-fns';
import { pl } from 'date-fns/locale'; 

interface DateTileProps {
  date: Date;
  isSelected: boolean;
  onPress: () => void;
}
export const DateTile = memo(({ date, isSelected, onPress }: DateTileProps) => {
  const dayName = format(date, 'EEE', { locale: pl });
  const dayNumber = format(date, 'd');
  const monthName = format(date, 'MMM', { locale: pl });
  const isCurrentDay = isToday(date);

  const getContainerStyle = () => {
    if (isSelected) return 'bg-primary border-primary shadow-md';
    if (isCurrentDay) return 'bg-background-paper border-primary border-2'; 
    return 'bg-background-paper border-border';
  };
  const getSecondaryTextStyle = () => {
    if (isSelected) return 'text-primary-bg'; 
    if (isCurrentDay) return 'text-primary font-bold'; 
    return 'text-typography-secondary';
  };

  const getNumberStyle = () => {
    if (isSelected) return 'text-white';
    if (isCurrentDay) return 'text-primary'; 
    return 'text-typography-main';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        items-center justify-center 
        w-20 h-20 rounded-2xl 
        border 
        ${getContainerStyle()}
      `}
      activeOpacity={0.7}
    >
      <Text 
        className={`
          text-xs font-medium uppercase mb-1
          ${getSecondaryTextStyle()}
        `}
      >
        {dayName}
      </Text>
      <Text 
        className={`
          text-xl font-bold
          ${getNumberStyle()}
        `}
      >
        {dayNumber}
      </Text>
      <Text 
        className={`
          text-[10px] uppercase font-medium mt-0.5
          ${getSecondaryTextStyle()}
        `}
      >
        {monthName}
      </Text>
    </TouchableOpacity>
  );
});

DateTile.displayName = 'DateTile';