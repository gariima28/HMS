import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StatCard = () => {
    return (
        <StyledCard>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                {/* Image Container */}


                {/* Text Content */}
                <Box sx={{}}>
                    <Typography variant="h4" component="div" fontWeight={700}>
                        {count}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {text}
                    </Typography>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)'
    }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px'
}));

export default StatCard;