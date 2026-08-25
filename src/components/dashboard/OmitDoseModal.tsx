import React, { useState } from 'react';
import type { DoseLog } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertTriangle, XCircle, ShieldAlert } from 'lucide-react';
import { formatTimeCompact } from '../../utils/dateUtils';

interface OmitDoseModalProps {
  isOpen: boolean;
  onClose: () => void;
  doseLog: DoseLog | null;
  onOmit: (logId: string, reason?: string) => void;
}

export const OmitDoseModal: React.FC<OmitDoseModalProps> = ({
  isOpen,
  onClose,
  doseLog,
  onOmit
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('Indicación médica / Me siento indispuesto');
  const [customReason, setCustomReason] = useState<string>('');

  if (!doseLog) return null;

  const reasons = [
    'Indicación médica / Me siento indispuesto',
    'Se agotaron las pastillas (sin stock)',
    'Olvidé llevar el medicamento fuera de casa',
    'Efecto secundario o náuseas',
    'Otro motivo'
  ];

  const handleOmit = () => {
    const finalReason = selectedReason === 'Otro motivo' ? (customReason || 'Otro motivo') : selectedReason;
    onOmit(doseLog.id, finalReason);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="¿Estás seguro de omitir esta toma?"
      subtitle="La toma quedará registrada en tu historial como no tomada"
      icon={<AlertTriangle className="w-8 h-8 text-rose-600" />}
      maxWidth="md"
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={onClose}
          >
            Volver (No omitir)
          </Button>
          <Button
            type="button"
            variant="danger"
            size="xl"
            onClick={handleOmit}
            leftIcon={<XCircle className="w-7 h-7" />}
          >
            Confirmar Omitir
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        
        {/* Medication summary */}
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold text-slate-900">{doseLog.medicationName}</h4>
            <p className="text-sm font-semibold text-rose-900">
              Dosis: {doseLog.dose} {doseLog.unit} • Programada: {formatTimeCompact(doseLog.scheduledTime)}
            </p>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-sm sm:text-base text-amber-950 font-medium leading-relaxed">
            Omitir tomas frecuentes puede alterar la eficacia de su tratamiento. Si tiene dudas sobre su medicamento, consulte a su médico.
          </div>
        </div>

        {/* Reason Selection */}
        <div className="flex flex-col gap-2.5">
          <label className="text-base font-bold text-slate-800">
            ¿Cuál es el motivo de la omisión? (Opcional):
          </label>
          <div className="flex flex-col gap-2">
            {reasons.map((reason, idx) => (
              <label
                key={idx}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                  selectedReason === reason 
                    ? 'border-rose-500 bg-rose-50/50 font-bold text-slate-900' 
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="omit-reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="w-5 h-5 text-rose-600 focus:ring-rose-500"
                />
                <span className="text-sm sm:text-base">{reason}</span>
              </label>
            ))}
          </div>

          {selectedReason === 'Otro motivo' && (
            <input
              type="text"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Explica brevemente el motivo..."
              className="mt-2 w-full p-3 border-2 border-slate-300 rounded-xl text-base text-slate-900 focus:outline-none focus:border-rose-500"
            />
          )}
        </div>

      </div>
    </Modal>
  );
};
