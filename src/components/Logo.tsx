'use client';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 40, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4DA3FF" />
          <stop offset="50%" stopColor="#3A6EA5" />
          <stop offset="100%" stopColor="#1F4FD8" />
        </linearGradient>
        <clipPath id="roundedSquare">
          <rect x="2" y="2" width="96" height="96" rx="20" />
        </clipPath>
      </defs>
      
      {/* Background rounded square with gradient */}
      <rect x="2" y="2" width="96" height="96" rx="20" fill="url(#logoGradient)" />
      
      <g clipPath="url(#roundedSquare)">
        {/* Subtle grid - clarity/structure */}
        <g opacity="0.06">
          <line x1="0" y1="33" x2="100" y2="33" stroke="#FFFFFF" strokeWidth="0.5" />
          <line x1="0" y1="66" x2="100" y2="66" stroke="#FFFFFF" strokeWidth="0.5" />
          <line x1="33" y1="0" x2="33" y2="100" stroke="#FFFFFF" strokeWidth="0.5" />
          <line x1="66" y1="0" x2="66" y2="100" stroke="#FFFFFF" strokeWidth="0.5" />
        </g>
        
        {/* Light rays from sun */}
        <g opacity="0.08">
          <line x1="50" y1="40" x2="15" y2="15" stroke="#FFFFFF" strokeWidth="0.5" />
          <line x1="50" y1="40" x2="85" y2="15" stroke="#FFFFFF" strokeWidth="0.5" />
          <line x1="50" y1="40" x2="15" y2="65" stroke="#FFFFFF" strokeWidth="0.5" />
          <line x1="50" y1="40" x2="85" y2="65" stroke="#FFFFFF" strokeWidth="0.5" />
        </g>
        
        {/* Pulsing band around sun */}
        <circle cx="50" cy="40" r="30" fill="rgba(255,255,255,0.08)" />
        <circle cx="50" cy="40" r="26" fill="url(#logoGradient)" />
        
        {/* Sun circle */}
        <circle cx="50" cy="40" r="20" fill="rgba(255,255,255,0.95)" />
        
        {/* Subtle code bracket - development */}
        <text x="12" y="28" fill="rgba(255,255,255,0.12)" fontSize="14" fontFamily="monospace" fontWeight="300">{'<'}</text>
        <text x="80" y="58" fill="rgba(255,255,255,0.12)" fontSize="14" fontFamily="monospace" fontWeight="300">{'>'}</text>
        
        {/* Waves */}
        <path
          d="M0 75 Q12 70 25 75 Q38 80 50 75 Q62 70 75 75 Q88 80 100 75 L100 100 L0 100 Z"
          fill="rgba(255,255,255,0.2)"
        />
        <path
          d="M0 82 Q12 77 25 82 Q38 87 50 82 Q62 77 75 82 Q88 87 100 82 L100 100 L0 100 Z"
          fill="rgba(255,255,255,0.32)"
        />
        <path
          d="M0 89 Q12 85 25 89 Q38 93 50 89 Q62 85 75 89 Q88 93 100 89 L100 100 L0 100 Z"
          fill="rgba(255,255,255,0.45)"
        />
      </g>
    </svg>
  );
}

export function LogoMark({ size = 36, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoMarkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4DA3FF" />
          <stop offset="50%" stopColor="#3A6EA5" />
          <stop offset="100%" stopColor="#1F4FD8" />
        </linearGradient>
        <clipPath id="roundedSquareMark">
          <rect x="2" y="2" width="96" height="96" rx="20" />
        </clipPath>
      </defs>
      
      {/* Background rounded square */}
      <rect x="2" y="2" width="96" height="96" rx="20" fill="url(#logoMarkGradient)" />
      
      <g clipPath="url(#roundedSquareMark)">
        {/* Light rays */}
        <g opacity="0.1">
          <line x1="50" y1="40" x2="20" y2="15" stroke="#FFFFFF" strokeWidth="0.5" />
          <line x1="50" y1="40" x2="80" y2="15" stroke="#FFFFFF" strokeWidth="0.5" />
        </g>
        
        {/* Sun glow */}
        <circle cx="50" cy="40" r="28" fill="rgba(255,255,255,0.1)" />
        
        {/* Sun circle */}
        <circle cx="50" cy="40" r="20" fill="rgba(255,255,255,0.95)" />
        
        {/* Wave */}
        <path
          d="M0 80 Q25 74 50 80 Q75 86 100 80 L100 100 L0 100 Z"
          fill="rgba(255,255,255,0.35)"
        />
      </g>
    </svg>
  );
}
