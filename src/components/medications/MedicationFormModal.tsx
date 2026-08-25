import React, { useState, useEffect } from 'react';
import type { Medication, MedicationIconType } from '../../types';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Plus, Trash2, Clock, Pill, Save, Check } from 'lucide-react';

interface MedicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicationToEdit?: Medication | null;
  onSave: (data: Omit<Medication, 'id' | 'createdAt'>) => void;
}

const COLOR_OPTIONS = [
  { label: 'Azul', value: '#0284C7' },
  { label: 'Verde / Teal', value: '#0D9488' },
  { label: 'Púrpura', value: '#8B5CF6' },
  { label: 'Ámbar', value: '#F59E0B' },
  { label: 'Esmeralda', value: '#10B981' },
  { label: 'Rosa', value: '#EC4899' }
];

export const MedicationFormModal: React.FC<MedicationFormModalProps> = ({
  isOpen,
  onClose,
  medicationToEdit,
  onSave
}) => {
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [unit, setUnit] = useState('mg');
  const [frequency, setFrequency] = useState('Todos los días');
  const [times, setTimes] = useState<string[]>(['08:00']);
  const [stock, setStock] = useState<number>(30);
  const [stockUnit, setStockUnit] = useState('comprimidos');
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(5);
  const [instructions, setInstructions] = useState('');
  const [color, setColor] = useState('#0284C7');
  const [icon, setIcon] = useState<MedicationIconType>('pill');
  const [active, setActive] = useState(true);

  // Errors state
  const [errors, setErrors] = useState<{
    name?: string;
    dose?: string;
    times?: string;
  }>({});

  useEffect(() => {
    if (medicationToEdit) {
      setName(medicationToEdit.name);
      setDose(medicationToEdit.dose);
      setUnit(medicationToEdit.unit);
      setFrequency(medicationToEdit.frequency);
      setTimes(medicationToEdit.times.length > 0 ? medicationToEdit.times : ['08:00']);
      setStock(medicationToEdit.stock);
      setStockUnit(medicationToEdit.stockUnit);
      setLowStockThreshold(medicationToEdit.lowStockThreshold);
      setInstructions(medicationToEdit.instructions || '');
      setColor(medicationToEdit.color || '#0284C7');
      setIcon(medicationToEdit.icon || 'pill');
      setActive(medicationToEdit.active);
    } else {
      // Reset defaults for new
      setName('');
      setDose('');
      setUnit('mg');
      setFrequency('Todos los días');
      setTimes(['08:00']);
      setStock(30);
      setStockUnit('comprimidos');
      setLowStockThreshold(5);
      setInstructions('');
      setColor('#0284C7');
      setIcon('pill');
      setActive(true);
    }
    setErrors({});
  }, [medicationToEdit, isOpen]);

  const handleAddTime = () => {
    setTimes(prev => [...prev, '12:00']);
  };

  const handleRemoveTime = (index: number) => {
    if (times.length <= 1) return;
    setTimes(prev => prev.filter((_, i) => i !== index));
  };

  const handleTimeChange = (index: number, value: string) => {
    const updated = [...times];
    updated[index] = value;
    setTimes(updated);
  };

  const validate = () => {
    const newErrors: { name?: string; dose?: string; times?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Ingrese el nombre del medicamento (ej: Losartán).';
    }

    if (!dose.trim()) {
      newErrors.dose = 'Ingrese la dosis (ej: 50).';
    }

    if (times.length === 0 || times.some(t => !t)) {
      newErrors.times = 'Debe indicar al menos un horario válido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      name: name.trim(),
      dose: dose.trim(),
      unit,
      frequency,
      times,
      stock: Number(stock) || 0,
      stockUnit,
      lowStockThreshold: Number(lowStockThreshold) || 5,
      instructions: instructions.trim(),
      color,
      icon,
      active
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={medicationToEdit ? 'Editar Medicamento' : 'Agregar Nuevo Medicamento'}
      subtitle="Configura los datos y horarios para tus recordatorios automáticos"
      icon={<Pill className="w-8 h-8 text-sky-600" />}
      maxWidth="lg"
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
            variant="primary"
            size="xl"
            onClick={handleSubmit}
            leftIcon={<Save className="w-6 h-6" />}
          >
            {medicationToEdit ? 'Guardar Cambios' : 'Registrar Medicamento'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Name & Dose */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nombre del medicamento"
            requiredMarker
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
            }}
            placeholder="Ej: Losartán, Metformina..."
            error={errors.name}
            autoFocus
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Dosis"
              requiredMarker
              value={dose}
              onChange={(e) => {
                setDose(e.target.value);
                if (errors.dose) setErrors(prev => ({ ...prev, dose: undefined }));
              }}
              placeholder="Ej: 50"
              error={errors.dose}
            />

            <Select
              label="Unidad"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              options={[
                { value: 'mg', label: 'mg (miligramos)' },
                { value: 'comprimido(s)', label: 'Comprimido(s)' },
                { value: 'cápsula(s)', label: 'Cápsula(s)' },
                { value: 'ml', label: 'ml (mililitros)' },
                { value: 'gotas', label: 'Gotas' },
                { value: 'tableta(s)', label: 'Tableta(s)' },
                { value: 'inhalación', label: 'Inhalación' },
                { value: 'UI', label: 'UI (Unidades)' }
              ]}
            />
          </div>
        </div>

        {/* Frequency & Times */}
        <div className="bg-slate-50 border-2 border-slate-200 p-5 rounded-3xl flex flex-col gap-4">
          <Select
            label="Frecuencia de toma"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            options={[
              'Todos los días',
              'Cada 8 horas',
              'Cada 12 horas',
              'Cada 24 horas',
              'Días específicos',
              'Según necesidad'
            ]}
          />

          {/* Dynamic Horarios */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-sky-600" />
                <span>Horarios de recordatorio <span className="text-rose-600">*</span></span>
              </label>
              <button
                type="button"
                onClick={handleAddTime}
                className="text-sky-700 hover:text-sky-800 font-extrabold text-sm flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-sky-300 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar otro horario</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              {times.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-2xl border-2 border-slate-300">
                  <span className="text-xs font-black text-slate-500 w-6 text-center">
                    #{idx + 1}
                  </span>
                  <input
                    type="time"
                    value={t}
                    onChange={(e) => handleTimeChange(idx, e.target.value)}
                    className="flex-1 text-lg font-bold text-slate-900 bg-transparent focus:outline-none"
                  />
                  {times.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTime(idx)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Quitar este horario"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {errors.times && (
              <p className="text-rose-600 text-sm font-bold mt-1">{errors.times}</p>
            )}
          </div>
        </div>

        {/* Stock & Low Stock Threshold */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Cantidad de pastillas en casa (Stock)"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)}
            helperText="Se descontará automáticamente con cada toma"
          />

          <Input
            label="Avisar cuando queden menos de:"
            type="number"
            min="1"
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(parseInt(e.target.value, 10) || 1)}
            helperText="Te avisaremos para acudir a la farmacia"
          />
        </div>

        {/* Instructions / Notes */}
        <Input
          label="Instrucciones o notas especiales (Opcional)"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Ej: Tomar en ayunas con agua, tomar con el almuerzo..."
          helperText="Aparecerá en tu pantalla cuando sea la hora de la toma"
        />

        {/* Color Palette Choice */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-bold text-slate-800">
            Color para identificar la tarjeta:
          </label>
          <div className="flex items-center gap-3 flex-wrap">
            {COLOR_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setColor(opt.value)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all touch-target-senior ${
                  color === opt.value 
                    ? 'ring-4 ring-sky-300 scale-110 shadow-md' 
                    : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: opt.value }}
                title={opt.label}
              >
                {color === opt.value && <Check className="w-6 h-6 text-white stroke-[3]" />}
              </button>
            ))}
          </div>
        </div>

      </form>
    </Modal>
  );
};
