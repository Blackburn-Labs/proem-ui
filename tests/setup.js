import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Configure Parse SDK for Node.js environment in tests
Object.defineProperty(globalThis, 'location', {
    value: {
        href: 'http://localhost:3000',
        origin: 'http://localhost:3000',
    },
    writable: true,
});

// Mock fetch for Parse SDK
globalThis.fetch = globalThis.fetch || vi.fn();