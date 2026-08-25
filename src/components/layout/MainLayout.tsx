import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { MobileBottomNav } from './MobileBottomNav';
import { ShieldAlert, Heart } from 'lucide-react';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header */}
      <Header />

      {/* Desktop Navigation */}
      <Navbar />

      {/* Main Content View */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 md:pb-12">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Accessible Footer with Explicit Health Disclaimer */}
      <footer className="bg-white border-t-2 border-slate-200 py-8 px-4 sm:px-6 text-center text-slate-600 text-sm hidden md:block">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2 text-slate-700 font-bold">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>Aviso de responsabilidad médica</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            AMIGO MED es una herramienta de asistencia y recordatorio personal. <strong>No emite diagnósticos médicos ni sustituye la atención, recetas o indicaciones de profesionales de la salud.</strong> Consulte siempre a su médico antes de realizar cualquier cambio en su tratamiento.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 mt-2">
            <span>AMIGO MED © {new Date().getFullYear()}</span>
            <span>•</span>
            <Link to="/ayuda" className="hover:text-sky-700 underline">Centro de Ayuda</Link>
            <span>•</span>
            <Link to="/perfil" className="hover:text-sky-700 underline">Preferencias</Link>
          </div>
          <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mt-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>para personas adultas mayores y sus familias</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
