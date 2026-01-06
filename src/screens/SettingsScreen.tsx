import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell } from 'lucide-react-native';  
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { useSettings } from '../hooks/settings/useSettings';
import { ReportsSection } from '../components/settings/sections/ReportsSection';
import { SecuritySection } from '../components/settings/sections/SecuritySection';
import { AboutSection } from '../components/settings/sections/AboutSection';
import { useAppHeader } from '../hooks/useAppHeader';
import { SettingsItem, SectionHeader, SectionContainer } from '../components/settings/SettingsShared';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { SupportSection } from '../components/settings/sections/SupportSection';

export const SettingsScreen = () => {
  const { state, actions } = useSettings();
  const { handleGoBack } = useAppHeader();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        <View className="relative flex-row items-center justify-center py-4 bg-background-paper border-b border-border-light">
           <TouchableOpacity 
             onPress={handleGoBack}
             className="absolute left-4 p-2 rounded-full active:bg-border-light z-10"
           >
             <ArrowLeft size={24} color="#111827" />
           </TouchableOpacity>
           <Text className="text-3xl font-bold text-typography-main">Ustawienia</Text>
        </View>

        <SectionHeader title="Powiadomienia" />
        <SectionContainer>
            <SettingsItem 
                icon={Bell} 
                title="Konfiguracja Przypomnień" 
                subtitle="Ustaw godzinę codziennego pomiaru"
                onPress={actions.reminders.openPicker} 
            />
        </SectionContainer>

        <ReportsSection 
            onExportPDF={actions.handleExportPDF}
        />
        <SupportSection 
            onPrivacyPolicy={actions.handlePrivacyPolicy}
        />

        <SecuritySection 
            onOpenSettings={actions.openSystemSettings}
            onClearDb={actions.openDeleteModal}
        />

        <AboutSection 
            version={state.appVersion}
            dbStatus={state.dbStatus}
        />

        <View className="p-6 items-center gap-1">
             <Text className="text-typography-secondary text-xs text-center font-bold">
                 PressureApp &copy; 2026
             </Text>
        </View>

      </ScrollView>

      {state.reminderPicker.showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={state.reminderPicker.date}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={actions.reminders.handleTimeChange}
        />
      )}

      <ConfirmationModal
          visible={state.isDeleteModalVisible}
          onClose={actions.closeDeleteModal}
          onConfirm={actions.confirmClearDatabase}
          title="Usuwanie historii"
          message="Czy na pewno chcesz usunąć WSZYSTKIE pomiary? Tej operacji nie można cofnąć."
          confirmText="Usuń wszystko"
          isDestructive={true}
       />

    </SafeAreaView>
  );
};