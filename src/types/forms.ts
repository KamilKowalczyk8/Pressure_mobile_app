import { TimeOfDay } from './domain';

export interface MeasurementFormData {
  systolic: string;
  diastolic: string;
  pulse: string;
  timeOfDay: TimeOfDay;
  note: string;
}