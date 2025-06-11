import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { UserOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router';

const CheckInCheckoutCards = ({ name, mobile, bookingNo, bookingId, totalRooms }) => {

  const navigate = useNavigate()

  return (
    <Card
      sx={{
        backgroundColor: '#f2f6fbe4',
        position: 'relative',
        top: 0,
        transition: 'top ease 0.5s',
        '&:hover': {
          top: -7,
        }
      }}
    >
      <CardContent>
        <Typography variant='h5' sx={{ color: 'text.dark', mb: 1 }}>
          <UserOutlined /> {name}
        </Typography>
        <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
          Mobile : {mobile}
        </Typography>
        <Grid sx={{ display: 'flex' }}>
          <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
            Booking No. :
          </Typography>
          <Typography variant="subtitle2" onClick={() => navigate(`/bookedRoomInBookings/${bookingId}`)} sx={{ color: '#14969D', cursor: 'pointer', '&:hover': { color: '#14969D' }, ml: 0.4 }}>
            {bookingNo}
          </Typography>
        </Grid>
        <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
          Total Rooms : {totalRooms}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  )
}

export default CheckInCheckoutCards



