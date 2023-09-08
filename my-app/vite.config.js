import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all'; // <= import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    pluginRewriteAll() // <= add the new plugin
  ],
  
  server: {
    proxy: {
      "api": "http://localhost:7722",
    },
  }
})


// import pluginRewriteAll from 'vite-plugin-rewrite-all'; // <= import the plugin


// export default defineConfig({
//   plugins: [
//     react(),
//     pluginRewriteAll() // <= add the new plugin
//   ],
// })