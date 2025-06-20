import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  server: {
    port: 5174,
    strictPort: true,
    cors: true,
    host: true
  },
  plugins: [
    react(),
    federation({
      name: 'musicLibrary',
      filename: 'remoteEntry.js',
      exposes: {
        './MusicLibrary': './src/MusicLibrary.tsx'
      },
      shared: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled']
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        format: 'esm',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  preview: {
    port: 5174,
    strictPort: true,
    cors: true,
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
