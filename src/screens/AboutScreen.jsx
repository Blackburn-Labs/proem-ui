import React from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Chip,
    Link,
    Divider,
} from '@mui/material';
import {
    Speed,
    Construction,
    Science,
    Code,
} from '@mui/icons-material';

const AboutScreen = () => (
    <Container maxWidth="md">
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                py: 6,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 4, md: 6 },
                    background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.dark}22 0%, ${theme.palette.secondary.dark}11 100%)`,
                    backdropFilter: 'blur(10px)',
                    border: (theme) => `1px solid ${theme.palette.primary.main}33`,
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        background: (theme) =>
                            `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 4,
                    }}
                >
                    About Proem-UI
                </Typography>

                <Stack spacing={4}>
                    {/* History */}
                    <Box>
                        <Typography variant="h6" gutterBottom color="primary.light">
                            Our Story
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Proem-UI has been around since 2015, built by Blackburn Labs as their
                            primary boilerplate to allow them to spin up projects and prototypes quickly.
                            What started as an internal tool has evolved into a robust foundation for
                            rapid application development.
                        </Typography>
                    </Box>

                    <Divider sx={{ opacity: 0.3 }} />

                    {/* Technology Stack */}
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <Code color="primary" />
                            <Typography variant="h6" color="primary.light">
                                Technology Stack
                            </Typography>
                        </Stack>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Proem-UI uses ReactJS, Material-UI (MUI), and Parse SDK to create a
                            lightweight and fast setup that is also robust and scalable. This
                            combination provides the perfect balance of speed, flexibility, and
                            developer experience.
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Chip label="React 19" color="primary" variant="outlined" />
                            <Chip label="Material-UI v7" color="primary" variant="outlined" />
                            <Chip label="Parse SDK" color="primary" variant="outlined" />
                            <Chip label="Redux Toolkit" color="primary" variant="outlined" />
                            <Chip label="Vite" color="primary" variant="outlined" />
                        </Stack>
                    </Box>

                    <Divider sx={{ opacity: 0.3 }} />

                    {/* Testing */}
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <Science color="secondary" />
                            <Typography variant="h6" color="secondary.light">
                                Testing & Quality
                            </Typography>
                        </Stack>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Quality is at the core of Proem-UI. We use Vitest for lightning-fast unit
                            testing and Playwright for comprehensive end-to-end testing, ensuring your
                            applications are reliable and bug-free.
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Chip
                                icon={<Speed />}
                                label="Vitest (Unit Tests)"
                                color="secondary"
                                variant="outlined"
                            />
                            <Chip
                                icon={<Construction />}
                                label="Playwright (E2E Tests)"
                                color="secondary"
                                variant="outlined"
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ opacity: 0.3 }} />

                    {/* Sponsored By */}
                    <Box>
                        <Typography variant="h6" gutterBottom color="info.light">
                            Sponsored &amp; Supported By
                        </Typography>
                        <Box textAlign="center" p={2}>
                            <Link
                                href="https://www.blackburnlabs.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="none"
                                sx={{ display: 'inline-block' }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        py: 2,
                                        px: 4,
                                        borderRadius: (theme) => theme.shape.borderRadius / 12 * 8,
                                        backgroundColor: 'background.paper',
                                        border: (theme) => `1px solid ${theme.palette.divider}`,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: (theme) =>
                                                `0 12px 24px ${theme.palette.primary.main}30`,
                                            borderColor: 'primary.main',
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="/blackburn-labs-logo-light.webp"
                                        alt="Blackburn Labs"
                                        sx={{
                                            height: 48,
                                            width: 'auto',
                                        }}
                                    />
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'text.primary',
                                            }}
                                        >
                                            Blackburn Labs
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Visit blackburnlabs.com
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </Box>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    </Container>
);

export default AboutScreen;
