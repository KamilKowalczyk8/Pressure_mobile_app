import { useNavigation } from '@react-navigation/native';

export const useAppHeader = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleGoToSettings = () => {
    console.log('Nawigacja do ustawień...');
  };

  return {
    handleGoBack,
    handleGoToSettings
  };
};