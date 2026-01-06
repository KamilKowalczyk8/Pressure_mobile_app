import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'; 
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAppInitalization } from './src/hooks/useAppInitialization'; 
import Toast from 'react-native-toast-message'; 
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
          <StatusBar/>
          <AppNavigator/>
          <BiometricLockScreen />
          <Toast />
        </NavigationContainer>
      </AuthProvider>
  )
}