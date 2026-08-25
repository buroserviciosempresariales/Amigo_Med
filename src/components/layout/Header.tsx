import React from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, Eye, PhoneCall, Sparkles } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useMedications } from '../../context/MedicationContext';
import { getTodayDateString, formatFriendlyDate, getCurrentTimeString } from '../../utils/dateUtils';
import { AmigoBot } from '../mascot/AmigoBot';

export const Header: React.FC = () => {
  const { settings, setTextSize, setHighContrast, setSoundEffects } = useSettings();
  const { triggerAlarmTest } = useMedications();
  const [time, setTime] = React.useState(getCurrentTimeString());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTimeString());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          
          {/* Brand Logo & Robot */}
          <Link 
            to="/dashboard" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-sky-300 rounded-2xl p-1.5 transition-transform active:scale-95"
            aria-label="AMIGO MED - Ir al inicio"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-sky-50 rounded-2xl flex items-center justify-center border-2 border-sky-200 shadow-inner group-hover:border-sky-400 transition-colors">
              <AmigoBot size="sm" mood="happy" animated={false} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-sky-700 tracking-tight font-heading">
                  AMIGO MED
                </span>
                <span className="hidden md:inline-flex bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                  ACTIVO
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium hidden sm:block">
                Tu compañero para recordar y confirmar tus tomas
              </p>
            </div>
          </Link>

          {/* Quick Info & Accessibility Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Live Clock & Date Badge */}
            <div className="hidden lg:flex flex-col items-end pr-3 border-r-2 border-slate-200">
              <span className="text-sm font-bold text-slate-800">
                {formatFriendlyDate(getTodayDateString())}
              </span>
              <span className="text-lg font-extrabold text-sky-700 font-mono tracking-tight">
                {time} hrs
              </span>
            </div>

            {/* Test Alarm Simulation Button */}
            <button
              type="button"
              onClick={() => triggerAlarmTest()}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-300 rounded-xl text-sm font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              title="Probar sonido y aviso de medicamento"
              aria-label="Simular alarma de medicamento"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Probar Alarma</span>
            </button>

            {/* Font Size Selector (A- / A / A+) */}
            <div 
              className="flex items-center bg-slate-100 p-1 rounded-2xl border-2 border-slate-200"
              role="group"
              aria-label="Ajuste de tamaño de texto"
            >
              <button
                type="button"
                onClick={() => setTextSize('normal')}
                className={`px-2.5 py-1.5 rounded-xl font-extrabold text-sm sm:text-base transition-all touch-target-senior ${
                  settings.textSize === 'normal'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
                title="Tamaño de texto normal"
                aria-label="Texto tamaño normal"
                aria-pressed={settings.textSize === 'normal'}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setTextSize('large')}
                className={`px-3 py-1.5 rounded-xl font-extrabold text-base sm:text-lg transition-all touch-target-senior ${
                  settings.textSize === 'large'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
                title="Tamaño de texto grande"
                aria-label="Texto tamaño grande"
                aria-pressed={settings.textSize === 'large'}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setTextSize('xlarge')}
                className={`px-3 py-1.5 rounded-xl font-extrabold text-lg sm:text-xl transition-all touch-target-senior ${
                  settings.textSize === 'xlarge'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
                title="Tamaño de texto extra grande"
                aria-label="Texto tamaño extra grande"
                aria-pressed={settings.textSize === 'xlarge'}
              >
                A++
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundEffects(!settings.soundEffects)}
              className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-colors touch-target-senior flex items-center justify-center ${
                settings.soundEffects
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
              }`}
              title={settings.soundEffects ? 'Sonidos activados' : 'Sonidos desactivados'}
              aria-label={settings.soundEffects ? 'Desactivar sonidos de ayuda' : 'Activar sonidos de ayuda'}
              aria-pressed={settings.soundEffects}
            >
              {settings.soundEffects ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>

            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={() => setHighContrast(!settings.highContrast)}
              className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-colors touch-target-senior hidden sm:flex items-center justify-center ${
                settings.highContrast
                  ? 'bg-slate-900 text-white border-slate-950'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
              title="Modo alto contraste"
              aria-label="Alternar modo de alto contraste"
              aria-pressed={settings.highContrast}
            >
              <Eye className="w-6 h-6" />
            </button>

            {/* Direct Emergency Button */}
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl shadow-md border-2 border-rose-700 transition-all active:scale-95 touch-target-senior"
              aria-label="Ir a contactos y botón de emergencia SOS"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span className="hidden sm:inline">Emergencia</span>
              <span className="sm:hidden font-black">SOS</span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};
