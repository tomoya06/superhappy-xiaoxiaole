import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default (({ mode }) => {
  const base = mode === 'github' ? '/superhappy-xiaoxiaole/' : '';

  return defineConfig({
    plugins: [preact()],
    base,
    server: {
      host: "0.0.0.0",
    },
  })
});
