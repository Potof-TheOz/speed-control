import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  silent: false,
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};

export default config;
