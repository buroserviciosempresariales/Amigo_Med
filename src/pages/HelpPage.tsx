import React from 'react';
import { HelpCircle, PhoneCall, HeartHandshake } from 'lucide-react';
import { StepByStepGuide } from '../components/help/StepByStepGuide';
import { FAQAccordion } from '../components/help/FAQAccordion';
import { ReminderSimulator } from '../components/help/ReminderSimulator';
import { Card } from '../components/common/Card';
import { AmigoBot } from '../components/mascot/AmigoBot';

export const HelpPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-200">
        <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl">
          <HelpCircle className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Centro de Ayuda y Soporte
          </h1>
          <p className="text-base text-slate-600 font-medium">
            Aprende a utilizar AMIGO MED con guías sencillas paso a paso
          </p>
        </div>
      </div>

      {/* AmigoBot Welcome Card */}
      <div className="bg-gradient-to-r from-sky-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 bg-white/15 p-2 rounded-2xl border border-white/20">
          <AmigoBot size="lg" mood="guide" animated={true} />
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-1">
            Asistencia Continua
          </span>
          <h2 className="text-3xl font-black tracking-tight">
            ¡Estoy aquí para guiarte en cada paso!
          </h2>
          <p className="text-base sm:text-lg text-sky-100 mt-2 font-medium leading-relaxed">
            AMIGO MED está diseñado para que nunca tengas dudas. A continuación encontrarás guías interactivas, un simulador de alarmas y respuestas a las preguntas más frecuentes.
          </p>
        </div>
      </div>

      {/* 1. Step By Step Guide */}
      <section className="flex flex-col gap-3">
        <h3 className="text-2xl font-black text-slate-900">
          Guías Visuales Paso a Paso
        </h3>
        <StepByStepGuide />
      </section>

      {/* 2. Reminder Simulator */}
      <section className="flex flex-col gap-3">
        <h3 className="text-2xl font-black text-slate-900">
          Prueba el Simulador de Alarma
        </h3>
        <ReminderSimulator />
      </section>

      {/* 3. FAQs */}
      <section className="flex flex-col gap-3">
        <h3 className="text-2xl font-black text-slate-900">
          Dudas Frecuentes
        </h3>
        <FAQAccordion />
      </section>

      {/* 4. Need more help? Support section */}
      <Card variant="default" className="border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-4 bg-teal-100 text-teal-800 rounded-3xl flex-shrink-0">
              <HeartHandshake className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">
                ¿Necesitas asistencia adicional?
              </h4>
              <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
                Puedes pedirle a tu familiar o cuidador que revise la configuración de tu teléfono o consultar con nuestro equipo de soporte.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:900123456"
              className="px-6 py-4 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-lg rounded-2xl shadow-md transition-all flex items-center gap-2 touch-target-senior"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Línea Gratuita de Ayuda</span>
            </a>
          </div>
        </div>
      </Card>

    </div>
  );
};
