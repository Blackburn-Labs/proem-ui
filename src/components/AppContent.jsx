import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppRouter from '../router/AppRouter';
import AppBar from './layout/AppBar';
import NotConnectedNotice from './system/NotConnectedNotice.jsx';
import { selectors } from '../store/ui.js';

export const AppContent = () => {
    const isConnected = useSelector(selectors.isConnected);

    if (!isConnected) {
        return <NotConnectedNotice />;
    }

    return (
        <>
            <AppBar />
            <AppRouter />
        </>
    );
};
