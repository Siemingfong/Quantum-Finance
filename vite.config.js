import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 專案站的路徑是 /<repo-name>/，本地開發是 /。
// 部署時由 workflow 帶入 BASE_PATH，本地不用設。
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
