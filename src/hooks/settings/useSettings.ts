import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'; 
import { usePdfReport } from '../reports/usePdfReport';
import { clearDatabase } from '../../services/measurementService';
import { useReminders } from './useReminders';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const useSettings = () => {
  const navigation = useNavigation();
  const { generateAndSharePdf, isGenerating } = usePdfReport();
  const { reminderState, reminderActions } = useReminders(); 
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const openDeleteModal = () => setDeleteModalVisible(true);
  const closeDeleteModal = () => setDeleteModalVisible(false);
  const openLanguageModal = () => setLanguageModalVisible(true);
  const closeLanguageModal = () => setLanguageModalVisible(false);

  const confirmChangeLanguage = async (langCode: string) => {
    closeLanguageModal();
    
    if (langCode === i18n.language) return;

    await i18n.changeLanguage(langCode);
    
    Toast.show({
        type: 'success',
        text1: t('toasts.language_changed_title'), 
        text2: t('toasts.language_changed_msg'),
        visibilityTime: 2000,
    });
  };

  const confirmClearDatabase = async () => {
    setDeleteModalVisible(false);
    
    const result = await clearDatabase();
    
    if (result.success) {
      Toast.show({
        type: 'success', 
        text1: t('toasts.db_cleared_title'),
        text2: t('toasts.db_cleared_msg'),
        topOffset: 60,
      });
    } else {
      Toast.show({
        type: 'error', 
        text1: t('errors.general_title'), 
        text2: t('toasts.db_clear_error'),
        topOffset: 60
      });
    }
  };

  const handlePrivacyPolicy = async () => {
    const url = 'https://sites.google.com/view/pressureapp-privacy'; 
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        throw new Error("Cannot open URL");
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('errors.general_title'),
        text2: t('toasts.policy_open_error'),
        topOffset: 60
      });
    }
  };

  const openSystemSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: t('errors.general_title'),
        text2: t('toasts.settings_open_error')
      });
    }
  };

  const handleExportPDF = async () => await generateAndSharePdf();

  return {
    state: {
      appVersion: "1.4.0",
      dbStatus: "Local",
      isProcessing: isGenerating,
      reminderPicker: reminderState,
      isDeleteModalVisible,
      isLanguageModalVisible,
      currentLanguage: i18n.language
    },
    actions: {
      handlePrivacyPolicy,
      openDeleteModal,      
      closeDeleteModal,    
      confirmClearDatabase,
      openSystemSettings,
      handleExportPDF,
      openLanguageModal,
      closeLanguageModal,
      confirmChangeLanguage,
      reminders: reminderActions
    }
  };
};