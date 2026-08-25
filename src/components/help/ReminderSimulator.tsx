import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Sparkles, Bell, Volume2, Check, RefreshCw, XCircle } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { useToast } from '../../context/ToastContext';
import { AmigoBot } from '../mascot/AmigoBot';
import { Modal } from '../common/Modal';

export const ReminderSimulator: React.FC = () => {
  const { showToast } = useToast();
  const [selectedMed, setSelectedMed] = useState('Losartán 50 mg');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSimulatedModal, setShowSimulatedModal] = useState(false);

  const startSimulation = () => {
    setIsSimulating(true);
    soundManager.playReminder();
    soundManager.speak(`Hola María, es la hora de tu medicamento: ${selectedMed}`);

    showToast(
      `¡Simulación activa! Así suena y se ve un recordatorio de ${selectedMed}.`,
      'warning',
      'Simulador de Alarma',
      6000
    );

    setTimeout(() => {
      setShowSimulatedModal(true);
      setIsSimulating(false);
    }, 400);
  };

  const handleSimulatedAction = (action: 'taken' | 'snooze' | 'omit') => {
    setShowSimulatedModal(false);
    if (action === 'taken') {
      soundManager.playSuccess();
      showToast('✓ ¡Excelente! Así se confirma una toma en AMIGO MED.', 'success', 'Prueba Exitosa');
    } else if (action === 'snooze') {
      soundManager.playSnooze();
      showToast('Así se pospone un recordatorio para más tarde.', 'info', 'Prueba de Posponer');
    } else {
      soundManager.playClick();
      showToast('Así se registra una toma omitida.', 'info', 'Prueba de Omitir');
    }
  };

  return (
    <Card variant="accent" className="border-2 border-sky-300">
      <div className="flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              Simulador Interactivo de Recordatorios
            </h3>
            <p className="text-sm text-slate-600 font-medium">
              Prueba cómo se escuchan y ven las alertas sin modificar tus registros reales
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:flex-1">
            <label className="text-sm font-bold text-slate-800 block mb-1.5">
              Medicamento de prueba:
            </label>
            <select
              value={selectedMed}
              onChange={(e) => setSelectedMed(e.target.value)}
              className="w-full bg-white border-2 border-sky-300 rounded-2xl p-3.5 text-base font-bold text-slate-900 focus:outline-none focus:border-sky-500"
            >
              <option value="Losartán 50 mg">Losartán 50 mg (Mañana)</option>
              <option value="Metformina 850 mg">Metformina 850 mg (Almuerzo)</option>
              <option value="Atorvastatina 20 mg">Atorvastatina 20 mg (Noche)</option>
            </select>
          </div>

          <div className="w-full sm:w-auto self-end">
            <Button
              type="button"
              variant="warning"
              size="lg"
              onClick={startSimulation}
              isLoading={isSimulating}
              leftIcon={<Bell className="w-6 h-6 animate-bounce text-slate-950" />}
              className="w-full sm:w-auto"
            >
              Probar Alarma en Vivo
            </Button>
          </div>
        </div>

        <div className="bg-white/80 p-3.5 rounded-2xl border border-sky-200 flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-semibold">
          <Volume2 className="w-5 h-5 text-sky-600 flex-shrink-0" />
          <span>Asegúrate de tener el volumen de tu dispositivo encendido para escuchar el timbre de ayuda.</span>
        </div>

      </div>

      {/* Simulated Modal */}
      <Modal
        isOpen={showSimulatedModal}
        onClose={() => setShowSimulatedModal(false)}
        title="🔔 ¡Hora de tomar tu medicamento!"
        subtitle="Esta es una demostración en vivo de cómo te avisará AMIGO MED"
        maxWidth="md"
        footer={
          <div className="grid grid-cols-3 gap-2 w-full">
            <Button
              type="button"
              variant="success"
              size="lg"
              onClick={() => handleSimulatedAction('taken')}
              leftIcon={<Check className="w-6 h-6" />}
            >
              TOMADA
            </Button>
            <Button
              type="button"
              variant="warning"
              size="lg"
              onClick={() => handleSimulatedAction('snooze')}
              leftIcon={<RefreshCw className="w-5 h-5 text-slate-950" />}
            >
              POSPONER
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => handleSimulatedAction('omit')}
              leftIcon={<XCircle className="w-5 h-5 text-rose-600" />}
            >
              OMITIR
            </Button>
          </div>
        }
      >
        <div className="flex flex-col items-center text-center gap-4 py-2">
          <AmigoBot size="md" mood="reminder" animated={true} />
          
          <div className="bg-sky-50 p-4 rounded-3xl border-2 border-sky-200 w-full">
            <span className="text-xs uppercase font-extrabold text-sky-700 block tracking-wider">
              Medicamento programado ahora:
            </span>
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {selectedMed}
            </h4>
            <p className="text-base text-slate-700 font-medium mt-1">
              Tomar con un vaso de agua natural.
            </p>
          </div>

          <p className="text-sm font-bold text-slate-600">
            Presiona cualquiera de los 3 botones de abajo para practicar la acción.
          </p>
        </div>
      </Modal>
    </Card>
  );
};
