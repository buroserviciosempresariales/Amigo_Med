import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Medication, DoseLog, Contact, AdherenceStats } from '../types';
import { INITIAL_MEDICATIONS, INITIAL_CONTACTS, generateInitialLogs } from '../data/initialData';
import { getTodayDateString, getCurrentTimeString, addMinutesToTime, DAYS_SPANISH } from '../utils/dateUtils';
import { soundManager } from '../utils/sound';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

interface MedicationContextType {
  medications: Medication[];
  doseLogs: DoseLog[];
  contacts: Contact[];
  todayDoses: DoseLog[];
  nextUpcomingDose: DoseLog | null;
  adherenceStats: AdherenceStats;
  confirmDose: (logId: string, notes?: string) => void;
  snoozeDose: (logId: string, minutes: number, customTime?: string) => void;
  omitDose: (logId: string, reason?: string) => void;
  addMedication: (medData: Omit<Medication, 'id' | 'createdAt'>) => void;
  updateMedication: (id: string, medData: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  toggleMedicationActive: (id: string) => void;
  addContact: (contactData: Omit<Contact, 'id'>) => void;
  updateContact: (id: string, contactData: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  triggerAlarmTest: (medName?: string) => void;
}

const STORAGE_KEY_MEDS = 'amigomed_medications_v1';
const STORAGE_KEY_LOGS = 'amigomed_doselogs_v1';
const STORAGE_KEY_CONTACTS = 'amigomed_contacts_v1';

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [medications, setMedications] = useState<Medication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MEDS);
      return saved ? JSON.parse(saved) : INITIAL_MEDICATIONS;
    } catch {
      return INITIAL_MEDICATIONS;
    }
  });

  const [doseLogs, setDoseLogs] = useState<DoseLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      return saved ? JSON.parse(saved) : generateInitialLogs();
    } catch {
      return generateInitialLogs();
    }
  });

  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTACTS);
      return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
    } catch {
      return INITIAL_CONTACTS;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MEDS, JSON.stringify(medications));
    } catch (e) {
      console.error('Storage error for meds', e);
    }
  }, [medications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(doseLogs));
    } catch (e) {
      console.error('Storage error for logs', e);
    }
  }, [doseLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(contacts));
    } catch (e) {
      console.error('Storage error for contacts', e);
    }
  }, [contacts]);

  // Synchronize today's schedule for active medications
  useEffect(() => {
    const todayStr = getTodayDateString();
    setDoseLogs(prevLogs => {
      const newLogs = [...prevLogs];
      let changed = false;

      medications.filter(m => m.active).forEach(med => {
        med.times.forEach(time => {
          const exists = newLogs.some(
            l => l.medicationId === med.id && l.scheduledDate === todayStr && (l.originalTime === time || l.scheduledTime === time)
          );

          if (!exists) {
            newLogs.push({
              id: `log-${med.id}-${todayStr}-${time.replace(':', '')}`,
              medicationId: med.id,
              medicationName: med.name,
              dose: med.dose,
              unit: med.unit,
              instructions: med.instructions,
              scheduledDate: todayStr,
              scheduledTime: time,
              status: 'pending',
              color: med.color,
              icon: med.icon
            });
            changed = true;
          }
        });
      });

      return changed ? newLogs : prevLogs;
    });
  }, [medications]);

  // Today's doses sorted by scheduled time
  const todayDoses = useMemo(() => {
    const todayStr = getTodayDateString();
    return doseLogs
      .filter(log => log.scheduledDate === todayStr)
      .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
  }, [doseLogs]);

  // Find next upcoming dose (pending or snoozed)
  const nextUpcomingDose = useMemo(() => {
    const pendingDoses = todayDoses.filter(d => d.status === 'pending' || d.status === 'snoozed');
    if (pendingDoses.length === 0) return null;

    const currentTime = getCurrentTimeString();
    
    // Check if there is an overdue or closest upcoming dose
    const upcoming = pendingDoses.find(d => d.scheduledTime >= currentTime);
    return upcoming || pendingDoses[0]; // fallback to first pending
  }, [todayDoses]);

  // Calculate adherence statistics
  const adherenceStats = useMemo<AdherenceStats>(() => {
    const pastAndToday = doseLogs;
    const taken = pastAndToday.filter(l => l.status === 'taken').length;
    const omitted = pastAndToday.filter(l => l.status === 'omitted').length;
    const snoozed = pastAndToday.filter(l => l.status === 'snoozed').length;
    const totalFinished = taken + omitted;

    const rate = totalFinished > 0 ? Math.round((taken / totalFinished) * 100) : 100;

    // Weekly breakdown for the last 7 days
    const weeklyBreakdown = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const dayLogs = doseLogs.filter(l => l.scheduledDate === dateStr);
      const dayTaken = dayLogs.filter(l => l.status === 'taken').length;
      const dayTotal = dayLogs.filter(l => l.status === 'taken' || l.status === 'omitted').length;
      const dayRate = dayTotal > 0 ? Math.round((dayTaken / dayTotal) * 100) : (dayLogs.length > 0 ? 100 : 0);

      weeklyBreakdown.push({
        day: DAYS_SPANISH[d.getDay()].substring(0, 3),
        date: dateStr,
        rate: dayRate,
        taken: dayTaken,
        total: dayTotal || dayLogs.length
      });
    }

    return {
      totalScheduled: pastAndToday.length,
      totalTaken: taken,
      totalOmitted: omitted,
      totalSnoozed: snoozed,
      adherenceRate: rate,
      streakDays: 4, // 4 consecutive days with high adherence
      weeklyBreakdown
    };
  }, [doseLogs]);

  // Action: Confirm Dose
  const confirmDose = useCallback((logId: string, notes?: string) => {
    const targetLog = doseLogs.find(l => l.id === logId);
    const nowIso = new Date().toISOString();

    setDoseLogs(prev =>
      prev.map(log => {
        if (log.id === logId) {
          return {
            ...log,
            status: 'taken',
            actualTimestamp: nowIso,
            notes: notes || log.notes
          };
        }
        return log;
      })
    );

    // Reduce stock if available
    if (targetLog) {
      setMedications(prev =>
        prev.map(med => {
          if (med.id === targetLog.medicationId && med.stock > 0) {
            const newStock = Math.max(0, med.stock - 1);
            if (newStock <= med.lowStockThreshold) {
              showToast(
                `Quedan ${newStock} ${med.stockUnit} de ${med.name}. Recuerda reponer pronto.`,
                'warning',
                'Stock bajo de medicamento'
              );
            }
            return { ...med, stock: newStock };
          }
          return med;
        })
      );
    }

    // Play pleasant chime
    soundManager.playSuccess();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti fallback
    }

    showToast(
      `✓ Toma de ${targetLog ? targetLog.medicationName : 'medicamento'} registrada correctamente.`,
      'success',
      '¡Toma Confirmada!'
    );
  }, [doseLogs, showToast]);

  // Action: Snooze Dose
  const snoozeDose = useCallback((logId: string, minutes: number, customTime?: string) => {
    let newTime = '';
    const targetLog = doseLogs.find(l => l.id === logId);
    if (!targetLog) return;

    if (customTime) {
      newTime = customTime;
    } else {
      const baseTime = targetLog.scheduledTime;
      newTime = addMinutesToTime(baseTime, minutes);
    }

    setDoseLogs(prev =>
      prev.map(log => {
        if (log.id === logId) {
          return {
            ...log,
            originalTime: log.originalTime || log.scheduledTime,
            scheduledTime: newTime,
            status: 'snoozed',
            snoozeCount: (log.snoozeCount || 0) + 1
          };
        }
        return log;
      })
    );

    soundManager.playSnooze();

    showToast(
      `Recordatorio de ${targetLog.medicationName} pospuesto para las ${newTime} hrs.`,
      'info',
      'Recordatorio Pospuesto'
    );
  }, [doseLogs, showToast]);

  // Action: Omit Dose
  const omitDose = useCallback((logId: string, reason?: string) => {
    const targetLog = doseLogs.find(l => l.id === logId);
    const nowIso = new Date().toISOString();

    setDoseLogs(prev =>
      prev.map(log => {
        if (log.id === logId) {
          return {
            ...log,
            status: 'omitted',
            actualTimestamp: nowIso,
            notes: reason || 'Omitida por el usuario'
          };
        }
        return log;
      })
    );

    soundManager.playClick();

    showToast(
      `La toma de ${targetLog ? targetLog.medicationName : 'medicamento'} fue registrada como omitida.`,
      'info',
      'Toma Omitida'
    );
  }, [doseLogs, showToast]);

  // Medication CRUD
  const addMedication = useCallback((medData: Omit<Medication, 'id' | 'createdAt'>) => {
    const newId = `med-${Date.now()}`;
    const newMed: Medication = {
      ...medData,
      id: newId,
      createdAt: new Date().toISOString()
    };

    setMedications(prev => [...prev, newMed]);
    soundManager.playSuccess();
    showToast(`✓ "${newMed.name}" fue agregado correctamente.`, 'success', 'Medicamento Registrado');
  }, [showToast]);

  const updateMedication = useCallback((id: string, medData: Partial<Medication>) => {
    setMedications(prev =>
      prev.map(med => {
        if (med.id === id) {
          return { ...med, ...medData };
        }
        return med;
      })
    );

    // Update today's pending logs if medication name/dose changed
    setDoseLogs(prevLogs =>
      prevLogs.map(log => {
        if (log.medicationId === id && log.status === 'pending') {
          return {
            ...log,
            medicationName: medData.name || log.medicationName,
            dose: medData.dose || log.dose,
            unit: medData.unit || log.unit,
            instructions: medData.instructions !== undefined ? medData.instructions : log.instructions,
            color: medData.color || log.color
          };
        }
        return log;
      })
    );

    soundManager.playSuccess();
    showToast('✓ Cambios guardados correctamente.', 'success', 'Medicamento Actualizado');
  }, [showToast]);

  const deleteMedication = useCallback((id: string) => {
    const target = medications.find(m => m.id === id);
    setMedications(prev => prev.filter(m => m.id !== id));
    // Remove only today's pending logs
    const todayStr = getTodayDateString();
    setDoseLogs(prev => prev.filter(l => !(l.medicationId === id && l.scheduledDate === todayStr && l.status === 'pending')));

    soundManager.playClick();
    showToast(`"${target?.name || 'Medicamento'}" ha sido eliminado.`, 'info', 'Medicamento Eliminado');
  }, [medications, showToast]);

  const toggleMedicationActive = useCallback((id: string) => {
    setMedications(prev =>
      prev.map(med => {
        if (med.id === id) {
          const nextActive = !med.active;
          showToast(
            nextActive ? `"${med.name}" activado en tus recordatorios.` : `"${med.name}" pausado temporalmente.`,
            'info',
            'Estado Actualizado'
          );
          return { ...med, active: nextActive };
        }
        return med;
      })
    );
  }, [showToast]);

  // Contact CRUD
  const addContact = useCallback((contactData: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contactData,
      id: `contact-${Date.now()}`
    };
    setContacts(prev => [...prev, newContact]);
    soundManager.playSuccess();
    showToast(`✓ Contacto "${newContact.name}" agregado.`, 'success', 'Contacto Guardado');
  }, [showToast]);

  const updateContact = useCallback((id: string, contactData: Partial<Contact>) => {
    setContacts(prev =>
      prev.map(c => {
        if (c.id === id) {
          return { ...c, ...contactData };
        }
        return c;
      })
    );
    showToast('✓ Contacto actualizado correctamente.', 'success', 'Contacto Actualizado');
  }, [showToast]);

  const deleteContact = useCallback((id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    showToast('Contacto eliminado.', 'info', 'Contacto Eliminado');
  }, [showToast]);

  // Trigger test alarm simulation
  const triggerAlarmTest = useCallback((medName = 'Losartán 50 mg') => {
    soundManager.playReminder();
    soundManager.speak(`Hola María, es hora de tomar tu medicamento: ${medName}`);
    showToast(
      `¡Hora de tu medicamento! Toma ${medName} con un vaso de agua.`,
      'warning',
      'Recordatorio en Vivo',
      7000
    );
  }, [showToast]);

  return (
    <MedicationContext.Provider
      value={{
        medications,
        doseLogs,
        contacts,
        todayDoses,
        nextUpcomingDose,
        adherenceStats,
        confirmDose,
        snoozeDose,
        omitDose,
        addMedication,
        updateMedication,
        deleteMedication,
        toggleMedicationActive,
        addContact,
        updateContact,
        deleteContact,
        triggerAlarmTest
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedications = () => {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error('useMedications must be used within a MedicationProvider');
  }
  return context;
};
