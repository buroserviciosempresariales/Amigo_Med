import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMedications } from '../context/MedicationContext';
import { useSettings } from '../context/SettingsContext';
import { getTimeGreeting, formatFriendlyDate, getTodayDateString } from '../utils/dateUtils';
import { NextDoseCard } from '../components/dashboard/NextDoseCard';
import { DailyTimeline } from '../components/dashboard/DailyTimeline';
import { AdherenceSummaryWidget } from '../components/dashboard/AdherenceSummaryWidget';
import { MedicationFormModal } from '../components/medications/MedicationFormModal';
import { Button } from '../components/common/Button';
import { Plus, Pill, Phone, Heart } from 'lucide-react';
import { AmigoBot } from '../components/mascot/AmigoBot';

export const DashboardPage: React.FC = () => {
  const { userProfile } = useSettings();
  const {
    medications,
    todayDoses,
    nextUpcomingDose,
    adherenceStats,
    confirmDose,
    snoozeDose,
    omitDose,
    addMedication
  } = useMedications();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { greeting } = getTimeGreeting();
  const firstName = userProfile.name.split(' ')[0] || 'María';
  const todayStr = getTodayDateString();

  const pendingDoses = todayDoses.filter(d => d.status === 'pending' || d.status === 'snoozed');

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* Top Greeting & Daily Summary Banner */}
      <section className="bg-gradient-to-r from-sky-600 via-sky-700 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-32 -top-10 w-32 h-32 bg-teal-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="bg-white/15 p-2 rounded-2xl border border-white/20 flex-shrink-0 backdrop-blur-sm">
              <AmigoBot size="md" mood={pendingDoses.length === 0 ? 'celebrating' : 'happy'} animated={true} />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase mb-1">
                <span>{formatFriendlyDate(todayStr)}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {greeting}, {firstName}!
              </h1>

              <p className="text-lg sm:text-xl text-sky-100 font-medium mt-1">
                {pendingDoses.length > 0 ? (
                  <>Hoy tienes <strong>{pendingDoses.length}</strong> {pendingDoses.length === 1 ? 'medicamento pendiente' : 'medicamentos pendientes'}.</>
                ) : (
                  <>¡Has completado todas tus tomas de hoy!</>
                )}
              </p>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="success"
              size="lg"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus className="w-6 h-6" />}
              className="bg-emerald-500 hover:bg-emerald-600 border-emerald-400 text-slate-950 font-black shadow-lg"
            >
              + Agregar Medicamento
            </Button>
          </div>

        </div>
      </section>

      {/* Main Grid Layout: Next Dose (Top/Left) + Adherence (Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Next Dose Card (Most Important Focus) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <NextDoseCard
            dose={nextUpcomingDose}
            onConfirmDose={confirmDose}
            onSnoozeDose={snoozeDose}
            onOmitDose={omitDose}
          />

          {/* Daily Timeline */}
          <div className="mt-4">
            <DailyTimeline
              doses={todayDoses}
              onConfirmDose={confirmDose}
              onSnoozeDose={snoozeDose}
              onOmitDose={omitDose}
            />
          </div>
        </div>

        {/* Sidebar / Right Column Widgets */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Adherence Summary */}
          <AdherenceSummaryWidget stats={adherenceStats} />

          {/* Quick Shortcuts Card */}
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col gap-3">
            <h4 className="text-lg font-black text-slate-900 mb-1">
              Accesos Rápidos
            </h4>

            <Link
              to="/medicamentos"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors group touch-target-senior"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-600 text-white rounded-xl">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 block text-base">
                    Mis Medicamentos
                  </span>
                  <span className="text-xs text-slate-600 font-semibold">
                    {medications.length} registrados
                  </span>
                </div>
              </div>
              <span className="text-sky-700 font-black text-xl group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>

            <Link
              to="/contacto"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors group touch-target-senior"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-600 text-white rounded-xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 block text-base">
                    Números de Emergencia
                  </span>
                  <span className="text-xs text-slate-600 font-semibold">
                    Médicos y familiares
                  </span>
                </div>
              </div>
              <span className="text-rose-700 font-black text-xl group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Senior Health Tip Card */}
          <div className="bg-emerald-50/70 p-5 rounded-3xl border-2 border-emerald-200 flex items-start gap-3.5">
            <Heart className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-black text-emerald-950 text-base mb-1">
                Consejo de Salud
              </h5>
              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                Recuerda acompañar tus pastillas con agua a temperatura ambiente y mantener una pequeña rutina diaria para fijar tus horarios con facilidad.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* Add Medication Modal */}
      <MedicationFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={addMedication}
      />

    </div>
  );
};
