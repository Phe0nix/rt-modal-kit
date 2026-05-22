import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins: any[] = [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ]

  // Try to load optional plugins if installed
  try {
    // rollup-plugin-visualizer or vite-plugin-visualizer
    const visMod = await import('rollup-plugin-visualizer').catch(() => import('vite-plugin-visualizer'))
    const visualizer = (visMod as any).visualizer ?? (visMod as any).default ?? (visMod as any)
    if (visualizer) {
      plugins.push(visualizer({ filename: 'dist/stats.html', open: false, gzipSize: true }))
    }
  } catch (e) {
    // plugin not installed — continue without visualizer
  }

  try {
    const compressionMod = await import('vite-plugin-compression')
    const compression = (compressionMod as any).default ?? compressionMod
    if (compression) {
      plugins.push(compression({ algorithm: 'brotliCompress', ext: '.br', threshold: 10240 }))
    }
  } catch (e) {
    // compression plugin not installed — continue
  }

  return {
    plugins,
    build: {
      target: 'es2018',
      minify: 'terser',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              const parts = id.split('node_modules/')[1].split('/')
              return parts[0]
            }
          }
        }
      }
    }
  }
})
