import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ROUTES from './routes';

// Screen components
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import GetHelpScreen from '../screens/GetHelpScreen';

/**
 * Main application router
 * Centralizes all routing logic and route definitions
 */
export const AppRouter = () => {
    return (
        <Routes>
            {/* Welcome page for unauthenticated users */}
            <Route path={ROUTES.HOME} element={<HomeScreen />} />

            {/* About page */}
            <Route path={ROUTES.ABOUT} element={<AboutScreen />} />

            {/* Get Help page */}
            <Route path={ROUTES.HELP} element={<GetHelpScreen />} />

            {/* Catch all - redirect to home */}
            <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};

export default AppRouter;
