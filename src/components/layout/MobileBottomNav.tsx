import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Pill, History, Phone, HelpCircle } from 'lucide-react';
import { useMedications } from '../../context/MedicationContext';

export const MobileBottomNav: React.FC = () => {
  const { todayDoses } = useMedications();
  const pendingCount = todayDoses.filter(d => d.status === 'pending' || d.status === 'snoozed').length;

  const navItems = [
    {
      to: '/dashboard',
      label: 'Panel',
      icon: <Home className="w-7 h-7" />,
      badge: pendingCount > 0 ? pendingCount : undefined
    },
    {
      to: '/medicamentos',
      label: 'Medicina',
      icon: <Pill className="w-7 h-7" />
    },
    {
      to: '/historial',
      label: 'Historial',
      icon: <History className="w-7 h-7" />
    },
    {
      to: '/contacto',
      label: 'Contactos',
      icon: <Phone className="w-7 h-7" />
    },
    {
      to: '/ayuda',
      label: 'Ayuda',
      icon: <HelpCircle className="w-7 h-7" />
    }
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t-2 border-slate-200 shadow-2xl safe-area-pb"
      aria-label="Navegación móvil inferior"
    >
      <div className="grid grid-cols-5 h-20 px-1 items-center">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center h-full py-1 text-center transition-all
              touch-target-senior select-none focus:outline-none focus:bg-sky-50
              ${isActive 
                ? 'text-sky-700 font-extrabold scale-105' 
                : 'text-slate-600 hover:text-slate-900 font-bold'}
            `}
          >
            <div className="relative">
              {item.icon}
              {item.badge !== undefined && (
                <span 
                  className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                  aria-label={`${item.badge} tomas pendientes`}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm mt-1 leading-none tracking-tight">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
