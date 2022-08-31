import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Unocss({})],
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
      output: {},
    },
    chunkSizeWarningLimit: 1000,
    // commonjsOptions: {
    //   include: [],
    // },
  },
  define: {
    'process.env': {},
  },
  //   optimizeDeps: {
  //     disabled: false,
  //   },
})

//inject({ Buffer: ['buffer', 'Buffer'] })
