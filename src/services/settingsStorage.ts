import AsyncStorage from '@react-native-async-storage/async-storage';

const BIO_LOCK_KEY = 'settings_biometric_lock';

export const getBiometricPreference = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(BIO_LOCK_KEY);
    return value === 'true';
  } catch (e) {
    return false;
  }
};

export const setBiometricPreference = async (enabled: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(BIO_LOCK_KEY, String(enabled));
  } catch (e) {
    console.error("Błąd zapisu ustawień", e);
  }
};