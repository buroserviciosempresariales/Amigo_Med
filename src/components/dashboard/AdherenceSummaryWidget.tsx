import React from 'react';
import type { AdherenceStats } from '../../types';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { CheckCircle2, XCircle, TrendingUp, Award } from 'lucide-react';
import { AmigoBot } from '../mascot/AmigoBot';

interface AdherenceSummaryWidgetProps {
  stats: AdherenceStats;
}

export const AdherenceSummaryWidget: React.FC<AdherenceSummaryWidgetProps> = ({ stats }) => {
  const getAdherenceFeedback = (rate: number) => {
    if (rate >= 90) {
      return {
        title: '¡Excelente adherencia!',
        desc: 'Estás cumpliendo tus tomas con gran constancia.',
        color: 'text-emerald-700'
      };
    } else if (rate >= 75) {
      return {
        title: '¡Buen ritmo!',
        desc: 'Tu tratamiento va por buen camino.',
        color: 'text-sky-700'
      };
    } else {
      return {
        title: 'Podemos mejorar',
        desc: 'Intenta mantener la alarma activa para no olvidar tomas.',
        color: 'text-amber-700'
      };
    }
  };

  const feedback = getAdherenceFeedback(stats.adherenceRate);

  return (
    <Card variant="default" className="border-2 border-slate-200">
      <div className="flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Cumplimiento de Tomas
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-bold">
                Resumen de adherencia semanal
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl sm:text-4xl font-black text-sky-700">
              {stats.adherenceRate}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          value={stats.adherenceRate}
          size="lg"
          showPercentage={false}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3.5 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <span className="text-2xl font-black text-emerald-950 block leading-none">
                {stats.totalTaken}
              </span>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Tomadas
              </span>
            </div>
          </div>

          <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3.5 flex items-center gap-3">
            <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
            <div>
              <span className="text-2xl font-black text-rose-950 block leading-none">
                {stats.totalOmitted}
              </span>
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                Omitidas
              </span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-amber-50 border-2 border-amber-200 rounded-2xl p-3.5 flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-2xl font-black text-amber-950 block leading-none">
                {stats.streakDays} días
              </span>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Racha activa
              </span>
            </div>
          </div>

        </div>

        {/* Mascot note */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
          <AmigoBot size="sm" mood="guide" animated={false} />
          <div>
            <p className={`text-sm font-extrabold ${feedback.color}`}>
              {feedback.title}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {feedback.desc}
            </p>
          </div>
        </div>

      </div>
    </Card>
  );
};
