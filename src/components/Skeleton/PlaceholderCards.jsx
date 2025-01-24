import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react'

const PlaceholderCards = () => (
    <Grid container spacing={3} sx={{ minHeight: 500, overflow: 'auto' }}>
        {[...Array(12)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                    sx={{
                        padding: 2,
                        // border: '0.4px solid #ddd',
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        opacity: 0.4,
                    }}
                >
                    <Skeleton variant="circular" width={40} height={40} sx={{ mb: 1 }} />
                    <Skeleton variant="text" sx={{ mb: 1 }} />
                    <Skeleton variant="text" sx={{ mb: 1 }} />
                    <Skeleton variant="text" sx={{ mb: 1 }} />
                </Box>
            </Grid>

        ))}
    </Grid>
);


export default PlaceholderCards
