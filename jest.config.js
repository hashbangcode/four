/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock'],
};

module.exports = config;
