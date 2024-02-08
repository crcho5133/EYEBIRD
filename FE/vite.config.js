import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [], // 정적 파일 목록
      manifest: {
        name: "React PWA",
        short_name: "눈 깜빡할 새",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          // 추가 아이콘 사이즈를 여기에 명시
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
