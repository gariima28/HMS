import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const CircularProgressLoaderMain = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 2,
                borderRadius: 2,
            }}
        >
            <CircularProgress thickness={5} sx={{ color: '#4634ff' }} />
        </Box>
    );
};

export default CircularProgressLoaderMain;
