import React from 'react';

export type MascotMood = 'happy' | 'celebrating' | 'reminder' | 'guide' | 'thinking';

interface AmigoBotProps {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
  speechText?: string;
  className?: string;
  animated?: boolean;
}

export const AmigoBot: React.FC<AmigoBotProps> = ({
  mood = 'happy',
  size = 'md',
  showSpeechBubble = false,
  speechText,
  className = '',
  animated = true
}) => {
  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48'
  };

  return (
    <div className={`inline-flex flex-col sm:flex-row items-center gap-3 ${className}`}>
      {/* Robot SVG */}
      <div className={`relative flex-shrink-0 ${sizeClasses[size]} ${animated ? 'animate-float' : ''}`}>
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-md select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Antenna */}
          <path d="M80 32V18" stroke="#0369A1" strokeWidth="6" strokeLinecap="round" />
          <circle 
            cx="80" 
            cy="15" 
            r="8" 
            fill={mood === 'reminder' ? '#F59E0B' : '#10B981'} 
            className={mood === 'reminder' ? 'animate-ping' : ''}
          />
          <circle cx="80" cy="15" r="5" fill="#FFFFFF" />

          {/* Robot Head Body */}
          <rect x="36" y="32" width="88" height="66" rx="22" fill="#FFFFFF" stroke="#0284C7" strokeWidth="5" />
          {/* Ear Bolts */}
          <rect x="26" y="52" width="10" height="24" rx="4" fill="#0369A1" />
          <rect x="124" y="52" width="10" height="24" rx="4" fill="#0369A1" />

          {/* Screen Visor */}
          <rect x="46" y="44" width="68" height="42" rx="14" fill="#0F172A" />

          {/* Medical Cross on Forehead */}
          <rect x="76" y="36" width="8" height="4" fill="#EF4444" rx="1" />
          <rect x="78" y="34" width="4" height="8" fill="#EF4444" rx="1" />

          {/* EYES based on mood */}
          {mood === 'celebrating' && (
            <>
              {/* Happy Arc Eyes */}
              <path d="M56 65C56 59 66 59 66 65" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
              <path d="M94 65C94 59 104 59 104 65" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
              {/* Rosy Cheeks */}
              <circle cx="54" cy="74" r="4" fill="#F43F5E" opacity="0.8" />
              <circle cx="106" cy="74" r="4" fill="#F43F5E" opacity="0.8" />
            </>
          )}

          {mood === 'happy' && (
            <>
              {/* Big friendly round blue glowing eyes */}
              <circle cx="62" cy="62" r="7" fill="#38BDF8" />
              <circle cx="64" cy="60" r="2.5" fill="#FFFFFF" />
              <circle cx="98" cy="62" r="7" fill="#38BDF8" />
              <circle cx="100" cy="60" r="2.5" fill="#FFFFFF" />
              {/* Rosy Cheeks */}
              <circle cx="52" cy="72" r="3.5" fill="#FB7185" opacity="0.6" />
              <circle cx="108" cy="72" r="3.5" fill="#FB7185" opacity="0.6" />
            </>
          )}

          {mood === 'reminder' && (
            <>
              {/* Alert wide eyes */}
              <circle cx="62" cy="61" r="8" fill="#FBBF24" />
              <circle cx="63" cy="59" r="3" fill="#FFFFFF" />
              <circle cx="98" cy="61" r="8" fill="#FBBF24" />
              <circle cx="99" cy="59" r="3" fill="#FFFFFF" />
            </>
          )}

          {mood === 'guide' && (
            <>
              {/* Wink or smart gaze */}
              <circle cx="62" cy="62" r="7" fill="#38BDF8" />
              <circle cx="64" cy="60" r="2.5" fill="#FFFFFF" />
              <path d="M94 63C96 59 103 59 104 63" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
            </>
          )}

          {mood === 'thinking' && (
            <>
              <circle cx="64" cy="60" r="6" fill="#38BDF8" />
              <circle cx="96" cy="60" r="6" fill="#38BDF8" />
            </>
          )}

          {/* MOUTH */}
          {mood === 'celebrating' ? (
            <path d="M72 74C72 78 88 78 88 74" fill="#38BDF8" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M72 73C74 77 86 77 88 73" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
          )}

          {/* ROBOT BODY / LAB COAT */}
          {/* Main Torso */}
          <path d="M48 98H112V142C112 147.523 107.523 152 102 152H58C52.4772 152 48 147.523 48 142V98Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="4" />
          {/* Lab Coat Collar & Buttons */}
          <path d="M64 98L80 118L96 98" stroke="#0284C7" strokeWidth="3.5" fill="#E0F2FE" />
          <circle cx="80" cy="126" r="2.5" fill="#0369A1" />
          <circle cx="80" cy="136" r="2.5" fill="#0369A1" />

          {/* Stethoscope around neck */}
          <path d="M60 102C58 120 74 130 80 134C86 130 102 120 100 102" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
          <circle cx="80" cy="135" r="5" fill="#0D9488" stroke="#FFFFFF" strokeWidth="2" />

          {/* ARMS */}
          {mood === 'celebrating' ? (
            <>
              {/* Both arms raised high! */}
              <path d="M48 108C36 100 28 85 24 74" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
              <circle cx="23" cy="72" r="6" fill="#38BDF8" />
              <path d="M112 108C124 100 132 85 136 74" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
              <circle cx="137" cy="72" r="6" fill="#38BDF8" />
            </>
          ) : (
            <>
              {/* Left friendly waving arm */}
              <g className="animate-wave origin-bottom">
                <path d="M48 108C34 102 24 92 20 78" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
                <circle cx="19" cy="76" r="6" fill="#38BDF8" />
              </g>
              {/* Right resting arm */}
              <path d="M112 108C124 116 128 126 126 136" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
              <circle cx="126" cy="138" r="6" fill="#38BDF8" />
            </>
          )}
        </svg>
      </div>

      {/* Speech Bubble (Accessible & Friendly) */}
      {showSpeechBubble && speechText && (
        <div 
          className="relative bg-white text-slate-800 border-2 border-sky-300 rounded-2xl p-4 shadow-sm max-w-sm text-base font-medium leading-relaxed"
          role="status"
          aria-live="polite"
        >
          {/* Arrow pointing left/up */}
          <div className="absolute -left-2 sm:left-auto sm:-top-2 top-4 w-4 h-4 bg-white border-l-2 border-b-2 sm:border-l-0 sm:border-t-2 border-sky-300 transform rotate-45" />
          <p className="relative z-10 text-slate-800">{speechText}</p>
        </div>
      )}
    </div>
  );
};
