// import React from 'react';
// import { Box, Skeleton } from '@mui/material';

// const HeaderSkeleton = () => (
//     <Box
//         sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             bgcolor: 'grey.100',
//             padding: 2,
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//             height: 64,
//         }}
//     >
//         <Skeleton variant="rectangular" width={40} height={40} />
//         <Skeleton variant="text" width="20%" />
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Skeleton variant="text" width={100} sx={{ mr: 2 }} />
//             <Skeleton variant="circular" width={40} height={40} />
//         </Box>
//     </Box>
// );

// export default HeaderSkeleton;


import React from 'react';
import { Box, Skeleton } from '@mui/material';

const HeaderSkeleton = () => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'grey.100',
            padding: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            height: 64,
        }}
    >
        <Skeleton variant="rectangular" width={40} height={40} />
        <Skeleton variant="text" width="20%" />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton variant="text" width={100} sx={{ mr: 2 }} />
            <Skeleton variant="circular" width={40} height={40} />
        </Box>
    </Box>
);

export default HeaderSkeleton;
