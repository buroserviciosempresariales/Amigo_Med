import React from 'react';
import type { Medication } from '../../types';
import { Filter, Calendar, Pill, CheckCircle, Printer } from 'lucide-react';
import { Button } from '../common/Button';

interface HistoryFilterBarProps {
  dateRange: 'today' | '7days' | '30days' | 'all';
  setDateRange: (range: 'today' | '7days' | '30days' | 'all') => void;
  selectedMedId: string;
  setSelectedMedId: (id: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  medications: Medication[];
  onPrint: () => void;
}

export const HistoryFilterBar: React.FC<HistoryFilterBarProps> = ({
  dateRange,
  setDateRange,
  selectedMedId,
  setSelectedMedId,
  selectedStatus,
  setSelectedStatus,
  medications,
  onPrint
}) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col gap-5">
      
      {/* Top Bar: Title + Print / Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-6 h-6 text-sky-600" />
          <h4 className="text-xl font-extrabold text-slate-900">
            Filtrar Registros
          </h4>
        </div>

        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onPrint}
          leftIcon={<Printer className="w-5 h-5" />}
          className="self-start sm:self-auto"
        >
          Imprimir Reporte Médico
        </Button>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Date Range */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Período de tiempo:</span>
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl p-3 text-base font-bold text-slate-800 focus:outline-none focus:border-sky-500"
          >
            <option value="today">Solo Hoy</option>
            <option value="7days">Últimos 7 días</option>
            <option value="30days">Últimos 30 días</option>
            <option value="all">Todo el historial</option>
          </select>
        </div>

        {/* Medication filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-slate-500" />
            <span>Medicamento:</span>
          </label>
          <select
            value={selectedMedId}
            onChange={(e) => setSelectedMedId(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl p-3 text-base font-bold text-slate-800 focus:outline-none focus:border-sky-500"
          >
            <option value="all">Todos los medicamentos</option>
            {medications.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.dose} {m.unit})
              </option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-slate-500" />
            <span>Estado de toma:</span>
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl p-3 text-base font-bold text-slate-800 focus:outline-none focus:border-sky-500"
          >
            <option value="all">Todos los estados</option>
            <option value="taken">Solo Tomadas</option>
            <option value="omitted">Solo Omitidas</option>
            <option value="snoozed">Pospuestas</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>

      </div>

    </div>
  );
};
