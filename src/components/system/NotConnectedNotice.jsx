import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/ui';

const NotConnectedNotice = () => {
    const dispatch = useDispatch();

    const handleRetry = () => {
        dispatch(actions.ping());
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                padding: 4,
                textAlign: 'center',
            }}
        >
            <WifiOffIcon
                sx={{
                    fontSize: 80,
                    color: 'text.secondary',
                    marginBottom: 3,
                }}
            />
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 500 }}
            >
                Connection Lost
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    marginBottom: 4,
                    maxWidth: '400px',
                }}
            >
                Unable to connect to the server. Please check your internet connection.
            </Typography>
            <Button
                variant="contained"
                size="large"
                onClick={handleRetry}
                sx={{ minWidth: 120 }}
            >
                Retry
            </Button>
        </Box>
    );
};

export default NotConnectedNotice;
