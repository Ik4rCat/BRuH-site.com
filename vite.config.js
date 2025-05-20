import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Базовый путь для деплоя
  base: '/',
  
  // Настройка сервера разработки
  server: {
    port: 3000,
    open: true, // Автоматически открывать браузер
    cors: true // Разрешить CORS
  },
  
  // Настройка сборки
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
  },
  
  // Настройка обработки ресурсов
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  }
}); 