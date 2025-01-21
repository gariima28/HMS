import React from 'react';
import { Box, Backdrop } from '@mui/material';
import { DotLoader } from 'react-spinners';

// Hash Loader component
const HashLoader = () => {
    return (
        <Backdrop
            open={true}
            sx={{
                color: '#4634ff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                zIndex: 1520,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                {/* <CircularProgress size={96} thickness={5} sx={{ color: '#4634ff' }} /> */}
                <DotLoader color="#4634ff" size={100}  />
            </Box>
        </Backdrop>
    );
};

export default HashLoader;
