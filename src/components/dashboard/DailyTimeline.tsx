import React, { useState } from 'react';
import type { DoseLog } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Check, RefreshCw, XCircle, Clock, CheckCircle2 } from 'lucide-react';
import { formatTimeCompact } from '../../utils/dateUtils';
import { ConfirmDoseModal } from './ConfirmDoseModal';
import { SnoozeDoseModal } from './SnoozeDoseModal';
import { OmitDoseModal } from './OmitDoseModal';

interface DailyTimelineProps {
  doses: DoseLog[];
  onConfirmDose: (logId: string, notes?: string) => void;
  onSnoozeDose: (logId: string, minutes: number, customTime?: string) => void;
  onOmitDose: (logId: string, reason?: string) => void;
}

export const DailyTimeline: React.FC<DailyTimelineProps> = ({
  doses,
  onConfirmDose,
  onSnoozeDose,
  onOmitDose
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'taken' | 'other'>('all');
  const [activeModal, setActiveModal] = useState<{ mode: 'confirm' | 'snooze' | 'omit'; dose: DoseLog } | null>(null);

  const filteredDoses = doses.filter(d => {
    if (filter === 'pending') return d.status === 'pending' || d.status === 'snoozed';
    if (filter === 'taken') return d.status === 'taken';
    if (filter === 'other') return d.status === 'omitted';
    return true;
  });

  const pendingCount = doses.filter(d => d.status === 'pending' || d.status === 'snoozed').length;
  const takenCount = doses.filter(d => d.status === 'taken').length;
  const otherCount = doses.filter(d => d.status === 'omitted').length;

  return (
    <div className="flex flex-col gap-5">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tomas Programadas para Hoy
          </h3>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Revisa el estado de todas tus dosis del día
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl overflow-x-auto" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'all'}
            onClick={() => setFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all touch-target-senior whitespace-nowrap ${
              filter === 'all' 
                ? 'bg-white text-sky-800 shadow-sm' 
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Todas ({doses.length})
          </button>
          
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'pending'}
            onClick={() => setFilter('pending')}
            className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all touch-target-senior whitespace-nowrap ${
              filter === 'pending' 
                ? 'bg-white text-amber-900 shadow-sm' 
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Pendientes ({pendingCount})
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={filter === 'taken'}
            onClick={() => setFilter('taken')}
            className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all touch-target-senior whitespace-nowrap ${
              filter === 'taken' 
                ? 'bg-white text-emerald-900 shadow-sm' 
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Tomadas ({takenCount})
          </button>

          {otherCount > 0 && (
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'other'}
              onClick={() => setFilter('other')}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all touch-target-senior whitespace-nowrap ${
                filter === 'other' 
                  ? 'bg-white text-rose-900 shadow-sm' 
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Omitidas ({otherCount})
            </button>
          )}
        </div>
      </div>

      {/* Doses List */}
      <div className="flex flex-col gap-3.5">
        {filteredDoses.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200 text-slate-500 font-medium">
            No hay tomas en esta categoría.
          </div>
        ) : (
          filteredDoses.map(dose => {
            const isPending = dose.status === 'pending' || dose.status === 'snoozed';

            return (
              <div
                key={dose.id}
                className={`p-4 sm:p-5 rounded-3xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  dose.status === 'taken'
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : dose.status === 'omitted'
                      ? 'bg-rose-50/40 border-rose-200 opacity-80'
                      : dose.status === 'snoozed'
                        ? 'bg-amber-50/50 border-amber-300'
                        : 'bg-white border-slate-200 hover:border-sky-300 shadow-sm'
                }`}
              >
                {/* Left Info */}
                <div className="flex items-start gap-4">
                  {/* Time box */}
                  <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100 border border-slate-200 min-w-[75px] text-center">
                    <Clock className="w-5 h-5 text-slate-600 mb-1" />
                    <span className="text-base font-black text-slate-900 leading-tight">
                      {formatTimeCompact(dose.scheduledTime)}
                    </span>
                    {dose.originalTime && (
                      <span className="text-xs text-amber-700 font-semibold line-through">
                        {dose.originalTime}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                        {dose.medicationName}
                      </h4>
                      <Badge variant={dose.status} size="sm" />
                    </div>

                    <p className="text-base font-extrabold text-sky-800">
                      Dosis: {dose.dose} {dose.unit}
                    </p>

                    {dose.instructions && (
                      <p className="text-sm text-slate-600 mt-1 font-medium">
                        💡 {dose.instructions}
                      </p>
                    )}

                    {dose.status === 'taken' && dose.actualTimestamp && (
                      <p className="text-xs sm:text-sm text-emerald-800 font-bold mt-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Confirmada a las {new Date(dose.actualTimestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} hrs</span>
                      </p>
                    )}

                    {dose.status === 'omitted' && dose.notes && (
                      <p className="text-xs sm:text-sm text-rose-800 font-semibold mt-1">
                        Motivo: {dose.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Actions for pending doses */}
                {isPending && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                    <Button
                      type="button"
                      variant="success"
                      size="md"
                      onClick={() => setActiveModal({ mode: 'confirm', dose })}
                      leftIcon={<Check className="w-5 h-5" />}
                    >
                      Tomar
                    </Button>

                    <Button
                      type="button"
                      variant="warning"
                      size="md"
                      onClick={() => setActiveModal({ mode: 'snooze', dose })}
                      leftIcon={<RefreshCw className="w-4 h-4 text-slate-950" />}
                    >
                      Posponer
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      onClick={() => setActiveModal({ mode: 'omit', dose })}
                      leftIcon={<XCircle className="w-5 h-5 text-rose-600" />}
                      className="text-rose-700 hover:bg-rose-50"
                    >
                      Omitir
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      {activeModal && (
        <>
          <ConfirmDoseModal
            isOpen={activeModal.mode === 'confirm'}
            onClose={() => setActiveModal(null)}
            doseLog={activeModal.dose}
            onConfirm={onConfirmDose}
          />
          <SnoozeDoseModal
            isOpen={activeModal.mode === 'snooze'}
            onClose={() => setActiveModal(null)}
            doseLog={activeModal.dose}
            onSnooze={onSnoozeDose}
          />
          <OmitDoseModal
            isOpen={activeModal.mode === 'omit'}
            onClose={() => setActiveModal(null)}
            doseLog={activeModal.dose}
            onOmit={onOmitDose}
          />
        </>
      )}
    </div>
  );
};
