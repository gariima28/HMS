import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Rectangle } from '@mui/icons-material';
import DynamicDataTable from 'components/DynamicDataTable';
import useSWR from 'swr';
import axios from 'axios';
import { useParams } from 'react-router';
import NoDataFound from 'pages/NoDataFound';

// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'https://www.auth.edu2all.in/hms'
const token = `Bearer ${localStorage.getItem('token')}`;

const RoomButton = styled(Button)(({ status }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#0D5F76',
  borderColor: '#0D5F76',
  color: '#fff',
  width: '70%',
  fontSize: '12px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#0779e4',
    borderColor: '#0779e4',
    color: '#fff',
  },
}));

const CustomEnableButton = styled(Button)(({ disabled }) => ({
  backgroundColor: '#C90303',
  //opacity: disabled ? 0.65 : 1,
  borderColor: '#eb2222',
  color: '#fff',
  padding: '8px 26px',
  fontSize: '14px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#eb2222',
    borderColor: '#eb2222',
    color: '#fff'
  },

  '&.Mui-disabled': {
    backgroundColor: '#eb2222',
    borderColor: '#eb2222',
    color: '#fff'
  },
}));

const columns = [
  { id: 'action', label: 'Action', minWidth: 300 },
  { id: 'bookedFor', label: 'Booked For', minWidth: 300 },
  { id: 'roomNum', label: 'Room Numbers', minWidth: 50 },
];

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const BookedRoomInBookings = () => {

  const { id } = useParams();
  const [rows, setRows] = useState([]);

  // get API
  const { data, error } = useSWR(`${ServerIP}/booking/getBookedRoomByBookingId/${id}`, fetcher);
  console.log(data)
  useEffect(() => {
    if (data) {
      console.log(data, 'data');
      const transformedRows = data?.data?.rooms?.map((bookedRooms) => ({
        ...bookedRooms,
        roomNum: <RoomButton variant="outlined" status='roomNo' sx={{ display: "flex" }}><Typography variant='h6'>{bookedRooms.roomNo}</Typography><Typography variant='h6'>{bookedRooms.roomType}</Typography></RoomButton>,

        action: <CustomEnableButton variant="outlined" disabled={true} status='cancel'>Cancel Booking </CustomEnableButton>,

        bookedFor: (
          <>
            <Typography sx={{ color: '#8F8F8F' }} variant="subtitle2" color="textSecondary">
              {data.data.guestName}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: '#8F8F8F' }} variant="h6">
              {data.data.checkInDate.split('T')[0]}
              <span style={{ margin: '0 4px', color: '#8F8F8F' }}>to</span>
              {data.data.checkOutDate.split('T')[0]}
            </Typography>

          </>
        )

      }));
      setRows(transformedRows);
    }
  }, [token, data]);


  if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;


  return (
    <Box>
      <Grid sx={{ display: 'flex', mb: 4 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1, color: "#2C2C2C" }}>
          <Typography variant="h4">Booked Rooms</Typography>
        </Grid>
      </Grid>
      <Grid sx={{ display: 'flex', mb: 2 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1, color: "#2C2C2C" }}>
          <Typography variant="h5">Booking Number: {id}</Typography>
          <Typography variant="h6" sx={{ mt: 2, display: 'flex', color: "#000000" }}>Booked By :<Typography variant="h6" sx={{ color: '#0D6A84', ml: 0.6 }}> Receptionist 1</Typography></Typography>
        </Grid>
        <Grid alignContent='end'>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Grid spacing={2} sx={{ display: 'flex', alignContent: 'center' }}><Rectangle sx={{ color: '#C90303', borderRadius: '100px' }} /> <Typography variant="body" ml={0.5}>Canceled</Typography></Grid>
            <Grid spacing={2} sx={{ display: 'flex', alignContent: 'center' }}><Rectangle sx={{ color: '#E4AB55', borderRadius: '100px' }} /> <Typography variant="body" ml={0.5}>Checked Out</Typography></Grid>
            <Grid spacing={2} sx={{ display: 'flex', alignContent: 'center' }}><Rectangle sx={{ color: '#0D5F76', borderRadius: '100px' }} /> <Typography variant="body" ml={0.5}>Booked</Typography></Grid>
          </Stack>
        </Grid>
      </Grid>
      {Array.isArray(rows) && rows.length > 0 ? (
        <DynamicDataTable columns={columns} rows={rows} />
      )
        :
        <NoDataFound />
      }
    </Box>
  );
}

export default BookedRoomInBookings
