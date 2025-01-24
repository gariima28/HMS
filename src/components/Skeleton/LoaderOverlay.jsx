import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoaderOverlay = ({ isLoading, size = 24 }) => {
    console.log('Rendering LoaderOverlay with isLoading:', isLoading); // Debug log
    if (!isLoading) return null;  // Don't render if isLoading is false

    return (
        <Box
            sx={{
                position: 'absolute',    // Ensure it's positioned relative to the parent
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',  // Semi-transparent background
                zIndex: 10,              // Ensure it's above other elements
                pointerEvents: 'none',   // Allow interaction with underlying elements
            }}
        >
            <CircularProgress size={size} />
        </Box>
    );
};


export default LoaderOverlay;
