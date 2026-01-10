import React from 'react';
import { Switch } from 'react-native';
import { Shield, Trash2, Lock } from 'lucide-react-native'; 
import { SettingsItem, SectionHeader, SectionContainer } from '../SettingsShared';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from 'react-i18next';

interface SecuritySectionProps {
  onOpenSettings: () => void;
  onClearDb: () => void;
}

export const SecuritySection = ({ onOpenSettings, onClearDb }: SecuritySectionProps) => {
  const { isBiometricsEnabled, toggleBiometrics } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader title={t('section_data_security')} />
      <SectionContainer>
        <SettingsItem 
          icon={Lock}
          title={t('data_security_tag_1')}
          subtitle={t('data_security_text_1')}
          onPress={() => toggleBiometrics(!isBiometricsEnabled)}
          rightElement={
             <Switch 
                value={isBiometricsEnabled} 
                onValueChange={(val) => {toggleBiometrics(val); }}
                trackColor={{ false: "#767577", true: "#93C5FD" }}
                thumbColor={isBiometricsEnabled ? "#2563EB" : "#f4f3f4"}
             />
          }
        />

        <SettingsItem 
          icon={Shield} 
          title={t('data_security_tag_2')} 
          subtitle={t('data_security_text_2')}
          onPress={onOpenSettings}
        />
        
        <SettingsItem 
          icon={Trash2} 
          title={t('data_security_tag_3')} 
          subtitle={t('data_security_text_3')}
          isDestructive={true} 
          onPress={onClearDb}
          isLast={true} 
        />
      </SectionContainer>
    </>
  );
};