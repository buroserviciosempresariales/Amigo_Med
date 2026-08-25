import type { Medication, DoseLog, Contact, UserProfile, AppSettings } from '../types';
import { getTodayDateString } from '../utils/dateUtils';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'María González',
  age: 72,
  gender: 'Femenino',
  bloodType: 'O+',
  allergies: ['Penicilina', 'Ibuprofeno'],
  conditions: ['Hipertensión arterial', 'Diabetes tipo 2', 'Colesterol'],
  caregiverName: 'Sofía González (Hija)',
  caregiverPhone: '+34 612 345 678',
  notes: 'Toma sus medicamentos con agua natural. Prefiere recordatorios con sonido suave.'
};

export const INITIAL_SETTINGS: AppSettings = {
  textSize: 'large',
  highContrast: false,
  soundEffects: true,
  speechReminders: false,
  reminderAdvanceMinutes: 5,
  notificationsEnabled: true
};

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    name: 'Losartán',
    dose: '50',
    unit: 'mg',
    frequency: 'Todos los días',
    times: ['08:00'],
    stock: 24,
    stockUnit: 'comprimidos',
    lowStockThreshold: 5,
    instructions: 'Tomar por la mañana con un vaso entero de agua',
    color: '#0284C7',
    icon: 'pill',
    active: true,
    createdAt: '2026-08-01T08:00:00Z'
  },
  {
    id: 'med-2',
    name: 'Metformina',
    dose: '850',
    unit: 'mg',
    frequency: 'Todos los días',
    times: ['13:00'],
    stock: 18,
    stockUnit: 'tabletas',
    lowStockThreshold: 6,
    instructions: 'Tomar inmediatamente después del almuerzo',
    color: '#0D9488',
    icon: 'tablet',
    active: true,
    createdAt: '2026-08-01T08:00:00Z'
  },
  {
    id: 'med-3',
    name: 'Atorvastatina',
    dose: '20',
    unit: 'mg',
    frequency: 'Todos los días',
    times: ['21:00'],
    stock: 22,
    stockUnit: 'comprimidos',
    lowStockThreshold: 4,
    instructions: 'Tomar por la noche antes de dormir',
    color: '#8B5CF6',
    icon: 'capsule',
    active: true,
    createdAt: '2026-08-01T08:00:00Z'
  },
  {
    id: 'med-4',
    name: 'Omeprazol',
    dose: '20',
    unit: 'mg',
    frequency: 'Todos los días',
    times: ['07:30'],
    stock: 8,
    stockUnit: 'cápsulas',
    lowStockThreshold: 5,
    instructions: 'Tomar 30 minutos antes del desayuno en ayunas',
    color: '#F59E0B',
    icon: 'capsule',
    active: true,
    createdAt: '2026-08-01T08:00:00Z'
  }
];

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'contact-1',
    name: 'Dr. Carlos Mendoza',
    type: 'doctor',
    specialty: 'Cardiología y Medicina General',
    phone: '+34 912 345 671',
    hospital: 'Hospital Central - Consultorio 304',
    notes: 'Cita de control el día 15 de cada mes.',
    isPrimary: true
  },
  {
    id: 'contact-2',
    name: 'Sofía González',
    type: 'emergency',
    relationship: 'Hija (Contacto de Emergencia)',
    phone: '+34 612 345 678',
    notes: 'Vive cerca. Tiene llave de la vivienda.',
    isPrimary: true
  },
  {
    id: 'contact-3',
    name: 'Elena Ramos',
    type: 'caregiver',
    relationship: 'Cuidadora de apoyo',
    phone: '+34 622 987 654',
    notes: 'Horario: Lunes a Viernes de 09:00 a 14:00',
    isPrimary: false
  }
];

/**
 * Generates initial realistic dose logs for the last 7 days + today
 */
export const generateInitialLogs = (): DoseLog[] => {
  const logs: DoseLog[] = [];
  const today = new Date();
  
  // Past 6 days
  for (let i = 6; i >= 1; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    // Omeprazol 07:30 (mostly taken)
    logs.push({
      id: `log-omeprazol-${dateStr}`,
      medicationId: 'med-4',
      medicationName: 'Omeprazol',
      dose: '20',
      unit: 'mg',
      instructions: 'Tomar 30 minutos antes del desayuno',
      scheduledDate: dateStr,
      scheduledTime: '07:30',
      status: 'taken',
      actualTimestamp: `${dateStr}T07:35:00Z`,
      color: '#F59E0B',
      icon: 'capsule'
    });

    // Losartan 08:00 (mostly taken)
    logs.push({
      id: `log-losartan-${dateStr}`,
      medicationId: 'med-1',
      medicationName: 'Losartán',
      dose: '50',
      unit: 'mg',
      instructions: 'Tomar por la mañana con agua',
      scheduledDate: dateStr,
      scheduledTime: '08:00',
      status: i === 3 ? 'snoozed' : 'taken',
      actualTimestamp: i === 3 ? `${dateStr}T08:30:00Z` : `${dateStr}T08:02:00Z`,
      color: '#0284C7',
      icon: 'pill'
    });

    // Metformina 13:00 (one omitted on day 4)
    logs.push({
      id: `log-metformina-${dateStr}`,
      medicationId: 'med-2',
      medicationName: 'Metformina',
      dose: '850',
      unit: 'mg',
      instructions: 'Tomar después del almuerzo',
      scheduledDate: dateStr,
      scheduledTime: '13:00',
      status: i === 4 ? 'omitted' : 'taken',
      actualTimestamp: i === 4 ? undefined : `${dateStr}T13:15:00Z`,
      notes: i === 4 ? 'Comió fuera de casa' : undefined,
      color: '#0D9488',
      icon: 'tablet'
    });

    // Atorvastatina 21:00 (one omitted on day 2)
    logs.push({
      id: `log-atorvastatina-${dateStr}`,
      medicationId: 'med-3',
      medicationName: 'Atorvastatina',
      dose: '20',
      unit: 'mg',
      instructions: 'Tomar por la noche',
      scheduledDate: dateStr,
      scheduledTime: '21:00',
      status: i === 2 ? 'omitted' : 'taken',
      actualTimestamp: i === 2 ? undefined : `${dateStr}T21:05:00Z`,
      color: '#8B5CF6',
      icon: 'capsule'
    });
  }

  // Today's logs
  const todayStr = getTodayDateString();

  // Omeprazol (already taken this morning)
  logs.push({
    id: `log-omeprazol-${todayStr}`,
    medicationId: 'med-4',
    medicationName: 'Omeprazol',
    dose: '20',
    unit: 'mg',
    instructions: 'Tomar 30 minutos antes del desayuno',
    scheduledDate: todayStr,
    scheduledTime: '07:30',
    status: 'taken',
    actualTimestamp: `${todayStr}T07:32:00Z`,
    color: '#F59E0B',
    icon: 'capsule'
  });

  // Losartán (Pending upcoming dose)
  logs.push({
    id: `log-losartan-${todayStr}`,
    medicationId: 'med-1',
    medicationName: 'Losartán',
    dose: '50',
    unit: 'mg',
    instructions: 'Tomar por la mañana con un vaso entero de agua',
    scheduledDate: todayStr,
    scheduledTime: '08:00',
    status: 'pending',
    color: '#0284C7',
    icon: 'pill'
  });

  // Metformina (Pending later today)
  logs.push({
    id: `log-metformina-${todayStr}`,
    medicationId: 'med-2',
    medicationName: 'Metformina',
    dose: '850',
    unit: 'mg',
    instructions: 'Tomar inmediatamente después del almuerzo',
    scheduledDate: todayStr,
    scheduledTime: '13:00',
    status: 'pending',
    color: '#0D9488',
    icon: 'tablet'
  });

  // Atorvastatina (Pending tonight)
  logs.push({
    id: `log-atorvastatina-${todayStr}`,
    medicationId: 'med-3',
    medicationName: 'Atorvastatina',
    dose: '20',
    unit: 'mg',
    instructions: 'Tomar por la noche antes de dormir',
    scheduledDate: todayStr,
    scheduledTime: '21:00',
    status: 'pending',
    color: '#8B5CF6',
    icon: 'capsule'
  });

  return logs;
};
