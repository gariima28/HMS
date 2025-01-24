// import React from 'react';
// import { Box, Backdrop, CircularProgress } from '@mui/material';

// // Hash Loader component
// const CircularProgressLoader = () => {
//     return (
//         <Backdrop
//             open={true}
//             sx={{
//                 position: 'relative',
//                 color: '#4634ff',
//                 zIndex: 1520,
//                 height: '360px',
//                 backgroundColor: 'rgba(255, 255, 255, 0.7)',
//             }}
//         >
//             <Box display="flex" justifyContent="center" alignItems="center">
//                 <CircularProgress thickness={5} sx={{ color: '#4634ff' }} />
//             </Box>
//         </Backdrop>
//     );
// };

// export default CircularProgressLoader;



import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const CircularProgressLoader = () => {
    return (
        <Backdrop
            open={true}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
        >
            <CircularProgress thickness={5} sx={{ color: '#4634ff' }} />
        </Backdrop>
    );
};

export default CircularProgressLoader;
