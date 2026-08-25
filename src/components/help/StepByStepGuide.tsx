import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Plus, Check, Clock, History, ArrowRight, ArrowLeft } from 'lucide-react';
import { AmigoBot } from '../mascot/AmigoBot';

export const StepByStepGuide: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<number>(0);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const guides = [
    {
      title: '¿Cómo confirmar una toma?',
      icon: <Check className="w-6 h-6 text-emerald-600" />,
      steps: [
        {
          title: 'Paso 1: Mira el Panel Principal',
          desc: 'En la parte superior verás la tarjeta de tu próxima toma destacada con el nombre de tu medicamento y la dosis.',
          tip: 'La tarjeta se pondrá de color verde brillante cuando sea la hora exacta.'
        },
        {
          title: 'Paso 2: Presiona el botón verde [TOMADA]',
          desc: 'Toca el botón grande verde. Se abrirá una ventana para confirmar la toma de forma segura.',
          tip: 'Podrás verificar la hora exacta y anotar algún detalle si lo deseas.'
        },
        {
          title: 'Paso 3: Confirma y ¡Listo!',
          desc: 'Presiona "Sí, la he tomado". Escucharás un agradable sonido de campana y verás cómo tu historial y adherencia se actualizan al instante.',
          tip: '¡AmigoBot celebrará contigo cada toma cumplida!'
        }
      ]
    },
    {
      title: '¿Cómo posponer un recordatorio?',
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      steps: [
        {
          title: 'Paso 1: Presiona [POSPONER]',
          desc: 'Si estás comiendo o fuera de casa y necesitas unos minutos antes de tomar tu medicina, presiona el botón amarillo [POSPONER].',
          tip: 'Tu medicamento seguirá pendiente sin marcarse como omitido.'
        },
        {
          title: 'Paso 2: Elige el tiempo deseado',
          desc: 'Selecciona una opción rápida: 15 minutos, 30 minutos o 1 hora. También puedes escribir una hora exacta.',
          tip: 'El nuevo horario se guardará inmediatamente.'
        },
        {
          title: 'Paso 3: Espera el nuevo aviso',
          desc: 'Cuando llegue el nuevo horario seleccionado, AMIGO MED te volverá a mostrar la alerta para que no lo olvides.',
          tip: 'Puedes posponer las veces que sea necesario.'
        }
      ]
    },
    {
      title: '¿Cómo agregar un medicamento nuevo?',
      icon: <Plus className="w-6 h-6 text-sky-600" />,
      steps: [
        {
          title: 'Paso 1: Ve a "Mis Medicamentos"',
          desc: 'Toca la pestaña "Mis Medicamentos" en la barra de navegación y presiona el botón azul "+ Agregar Medicamento".',
          tip: 'El botón está siempre visible en la parte superior.'
        },
        {
          title: 'Paso 2: Completa el nombre y la dosis',
          desc: 'Escribe el nombre de tu medicina (ej: Losartán) y la dosis en miligramos o comprimidos.',
          tip: 'No te preocupes por errores, los campos te avisarán claramente qué falta.'
        },
        {
          title: 'Paso 3: Elige la hora y guarda',
          desc: 'Indica a qué hora debes tomarlo cada día. Presiona "Registrar Medicamento" y comenzará a avisarte automáticamente.',
          tip: 'Puedes agregar varios horarios si tomas varias dosis al día.'
        }
      ]
    },
    {
      title: '¿Cómo ver mi historial médico?',
      icon: <History className="w-6 h-6 text-purple-600" />,
      steps: [
        {
          title: 'Paso 1: Abre "Historial y Adherencia"',
          desc: 'Entra a la sección de Historial para ver el resumen de tus tomas de los últimos 7 o 30 días.',
          tip: 'Verás un gráfico de barras con tu porcentaje de cumplimiento.'
        },
        {
          title: 'Paso 2: Imprime tu reporte para la consulta',
          desc: 'Puedes presionar "Imprimir Reporte Médico" para llevar una hoja impresa a tu médico o especialista.',
          tip: 'A tu doctor le encantará ver tu constancia con el tratamiento.'
        }
      ]
    }
  ];

  const currentGuide = guides[activeGuide];
  const currentStep = currentGuide.steps[stepIndex];

  return (
    <Card variant="default" className="border-2 border-slate-200">
      <div className="flex flex-col gap-6">
        
        {/* Guide Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {guides.map((g, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveGuide(idx);
                setStepIndex(0);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm sm:text-base border-2 transition-all touch-target-senior ${
                activeGuide === idx
                  ? 'bg-sky-600 text-white border-sky-600 shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              }`}
            >
              {g.icon}
              <span>{g.title}</span>
            </button>
          ))}
        </div>

        {/* Current Step Viewer */}
        <div className="bg-sky-50/60 border-2 border-sky-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <AmigoBot size="md" mood="guide" animated={true} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-sky-200 text-sky-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Paso {stepIndex + 1} de {currentGuide.steps.length}
            </div>

            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {currentStep.title}
            </h4>

            <p className="text-base sm:text-lg text-slate-700 font-medium mt-2 leading-relaxed">
              {currentStep.desc}
            </p>

            <div className="mt-4 bg-white/90 p-3.5 rounded-2xl border border-sky-300 text-sm sm:text-base font-bold text-sky-950 inline-block text-left">
              💡 Consejo: {currentStep.tip}
            </div>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => setStepIndex(prev => Math.max(0, prev - 1))}
            disabled={stepIndex === 0}
            leftIcon={<ArrowLeft className="w-5 h-5" />}
          >
            Paso anterior
          </Button>

          <div className="flex items-center gap-2">
            {currentGuide.steps.map((_, i) => (
              <span
                key={i}
                className={`w-3.5 h-3.5 rounded-full transition-all ${
                  i === stepIndex ? 'bg-sky-600 w-8' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => setStepIndex(prev => Math.min(currentGuide.steps.length - 1, prev + 1))}
            disabled={stepIndex === currentGuide.steps.length - 1}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Siguiente paso
          </Button>
        </div>

      </div>
    </Card>
  );
};
