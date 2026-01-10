import './src/language/index';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import { AppNavigator } from './src/navigation/AppNavigator';
import { useAppInitalization } from './src/hooks/useAppInitialization';
import { AuthProvider } from './src/context/AuthContext';
import { BiometricLockScreen } from './src/components/BiometricLockScreen';

export default function App() {
  const { isReady } = useAppInitalization();

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
        <BiometricLockScreen />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
}
