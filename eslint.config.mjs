import nextConfig from 'eslint-config-next/core-web-vitals';
import nextTypescriptConfig from 'eslint-config-next/typescript';

const config = [
  ...nextConfig,
  ...nextTypescriptConfig,
  {
    ignores: ['.next/**', 'node_modules/**', 'coverage/**'],
  },
];

export default config;
