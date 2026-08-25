import React, { useState } from 'react';
import type { DoseLog } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Clock, Check, RefreshCw, XCircle, Info, Sparkles } from 'lucide-react';
import { formatTimeCompact, getTimeDifferenceLabel } from '../../utils/dateUtils';
import { ConfirmDoseModal } from './ConfirmDoseModal';
import { SnoozeDoseModal } from './SnoozeDoseModal';
import { OmitDoseModal } from './OmitDoseModal';
import { AmigoBot } from '../mascot/AmigoBot';

interface NextDoseCardProps {
  dose: DoseLog | null;
  onConfirmDose: (logId: string, notes?: string) => void;
  onSnoozeDose: (logId: string, minutes: number, customTime?: string) => void;
  onOmitDose: (logId: string, reason?: string) => void;
}

export const NextDoseCard: React.FC<NextDoseCardProps> = ({
  dose,
  onConfirmDose,
  onSnoozeDose,
  onOmitDose
}) => {
  const [modalMode, setModalMode] = useState<'confirm' | 'snooze' | 'omit' | null>(null);

  if (!dose) {
    return (
      <Card variant="success" className="border-3 border-emerald-400 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="flex-shrink-0">
            <AmigoBot size="lg" mood="celebrating" animated={true} />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-sm font-black mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>¡Día al día!</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              ¡No tienes más tomas pendientes por hoy!
            </h3>
            <p className="text-base sm:text-lg text-slate-700 mt-2 font-medium">
              Has tomado todos tus medicamentos programados. ¡Excelente trabajo cuidando de tu salud!
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const timeDiff = getTimeDifferenceLabel(dose.scheduledTime);

  return (
    <>
      <Card 
        variant="default" 
        className={`border-3 shadow-lg relative overflow-hidden p-6 sm:p-8 transition-all ${
          timeDiff.isNow 
            ? 'border-emerald-500 ring-4 ring-emerald-200/60 bg-gradient-to-br from-emerald-50/40 via-white to-sky-50/30' 
            : timeDiff.isPast
              ? 'border-amber-400 ring-4 ring-amber-200/50 bg-gradient-to-br from-amber-50/40 via-white to-white'
              : 'border-sky-400 bg-gradient-to-br from-sky-50/50 via-white to-white'
        }`}
      >
        {/* Banner Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="flex h-3.5 w-3.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${timeDiff.isNow ? 'bg-emerald-400' : 'bg-sky-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${timeDiff.isNow ? 'bg-emerald-500' : 'bg-sky-600'}`}></span>
            </span>
            <span className="text-base sm:text-lg font-black uppercase tracking-wider text-sky-800">
              PRÓXIMA TOMA REQUERIDA
            </span>
          </div>

          <div className="flex items-center gap-2">
            {dose.status === 'snoozed' && (
              <Badge variant="snoozed" label="Pospuesta" size="md" />
            )}
            <span className={`px-4 py-1.5 rounded-full text-base font-extrabold flex items-center gap-2 border-2 ${
              timeDiff.isNow 
                ? 'bg-emerald-600 text-white border-emerald-700 animate-pulse' 
                : timeDiff.isPast
                  ? 'bg-amber-100 text-amber-950 border-amber-400'
                  : 'bg-sky-100 text-sky-950 border-sky-300'
            }`}>
              <Clock className="w-5 h-5" />
              <span>{formatTimeCompact(dose.scheduledTime)} ({timeDiff.label})</span>
            </span>
          </div>
        </div>

        {/* Medication Details Card */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b-2 border-slate-200/80">
          
          {/* Main Info */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-white font-black text-2xl sm:text-3xl shadow-lg flex-shrink-0"
              style={{ backgroundColor: dose.color || '#0284C7' }}
            >
              {dose.medicationName.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                {dose.medicationName}
              </h2>
              
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="text-xl sm:text-2xl font-extrabold text-sky-800">
                  Dosis: {dose.dose} {dose.unit}
                </span>
                <span className="text-slate-400 text-lg font-bold">•</span>
                <span className="text-base sm:text-lg font-semibold text-slate-700">
                  Programado: {dose.scheduledTime} hrs
                </span>
              </div>

              {dose.instructions && (
                <div className="mt-3 inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-3.5 py-2 rounded-2xl border border-slate-200 text-base font-semibold">
                  <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />
                  <span>{dose.instructions}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Mascot Guide Tip */}
          <div className="hidden lg:flex items-center gap-3 bg-white p-3.5 rounded-2xl border-2 border-sky-100 shadow-sm max-w-xs">
            <AmigoBot size="sm" mood={timeDiff.isNow ? 'reminder' : 'happy'} animated={false} />
            <p className="text-xs font-semibold text-slate-700 leading-snug">
              {timeDiff.isNow 
                ? '¡Es el momento exacto! Tómalo con suficiente agua.' 
                : 'Ten a mano tu vaso de agua y la pastilla.'}
            </p>
          </div>

        </div>

        {/* Big Action Buttons (Functional & Accessible) */}
        <div className="pt-6">
          <label className="text-sm sm:text-base font-bold text-slate-600 block mb-3 uppercase tracking-wider">
            Selecciona una acción:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            
            {/* Primary Action: TOMADA */}
            <Button
              type="button"
              variant="success"
              size="xl"
              onClick={() => setModalMode('confirm')}
              leftIcon={<Check className="w-8 h-8" />}
              className="sm:col-span-1 text-xl py-5 shadow-lg hover:shadow-emerald-600/30"
              aria-label={`Confirmar toma de ${dose.medicationName}`}
            >
              TOMADA
            </Button>

            {/* Secondary Action: POSPONER */}
            <Button
              type="button"
              variant="warning"
              size="xl"
              onClick={() => setModalMode('snooze')}
              leftIcon={<RefreshCw className="w-7 h-7 text-slate-950" />}
              className="sm:col-span-1 text-lg sm:text-xl py-5"
              aria-label={`Posponer recordatorio de ${dose.medicationName}`}
            >
              POSPONER
            </Button>

            {/* Tertiary Action: OMITIR */}
            <Button
              type="button"
              variant="secondary"
              size="xl"
              onClick={() => setModalMode('omit')}
              leftIcon={<XCircle className="w-7 h-7 text-rose-600" />}
              className="sm:col-span-1 text-lg sm:text-xl py-5 hover:border-rose-300 hover:bg-rose-50"
              aria-label={`Omitir toma de ${dose.medicationName}`}
            >
              OMITIR
            </Button>

          </div>
        </div>
      </Card>

      {/* Modals for actions */}
      <ConfirmDoseModal
        isOpen={modalMode === 'confirm'}
        onClose={() => setModalMode(null)}
        doseLog={dose}
        onConfirm={onConfirmDose}
      />

      <SnoozeDoseModal
        isOpen={modalMode === 'snooze'}
        onClose={() => setModalMode(null)}
        doseLog={dose}
        onSnooze={onSnoozeDose}
      />

      <OmitDoseModal
        isOpen={modalMode === 'omit'}
        onClose={() => setModalMode(null)}
        doseLog={dose}
        onOmit={onOmitDose}
      />
    </>
  );
};
