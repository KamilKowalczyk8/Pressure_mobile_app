import React from 'react';
import { FileText, Share2 } from 'lucide-react-native';
import { SettingsItem, SectionHeader, SectionContainer } from '../SettingsShared';
import { useTranslation } from 'react-i18next';

interface ReportsSectionProps {
  onExportPDF: () => void;
}

export const ReportsSection = ({ onExportPDF }: ReportsSectionProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader title={t('section_raport')} />
      <SectionContainer>
        <SettingsItem 
          icon={Share2} 
          title={t('raport_tag')} 
          subtitle={t('raport_text')}
          onPress={onExportPDF}
        />
      </SectionContainer>
    </>
  );
};