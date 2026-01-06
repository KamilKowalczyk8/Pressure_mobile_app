import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Brak uprawnień do powiadomień!');
    return false;
  }
  return true;
};

export const scheduleReminder = async (
  title: string, 
  body: string, 
  hour: number, 
  minute: number
) => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) return;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Przypomnienia',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#2563EB',
    });
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: true, 
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour: hour,
      minute: minute,
      repeats: true, 
      channelId: 'default', 
    },
  });

  console.log(`Zaplanowano powiadomienie ID: ${id} na godzinę ${hour}:${minute}`);
  return id;
};

export const cancelAllReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};