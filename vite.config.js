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
            'process.env.PARSE_APP_ID': JSON.stringify(env.PARSE_APP_ID),
            'process.env.PARSE_JS_KEY': JSON.stringify(env.PARSE_JS_KEY),
            'process.env.PARSE_SERVER_URL': JSON.stringify(env.PARSE_SERVER_URL),
            global: 'window'
        },
    };
});
