import React, { useState, useMemo } from 'react';
import { useMedications } from '../context/MedicationContext';
import { AdherenceChart } from '../components/history/AdherenceChart';
import { HistoryFilterBar } from '../components/history/HistoryFilterBar';
import { HistoryList } from '../components/history/HistoryList';
import { History, Award, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { getTodayDateString } from '../utils/dateUtils';
import { Card } from '../components/common/Card';

export const HistoryPage: React.FC = () => {
  const { doseLogs, medications, adherenceStats } = useMedications();

  const [dateRange, setDateRange] = useState<'today' | '7days' | '30days' | 'all'>('7days');
  const [selectedMedId, setSelectedMedId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredLogs = useMemo(() => {
    const today = new Date();
    const todayStr = getTodayDateString();

    return doseLogs.filter(log => {
      // Medication filter
      if (selectedMedId !== 'all' && log.medicationId !== selectedMedId) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && log.status !== selectedStatus) {
        return false;
      }

      // Date filter
      if (dateRange === 'today') {
        return log.scheduledDate === todayStr;
      } else if (dateRange === '7days') {
        const d = new Date(log.scheduledDate);
        const diffDays = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      } else if (dateRange === '30days') {
        const d = new Date(log.scheduledDate);
        const diffDays = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
      }

      return true;
    });
  }, [doseLogs, dateRange, selectedMedId, selectedStatus]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-200">
        <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
          <History className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Historial y Adherencia
          </h1>
          <p className="text-base text-slate-600 font-medium">
            Seguimiento detallado de todas tus tomas y constancia en el tratamiento
          </p>
        </div>
      </div>

      {/* KPI Cards Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <Card variant="default" className="border-2 border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Adherencia Global
              </span>
              <span className="text-3xl font-black text-emerald-700">
                {adherenceStats.adherenceRate}%
              </span>
            </div>
          </div>
        </Card>

        <Card variant="default" className="border-2 border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-100 text-sky-800 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Tomas Realizadas
              </span>
              <span className="text-3xl font-black text-sky-700">
                {adherenceStats.totalTaken}
              </span>
            </div>
          </div>
        </Card>

        <Card variant="default" className="border-2 border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-100 text-rose-800 rounded-xl">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Tomas Omitidas
              </span>
              <span className="text-3xl font-black text-rose-700">
                {adherenceStats.totalOmitted}
              </span>
            </div>
          </div>
        </Card>

        <Card variant="default" className="border-2 border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                Racha Activa
              </span>
              <span className="text-3xl font-black text-amber-700">
                {adherenceStats.streakDays} días
              </span>
            </div>
          </div>
        </Card>

      </div>

      {/* 7-Day Visual Adherence Chart */}
      <AdherenceChart stats={adherenceStats} />

      {/* Filter Bar */}
      <HistoryFilterBar
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedMedId={selectedMedId}
        setSelectedMedId={setSelectedMedId}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        medications={medications}
        onPrint={handlePrint}
      />

      {/* Chronological List of Records */}
      <HistoryList logs={filteredLogs} />

    </div>
  );
};
