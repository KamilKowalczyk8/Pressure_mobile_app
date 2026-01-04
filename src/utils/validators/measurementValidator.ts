import { FormErrors } from '../../hooks/add_measurement/useMeasurementForm';

interface RawMeasurementData {
  systolic: string;
  diastolic: string;
  pulse: string;
  note: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

const isNumeric = (val: string) => /^\d+$/.test(val);

export const validateMeasurement = (data: RawMeasurementData): ValidationResult => {
  const errors: FormErrors = {};
  let isValid = true;

  if (!data.systolic) {
    errors.systolic = "Wymagane";
    isValid = false;
  } else if (!isNumeric(data.systolic)) {
    errors.systolic = "Tylko cyfry"; 
    isValid = false;
  } else if (data.systolic.length > 3) {
    errors.systolic = "Max 3 cyfry";
    isValid = false;
  } else {
    const sys = parseInt(data.systolic, 10);
    if (sys < 50 || sys > 300) {
      errors.systolic = "Zakres 50-300";
      isValid = false;
    }
  }

  if (!data.diastolic) {
    errors.diastolic = "Wymagane";
    isValid = false;
  } else if (!isNumeric(data.diastolic)) {
    errors.diastolic = "Tylko cyfry";
    isValid = false;
  } else if (data.diastolic.length > 3) {
    errors.diastolic = "Max 3 cyfry";
    isValid = false;
  } else {
    const dia = parseInt(data.diastolic, 10);
    if (dia < 30 || dia > 200) {
      errors.diastolic = "Zakres 30-200";
      isValid = false;
    }
  }

  if (!data.pulse) {
    errors.pulse = "Wymagane";
    isValid = false;
  } else if (!isNumeric(data.pulse)) {
    errors.pulse = "Tylko cyfry";
    isValid = false;
  } else if (data.pulse.length > 3) {
    errors.pulse = "Max 3 cyfry";
    isValid = false;
  } else {
    const pul = parseInt(data.pulse, 10);
    if (pul < 30 || pul > 250) {
      errors.pulse = "Zakres 30-250";
      isValid = false;
    }
  }

  if (data.note.length > 40) {
    errors.note = "Maksymalnie 40 znaków";
    isValid = false;
  }

  return { isValid, errors };
};