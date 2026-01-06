import React from 'react';
import { View, Text } from 'react-native';
import { Info, Database } from 'lucide-react-native';
import { SettingsItem, SectionHeader } from '../SettingsShared';

interface AboutSectionProps {
  version: string;
  dbStatus: string;
}

export const AboutSection = ({ version, dbStatus }: AboutSectionProps) => (
  <>
    <SectionHeader title="O Aplikacji" />
    <View className="border-t border-b border-border">
       <SettingsItem 
        icon={Info} 
        title="Wersja" 
        subtitle={version}
        rightElement={<Text className="text-typography-secondary text-sm">v{version}</Text>}
      />
       <SettingsItem 
        icon={Database} 
        title="Baza danych" 
        subtitle={`SQLite (${dbStatus})`}
        rightElement={<Text className="text-typography-secondary text-sm">OK</Text>}
      />
    </View>
  </>
);