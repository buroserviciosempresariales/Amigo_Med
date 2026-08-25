import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Pill, 
  History, 
  Phone, 
  User, 
  HelpCircle 
} from 'lucide-react';
import { useMedications } from '../../context/MedicationContext';

export const Navbar: React.FC = () => {
  const { todayDoses } = useMedications();
  const pendingCount = todayDoses.filter(d => d.status === 'pending' || d.status === 'snoozed').length;

  const navItems = [
    {
      to: '/dashboard',
      label: 'Panel Principal',
      icon: <Home className="w-6 h-6" />,
      badge: pendingCount > 0 ? `${pendingCount} pendiente${pendingCount > 1 ? 's' : ''}` : undefined,
      badgeColor: 'bg-amber-500 text-slate-950'
    },
    {
      to: '/medicamentos',
      label: 'Mis Medicamentos',
      icon: <Pill className="w-6 h-6" />
    },
    {
      to: '/historial',
      label: 'Historial y Adherencia',
      icon: <History className="w-6 h-6" />
    },
    {
      to: '/contacto',
      label: 'Contactos',
      icon: <Phone className="w-6 h-6" />
    },
    {
      to: '/perfil',
      label: 'Mi Perfil',
      icon: <User className="w-6 h-6" />
    },
    {
      to: '/ayuda',
      label: 'Ayuda',
      icon: <HelpCircle className="w-6 h-6" />
    }
  ];

  return (
    <nav 
      className="hidden md:block bg-white border-b-2 border-slate-200 sticky top-20 sm:top-22 z-30 shadow-sm"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-x-1 lg:space-x-2 py-2 overflow-x-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-base lg:text-lg transition-all
                focus:outline-none focus:ring-4 focus:ring-sky-300 min-h-[50px] whitespace-nowrap
                ${isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 border-2 border-sky-600'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-2 border-transparent'}
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-black ml-1.5 ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
