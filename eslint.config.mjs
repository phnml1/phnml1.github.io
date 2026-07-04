import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextVitals,
  {
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
    },
  },
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'stitch_minimal_dev_archive (1)/**'],
  },
];

export default config;
