import React from 'react';
import type { DoseLog } from '../../types';
import { Badge } from '../common/Badge';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { formatFriendlyDate, formatTimeCompact } from '../../utils/dateUtils';

interface HistoryListProps {
  logs: DoseLog[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ logs }) => {
  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border-2 border-slate-200 shadow-sm flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mb-3" />
        <h4 className="text-xl font-bold text-slate-800">
          No se encontraron registros con los filtros seleccionados
        </h4>
        <p className="text-slate-500 text-sm mt-1">
          Intenta cambiar el rango de fecha o seleccionar "Todos los medicamentos".
        </p>
      </div>
    );
  }

  // Group logs by scheduledDate
  const groupedLogs = logs.reduce((acc, log) => {
    const date = log.scheduledDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(log);
    return acc;
  }, {} as Record<string, DoseLog[]>);

  // Sort dates descending
  const sortedDates = Object.keys(groupedLogs).sort((a, b) => b.localeCompare(a));

  return (
    <div className="flex flex-col gap-6">
      {sortedDates.map(dateStr => {
        const dayLogs = groupedLogs[dateStr].sort((a, b) => b.scheduledTime.localeCompare(a.scheduledTime));
        const dayTaken = dayLogs.filter(l => l.status === 'taken').length;
        const dayTotal = dayLogs.length;

        return (
          <div key={dateStr} className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
            
            {/* Day Header */}
            <div className="bg-slate-100/90 px-5 sm:px-6 py-3.5 border-b-2 border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-sky-700" />
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {formatFriendlyDate(dateStr)}
                </h4>
                <span className="text-xs text-slate-500 font-bold hidden sm:inline">
                  ({dateStr})
                </span>
              </div>

              <div className="text-xs sm:text-sm font-black px-3 py-1 bg-white rounded-full border border-slate-300 text-slate-800">
                {dayTaken} de {dayTotal} tomadas
              </div>
            </div>

            {/* Logs in this day */}
            <div className="divide-y-2 divide-slate-100 p-2 sm:p-4">
              {dayLogs.map(log => {
                return (
                  <div
                    key={log.id}
                    className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 rounded-2xl transition-colors"
                  >
                    {/* Left: Info */}
                    <div className="flex items-start gap-3.5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0"
                        style={{ backgroundColor: log.color || '#0284C7' }}
                      >
                        {log.medicationName.substring(0, 2).toUpperCase()}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="text-xl font-black text-slate-900">
                            {log.medicationName}
                          </h5>
                          <span className="text-sm font-extrabold text-sky-800">
                            ({log.dose} {log.unit})
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>Programada: {formatTimeCompact(log.scheduledTime)}</span>
                          </span>

                          {log.status === 'taken' && log.actualTimestamp && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-700 font-bold">
                                Tomada a las {new Date(log.actualTimestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} hrs
                              </span>
                            </>
                          )}

                          {log.status === 'omitted' && log.notes && (
                            <>
                              <span>•</span>
                              <span className="text-rose-700 font-bold">
                                Motivo: {log.notes}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Badge */}
                    <div className="self-end sm:self-center">
                      <Badge variant={log.status} size="md" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        );
      })}
    </div>
  );
};
