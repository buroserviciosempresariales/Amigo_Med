import React, { useState } from 'react';
import type { DoseLog } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { CheckCircle2, Clock, Calendar, Check, MessageSquare } from 'lucide-react';
import { formatTimeCompact, getCurrentTimeString } from '../../utils/dateUtils';
import { AmigoBot } from '../mascot/AmigoBot';

interface ConfirmDoseModalProps {
  isOpen: boolean;
  onClose: () => void;
  doseLog: DoseLog | null;
  onConfirm: (logId: string, notes?: string) => void;
}

export const ConfirmDoseModal: React.FC<ConfirmDoseModalProps> = ({
  isOpen,
  onClose,
  doseLog,
  onConfirm
}) => {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!doseLog) return null;

  const currentTime = getCurrentTimeString();

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm(doseLog.id, notes.trim() || undefined);
      setIsSubmitting(false);
      setNotes('');
      onClose();
    }, 250);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="¿Confirmas que tomaste este medicamento?"
      subtitle="Registraremos la hora exacta para tu historial médico"
      icon={<CheckCircle2 className="w-8 h-8 text-emerald-600" />}
      maxWidth="md"
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="success"
            size="xl"
            onClick={handleConfirm}
            isLoading={isSubmitting}
            leftIcon={<Check className="w-7 h-7" />}
          >
            Sí, la he tomado
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        
        {/* Medication Info Card */}
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 sm:p-6 flex items-start gap-4">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md flex-shrink-0"
            style={{ backgroundColor: doseLog.color || '#0284C7' }}
          >
            {doseLog.medicationName.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {doseLog.medicationName}
            </h4>
            <p className="text-lg sm:text-xl font-bold text-emerald-900 mt-1">
              Dosis: {doseLog.dose} {doseLog.unit}
            </p>
            {doseLog.instructions && (
              <p className="text-sm sm:text-base text-slate-700 mt-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                💡 {doseLog.instructions}
              </p>
            )}
          </div>
        </div>

        {/* Time Comparison Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl flex items-center gap-3">
            <Clock className="w-6 h-6 text-slate-500 flex-shrink-0" />
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Hora programada
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-800">
                {formatTimeCompact(doseLog.scheduledTime)}
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl flex items-center gap-3">
            <Calendar className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider block">
                Hora de confirmación
              </span>
              <span className="text-lg sm:text-xl font-black text-emerald-900">
                {formatTimeCompact(currentTime)} (Ahora)
              </span>
            </div>
          </div>
        </div>

        {/* Mascot Encouragement */}
        <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 flex items-center gap-3">
          <AmigoBot size="sm" mood="celebrating" animated={false} />
          <p className="text-sm font-semibold text-sky-950">
            ¡Excelente María! Al confirmar mantienes tu tratamiento al día y tu salud protegida.
          </p>
        </div>

        {/* Optional Note */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirm-notes" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-slate-500" />
            <span>Nota opcional (ej: tomado con comida, sensación):</span>
          </label>
          <input
            id="confirm-notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Escribe alguna observación si lo deseas..."
            className="w-full bg-white border-2 border-slate-300 rounded-xl p-3 text-base text-slate-800 focus:outline-none focus:border-sky-500"
          />
        </div>

      </div>
    </Modal>
  );
};
