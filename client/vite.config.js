// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path'; // ✅ This is the missing import

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': 'http://localhost:3000',
//     },
//   },
//   build: {
//     outDir: 'dist',
//     rollupOptions: {
//       input: {
//         main: path.resolve(__dirname, 'index.html'), // ✅ Use path.resolve
//       },
//     },
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});

