import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.js',
        include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
        exclude: ['**/node_modules/**', '**/tests/e2e/**'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'tests/e2e/',
            ],
        },
    },
});
