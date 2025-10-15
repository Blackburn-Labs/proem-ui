import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react()],
        resolve: {
            alias: {
                events: 'events'
            }
        },
        define: {
            'process.env.GOOGLE_CLIENT_ID': JSON.stringify(env.GOOGLE_CLIENT_ID),
            'process.env.API_URL': JSON.stringify(env.API_URL),
            global: 'window'
        },
    };
});
