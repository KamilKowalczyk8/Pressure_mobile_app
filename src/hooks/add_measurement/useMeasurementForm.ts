import { useState } from 'react';
import { MeasurementFormData } from '../../components/add_measurement/MeasurementForm';
import { TimeOfDay } from '../../types/domain';
import { validateMeasurement } from '../../utils/validators/measurementValidator'; 

export type FormErrors = {
  systolic?: string;
  diastolic?: string;
  pulse?: string;
  note?: string;
};

export const useMeasurementForm = (onSubmit: (data: MeasurementFormData) => void) => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('Rano'); 
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const submit = () => {
    const validationResult = validateMeasurement({
      systolic,
      diastolic,
      pulse,
      note
    });

    setErrors(validationResult.errors);
    if (!validationResult.isValid) {
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
  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  return {
    formState: { systolic, diastolic, pulse, timeOfDay, note },
    errors, 
    setters: {
      setSystolic: (val: string) => { setSystolic(val); clearError('systolic'); },
      setDiastolic: (val: string) => { setDiastolic(val); clearError('diastolic'); },
      setPulse: (val: string) => { setPulse(val); clearError('pulse'); },
      setTimeOfDay,
      setNote: (val: string) => { setNote(val); clearError('note'); }
    },
    submit
  };
};