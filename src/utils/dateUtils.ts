// Date and time utility functions formatted in Spanish for AMIGO MED

export const DAYS_SPANISH = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
export const MONTHS_SPANISH = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

/**
 * Returns current date string in YYYY-MM-DD
 */
export const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a Date or ISO string into friendly Spanish date
 * Example: "Lunes, 24 de Agosto"
 */
export const formatFriendlyDate = (dateInput: string | Date): string => {
  const d = typeof dateInput === 'string' ? new Date(dateInput.includes('T') ? dateInput : `${dateInput}T00:00:00`) : dateInput;
  if (isNaN(d.getTime())) return String(dateInput);

  const today = new Date();
  const todayStr = getTodayDateString();
  const inputStr = typeof dateInput === 'string' && !dateInput.includes('T') 
    ? dateInput 
    : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  if (inputStr === todayStr) {
    return 'Hoy';
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
  
  if (inputStr === yesterdayStr) {
    return 'Ayer';
  }

  const dayName = DAYS_SPANISH[d.getDay()];
  const dayNum = d.getDate();
  const monthName = MONTHS_SPANISH[d.getMonth()];
  return `${dayName}, ${dayNum} de ${monthName}`;
};

/**
 * Returns a friendly greeting based on the current hour of the day
 */
export const getTimeGreeting = (): { greeting: string; period: 'morning' | 'afternoon' | 'evening' } => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { greeting: '¡Buenos días', period: 'morning' };
  } else if (hour >= 12 && hour < 19) {
    return { greeting: '¡Buenas tardes', period: 'afternoon' };
  } else {
    return { greeting: '¡Buenas noches', period: 'evening' };
  }
};

/**
 * Formats 24h time "08:00" to 12h or clear label
 */
export const formatTimeDisplay = (time24: string): string => {
  if (!time24) return '';
  const [hoursStr, minutesStr] = time24.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = minutesStr || '00';
  
  if (isNaN(hours)) return time24;
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hours12}:${minutes} ${period} (${time24} hrs)`;
};

/**
 * Formats time compactly: "08:00 AM"
 */
export const formatTimeCompact = (time24: string): string => {
  if (!time24) return '';
  const [hoursStr, minutesStr] = time24.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = minutesStr || '00';
  
  if (isNaN(hours)) return time24;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hours12}:${minutes} ${period}`;
};

/**
 * Adds minutes to an "HH:mm" string and returns new "HH:mm"
 */
export const addMinutesToTime = (time24: string, minutesToAdd: number): string => {
  const [hoursStr, minutesStr] = time24.split(':');
  let hours = parseInt(hoursStr, 10) || 0;
  let minutes = parseInt(minutesStr, 10) || 0;

  minutes += minutesToAdd;
  while (minutes >= 60) {
    minutes -= 60;
    hours = (hours + 1) % 24;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

/**
 * Gets current time in HH:mm
 */
export const getCurrentTimeString = (): string => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/**
 * Calculates human time difference: e.g. "En 25 minutos", "Hace 10 minutos", "Ahora"
 */
export const getTimeDifferenceLabel = (scheduledTime: string): { label: string; isPast: boolean; isNow: boolean } => {
  const now = new Date();
  const [schedH, schedM] = scheduledTime.split(':').map(Number);
  
  const scheduledDate = new Date();
  scheduledDate.setHours(schedH, schedM, 0, 0);

  const diffMs = scheduledDate.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / 60000);

  if (Math.abs(diffMinutes) <= 5) {
    return { label: '¡Es hora ahora!', isPast: false, isNow: true };
  } else if (diffMinutes > 0) {
    if (diffMinutes < 60) {
      return { label: `En ${diffMinutes} min`, isPast: false, isNow: false };
    }
    const hours = Math.floor(diffMinutes / 60);
    const remainingMins = diffMinutes % 60;
    return { 
      label: `En ${hours}h ${remainingMins > 0 ? `${remainingMins}m` : ''}`, 
      isPast: false, 
      isNow: false 
    };
  } else {
    const pastMinutes = Math.abs(diffMinutes);
    if (pastMinutes < 60) {
      return { label: `Hace ${pastMinutes} min`, isPast: true, isNow: false };
    }
    const hours = Math.floor(pastMinutes / 60);
    return { label: `Hace ${hours} hora${hours > 1 ? 's' : ''}`, isPast: true, isNow: false };
  }
};
