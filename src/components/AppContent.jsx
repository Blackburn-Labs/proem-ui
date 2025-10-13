import React, { useEffect } from 'react';
import AppRouter from '../router/AppRouter';
import AppBar from './layout/AppBar';

export const AppContent = () => {
    return (
        <>
            <AppBar />
            <AppRouter />
        </>
    );
};
