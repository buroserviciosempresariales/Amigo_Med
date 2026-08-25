import React, { useState } from 'react';
import { useMedications } from '../context/MedicationContext';
import type { Contact } from '../types';
import { EmergencyContactCard } from '../components/contacts/EmergencyContactCard';
import { ContactFormModal } from '../components/contacts/ContactFormModal';
import { DeleteConfirmModal } from '../components/medications/DeleteConfirmModal';
import { Button } from '../components/common/Button';
import { Phone, Plus, PhoneCall, ShieldAlert, HeartHandshake, Stethoscope } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const ContactsPage: React.FC = () => {
  const { contacts, addContact, updateContact, deleteContact } = useMedications();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const doctors = contacts.filter(c => c.type === 'doctor');
  const emergencies = contacts.filter(c => c.type === 'emergency');
  const caregivers = contacts.filter(c => c.type === 'caregiver');

  const handleEdit = (contact: Contact) => {
    setContactToEdit(contact);
  };

  const handleDeleteTrigger = (id: string) => {
    const target = contacts.find(c => c.id === id);
    if (target) setContactToDelete(target);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-100 text-rose-700 rounded-2xl">
            <Phone className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Contactos Importantes
            </h1>
            <p className="text-base text-slate-600 font-medium">
              Números de tu médico, cuidadores y familiares para llamadas directas
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          size="xl"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-7 h-7" />}
          className="shadow-lg font-black text-xl py-4 self-start sm:self-auto"
        >
          + Agregar Contacto
        </Button>
      </div>

      {/* SOS / Quick Emergency Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-3 border-rose-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6 text-center md:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-3xl flex items-center justify-center flex-shrink-0 border-2 border-white/40">
            <PhoneCall className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse text-white" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest bg-white/25 px-3 py-1 rounded-full inline-block mb-1">
              Teléfono de Emergencias Médicas Oficial
            </span>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
              Línea Directa de Urgencias: 112 / 911
            </h3>
            <p className="text-sm sm:text-base text-rose-100 font-semibold mt-1">
              Si sientes dolor en el pecho, mareo intenso o falta de aire, solicita ayuda de inmediato.
            </p>
          </div>
        </div>

        <a
          href="tel:112"
          onClick={() => soundManager.playClick()}
          className="w-full md:w-auto bg-white hover:bg-slate-100 text-rose-700 font-black text-xl sm:text-2xl px-8 py-5 rounded-2xl shadow-2xl transition-all active:scale-95 text-center whitespace-nowrap touch-target-senior flex items-center justify-center gap-3 border-2 border-rose-300"
        >
          <Phone className="w-7 h-7" />
          <span>Llamar al 112</span>
        </a>
      </div>

      {/* Contacts Grid by Section */}

      {/* 1. Emergency Contacts (Family) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-rose-600" />
          <h3 className="text-2xl font-black text-slate-900">
            Contacto de Emergencia Familiar
          </h3>
        </div>

        {emergencies.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-3xl border-2 border-slate-200 text-slate-500 font-medium">
            No tienes contactos de emergencia registrados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencies.map(c => (
              <EmergencyContactCard
                key={c.id}
                contact={c}
                onEdit={handleEdit}
                onDelete={handleDeleteTrigger}
              />
            ))}
          </div>
        )}
      </section>

      {/* 2. Doctors */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <Stethoscope className="w-6 h-6 text-sky-600" />
          <h3 className="text-2xl font-black text-slate-900">
            Médicos y Especialistas
          </h3>
        </div>

        {doctors.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-3xl border-2 border-slate-200 text-slate-500 font-medium">
            No tienes médicos registrados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(c => (
              <EmergencyContactCard
                key={c.id}
                contact={c}
                onEdit={handleEdit}
                onDelete={handleDeleteTrigger}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3. Caregivers */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <HeartHandshake className="w-6 h-6 text-teal-700" />
          <h3 className="text-2xl font-black text-slate-900">
            Cuidadores y Asistentes
          </h3>
        </div>

        {caregivers.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-3xl border-2 border-slate-200 text-slate-500 font-medium">
            No tienes cuidadores registrados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caregivers.map(c => (
              <EmergencyContactCard
                key={c.id}
                contact={c}
                onEdit={handleEdit}
                onDelete={handleDeleteTrigger}
              />
            ))}
          </div>
        )}
      </section>

      {/* Add Contact Modal */}
      <ContactFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={addContact}
      />

      {/* Edit Contact Modal */}
      <ContactFormModal
        isOpen={!!contactToEdit}
        onClose={() => setContactToEdit(null)}
        contactToEdit={contactToEdit}
        onSave={(updatedData) => {
          if (contactToEdit) {
            updateContact(contactToEdit.id, updatedData);
          }
        }}
      />

      {/* Delete Contact Modal */}
      <DeleteConfirmModal
        isOpen={!!contactToDelete}
        onClose={() => setContactToDelete(null)}
        title="¿Deseas eliminar este contacto?"
        message="El número de teléfono y notas asociadas se eliminarán de tu lista de acceso rápido."
        itemName={contactToDelete?.name}
        onConfirm={() => {
          if (contactToDelete) {
            deleteContact(contactToDelete.id);
          }
        }}
      />

    </div>
  );
};
