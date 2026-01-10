import React from 'react';
import { Shield } from 'lucide-react-native';
import { SectionHeader, SectionContainer, SettingsItem } from '../SettingsShared';
import { useTranslation } from 'react-i18next';

interface SupportSectionProps {
  onPrivacyPolicy: () => void;
}

export const SupportSection = ({ onPrivacyPolicy }: SupportSectionProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader title={t('section_support_legal')} />
      <SectionContainer>
        <SettingsItem 
          icon={Shield}
          title={t('support_legal_tag')}
          subtitle={t('support_legal_text')}
          onPress={onPrivacyPolicy}
          isLast={true} 
        />
      </SectionContainer>
    </>
  );
};