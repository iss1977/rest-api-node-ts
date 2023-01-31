/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  //clearMocks: true,
  //resetMocks: true,
  //restoreMocks: true,
};

module.exports = config;



