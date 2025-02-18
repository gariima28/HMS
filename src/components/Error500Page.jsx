import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Prevent back navigation
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, '', window.location.href);
        };
    }, []);

    return (
        <Box
            sx={{
                backgroundImage: 'url(/path-to-your-gif.gif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                padding: 3,
            }}
        >
            <Box>
                <Typography variant="h1" color="error" fontWeight="bold" fontSize="6rem">
                    500
                </Typography>
                <Typography variant="h6" color="textPrimary" fontWeight="semiBold" marginTop={2}>
                    Oops! Something went wrong.
                </Typography>
                <Typography color="textSecondary" marginTop={1}>
                    We are currently experiencing some technical difficulties on our servers. <br />Our team is working hard to resolve the issue. Please bear with us and try again later.
                </Typography>

                <Box marginTop={3}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                    >
                        Go To Dashboard
                    </Button>
                </Box>

                <Typography color="textSecondary" fontWeight={900} fontSize="0.875rem" marginTop={3}>
                    If you need further assistance, please do not hesitate to contact us at{' '}
                    <a href="mailto:admin@scriza.in" style={{ textDecoration: 'underline', color: '#1976d2' }}>
                        admin@scriza.in
                    </a>
                </Typography>
            </Box>
        </Box>
    );
};

export default ErrorPage;
