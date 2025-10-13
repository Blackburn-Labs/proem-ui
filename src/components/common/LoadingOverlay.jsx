import React from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

export const LoadingOverlay = ({ open, message = 'Processing...' }) => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }}
            open={open}
        >
            <Box sx={{ textAlign: 'center' }}>
                <CircularProgress color="inherit" size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    );
};