import React from 'react';
import { Card } from '../common/Card';
import { Award } from 'lucide-react';
import type { AdherenceStats } from '../../types';

interface AdherenceChartProps {
  stats: AdherenceStats;
}

export const AdherenceChart: React.FC<AdherenceChartProps> = ({ stats }) => {
  return (
    <Card variant="default" className="border-2 border-slate-200">
      <div className="flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                Adherencia de los Últimos 7 Días
              </h3>
              <p className="text-sm text-slate-600 font-medium">
                Visualiza tu constancia diaria en el cumplimiento del tratamiento
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border-2 border-emerald-200 px-4 py-2 rounded-2xl self-start sm:self-auto">
            <span className="text-sm font-bold text-emerald-900">Promedio Semanal:</span>
            <span className="text-2xl font-black text-emerald-700">{stats.adherenceRate}%</span>
          </div>
        </div>

        {/* Weekly Bar Visualization */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-4 pb-2 border-b-2 border-slate-100">
          {stats.weeklyBreakdown.map((day, idx) => {
            const heightPercentage = Math.max(15, day.rate);
            const isFull = day.rate === 100;
            const isGood = day.rate >= 75 && day.rate < 100;

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <span className="text-xs font-black text-slate-700">
                  {day.rate}%
                </span>

                {/* Bar Container */}
                <div className="w-full max-w-[42px] h-32 sm:h-40 bg-slate-100 rounded-2xl flex flex-col justify-end p-1 border border-slate-200">
                  <div
                    className={`w-full rounded-xl transition-all duration-500 ${
                      isFull 
                        ? 'bg-emerald-500 shadow-sm' 
                        : isGood 
                          ? 'bg-sky-500' 
                          : 'bg-amber-400'
                    }`}
                    style={{ height: `${heightPercentage}%` }}
                    title={`${day.day}: ${day.taken}/${day.total} tomas (${day.rate}%)`}
                  />
                </div>

                <span className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-500" />
            <span>100% Cumplido</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-sky-500" />
            <span>75-99% Bueno</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-amber-400" />
            <span>Menos del 75%</span>
          </div>
        </div>

      </div>
    </Card>
  );
};
