import React from 'react';

export const WashingMachineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="20" x="3" y="2" rx="2" />
    <circle cx="12" cy="13" r="5" />
    <path d="M12 10a3 3 0 0 0-3 3" />
    <line x1="7" x2="7.01" y1="6" y2="6" />
    <line x1="11" x2="11.01" y1="6" y2="6" />
  </svg>
);

export const RefrigeratorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <line x1="4" x2="20" y1="10" y2="10" />
    <line x1="8" x2="8" y1="5" y2="7" />
    <line x1="8" x2="8" y1="13" y2="16" />
  </svg>
);
