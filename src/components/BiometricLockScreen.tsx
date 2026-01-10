import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Lock } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export const BiometricLockScreen = () => {
  const { isLocked, unlockApp } = useAuth();
  const { t } = useTranslation();

  if (!isLocked) {
    return null;
  }

  return (
    <View style={styles.container} className="bg-blue-600 justify-center items-center absolute inset-0 z-50 w-full h-full">
      <View className="bg-white p-6 rounded-full mb-6 shadow-lg">
          <Lock size={48} color="#2563EB" />
      </View>
      <Text className="text-white text-3xl font-bold mb-2">{t('name_app')}</Text>
      <Text className="text-blue-100 mb-8 text-lg">{t('auth.app_locked')}</Text>
      
      <TouchableOpacity 
        onPress={unlockApp}
        className="bg-white px-10 py-4 rounded-xl active:bg-gray-100 shadow-sm"
      >
        <Text className="text-blue-600 font-bold text-lg">{t('auth.unlock_button')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999, 
    elevation: 10, 
  }
});