import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from '../common/Card';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: '¿Qué ocurre si se me olvida confirmar una toma a tiempo?',
    answer: 'La toma permanecerá en tu panel principal como pendiente o con un aviso de que ya pasó la hora. Puedes presionar "TOMADA" en cualquier momento posterior para registrar que la tomaste o "POSPONER" si vas a tomarla en unos minutos.'
  },
  {
    question: '¿Puedo cambiar el tamaño de las letras si me cuesta leer?',
    answer: '¡Sí! En la barra superior encontrarás los botones "A", "A+" y "A++". Presiona "A+" o "A++" para agrandar los textos de toda la aplicación de manera cómoda y sin esfuerzo.'
  },
  {
    question: '¿Mis datos se borran si cierro el navegador o apago el dispositivo?',
    answer: 'No. Todos tus medicamentos, horarios, tomas e historial quedan guardados automáticamente en la memoria de tu dispositivo (almacenamiento local) para que nunca pierdas tu información.'
  },
  {
    question: '¿AMIGO MED me receta medicamentos o emite diagnósticos?',
    answer: 'No. AMIGO MED es un asistente digital para recordar y organizar los medicamentos indicados por tu médico de cabecera. Nunca debes cambiar tus dosis ni iniciar medicamentos nuevos sin supervisión médica.'
  },
  {
    question: '¿Cómo puedo llamar rápidamente a mi médico o familiar en caso de urgencia?',
    answer: 'Toca el botón rojo "SOS / Emergencia" situado en la barra superior o ve a la sección "Contactos". Verás los números de tu médico y familiares con botones grandes para llamar con un solo toque.'
  }
];

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <Card variant="default" className="border-2 border-slate-200">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl">
            <HelpCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              Preguntas Frecuentes
            </h3>
            <p className="text-sm text-slate-600 font-medium">
              Respuestas claras a las dudas más habituales
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-2 border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-extrabold text-base sm:text-lg text-slate-900 hover:bg-slate-50 transition-colors touch-target-senior focus:outline-none focus:bg-sky-50"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className={`p-1.5 rounded-xl bg-slate-100 transition-transform ${isOpen ? 'rotate-180 bg-sky-100 text-sky-700' : 'text-slate-500'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-base sm:text-lg leading-relaxed font-medium bg-slate-50/50 border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
