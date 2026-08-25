import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useToast } from '../context/ToastContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { 
  User, 
  Heart, 
  Volume2, 
  Eye, 
  Save, 
  RotateCcw, 
  ShieldAlert
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export const ProfilePage: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    settings, 
    setTextSize, 
    setHighContrast, 
    setSoundEffects, 
    resetAllData 
  } = useSettings();

  const { showToast } = useToast();

  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(String(userProfile.age));
  const [bloodType, setBloodType] = useState(userProfile.bloodType);
  const [caregiverName, setCaregiverName] = useState(userProfile.caregiverName);
  const [caregiverPhone, setCaregiverPhone] = useState(userProfile.caregiverPhone);
  const [allergiesText, setAllergiesText] = useState(userProfile.allergies.join(', '));
  const [conditionsText, setConditionsText] = useState(userProfile.conditions.join(', '));
  const [notes, setNotes] = useState(userProfile.notes);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim(),
      age: age.trim(),
      bloodType,
      caregiverName: caregiverName.trim(),
      caregiverPhone: caregiverPhone.trim(),
      allergies: allergiesText.split(',').map(s => s.trim()).filter(Boolean),
      conditions: conditionsText.split(',').map(s => s.trim()).filter(Boolean),
      notes: notes.trim()
    });

    soundManager.playSuccess();
    showToast('✓ Perfil y preferencias actualizados correctamente.', 'success', 'Cambios Guardados');
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas restablecer los datos de demostración a su estado inicial?')) {
      resetAllData();
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-200">
        <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Mi Perfil y Preferencias
          </h1>
          <p className="text-base text-slate-600 font-medium">
            Personaliza tus datos, accesibilidad visual y alertas de sonido
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="flex flex-col gap-8">
        
        {/* Section 1: Accessibility Controls */}
        <Card variant="accent" className="border-2 border-sky-300">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sky-600 text-white rounded-xl">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  Preferencias de Accesibilidad y Lectura
                </h3>
                <p className="text-sm text-slate-600 font-medium">
                  Ajusta la aplicación para que te resulte lo más cómoda posible
                </p>
              </div>
            </div>

            {/* Font Size Selector Buttons */}
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-bold text-slate-900">
                Tamaño de texto en pantalla:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTextSize('normal')}
                  className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center transition-all touch-target-senior ${
                    settings.textSize === 'normal'
                      ? 'border-sky-600 bg-sky-100 text-sky-950 font-black shadow-md'
                      : 'border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base font-bold">A Normal</span>
                  <span className="text-xs text-slate-500 mt-1">16 píxeles estándar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTextSize('large')}
                  className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center transition-all touch-target-senior ${
                    settings.textSize === 'large'
                      ? 'border-sky-600 bg-sky-100 text-sky-950 font-black shadow-md'
                      : 'border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xl font-extrabold">A+ Grande</span>
                  <span className="text-xs text-slate-500 mt-1">Recomendado para lectura</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTextSize('xlarge')}
                  className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center transition-all touch-target-senior ${
                    settings.textSize === 'xlarge'
                      ? 'border-sky-600 bg-sky-100 text-sky-950 font-black shadow-md'
                      : 'border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl font-black">A++ Extra Grande</span>
                  <span className="text-xs text-slate-500 mt-1">Máxima legibilidad</span>
                </button>
              </div>
            </div>

            {/* Sound and High Contrast Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <label className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-slate-200 cursor-pointer hover:border-sky-300 transition-colors">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-6 h-6 text-emerald-600" />
                  <div>
                    <span className="text-base font-bold text-slate-900 block">
                      Sonidos de aviso suaves
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Campanillas agradables al confirmar tomas
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.soundEffects}
                  onChange={(e) => setSoundEffects(e.target.checked)}
                  className="w-7 h-7 text-emerald-600 rounded-lg focus:ring-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-slate-200 cursor-pointer hover:border-sky-300 transition-colors">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-sky-600" />
                  <div>
                    <span className="text-base font-bold text-slate-900 block">
                      Modo Alto Contraste
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Bordes y letras con máxima definición
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="w-7 h-7 text-sky-600 rounded-lg focus:ring-sky-500"
                />
              </label>

            </div>

          </div>
        </Card>

        {/* Section 2: Personal Information */}
        <Card variant="default" className="border-2 border-slate-200">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sky-600 text-white rounded-xl">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  Información Personal
                </h3>
                <p className="text-sm text-slate-600 font-medium">
                  Nombre del usuario y datos de su cuidador
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre completo del usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: María González"
              />

              <Input
                label="Edad"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ej: 72"
              />

              <Input
                label="Nombre del cuidador o familiar de apoyo"
                value={caregiverName}
                onChange={(e) => setCaregiverName(e.target.value)}
                placeholder="Ej: Sofía González (Hija)"
              />

              <Input
                label="Teléfono del cuidador"
                type="tel"
                value={caregiverPhone}
                onChange={(e) => setCaregiverPhone(e.target.value)}
                placeholder="Ej: +34 612 345 678"
              />
            </div>
          </div>
        </Card>

        {/* Section 3: Health Reference & Medical Disclaimer */}
        <Card variant="default" className="border-2 border-slate-200">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-600 text-white rounded-xl">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  Información Médica de Referencia
                </h3>
                <p className="text-sm text-slate-600 font-medium">
                  Datos de consulta rápida para médicos y familiares
                </p>
              </div>
            </div>

            {/* Disclaimer Callout */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-amber-950 font-medium leading-relaxed">
                <strong>Aviso:</strong> Esta información es proporcionada exclusivamente por el usuario con fines de referencia personal. AMIGO MED <strong>no emite diagnósticos médicos ni genera recomendaciones terapéuticas automáticas</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Grupo y factor sanguíneo"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                options={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'No especificado']}
              />

              <Input
                label="Alergias conocidas (separadas por comas)"
                value={allergiesText}
                onChange={(e) => setAllergiesText(e.target.value)}
                placeholder="Ej: Penicilina, Ibuprofeno"
              />

              <div className="sm:col-span-2">
                <Input
                  label="Condiciones crónicas conocidas (separadas por comas)"
                  value={conditionsText}
                  onChange={(e) => setConditionsText(e.target.value)}
                  placeholder="Ej: Hipertensión arterial, Diabetes tipo 2"
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Notas o preferencias adicionales"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej: Prefiere pastillas con comida..."
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="xl"
            leftIcon={<Save className="w-7 h-7" />}
            className="w-full sm:w-auto font-black text-xl py-5 shadow-lg"
          >
            Guardar Cambios del Perfil
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-5 h-5 text-slate-600" />}
            className="w-full sm:w-auto text-slate-700"
          >
            Restablecer Datos de Demostración
          </Button>
        </div>

      </form>
    </div>
  );
};
