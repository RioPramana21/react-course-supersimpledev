import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Use jsdom environment to simulate a browser for React component testing
    globals: true, // Enable global variables like describe, it, expect without importing them
    setupFiles: './setupTests.js', // Run this file to set up the testing environment before each test file
  }
});