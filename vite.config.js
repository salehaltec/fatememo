import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',
            'resources/js/app.jsx',
            'resources/js/pages/home-entry.jsx',
            'resources/js/pages/business-check-entry.jsx',
            'resources/js/pages/business-consultant-entry.jsx',
            'resources/js/pages/business-systemization-entry.jsx',
        ]),
        react(),
    ],
});
