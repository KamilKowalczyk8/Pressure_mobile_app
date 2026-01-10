import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import pl from './pl.json';
import en from './en.json';
import de from './de.json';
import es from './es.json';

const RESOURCES = {
  pl: { translation: pl },
  en: { translation: en },
  de: { translation: de },
  es: { translation: es },
};

const LANGUAGE_STORAGE_KEY = 'user-language';

const languageDetector: any = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      
      if (savedLanguage) {
        return callback(savedLanguage);
      }

      const deviceLanguage = Localization.getLocales()[0]?.languageCode;
      
      if (deviceLanguage && ['pl', 'en', 'de', 'es'].includes(deviceLanguage)) {
        return callback(deviceLanguage);
      }

      return callback('pl');
    } catch (error) {
      console.error('Error reading language', error);
      callback('pl');
    }
  },
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error('Error saving language', error);
    }
  },
};

i18n
  .use(languageDetector) 
  .use(initReactI18next)
  .init({
    resources: RESOURCES,
    fallbackLng: 'en',     
    compatibilityJSON: 'v4', 
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, 
    },
  });

export default i18n;