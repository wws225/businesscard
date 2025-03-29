
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";
import env from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [react(),env({ prefix: "VITE", mountedPath: "process.env" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true, 
    environment: "jsdom", 
    setupFiles: "./setupTests.ts", 
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
})
