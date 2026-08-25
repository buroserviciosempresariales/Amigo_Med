import React, { useState, useEffect } from 'react';
import type { Contact, ContactType } from '../../types';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Phone, User, Save } from 'lucide-react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactToEdit?: Contact | null;
  onSave: (contactData: Omit<Contact, 'id'>) => void;
}

export const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  contactToEdit,
  onSave
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<ContactType>('doctor');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [relationship, setRelationship] = useState('');
  const [hospital, setHospital] = useState('');
  const [notes, setNotes] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setType(contactToEdit.type);
      setPhone(contactToEdit.phone);
      setSpecialty(contactToEdit.specialty || '');
      setRelationship(contactToEdit.relationship || '');
      setHospital(contactToEdit.hospital || '');
      setNotes(contactToEdit.notes || '');
      setIsPrimary(contactToEdit.isPrimary || false);
    } else {
      setName('');
      setType('doctor');
      setPhone('');
      setSpecialty('');
      setRelationship('');
      setHospital('');
      setNotes('');
      setIsPrimary(false);
    }
    setErrors({});
  }, [contactToEdit, isOpen]);

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Ingrese el nombre del contacto o médico.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Ingrese el número de teléfono para llamadas.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      name: name.trim(),
      type,
      phone: phone.trim(),
      specialty: specialty.trim() || undefined,
      relationship: relationship.trim() || undefined,
      hospital: hospital.trim() || undefined,
      notes: notes.trim() || undefined,
      isPrimary
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={contactToEdit ? 'Editar Contacto' : 'Agregar Nuevo Contacto'}
      subtitle="Guarda números telefónicos de emergencia y médicos"
      icon={<User className="w-8 h-8 text-sky-600" />}
      maxWidth="md"
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
            {contactToEdit ? 'Guardar Cambios' : 'Guardar Contacto'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Type selector */}
        <Select
          label="Tipo de contacto"
          value={type}
          onChange={(e) => setType(e.target.value as ContactType)}
          options={[
            { value: 'doctor', label: '🩺 Médico / Especialista' },
            { value: 'emergency', label: '🚨 Contacto de Emergencia Familiar' },
            { value: 'caregiver', label: '🤝 Cuidador / Cuidadora' }
          ]}
        />

        {/* Name */}
        <Input
          label="Nombre completo"
          requiredMarker
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
          }}
          placeholder="Ej: Dr. Carlos Mendoza o Sofía González"
          error={errors.name}
        />

        {/* Phone */}
        <Input
          label="Número de teléfono"
          requiredMarker
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
          }}
          placeholder="Ej: +34 912 345 678"
          leftIcon={<Phone className="w-5 h-5" />}
          error={errors.phone}
          helperText="Se utilizará para realizar la llamada con un toque"
        />

        {/* Doctor specific: Specialty & Hospital */}
        {type === 'doctor' && (
          <>
            <Input
              label="Especialidad médica"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="Ej: Cardiología, Médico de Familia..."
            />
            <Input
              label="Hospital, Clínica o Centro de Salud"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder="Ej: Hospital Central - Planta 3"
            />
          </>
        )}

        {/* Emergency specific: Relationship */}
        {type === 'emergency' && (
          <Input
            label="Parentesco o relación"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            placeholder="Ej: Hija, Hijo, Vecino de confianza..."
          />
        )}

        {/* Notes */}
        <Input
          label="Notas o disponibilidad (Opcional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ej: Llamar en horario de tarde, tiene llaves..."
        />

        {/* Primary checkbox */}
        <label className="flex items-center gap-3 p-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl cursor-pointer">
          <input
            type="checkbox"
            checked={isPrimary}
            onChange={(e) => setIsPrimary(e.target.checked)}
            className="w-6 h-6 text-sky-600 rounded-lg focus:ring-sky-500"
          />
          <span className="text-base font-bold text-slate-800">
            Marcar como contacto principal destacado
          </span>
        </label>

      </form>
    </Modal>
  );
};
