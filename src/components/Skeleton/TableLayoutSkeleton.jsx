import React from 'react';
import { Box } from '@mui/material';
import SidebarSkeleton from './SidebarSkeleton';
import HeaderSkeleton from './HeaderSkeleton';
import PlaceholderTable from './PlaceholderTable';

const TableLayoutSkeleton = () => (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar Skeleton */}
        <SidebarSkeleton />

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Header Skeleton */}
            <HeaderSkeleton />

            {/* Main Content Skeleton */}
            <Box sx={{ flex: 1, p: 2 }}>
                <PlaceholderTable />
            </Box>
        </Box>
    </Box>
);

export default TableLayoutSkeleton;
