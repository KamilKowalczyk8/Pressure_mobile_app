import React from 'react';
import { Shield } from 'lucide-react-native';
import { SectionHeader, SectionContainer, SettingsItem } from '../SettingsShared';

interface SupportSectionProps {
  onPrivacyPolicy: () => void;
}

export const SupportSection = ({ onPrivacyPolicy }: SupportSectionProps) => {
  return (
    <>
      <SectionHeader title="Wsparcie i Prawne" />
      <SectionContainer>
        <SettingsItem 
          icon={Shield}
          title="Polityka Prywatności"
          subtitle="Zasady przetwarzania danych"
          onPress={onPrivacyPolicy}
          isLast={true} 
        />
      </SectionContainer>
    </>
  );
};