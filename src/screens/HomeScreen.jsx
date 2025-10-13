import React from 'react';
import { Box, Container, Typography, Link, Paper } from '@mui/material';
import { GitHub, Language } from '@mui/icons-material';

const HomeScreen = () => (
    <Container maxWidth="md">
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 6,
                    textAlign: 'center',
                    background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.dark}22 0%, ${theme.palette.secondary.dark}11 100%)`,
                    backdropFilter: 'blur(10px)',
                    border: (theme) => `1px solid ${theme.palette.primary.main}33`,
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        background: (theme) =>
                            `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Welcome to Proem-UI
                </Typography>

                <Typography
                    variant="h5"
                    color="text.secondary"
                    paragraph
                    sx={{ mt: 2, mb: 4 }}
                >
                    A modern React application built with Material-UI
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <Link
                        href="https://github.com/Blackburn-Labs/proem-ui"
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1.5,
                            px: 3,
                            py: 1.5,
                            borderRadius: (theme) => theme.shape.borderRadius / 12 * 8,
                            backgroundColor: (theme) => theme.palette.primary.main,
                            color: (theme) => theme.palette.primary.contrastText,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.primary.light,
                                transform: 'translateY(-2px)',
                                boxShadow: (theme) => `0 8px 20px ${theme.palette.primary.main}40`,
                            },
                        }}
                    >
                        <GitHub />
                        <Typography variant="button" sx={{ fontWeight: 500 }}>
                            View on GitHub
                        </Typography>
                    </Link>

                    <Link
                        href="https://proemui.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1.5,
                            px: 3,
                            py: 1.5,
                            borderRadius: (theme) => theme.shape.borderRadius / 12 * 8,
                            backgroundColor: (theme) => theme.palette.secondary.main,
                            color: (theme) => theme.palette.secondary.contrastText,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.secondary.light,
                                transform: 'translateY(-2px)',
                                boxShadow: (theme) => `0 8px 20px ${theme.palette.secondary.main}40`,
                            },
                        }}
                    >
                        <Language />
                        <Typography variant="button" sx={{ fontWeight: 500 }}>
                            Visit Website
                        </Typography>
                    </Link>
                </Box>
            </Paper>
        </Box>
    </Container>
);

export default HomeScreen;
