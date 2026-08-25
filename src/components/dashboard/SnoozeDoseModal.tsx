import React, { useState } from 'react';
import type { DoseLog } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Clock, RefreshCw, Check } from 'lucide-react';
import { addMinutesToTime, formatTimeCompact } from '../../utils/dateUtils';

interface SnoozeDoseModalProps {
  isOpen: boolean;
  onClose: () => void;
  doseLog: DoseLog | null;
  onSnooze: (logId: string, minutes: number, customTime?: string) => void;
}

export const SnoozeDoseModal: React.FC<SnoozeDoseModalProps> = ({
  isOpen,
  onClose,
  doseLog,
  onSnooze
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(15);
  const [customTime, setCustomTime] = useState<string>('');
  const [useCustom, setUseCustom] = useState(false);

  if (!doseLog) return null;

  const calculatedNewTime = addMinutesToTime(doseLog.scheduledTime, selectedMinutes);

  const handleSnooze = () => {
    if (useCustom && customTime) {
      onSnooze(doseLog.id, 0, customTime);
    } else {
      onSnooze(doseLog.id, selectedMinutes);
    }
    onClose();
  };

  const presetOptions = [
    { label: '15 minutos', mins: 15, sub: `A las ${addMinutesToTime(doseLog.scheduledTime, 15)}` },
    { label: '30 minutos', mins: 30, sub: `A las ${addMinutesToTime(doseLog.scheduledTime, 30)}` },
    { label: '1 hora', mins: 60, sub: `A las ${addMinutesToTime(doseLog.scheduledTime, 60)}` }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="¿Cuánto tiempo deseas posponer?"
      subtitle="Te recordaremos nuevamente en el horario que elijas"
      icon={<Clock className="w-8 h-8 text-amber-600" />}
      maxWidth="md"
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="warning"
            size="xl"
            onClick={handleSnooze}
            leftIcon={<Check className="w-6 h-6 text-slate-950" />}
          >
            Guardar nuevo horario
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        
        {/* Current Med Info */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold text-slate-900">{doseLog.medicationName}</h4>
            <p className="text-sm font-semibold text-amber-900">
              Hora actual: {formatTimeCompact(doseLog.scheduledTime)}
            </p>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-xl border border-amber-200 text-sm font-bold text-amber-800 flex items-center gap-1.5">
            <RefreshCw className="w-4 h-4" />
            <span>Pospuesta {doseLog.snoozeCount || 0} veces</span>
          </div>
        </div>

        {/* Quick Preset Buttons */}
        <div className="flex flex-col gap-3">
          <label className="text-base font-bold text-slate-800">
            Selecciona un tiempo rápido:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {presetOptions.map(opt => (
              <button
                key={opt.mins}
                type="button"
                onClick={() => {
                  setSelectedMinutes(opt.mins);
                  setUseCustom(false);
                }}
                className={`p-4 rounded-2xl border-3 text-center transition-all touch-target-senior flex flex-col items-center justify-center ${
                  !useCustom && selectedMinutes === opt.mins
                    ? 'border-amber-500 bg-amber-100/70 text-slate-950 shadow-md font-extrabold scale-[1.02]'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold'
                }`}
              >
                <span className="text-lg font-black">{opt.label}</span>
                <span className="text-xs text-slate-600 font-semibold mt-1">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Or Custom Time Picker */}
        <div className="border-t-2 border-slate-200 pt-4">
          <button
            type="button"
            onClick={() => setUseCustom(!useCustom)}
            className="text-base font-bold text-sky-700 hover:text-sky-800 underline flex items-center gap-1.5"
          >
            <span>{useCustom ? '✓ Usar horario personalizado' : 'O elegir una hora exacta específica'}</span>
          </button>

          {useCustom && (
            <div className="mt-3 bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 flex items-center gap-3">
              <Clock className="w-6 h-6 text-slate-600" />
              <div className="flex-1">
                <label htmlFor="custom-time-input" className="text-sm font-bold text-slate-800 block mb-1">
                  Ingresa la hora deseada:
                </label>
                <input
                  id="custom-time-input"
                  type="time"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="w-full bg-white text-lg font-bold p-3 rounded-xl border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Summary preview */}
        <div className="bg-sky-50 p-3.5 rounded-2xl border border-sky-200 text-center text-sm sm:text-base font-bold text-sky-900">
          El recordatorio se activará a las: <span className="text-sky-700 text-lg font-black">{useCustom && customTime ? customTime : calculatedNewTime} hrs</span>
        </div>

      </div>
    </Modal>
  );
};
