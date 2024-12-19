import { Box, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import CheckInCheckoutCards from 'components/CheckInCheckoutCards';
import { InfoCircleOutlined } from '@ant-design/icons';
import { allUpcomingCheckout } from 'api/api';
import { useEffect, useState } from 'react';

const UpcomingCheckouts = () => {

  const [cardsData, setCardsData] = useState([])

  useEffect(() => {
    getAllUpcomingCheckout();
  }, [])


  const getAllUpcomingCheckout = async () => {
    try {
      var response = await allUpcomingCheckout();
      console.log(response, 'get available room');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setCardsData(response?.data?.upcomingCheckOut)
        }
      }
      else {
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      console.log('catch');
    }
    finally {
      console.log('finally');
    }
  }


  return (
    <Box>
      <Grid sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Upcoming Checkout Bookings</Typography>
      </Grid>
      <Grid sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{color: 'red'}}> <InfoCircleOutlined/> The checkout periods for these bookings have passed, but the guests have not checked out yet.</Typography>
        <Divider sx={{ mt: 1 }}/>
      </Grid>
      <Grid container spacing={3}>
        {cardsData.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} >
            <CheckInCheckoutCards name = {item.name}  mobile = {item.mobile}  bookingNo = {item.bookingNo}  totalRooms = {item.totalRooms} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UpcomingCheckouts
