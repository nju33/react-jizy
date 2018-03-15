module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: ['**/*.test.{ts,tsx}'],
  setupTestFrameworkScriptFile: "<rootDir>/jest.setup.js"
};
