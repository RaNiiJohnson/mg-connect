import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// Variant 1: Current Speech Bubble
export function LogoVariant1({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        fill="url(#grad1)"
        fillOpacity="0.2"
        stroke="url(#grad1)"
      />
      <path d="M9 8v8M15 8v8M9 12h6" stroke="currentColor" />
    </svg>
  );
}

// Variant 2: Connection / Bridge
// Symbolizes connecting two points (Madagascar & Germany) or people
export function LogoVariant2({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <circle cx="5" cy="12" r="3" stroke="url(#grad2)" />
      <circle cx="19" cy="12" r="3" stroke="url(#grad2)" />
      <path d="M8 12h8" stroke="currentColor" strokeDasharray="2 2" />
      <path d="M12 5a7 7 0 0 1 7 7" stroke="url(#grad2)" strokeOpacity="0.5" />
      <path d="M12 19a7 7 0 0 1-7-7" stroke="url(#grad2)" strokeOpacity="0.5" />
    </svg>
  );
}

// Variant 3: Heart Location Pin
// Symbolizes "Home away from home" or love for the place/community
export function LogoVariant3({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke="url(#grad3)"
        fill="url(#grad3)"
        fillOpacity="0.1"
      />
      <circle cx="12" cy="8.5" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Variant 4: Abstract Community / Flower
// Symbolizes growth, gathering, and diversity
export function LogoVariant4({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id="grad4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="url(#grad4)"
        strokeWidth="2.5"
      />
      <circle cx="12" cy="12" r="8" stroke="url(#grad4)" strokeOpacity="0.3" />
    </svg>
  );
}
