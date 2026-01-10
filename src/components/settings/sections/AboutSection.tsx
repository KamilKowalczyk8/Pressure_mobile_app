import React from 'react';
import { View, Text } from 'react-native';
import { Info, Database } from 'lucide-react-native';
import { SettingsItem, SectionHeader } from '../SettingsShared';
import { useTranslation } from 'react-i18next';

interface AboutSectionProps {
  version: string;
  dbStatus: string;
}

export const AboutSection = ({ version, dbStatus }: AboutSectionProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader title={t('section_about')} />
      <View className="border-t border-b border-border">
         <SettingsItem 
            icon={Info} 
            title={t('version')} 
            subtitle={version}
            rightElement={<Text className="text-typography-secondary text-sm">v{version}</Text>}
         />
         <SettingsItem 
            icon={Database} 
            title={t('databases')} 
            subtitle={`SQLite (${dbStatus})`}
            rightElement={<Text className="text-typography-secondary text-sm">OK</Text>}
         />
      </View>
    </>
  );
};