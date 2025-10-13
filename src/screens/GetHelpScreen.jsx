import React from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Link,
    Divider,
    Button,
} from '@mui/material';
import {
    MenuBook,
    Code,
    Support,
    Email,
} from '@mui/icons-material';

const GetHelpScreen = () => (
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
                    Get Help
                </Typography>

                <Stack spacing={4}>
                    {/* Documentation Section */}
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <MenuBook color="primary" />
                            <Typography variant="h6" color="primary.light">
                                Documentation
                            </Typography>
                        </Stack>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Find comprehensive guides, tutorials, and API references to help you
                            get the most out of Proem-UI. Our documentation covers everything
                            from getting started to advanced customization.
                        </Typography>
                        <Link
                            href="https://proemui.com/docs/intro"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="none"
                        >
                            <Button
                                variant="contained"
                                startIcon={<Code />}
                                sx={{
                                    mt: 1,
                                    backgroundColor: (theme) => theme.palette.primary.main,
                                    '&:hover': {
                                        backgroundColor: (theme) => theme.palette.primary.light,
                                    },
                                }}
                            >
                                Visit Documentation
                            </Button>
                        </Link>
                    </Box>

                    <Divider sx={{ opacity: 0.3 }} />

                    {/* Professional Support Section */}
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <Support color="secondary" />
                            <Typography variant="h6" color="secondary.light">
                                Need Professional Help?
                            </Typography>
                        </Stack>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Looking for expert guidance or custom development? Blackburn Labs
                            are bespoke software engineers who specialize in building exceptional
                            applications and are happy to help with your project.
                        </Typography>

                        <Box
                            sx={{
                                mt: 3,
                                p: 3,
                                borderRadius: (theme) => `${theme.shape.borderRadius * 2}px`,
                                backgroundColor: 'background.paper',
                                border: (theme) => `2px solid ${theme.palette.secondary.main}33`,
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
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
                                        Bespoke Software Engineering
                                    </Typography>
                                </Box>
                            </Stack>

                            <Typography variant="body2" color="text.secondary" paragraph>
                                From consulting and architecture to full development services,
                                Blackburn Labs brings decades of experience to help you succeed.
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                                <Link
                                    href="https://www.blackburnlabs.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline="none"
                                    sx={{ flex: 1 }}
                                >
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        sx={{
                                            borderWidth: 2,
                                            '&:hover': {
                                                borderWidth: 2,
                                            },
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </Link>
                                <Link
                                    href="https://www.blackburnlabs.com/contact-us/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline="none"
                                    sx={{ flex: 1 }}
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<Email />}
                                        fullWidth
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: (theme) => theme.palette.secondary.light,
                                            },
                                        }}
                                    >
                                        Contact Us
                                    </Button>
                                </Link>
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    </Container>
);

export default GetHelpScreen;
