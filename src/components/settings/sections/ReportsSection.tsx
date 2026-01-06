import React from 'react';
import { FileText, Share2 } from 'lucide-react-native';
import { SettingsItem, SectionHeader, SectionContainer } from '../SettingsShared';

interface ReportsSectionProps {
  onExportPDF: () => void;
}

export const ReportsSection = ({ onExportPDF }: ReportsSectionProps) => (
  <>
    <SectionHeader title="Raporty dla Lekarza" />
    <SectionContainer>
      <SettingsItem 
        icon={Share2} 
        title="Wyślij Raport PDF" 
        subtitle="Udostępnij historię pomiarów"
        onPress={onExportPDF}
      />
    </SectionContainer>
  </>
);