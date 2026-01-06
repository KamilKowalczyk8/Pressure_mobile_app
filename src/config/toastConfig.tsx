import React from 'react';
import { View, Text } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import { CheckCircle, XCircle } from 'lucide-react-native';

interface ToastConfig {
  [key: string]: (props: BaseToastProps) => React.JSX.Element;
}

export const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <View className="w-[90%] bg-white p-4 rounded-2xl flex-row items-center shadow-sm border-l-[10px] border-green-500 mt-4">
      <View className="mr-4">
        <CheckCircle size={28} color="#22c55e" />
      </View>
      
      <View className="flex-1">
        <Text className="text-gray-900 font-bold text-base">
          {text1}
        </Text>
        {text2 && (
          <Text className="text-gray-500 text-sm mt-1">
            {text2}
          </Text>
        )}
      </View>
    </View>
  ),

  error: ({ text1, text2 }) => (
    <View className="w-[90%] bg-white p-4 rounded-2xl flex-row items-center shadow-sm border-l-[10px] border-red-500 mt-4">
      <View className="mr-4">
        <XCircle size={28} color="#ef4444" />
      </View>
      
      <View className="flex-1">
        <Text className="text-gray-900 font-bold text-base">
          {text1}
        </Text>
        {text2 && (
          <Text className="text-gray-500 text-sm mt-1">
            {text2}
          </Text>
        )}
      </View>
    </View>
  ),
};