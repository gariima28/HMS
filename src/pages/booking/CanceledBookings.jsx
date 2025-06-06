import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// Date Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ComputerSharp, MoreVertOutlined } from '@mui/icons-material';
import { RightOutlined } from '@ant-design/icons';
import DynamicDataTable from 'components/DynamicDataTable';
import useSWR from 'swr';
import axios from 'axios';
import PlaceholderTable from 'components/Skeleton/PlaceholderTable';
import NoDataFound from 'pages/NoDataFound';

// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'https://www.auth.edu2all.in/hms'
const token = `Bearer ${localStorage.getItem('token')}`;


const CustomEnableButton = styled(Button)(({ status }) => ({
  borderRadius: '50px',
  backgroundColor: status === 'running' ? '#E6F4EA' : '#ffa34c25',
  borderColor: status === 'running' ? '#57C168' : '#ff9f43',
  color: status === 'running' ? '#57C168' : '#ff9f43',
  padding: '2px 26px',
  fontSize: '12px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: status === 'running' ? '#D4ECD9' : '#ffa24c38',
    borderColor: status === 'running' ? '#57C168' : '#ff9f43',
    color: status === 'running' ? '#57C168' : '#ff9f43'
  },
}));

const DetailsButton = styled(Button)(() => ({
  borderRadius: '20px',
  backgroundColor: 'transparent',
  borderColor: '#0D6A84',
  color: '#0D6A84',
  fontSize: '0.825rem',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#4634ff',
    borderColor: '#4634ff',
    color: '#fff',
  },
}));

const MoreButton = styled(Button)(() => ({
  borderRadius: '20px',
  backgroundColor: 'transparent',
  borderColor: '#0D6A84',
  color: '#0D6A84',
  fontSize: '0.825rem',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#1e9ff2',
    borderColor: '#1e9ff2',
    color: '#fff',
  },
}));

const CustomButton = styled(Button)(() => ({
  borderRadius: '3.2px',
  backgroundColor: '#0D6A84',
  borderColor: '#0D6A84',
  color: '#ffffff',
  fontSize: '0.825rem',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#4634ff',
    borderColor: '#4634ff',
    color: '#fff',
  },

  '&:disabled': {
    backgroundColor: '#0D6A84',
    borderColor: '#0D6A84',
    color: '#ffffff',
  },

}));

const columns = [
  { id: 'bookingNo', label: 'Booking Number', minWidth: 170 },
  { id: 'guestName', label: 'Guest', minWidth: 100, align: 'start' },
  { id: 'checkInCheckOut', label: 'Check In | Check Out', align: 'start' },
  { id: 'totalAmount', label: 'Total Amount', minWidth: 100, align: 'center' },
  { id: 'totalPaid', label: 'Total Paid', minWidth: 100, align: 'center' },
  { id: 'due', label: 'Due', minWidth: 100, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const CanceledBookings = () => {

  const [rows, setRows] = useState([]);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);

  const isButtonEnabled = checkIn && checkOut;

  const [toaster, setToaster] = useState(false)
  const [msgToaster, setMsgToaster] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event);
    console.log(event)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // get API
  const { data, error } = useSWR(`${ServerIP}/booking/getCancelBooking`, fetcher);
  console.log(data)
  useEffect(() => {
    if (data) {
      setShowDataTableLoader(true)
      console.log(data?.bookings, 'data');
      const transformedRows = data.bookings.map((booking) => {
        const checkInDate = new Date(booking.checkInDate).toISOString().split('T')[0];
        const checkOutDate = new Date(booking.checkOutDate).toISOString().split('T')[0];

        return {
          ...booking,
          due: booking.pendingAmount,
          checkInCheckOut: `${checkInDate} | ${checkOutDate}`,
          status: <CustomEnableButton variant="outlined" status={`${booking.status ? 'running' : 'upcoming'}`}> {booking.status ? 'Running' : 'Upcoming'} </CustomEnableButton>,
          action: (
            <Stack justifyContent='end' spacing={2} direction="row">
              <DetailsButton variant="outlined" size="small" startIcon={<ComputerSharp />} href={`bookingDetailsPage/${booking.bookingId}`}>Details</DetailsButton>
              <MoreButton variant="outlined" size="small" startIcon={<MoreVertOutlined />} color={`${booking.status ? 'error' : 'success'}`} >More</MoreButton>
              {/* <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => handleClick(e.currentTarget)}
              >
                Dashboard
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div> */}
            </Stack>
          )
        }
      })
      setRows(transformedRows);
      setTimeout(() => {
        setShowDataTableLoader(false)
      }, 1800);
    }
    if (msgToaster) {
      handleOpeningToasterState();
    }
  }, [token, data, msgToaster]);


  if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;


  return (
    <Box>
      <Grid sx={{ display: 'flex', mb: 4 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Canceled Bookings</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <CustomButton variant="outlined" href="bookRoom">
              <RightOutlined />  Book New
            </CustomButton>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ backgroundColor: '#ffffff', p: 1, mb: 4 }}>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Stack spacing={1}>
            <InputLabel htmlFor="checkIn">Check In</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={checkIn} onChange={(newValue) => setCheckIn(newValue)} renderInput={(params) => <OutlinedInput {...params} fullWidth />} />
            </LocalizationProvider>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Stack spacing={1}>
            <InputLabel htmlFor="checkOut">Checkout</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={checkOut} onChange={(newValue) => setCheckOut(newValue)} renderInput={(params) => <OutlinedInput {...params} fullWidth />} />
            </LocalizationProvider>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} display="flex" alignItems="flex-end">
          <CustomButton variant="outlined" fullWidth sx={{ p: 1 }} disabled={!isButtonEnabled} >
            <FilterAltIcon sx={{ color: '#fff' }} /> &nbsp; Search
          </CustomButton>
        </Grid>
      </Grid>
      {showDataTableLoader ? <PlaceholderTable /> : rows.length > 0 ? <DynamicDataTable columns={columns} rows={rows} /> : <NoDataFound />}
    </Box>
  );
}

export default CanceledBookings
