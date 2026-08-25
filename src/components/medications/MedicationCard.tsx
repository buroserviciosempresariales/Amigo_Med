import React from 'react';
import type { Medication } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Clock, Edit, Trash2, Power, Package } from 'lucide-react';
import { formatTimeCompact } from '../../utils/dateUtils';

interface MedicationCardProps {
  medication: Medication;
  onEdit: (med: Medication) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  onEdit,
  onDelete,
  onToggleActive
}) => {
  const isLowStock = medication.stock <= medication.lowStockThreshold;

  return (
    <Card 
      variant="default"
      className={`border-2 transition-all flex flex-col justify-between ${
        !medication.active 
          ? 'bg-slate-100/60 border-slate-300 opacity-80' 
          : 'bg-white border-slate-200 hover:border-sky-300 shadow-sm'
      }`}
    >
      <div className="flex flex-col gap-4">
        
        {/* Card Header: Icon + Name + Active Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md flex-shrink-0"
              style={{ backgroundColor: medication.color || '#0284C7' }}
            >
              {medication.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {medication.name}
                </h3>
              </div>
              <p className="text-lg font-extrabold text-sky-800 mt-0.5">
                {medication.dose} {medication.unit}
              </p>
            </div>
          </div>

          <Badge 
            variant={medication.active ? 'success' : 'danger'} 
            label={medication.active ? 'Activo' : 'Pausado'}
            size="sm"
          />
        </div>

        {/* Frequencies & Schedules */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-bold">Frecuencia:</span>
            <span className="font-extrabold text-slate-900">{medication.frequency}</span>
          </div>

          <div className="flex items-start justify-between text-sm">
            <span className="text-slate-600 font-bold flex items-center gap-1">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Horarios:</span>
            </span>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {medication.times.map((t, idx) => (
                <span key={idx} className="bg-white border border-slate-300 text-slate-800 px-2.5 py-0.5 rounded-lg text-xs sm:text-sm font-black">
                  {formatTimeCompact(t)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stock status */}
        <div className={`p-3 rounded-2xl border flex items-center justify-between text-sm ${
          isLowStock 
            ? 'bg-amber-50 border-amber-300 text-amber-950 font-bold' 
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <span className="flex items-center gap-1.5 font-semibold">
            <Package className="w-4 h-4 text-slate-500" />
            <span>Stock disponible:</span>
          </span>
          <span className={`font-black ${isLowStock ? 'text-amber-800' : 'text-slate-900'}`}>
            {medication.stock} {medication.stockUnit}
            {isLowStock && ' (¡Quedan pocas!)'}
          </span>
        </div>

        {/* Instructions if any */}
        {medication.instructions && (
          <p className="text-xs sm:text-sm text-slate-600 bg-sky-50/50 p-2.5 rounded-xl border border-sky-100 font-medium">
            💡 {medication.instructions}
          </p>
        )}

      </div>

      {/* Action buttons footer */}
      <div className="pt-5 mt-4 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onToggleActive(medication.id)}
          className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors border-2 touch-target-senior ${
            medication.active
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300'
          }`}
          title={medication.active ? 'Pausar temporalmente' : 'Reanudar recordatorios'}
        >
          <Power className="w-4 h-4" />
          <span>{medication.active ? 'Pausar' : 'Activar'}</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEdit(medication)}
            leftIcon={<Edit className="w-4 h-4" />}
          >
            Editar
          </Button>

          <button
            type="button"
            onClick={() => onDelete(medication.id)}
            className="p-2.5 rounded-xl text-rose-600 hover:bg-rose-50 border-2 border-transparent hover:border-rose-200 transition-colors touch-target-senior flex items-center justify-center"
            title="Eliminar medicamento"
            aria-label={`Eliminar medicamento ${medication.name}`}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};
