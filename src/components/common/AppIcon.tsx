import type { SVGProps } from 'react';

export type AppIconName =
  | 'planning'
  | 'performance'
  | 'forecast'
  | 'inventory'
  | 'finance'
  | 'hrms'
  | 'analytics'
  | 'spark'
  | 'menu-open'
  | 'menu-closed'
  | 'chevron-down'
  | 'close'
  | 'profile'
  | 'history'
  | 'logout'
  | 'search'
  | 'filter'
  | 'arrow-right'
  | 'eye'
  | 'eye-off'
  | 'home'
  | 'settings';

type AppIconProps = SVGProps<SVGSVGElement> & {
  name: AppIconName;
};

function AppIcon({ name, className = 'h-5 w-5', ...props }: AppIconProps) {
  const sharedProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
    ...props,
  } satisfies SVGProps<SVGSVGElement>;

  switch (name) {
    case 'planning':
      return (
        <svg {...sharedProps}>
          <path d="M4 7.5h16" />
          <path d="M8 4v7" />
          <path d="M16 4v7" />
          <rect x="4" y="4" width="16" height="16" rx="3.5" />
          <path d="M8 13h3" />
          <path d="M8 16h8" />
        </svg>
      );
    case 'performance':
      return (
        <svg {...sharedProps}>
          <path d="M4 20V8" />
          <path d="M10 20V4" />
          <path d="M16 20v-6" />
          <path d="M22 20v-9" />
        </svg>
      );
    case 'forecast':
      return (
        <svg {...sharedProps}>
          <path d="M12 3v2.5" />
          <path d="M17.66 6.34l-1.77 1.77" />
          <path d="M20 12h-2.5" />
          <path d="M17.66 17.66l-1.77-1.77" />
          <path d="M12 20v-2.5" />
          <path d="M6.34 17.66l1.77-1.77" />
          <path d="M4 12h2.5" />
          <path d="M6.34 6.34l1.77 1.77" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case 'inventory':
      return (
        <svg {...sharedProps}>
          <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
          <path d="M4 7.5V16.5L12 21l8-4.5V7.5" />
          <path d="M12 12v9" />
        </svg>
      );
    case 'finance':
      return (
        <svg {...sharedProps}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
          <path d="M3.5 10.5h17" />
          <path d="M8 15.5h2.5" />
          <path d="M14 15.5h2.5" />
        </svg>
      );
    case 'hrms':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="8" r="3.25" />
          <path d="M6 19c1.2-2.7 3.3-4 6-4s4.8 1.3 6 4" />
          <path d="M4 20h16" />
        </svg>
      );
    case 'analytics':
      return (
        <svg {...sharedProps}>
          <path d="M4 19.5h16" />
          <path d="M6.5 16.5 10 10l3 3 4.5-6.5" />
          <path d="M17.5 6.5H20v2.5" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...sharedProps}>
          <path d="m12 3 1.6 4.9L18.5 9.5l-4.9 1.6L12 16l-1.6-4.9L5.5 9.5l4.9-1.6L12 3Z" />
        </svg>
      );
    case 'menu-open':
      return (
        <svg {...sharedProps}>
          <rect x="3.5" y="4" width="17" height="16" rx="3.5" />
          <path d="M9 4v16" />
          <path d="m14 9 3 3-3 3" />
        </svg>
      );
    case 'menu-closed':
      return (
        <svg {...sharedProps}>
          <rect x="3.5" y="4" width="17" height="16" rx="3.5" />
          <path d="M15 4v16" />
          <path d="m10 9-3 3 3 3" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...sharedProps}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'close':
      return (
        <svg {...sharedProps}>
          <path d="M6 6 18 18" />
          <path d="M18 6 6 18" />
        </svg>
      );
    case 'profile':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 19c1.4-2.8 3.7-4.2 7-4.2S17.6 16.2 19 19" />
        </svg>
      );
    case 'history':
      return (
        <svg {...sharedProps}>
          <path d="M4 12a8 8 0 1 0 2.35-5.65" />
          <path d="M4 5v4h4" />
          <path d="M12 8v4l2.5 1.5" />
        </svg>
      );
    case 'logout':
      return (
        <svg {...sharedProps}>
          <path d="M10 5H7.5A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19H10" />
          <path d="m14 8 5 4-5 4" />
          <path d="M19 12H10" />
        </svg>
      );
    case 'search':
      return (
        <svg {...sharedProps}>
          <circle cx="11" cy="11" r="5.5" />
          <path d="m16 16 4 4" />
        </svg>
      );
    case 'filter':
      return (
        <svg {...sharedProps}>
          <path d="M4 6h16" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...sharedProps}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...sharedProps}>
          <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'eye-off':
      return (
        <svg {...sharedProps}>
          <path d="m3 3 18 18" />
          <path d="M10.6 6.4A11.9 11.9 0 0 1 12 6c6.1 0 9.5 6 9.5 6a16.7 16.7 0 0 1-3.4 4.1" />
          <path d="M6.3 6.9A16 16 0 0 0 2.5 12s3.4 6 9.5 6a10.8 10.8 0 0 0 3-.4" />
          <path d="M9.9 9.9A3 3 0 0 0 12 15a3 3 0 0 0 2.1-.9" />
        </svg>
      );
    case 'home':
      return (
        <svg {...sharedProps}>
          <path d="M3.5 10.5 12 4l8.5 6.5" />
          <path d="M6.5 9.5V20h11V9.5" />
          <path d="M10 20v-5.5h4V20" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1 0 2.8 2 2 0 0 1-2.8 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default AppIcon;
