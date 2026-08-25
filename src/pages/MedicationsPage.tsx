import React, { useState, useMemo } from 'react';
import { useMedications } from '../context/MedicationContext';
import type { Medication } from '../types';
import { MedicationCard } from '../components/medications/MedicationCard';
import { MedicationFormModal } from '../components/medications/MedicationFormModal';
import { DeleteConfirmModal } from '../components/medications/DeleteConfirmModal';
import { Button } from '../components/common/Button';
import { Plus, Search, Pill } from 'lucide-react';
import { AmigoBot } from '../components/mascot/AmigoBot';

export const MedicationsPage: React.FC = () => {
  const {
    medications,
    addMedication,
    updateMedication,
    deleteMedication,
    toggleMedicationActive
  } = useMedications();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [medicationToEdit, setMedicationToEdit] = useState<Medication | null>(null);
  const [medicationToDelete, setMedicationToDelete] = useState<Medication | null>(null);

  const filteredMedications = useMemo(() => {
    return medications.filter(med => {
      const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.dose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.instructions?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'active' ? med.active :
        !med.active;

      return matchesSearch && matchesStatus;
    });
  }, [medications, searchQuery, statusFilter]);

  const activeCount = medications.filter(m => m.active).length;
  const pausedCount = medications.filter(m => !m.active).length;

  const handleEdit = (med: Medication) => {
    setMedicationToEdit(med);
  };

  const handleDeleteTrigger = (id: string) => {
    const med = medications.find(m => m.id === id);
    if (med) setMedicationToDelete(med);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-slate-200">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl">
              <Pill className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Mis Medicamentos
              </h1>
              <p className="text-base text-slate-600 font-medium">
                Organiza tus tratamientos, dosis, horarios y stock
              </p>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          size="xl"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-7 h-7" />}
          className="shadow-lg hover:shadow-sky-600/30 text-xl py-4 self-start sm:self-auto font-black"
        >
          + Agregar Medicamento
        </Button>
      </div>

      {/* Search and Status Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="w-full md:w-96 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o dosis..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-900 text-base font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto" role="group">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-colors whitespace-nowrap touch-target-senior ${
              statusFilter === 'all'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Todos ({medications.length})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-colors whitespace-nowrap touch-target-senior ${
              statusFilter === 'active'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Activos ({activeCount})
          </button>

          {pausedCount > 0 && (
            <button
              type="button"
              onClick={() => setStatusFilter('paused')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-colors whitespace-nowrap touch-target-senior ${
                statusFilter === 'paused'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Pausados ({pausedCount})
            </button>
          )}
        </div>

      </div>

      {/* Medication Cards Grid */}
      {filteredMedications.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-slate-200 shadow-sm flex flex-col items-center justify-center gap-4">
          <AmigoBot size="md" mood="thinking" animated={false} />
          <div>
            <h3 className="text-2xl font-black text-slate-800">
              No se encontraron medicamentos
            </h3>
            <p className="text-slate-500 text-base mt-1 max-w-md mx-auto">
              {searchQuery 
                ? 'No hay resultados que coincidan con tu búsqueda. Prueba con otro nombre.' 
                : 'Aún no has registrado ningún medicamento. Presiona el botón "+ Agregar Medicamento" para comenzar.'}
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-6 h-6" />}
            className="mt-2"
          >
            + Agregar Primer Medicamento
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedications.map(med => (
            <MedicationCard
              key={med.id}
              medication={med}
              onEdit={handleEdit}
              onDelete={handleDeleteTrigger}
              onToggleActive={toggleMedicationActive}
            />
          ))}
        </div>
      )}

      {/* Add Medication Modal */}
      <MedicationFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={addMedication}
      />

      {/* Edit Medication Modal */}
      <MedicationFormModal
        isOpen={!!medicationToEdit}
        onClose={() => setMedicationToEdit(null)}
        medicationToEdit={medicationToEdit}
        onSave={(updatedData) => {
          if (medicationToEdit) {
            updateMedication(medicationToEdit.id, updatedData);
          }
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!medicationToDelete}
        onClose={() => setMedicationToDelete(null)}
        title="¿Deseas eliminar este medicamento?"
        message="Se eliminarán los recordatorios futuros de este tratamiento. Las tomas registradas previamente se mantendrán en tu historial médico."
        itemName={medicationToDelete?.name ? `${medicationToDelete.name} (${medicationToDelete.dose} ${medicationToDelete.unit})` : undefined}
        onConfirm={() => {
          if (medicationToDelete) {
            deleteMedication(medicationToDelete.id);
          }
        }}
      />

    </div>
  );
};
