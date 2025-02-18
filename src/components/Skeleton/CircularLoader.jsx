import React from 'react';
import { Box, CircularProgress, Backdrop } from '@mui/material';

// Hash Loader component
const CircularLoader = () => {
    return (
        <Backdrop
            open={true}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // width: '100%',
                // height: '100%',
                zIndex: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.838)',
            }}
        >
            <CircularProgress thickness={5} sx={{ color: '#4634ff' }} />
        </Backdrop>
    );
};

export default CircularLoader;
