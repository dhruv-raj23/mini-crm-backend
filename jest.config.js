module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFiles: ['dotenv/config'],
  globalTeardown: '<rootDir>/__tests__/teardown.js'
};

