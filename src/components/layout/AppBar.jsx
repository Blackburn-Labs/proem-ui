import React, { useState } from 'react';
import { Link } from 'react-router';
import {
    AppBar as MuiAppBar,
    Box,
    Container,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Typography,
    Drawer,
    Toolbar,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navLinks = [
    { text: 'HOME', href: '/' },
    { text: 'ABOUT', href: '/about' },
];

const AppBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <MuiAppBar
            position="sticky"
            sx={{
                backgroundColor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                boxShadow: 0,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    sx={{
                        px: { xs: 0, md: 2 },
                        justifyContent: 'space-between',
                        minHeight: { xs: 64, sm: 70 }
                    }}
                >
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            py: 1
                        }}
                    >
                        <img
                            src="/logo-light.webp"
                            alt="{{App Name}}"
                            width={112}
                            height="auto"
                        />
                    </Box>

                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            {navLinks.map((link) => (
                                <Typography
                                    key={link.text}
                                    component={Link}
                                    to={link.href}
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            color: 'primary.main'
                                        },
                                    }}
                                >
                                    {link.text}
                                </Typography>
                            ))}
                            <Button
                                component={Link}
                                to="/get-help"
                                variant="contained"
                                size="small"
                                sx={{
                                    borderRadius: '20px',
                                    ml: 1,
                                    px: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                GET HELP
                            </Button>
                        </Box>
                    )}

                    {isMobile && (
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={toggleDrawer}
                            aria-label="Open main menu"
                            sx={{ color: 'text.primary' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </Container>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={toggleDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '100%', sm: 320 },
                    }
                }}
            >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Menu</Typography>
                    <IconButton onClick={toggleDrawer} edge="end">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List sx={{ px: 2 }}>
                    {navLinks.map((link) => (
                        <ListItem key={link.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={link.href}
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                }}
                            >
                                {link.text}
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem sx={{ mt: 2 }}>
                        <Button
                            component={Link}
                            to="/get-help"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                borderRadius: '20px',
                                textTransform: 'none',
                                fontWeight: 600,
                            }}
                        >
                            GET HELP
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </MuiAppBar>
    );
};

export default AppBar;
