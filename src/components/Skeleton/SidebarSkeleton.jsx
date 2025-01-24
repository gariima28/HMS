import React from 'react';
import { Box, Skeleton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const SidebarSkeleton = () => (
    <Box sx={{ width: 250, minHeight: '100vh', bgcolor: 'grey.100', padding: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={50} sx={{ mb: 2 }} />
        <List>
            {[...Array(8)].map((_, index) => (
                <ListItem key={index} sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <Skeleton variant="circular" width={30} height={30} />
                    </ListItemIcon>
                    <ListItemText primary={<Skeleton variant="text" width="70%" />} />
                </ListItem>
            ))}
        </List>
    </Box>
);

export default SidebarSkeleton;
