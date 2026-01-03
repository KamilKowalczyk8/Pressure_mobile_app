import { TimeOfDay } from '../types/domain';

export interface Measurement {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number;
  timeOfDay: TimeOfDay; 
  createdAt: string;    
  note?: string | null;
}