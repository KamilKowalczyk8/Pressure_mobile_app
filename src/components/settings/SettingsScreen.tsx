import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export interface SettingsItemProps {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isDestructive?: boolean;
  rightElement?: React.ReactNode;
}

export const SettingsItem = ({ icon: Icon, title, subtitle, onPress, isDestructive, rightElement }: SettingsItemProps) => (
  <TouchableOpacity 
    onPress={onPress}
    disabled={!onPress}
    className="flex-row items-center justify-between p-4 bg-background-paper border-b border-border active:bg-gray-50"
  >
    <View className="flex-row items-center gap-4 flex-1">
      <View className={`p-2 rounded-xl ${isDestructive ? 'bg-danger-bg' : 'bg-blue-50'}`}>
        <Icon size={22} color={isDestructive ? '#EF4444' : '#2563EB'} />
      </View>
      <View className="flex-1">
        <Text className={`text-base font-medium ${isDestructive ? 'text-danger' : 'text-typography-main'}`}>
          {title}
        </Text>
        {subtitle && (
          <Text className="text-xs text-typography-secondary mt-0.5">
            {subtitle}
          </Text>
        )}
      </View>
    </View>
    
    {rightElement ? rightElement : <ChevronRight size={20} color="#9CA3AF" />}
  </TouchableOpacity>
);

export const SectionHeader = ({ title }: { title: string }) => (
  <Text className="text-typography-secondary text-xs font-bold uppercase tracking-wider px-4 mb-2 mt-6">
    {title}
  </Text>
);

export const SectionContainer = ({ children }: { children: React.ReactNode }) => (
    <View className="border-t border-border">
        {children}
    </View>
);