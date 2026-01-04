import React from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Moon, Bell, Trash2, FileText, Shield, Database, Info, Share2 
} from 'lucide-react-native';
import { useSettings } from '../hooks/settings/useSettings';
import { SettingsItem, SectionHeader, SectionContainer } from '../components/settings/SettingsScreen';

const AppearanceSection = ({ isDarkMode, toggleTheme, onNavigateReminders }: any) => (
  <>
    <SectionHeader title="Wygląd i Powiadomienia" />
    <SectionContainer>
      <SettingsItem 
        icon={Moon} title="Tryb Ciemny" subtitle="Oszczędzaj baterię i wzrok"
        rightElement={
          <Switch 
            value={isDarkMode} onValueChange={toggleTheme}
            trackColor={{ false: "#D1D5DB", true: "#3B82F6" }}
          />
        }
      />
      <SettingsItem 
        icon={Bell} title="Konfiguracja Przypomnień" subtitle="Ustaw godziny pomiarów"
        onPress={onNavigateReminders}
      />
    </SectionContainer>
  </>
);

const ReportsSection = ({ onExportPDF, onExportCSV }: any) => (
  <>
    <SectionHeader title="Raporty dla Lekarza" />
    <SectionContainer>
      <SettingsItem 
        icon={Share2} title="Wyślij Raport PDF" subtitle="Udostępnij historię pomiarów"
        onPress={onExportPDF}
      />
      <SettingsItem 
        icon={FileText} title="Eksportuj do CSV" subtitle="Surowe dane do Excela"
        onPress={onExportCSV}
      />
    </SectionContainer>
  </>
);

const SecuritySection = ({ onOpenSettings, onClearDb }: any) => (
  <>
    <SectionHeader title="Dane i Bezpieczeństwo" />
    <SectionContainer>
      <SettingsItem 
        icon={Shield} title="Uprawnienia Systemowe" subtitle="Zarządzaj dostępem do kamery"
        onPress={onOpenSettings}
      />
      <SettingsItem 
        icon={Trash2} title="Wyczyść całą bazę" subtitle="Nieodwracalne usunięcie historii"
        isDestructive={true} onPress={onClearDb}
      />
    </SectionContainer>
  </>
);

const AboutSection = ({ version, dbStatus }: any) => (
  <>
    <SectionHeader title="O Aplikacji" />
    <View className="border-t border-b border-border">
       <SettingsItem 
        icon={Info} title="Wersja" subtitle={version}
        rightElement={<Text className="text-typography-secondary text-sm">v1.0.0</Text>}
      />
       <SettingsItem 
        icon={Database} title="Baza danych" subtitle={`SQLite (${dbStatus})`}
        rightElement={<Text className="text-typography-secondary text-sm">OK</Text>}
      />
    </View>
  </>
);

export const SettingsScreen = () => {
  const { state, actions } = useSettings();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header Ekrano */}
        <View className="px-6 py-6">
          <Text className="text-3xl font-bold text-typography-main">Ustawienia</Text>
        </View>

        {/* 2. Wyświetlamy sekcje przekazując im dane z Hooka */}
        <AppearanceSection 
            isDarkMode={state.isDarkMode} 
            toggleTheme={actions.setIsDarkMode}
            onNavigateReminders={actions.navigateToReminders}
        />

        <ReportsSection 
            onExportPDF={actions.handleExportPDF}
            onExportCSV={actions.handleExportCSV}
        />

        <SecuritySection 
            onOpenSettings={actions.openSystemSettings}
            onClearDb={actions.handleClearDatabase}
        />

        <AboutSection 
            version={state.appVersion}
            dbStatus={state.dbStatus}
        />

        {/* Footer */}
        <View className="p-6 items-center gap-1">
             <Text className="text-typography-secondary text-xs text-center font-bold">
                 PressureApp &copy; 2026
             </Text>
             <Text className="text-typography-secondary text-[10px] text-center">
                 Dbaj o swoje serce każdego dnia ❤️
             </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};