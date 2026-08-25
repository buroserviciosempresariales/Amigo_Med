import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { AmigoBot } from '../components/mascot/AmigoBot';
import { 
  CheckCircle2, 
  Clock, 
  History, 
  HeartHandshake, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    soundManager.playSuccess();
    navigate('/dashboard');
  };

  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-sky-600" />,
      title: 'Recuerda tus medicamentos',
      desc: 'Avisos claros con sonido suave y letra grande a la hora exacta de cada toma.'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
      title: 'Registra tus tomas fácilmente',
      desc: 'Confirma con un solo toque que tomaste tu pastilla y evita confusiones o dosis dobles.'
    },
    {
      icon: <History className="w-8 h-8 text-purple-600" />,
      title: 'Consulta tu historial y constancia',
      desc: 'Revisa qué días tomaste tus medicinas y genera reportes para tus citas con el médico.'
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-rose-600" />,
      title: 'Contactos y ayuda siempre a mano',
      desc: 'Llama rápidamente a tus familiares, médico o cuidador con botones directos.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100/60 via-slate-50 to-white flex flex-col justify-between p-4 sm:p-6 lg:p-10">
      
      {/* Top Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border-2 border-sky-300 shadow-sm">
            <AmigoBot size="sm" mood="happy" animated={false} />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-sky-800 tracking-tight font-heading">
              AMIGO MED
            </span>
          </div>
        </div>

        <Link
          to="/ayuda"
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-2xl border-2 border-slate-200 font-bold text-sm sm:text-base shadow-sm transition-colors touch-target-senior"
        >
          <HelpCircle className="w-5 h-5 text-sky-600" />
          <span>Ayuda y Guía</span>
        </Link>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-5xl w-full mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center gap-8">
        
        {/* Friendly Mascot Centerpiece */}
        <div className="flex flex-col items-center gap-4">
          <AmigoBot 
            size="xl" 
            mood="happy" 
            animated={true}
            showSpeechBubble={true}
            speechText="¡Hola! Soy tu asistente médico AmigoBot. Estoy aquí para acompañarte y recordar tus medicamentos todos los días."
          />
        </div>

        {/* Headlines */}
        <div className="max-w-3xl flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-100 text-sky-900 border border-sky-300 rounded-full text-sm sm:text-base font-extrabold mx-auto">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Diseñado pensando en ti y tu tranquilidad</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            AMIGO MED
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-sky-700 leading-snug">
            “Tu compañero para recordar y confirmar tus tomas”
          </p>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium mt-2 leading-relaxed">
            AMIGO MED te ayuda a recordar tus medicamentos y llevar un control sencillo, sin complicaciones tecnológicas ni menús confusos.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full max-w-4xl text-left mt-4">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-sm flex items-start gap-4 hover:border-sky-300 transition-colors"
            >
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex-shrink-0">
                {b.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                  {b.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mt-6">
          <Button
            type="button"
            variant="primary"
            size="xl"
            fullWidth
            onClick={handleStart}
            rightIcon={<ArrowRight className="w-7 h-7" />}
            className="text-2xl py-6 shadow-xl hover:shadow-sky-600/30 font-black"
          >
            Comenzar Ahora
          </Button>
        </div>

      </main>

      {/* Footer Disclaimer */}
      <footer className="max-w-4xl w-full mx-auto pt-6 text-center text-xs sm:text-sm text-slate-500 border-t border-slate-200 flex flex-col gap-2">
        <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Información de seguridad</span>
        </div>
        <p className="leading-relaxed">
          AMIGO MED es una aplicación de ayuda personal para la toma de medicamentos. <strong>No emite diagnósticos médicos ni sustituye la atención de profesionales de la salud.</strong>
        </p>
      </footer>

    </div>
  );
};
