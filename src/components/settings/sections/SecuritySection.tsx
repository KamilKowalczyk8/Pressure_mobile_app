import React from 'react';
import { Switch } from 'react-native';
import { Shield, Trash2, Lock } from 'lucide-react-native'; 
import { SettingsItem, SectionHeader, SectionContainer } from '../SettingsShared';
import { useAuth } from '../../../context/AuthContext';

interface SecuritySectionProps {
  onOpenSettings: () => void;
  onClearDb: () => void;
}

export const SecuritySection = ({ onOpenSettings, onClearDb }: SecuritySectionProps) => {
  
  const { isBiometricsEnabled, toggleBiometrics } = useAuth();

  return (
    <>
      <SectionHeader title="Dane i Bezpieczeństwo" />
      <SectionContainer>
        <SettingsItem 
          icon={Lock}
          title="Blokada aplikacji"
          subtitle="Wymagaj FaceID / TouchID"
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
          title="Uprawnienia Systemowe" 
          subtitle="Zarządzaj dostępem do kamery"
          onPress={onOpenSettings}
        />
        
        <SettingsItem 
          icon={Trash2} 
          title="Wyczyść całą bazę" 
          subtitle="Nieodwracalne usunięcie historii"
          isDestructive={true} 
          onPress={onClearDb}
          isLast={true} 
        />
      </SectionContainer>
    </>
  );
};