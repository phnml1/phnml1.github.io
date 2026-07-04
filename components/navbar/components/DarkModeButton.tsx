'use client';

import { useTheme } from 'next-themes';

const DarkModeButton: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      className="grid h-10 w-10 place-items-center rounded-lg bg-surface-container text-primary transition-colors hover:bg-surface-high"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <span className="text-sm">{resolvedTheme === 'dark' ? '☾' : '☀'}</span>
    </button>
  );
};

export default DarkModeButton;
