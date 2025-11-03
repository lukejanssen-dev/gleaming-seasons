import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    server: {
        allowedHosts: ["lavonne-nonfuturistic-rickie.ngrok-free.dev"],
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                gallery: resolve(__dirname, "pages/gallery.html"),
                about: resolve(__dirname, "pages/about.html"),
                contact: resolve(__dirname, "pages/contact.html"),
            },
        },
    },
});
