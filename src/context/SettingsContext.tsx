import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AppSettings, TextSizeLevel, UserProfile } from '../types';
import { INITIAL_SETTINGS, INITIAL_USER_PROFILE } from '../data/initialData';
import { soundManager } from '../utils/sound';

interface SettingsContextType {
  settings: AppSettings;
  userProfile: UserProfile;
  setTextSize: (size: TextSizeLevel) => void;
  setHighContrast: (enabled: boolean) => void;
  setSoundEffects: (enabled: boolean) => void;
  setSpeechReminders: (enabled: boolean) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  updateUserProfile: (newProfile: Partial<UserProfile>) => void;
  resetAllData: () => void;
}

const STORAGE_KEY_SETTINGS = 'amigomed_settings_v1';
const STORAGE_KEY_PROFILE = 'amigomed_profile_v1';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  // Apply text size class to root html element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${settings.textSize}`);

    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    soundManager.setEnabled(settings.soundEffects);

    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch {
      // Storage fallback
    }
  }, [settings]);

  // Persist user profile changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(userProfile));
    } catch {
      // Storage fallback
    }
  }, [userProfile]);

  const setTextSize = (size: TextSizeLevel) => {
    setSettings(prev => ({ ...prev, textSize: size }));
  };

  const setHighContrast = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, highContrast: enabled }));
  };

  const setSoundEffects = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, soundEffects: enabled }));
  };

  const setSpeechReminders = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, speechReminders: enabled }));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateUserProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...newProfile }));
  };

  const resetAllData = () => {
    localStorage.clear();
    setSettings(INITIAL_SETTINGS);
    setUserProfile(INITIAL_USER_PROFILE);
    window.location.reload();
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        userProfile,
        setTextSize,
        setHighContrast,
        setSoundEffects,
        setSpeechReminders,
        updateSettings,
        updateUserProfile,
        resetAllData
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
