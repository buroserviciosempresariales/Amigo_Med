import React from 'react';
import type { Contact } from '../../types';
import { Card } from '../common/Card';
import { Phone, Stethoscope, ShieldAlert, Edit, Trash2, Building, HeartHandshake } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface EmergencyContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const EmergencyContactCard: React.FC<EmergencyContactCardProps> = ({
  contact,
  onEdit,
  onDelete
}) => {
  const getCategoryConfig = () => {
    switch (contact.type) {
      case 'doctor':
        return {
          label: 'Médico / Especialista',
          bg: 'bg-sky-50 border-sky-300',
          badgeBg: 'bg-sky-600 text-white',
          icon: <Stethoscope className="w-6 h-6 text-sky-700" />
        };
      case 'emergency':
        return {
          label: 'Contacto de Emergencia',
          bg: 'bg-rose-50 border-rose-300',
          badgeBg: 'bg-rose-600 text-white',
          icon: <ShieldAlert className="w-6 h-6 text-rose-700" />
        };
      case 'caregiver':
        return {
          label: 'Cuidador(a) de Confianza',
          bg: 'bg-teal-50 border-teal-300',
          badgeBg: 'bg-teal-700 text-white',
          icon: <HeartHandshake className="w-6 h-6 text-teal-700" />
        };
    }
  };

  const config = getCategoryConfig();

  const handleCall = () => {
    soundManager.playClick();
  };

  return (
    <Card variant="default" className={`border-3 shadow-md flex flex-col justify-between ${config.bg}`}>
      <div className="flex flex-col gap-4">
        
        {/* Header: Category Badge & Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {config.icon}
            <span className={`text-xs sm:text-sm font-black px-3 py-1 rounded-full uppercase tracking-wider ${config.badgeBg}`}>
              {config.label}
            </span>
          </div>

          {contact.isPrimary && (
            <span className="bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black px-2.5 py-0.5 rounded-full">
              Principal
            </span>
          )}
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {contact.name}
          </h3>

          {contact.specialty && (
            <p className="text-base sm:text-lg font-bold text-sky-800 mt-1">
              🩺 {contact.specialty}
            </p>
          )}

          {contact.relationship && (
            <p className="text-base sm:text-lg font-bold text-rose-800 mt-1">
              ❤️ {contact.relationship}
            </p>
          )}

          {contact.hospital && (
            <p className="text-sm sm:text-base text-slate-600 flex items-center gap-1.5 mt-2 font-medium">
              <Building className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span>{contact.hospital}</span>
            </p>
          )}

          {contact.notes && (
            <p className="text-xs sm:text-sm text-slate-600 bg-white/80 p-3 rounded-2xl border border-slate-200 mt-3 font-medium">
              📝 {contact.notes}
            </p>
          )}
        </div>

      </div>

      {/* Call Button & Actions */}
      <div className="pt-5 mt-5 border-t-2 border-slate-200/80 flex flex-col gap-3">
        {/* Big accessible Call Button */}
        <a
          href={`tel:${contact.phone.replace(/\s+/g, '')}`}
          onClick={handleCall}
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-extrabold text-lg sm:text-xl py-4 px-6 rounded-2xl shadow-md border-2 border-emerald-700 flex items-center justify-center gap-3 transition-all touch-target-senior text-center"
        >
          <Phone className="w-6 h-6 animate-pulse" />
          <span>Llamar: {contact.phone}</span>
        </a>

        {/* Edit and Delete */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit(contact)}
            className="px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-white rounded-xl border border-slate-300 transition-colors flex items-center gap-1 touch-target-senior"
          >
            <Edit className="w-4 h-4" />
            <span>Editar</span>
          </button>

          <button
            type="button"
            onClick={() => onDelete(contact.id)}
            className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl transition-colors touch-target-senior"
            title="Eliminar contacto"
            aria-label={`Eliminar contacto ${contact.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};
