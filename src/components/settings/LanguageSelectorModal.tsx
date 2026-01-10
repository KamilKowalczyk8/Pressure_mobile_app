import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Globe, Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (langCode: string) => void;
  currentLanguage: string;
}

export const LanguageSelectorModal = ({ 
  visible, 
  onClose, 
  onConfirm, 
  currentLanguage 
}: LanguageSelectorModalProps) => {
  const { t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(currentLanguage);

  useEffect(() => {
    if (visible) {
      setSelectedLang(currentLanguage);
    }
  }, [visible, currentLanguage]);

  const languages = [
    { code: 'pl', label: t('lang_pl') }, 
    { code: 'en', label: t('lang_en') },
    { code: 'de', label: t('lang_de') }, 
    { code: 'es', label: t('lang_es') }, 
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-white w-full rounded-3xl p-6 shadow-xl">
          
          <View className="items-center mb-6">
            <View className="bg-blue-50 p-4 rounded-full mb-3">
              <Globe size={32} color="#2563EB" />
            </View>
            <Text className="text-xl font-bold text-typography-main">
              {t('language_select_title')}
            </Text>
            <Text className="text-typography-secondary text-center mt-1">
              {t('language_select_msg')}
            </Text>
          </View>

          <View className="gap-3 mb-8">
            {languages.map((lang) => {
              const isActive = selectedLang === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => setSelectedLang(lang.code)}
                  className={`
                    flex-row items-center justify-between p-4 rounded-xl border-2
                    ${isActive ? 'border-primary bg-blue-50' : 'border-border bg-background-paper'}
                  `}
                >
                  <Text className={`font-bold text-lg ${isActive ? 'text-primary' : 'text-typography-main'}`}>
                    {lang.label}
                  </Text>
                  
                  <View className={`
                    w-6 h-6 rounded-full border-2 items-center justify-center
                    ${isActive ? 'border-primary bg-primary' : 'border-gray-300 bg-transparent'}
                  `}>
                    {isActive && <Check size={14} color="white" strokeWidth={4} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity 
              onPress={onClose}
              className="flex-1 py-4 bg-gray-100 rounded-xl items-center active:bg-gray-200"
            >
              <Text className="text-gray-700 font-bold text-base">{t('cancel')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => onConfirm(selectedLang)}
              className="flex-1 py-4 bg-primary rounded-xl items-center active:bg-blue-700 shadow-sm"
            >
              <Text className="text-white font-bold text-base">{t('confirm')}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};