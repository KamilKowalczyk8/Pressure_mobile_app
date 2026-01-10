import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { getBiometricPreference, setBiometricPreference } from '../services/settingsStorage';
import { useTranslation } from 'react-i18next';

interface AuthContextType {
  isLocked: boolean;
  isBiometricsEnabled: boolean;
  unlockApp: () => Promise<void>;
  toggleBiometrics: (value: boolean) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true); 
  const { t } = useTranslation();

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const enabled = await getBiometricPreference();
        setIsBiometricsEnabled(enabled);

        if (enabled) {
          setIsLocked(true);
          authenticate();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsAuthLoading(false);
      }
    };
    loadSettings();
  }, []);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) return;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: t('auth.unlock_prompt'),
      disableDeviceFallback: false,
    });

    if (result.success) {
      setIsLocked(false);
    }
  };

  const toggleBiometrics = async (value: boolean): Promise<boolean> => {
    if (value) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t('auth.enable_prompt'),
      });
      if (!result.success) return false;
    }
    setIsBiometricsEnabled(value);
    await setBiometricPreference(value);
    return true;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) && 
        nextAppState === 'active' && 
        isBiometricsEnabled
      ) {
        setIsLocked(true);
        authenticate();
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, [isBiometricsEnabled]);

  if (isAuthLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLocked, isBiometricsEnabled, unlockApp: authenticate, toggleBiometrics }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);