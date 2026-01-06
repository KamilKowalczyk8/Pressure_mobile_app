import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  isDestructive?: boolean; 
}

export const ConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Potwierdź",
  isDestructive = false
}: ConfirmationModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        
        <View className="bg-white w-full rounded-2xl p-6 shadow-xl items-center">
          
          <View className={`p-4 rounded-full mb-4 ${isDestructive ? 'bg-red-50' : 'bg-blue-50'}`}>
            <AlertTriangle 
                size={32} 
                color={isDestructive ? '#EF4444' : '#2563EB'} 
                strokeWidth={2.5}
            />
          </View>

          <Text className="text-xl font-bold text-typography-main text-center mb-2">
            {title}
          </Text>
          <Text className="text-typography-secondary text-center mb-6 leading-5">
            {message}
          </Text>

          <View className="flex-row gap-3 w-full">
            <TouchableOpacity 
              onPress={onClose}
              className="flex-1 py-3 bg-gray-100 rounded-xl items-center active:bg-gray-200"
            >
              <Text className="text-gray-700 font-semibold">Anuluj</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={onConfirm}
              className={`flex-1 py-3 rounded-xl items-center ${isDestructive ? 'bg-red-500 active:bg-red-600' : 'bg-blue-500 active:bg-blue-600'}`}
            >
              <Text className="text-white font-bold">
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};