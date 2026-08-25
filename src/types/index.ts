export type DoseStatus = 'pending' | 'taken' | 'snoozed' | 'omitted';

export type MedicationFrequency = 
  | 'Todos los días'
  | 'Cada 8 horas'
  | 'Cada 12 horas'
  | 'Cada 24 horas'
  | 'Días específicos'
  | 'Según necesidad';

export type MedicationIconType = 'pill' | 'capsule' | 'tablet' | 'bottle' | 'dropper' | 'syringe' | 'heart' | 'clock';

export interface Medication {
  id: string;
  name: string;
  dose: string;
  unit: string;
  frequency: MedicationFrequency | string;
  times: string[]; // e.g. ["08:00", "20:00"]
  stock: number;
  stockUnit: string;
  lowStockThreshold: number;
  instructions: string;
  color: string;
  icon: MedicationIconType;
  active: boolean;
  createdAt: string;
}

export interface DoseLog {
  id: string;
  medicationId: string;
  medicationName: string;
  dose: string;
  unit: string;
  instructions?: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  originalTime?: string; // HH:mm (if snoozed)
  status: DoseStatus;
  actualTimestamp?: string; // ISO string when confirmed/omitted
  notes?: string;
  snoozeCount?: number;
  color?: string;
  icon?: MedicationIconType;
}

export type ContactType = 'doctor' | 'emergency' | 'caregiver';

export interface Contact {
  id: string;
  name: string;
  type: ContactType;
  specialty?: string;
  relationship?: string;
  phone: string;
  hospital?: string;
  notes?: string;
  isPrimary?: boolean;
}

export interface UserProfile {
  name: string;
  age: string | number;
  gender: string;
  allergies: string[];
  bloodType: string;
  conditions: string[];
  caregiverName: string;
  caregiverPhone: string;
  notes: string;
}

export type TextSizeLevel = 'normal' | 'large' | 'xlarge';

export interface AppSettings {
  textSize: TextSizeLevel;
  highContrast: boolean;
  soundEffects: boolean;
  speechReminders: boolean;
  reminderAdvanceMinutes: number;
  notificationsEnabled: boolean;
}

export interface AdherenceStats {
  totalScheduled: number;
  totalTaken: number;
  totalOmitted: number;
  totalSnoozed: number;
  adherenceRate: number; // percentage 0 to 100
  streakDays: number;
  weeklyBreakdown: {
    day: string;
    date: string;
    rate: number;
    taken: number;
    total: number;
  }[];
}
