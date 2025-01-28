export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/content/(.*)$': '<rootDir>/content/$1',
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/tests/(.*)$': '<rootDir>/tests/$1'
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library|@swc)/)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/e2e/'
  ],
};
