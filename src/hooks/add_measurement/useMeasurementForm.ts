import { useState } from 'react';
import { TimeOfDay } from '../../types/domain';
import { validateMeasurement } from '../../utils/validators/measurementValidator'; 
import { MeasurementFormData } from '../../types/forms';
import { ScannedMeasurement } from '../../services/ocrService';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

export type FormErrors = {
  systolic?: string;
  diastolic?: string;
  pulse?: string;
  note?: string;
};

export const useMeasurementForm = (onSubmit: (data: MeasurementFormData) => void) => {
  const { t } = useTranslation();
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('Rano'); 
  
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const setScannedData = (data: ScannedMeasurement) => {
    if (data.systolic) {
        setSystolic(data.systolic);
        clearError('systolic');
    }
    if (data.diastolic) {
        setDiastolic(data.diastolic);
        clearError('diastolic');
    }
    if (data.pulse) {
        setPulse(data.pulse);
        clearError('pulse');
    }
  };

  const submit = () => {
    const validationResult = validateMeasurement({
      systolic,
      diastolic,
      pulse,
      note
    });

    setErrors(validationResult.errors);
    if (!validationResult.isValid) {
      Toast.show({
        type: 'error', 
        text1: t('errors.validation_error_title'),
        text2: t('errors.validation_error_msg'),
        topOffset: 60,
      });
      return; 
    }
    
    onSubmit({
      systolic,
      diastolic,
      pulse,
      timeOfDay,
      note
    });
  };
  
  return {
    formState: { systolic, diastolic, pulse, timeOfDay, note },
    errors, 
    setters: {
      setSystolic: (val: string) => { setSystolic(val); clearError('systolic'); },
      setDiastolic: (val: string) => { setDiastolic(val); clearError('diastolic'); },
      setPulse: (val: string) => { setPulse(val); clearError('pulse'); },
      setTimeOfDay,
      setNote: (val: string) => { setNote(val); clearError('note'); },
      setScannedData,
    },
    submit
  };
};