import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { ToastProvider } from './context/ToastContext';
import { MedicationProvider } from './context/MedicationContext';
import { MainLayout } from './components/layout/MainLayout';
import { WelcomePage } from './pages/WelcomePage';
import { DashboardPage } from './pages/DashboardPage';
import { MedicationsPage } from './pages/MedicationsPage';
import { HistoryPage } from './pages/HistoryPage';
import { ContactsPage } from './pages/ContactsPage';
import { ProfilePage } from './pages/ProfilePage';
import { HelpPage } from './pages/HelpPage';

export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <ToastProvider>
        <MedicationProvider>
          <BrowserRouter>
            <Routes>
              {/* Welcome Onboarding Screen */}
              <Route path="/" element={<WelcomePage />} />

              {/* Main Application with App Layout */}
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/medicamentos" element={<MedicationsPage />} />
                <Route path="/historial" element={<HistoryPage />} />
                <Route path="/contacto" element={<ContactsPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/ayuda" element={<HelpPage />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </MedicationProvider>
      </ToastProvider>
    </SettingsProvider>
  );
};

export default App;
