import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

/**
 * Configuração do Vite para Merge Explore
 * 
 * Esta configuração otimiza o projeto para:
 * - Desenvolvimento local com HTTPS (necessário para WebXR)
 * - Build otimizado para produção
 * - Suporte completo a Meta Quest 3
 */
export default defineConfig({
  // Plugins necessários para VR
  plugins: [
    // HTTPS básico para desenvolvimento (necessário para WebXR)
    basicSsl()
  ],

  // Configurações do servidor de desenvolvimento
  server: {
    // Porta padrão (pode ser alterada via .env)
    port: 5174,
    
    // Host para acesso externo (importante para VR)
    host: '0.0.0.0',
    
    // HTTPS necessário para WebXR
    https: true,
    
    // Configurações de CORS para assets
    cors: true,
    
    // Headers de segurança para VR
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },

  // Configurações de build para produção
  build: {
    // Diretório de saída
    outDir: 'dist',
    
    // Assets inline pequenos (otimização)
    assetsInlineLimit: 4096,
    
    // Configurações de minificação
    minify: 'terser',
    
    // Configurações do Terser para VR
    terserOptions: {
      compress: {
        // Remove console.logs em produção
        drop_console: true,
        drop_debugger: true
      }
    },

    // Configurações de rollup para assets
    rollupOptions: {
      output: {
        // Organização de assets
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },

  // Configurações de assets públicos
  publicDir: 'public',

  // Configurações de resolução de módulos
  resolve: {
    alias: {
      // Aliases úteis para desenvolvimento
      '@': '/src',
      '@assets': '/public'
    }
  },

  // Configurações de otimização de dependências
  optimizeDeps: {
    // Inclui dependências que devem ser pré-bundled
    include: [
      'aframe',
      'aframe-extras',
      'aframe-environment-component'
    ],
    
    // Exclui dependências que causam problemas
    exclude: []
  },

  // Configurações específicas para desenvolvimento
  define: {
    // Variáveis globais para desenvolvimento
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __VR_DEBUG__: JSON.stringify(process.env.VITE_PHYSICS_DEBUG === 'true')
  }
})