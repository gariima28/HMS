import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery } from '@mui/system';

const CardContentMy = styled(CardContent)(() => ({
    padding: '13px 23px !important',
    fontSize: '12px !important',
}));

const BookedCards = ({ roomNo, roomType }) => {

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Card sx={{ width: '100%', height: '100%' }}>
            <CardContentMy sx={{ p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f2f6fbe4' }}>
                <Typography
                    textAlign="center"
                    variant="h5"
                    sx={{ color: '#14969D', mb: 1 }}
                >
                    {roomNo}
                </Typography>
                <Tooltip title={roomType} placement={isSmallScreen ? 'bottom' : 'top'} // Change placement on small screens
                    enterDelay={500} // Optional: Adds delay before tooltip shows up
                    leaveDelay={200} // Optional: Adds delay before tooltip hides
                >
                    <Typography
                        variant="body1"
                        textAlign="center"
                        sx={{
                            cursor: 'pointer',
                            textAlign: 'center',
                            color: 'text.secondary',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%',
                            display: 'inline-block',
                        }}
                    >
                        {roomType}
                    </Typography>
                </Tooltip>
            </CardContentMy>
        </Card>
    );
};

export default BookedCards;
