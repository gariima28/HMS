import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, InputLabel, Menu, OutlinedInput, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// Date Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ComputerSharp, MoreVertOutlined } from '@mui/icons-material';
import { CaretDownFilled, RightOutlined } from '@ant-design/icons';
import DynamicDataTable from 'components/DynamicDataTable';
import useSWR from 'swr';
import axios from 'axios';
import { MenuItem } from '@mui/base';
import { Link } from 'react-router-dom';
import ErrorPage from 'components/ErrorPage';
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
  borderRadius: '3.2px',
  backgroundColor: '#fff',
  borderColor: '#4634ff',
  color: '#4634ff',
  fontSize: '0.825rem',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#4634ff',
    borderColor: '#4634ff',
    color: '#fff',
  },
}));

const MoreButton = styled(Button)(() => ({
  borderRadius: '3.2px',
  backgroundColor: '#fff',
  borderColor: '#1e9ff2',
  color: '#1e9ff2',
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
  backgroundColor: '#4634ff',
  borderColor: '#4634ff',
  color: '#fff',
  fontSize: '0.825rem',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#4634ff',
    borderColor: '#4634ff',
    color: '#fff',
  },
}));

const columns = [
  { id: 'bookingNo', label: 'Booking Number', minWidth: 170 },
  { id: 'guestName', label: 'Guest', minWidth: 100, align: 'center' },
  { id: 'checkInCheckOut', label: 'Check In | Check Out', align: 'center' },
  { id: 'totalAmount', label: 'Total Amount', minWidth: 100, align: 'center' },
  { id: 'totalPaid', label: 'Total Paid', minWidth: 100, align: 'center' },
  { id: 'due', label: 'Due', minWidth: 100, align: 'center' },
  // { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const TodaysCheckIn = () => {

  const [rows, setRows] = useState([]);

  const [toaster, setToaster] = useState(false)
  const [msgToaster, setMsgToaster] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [openBookingId, setOpenBookingId] = useState(null);
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event);
    console.log(event)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // get API
  const { data, error } = useSWR(`${ServerIP}/booking/todayCheckIns`, fetcher);

  useEffect(() => {
    if (data) {
      setShowDataTableLoader(true)
      console.log(data?.todayBooking, 'data');
      const transformedRows = data.todayBooking.map((booking) => {
        const checkInDate = new Date(booking.checkInDate).toISOString().split('T')[0];
        const checkOutDate = new Date(booking.checkOutDate).toISOString().split('T')[0];

        return{
          ...booking,
          checkInCheckOut: `${checkInDate} | ${checkOutDate}`,
          due: booking.pendingAmount,
          status: <CustomEnableButton variant="outlined" status={`${booking.status ? 'running' : 'upcoming'}`}> {booking.status ? 'Running' : 'Upcoming'} </CustomEnableButton>,
          action: (
            <Stack justifyContent='end' spacing={2} direction="row">
              <DetailsButton variant="outlined" size="small" startIcon={<ComputerSharp />} href={`bookingDetailsPage/${booking.bookingId}`}>Details</DetailsButton>
              <MoreButton
                variant="outlined"
                size="small"
                startIcon={<MoreVertOutlined />}
                endIcon={<CaretDownFilled />}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => handleClick(e, booking.bookingId)} // Pass bookingId to handleClick
              >
                More
              </MoreButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openBookingId === booking.bookingId} // Dynamically check if the menu for this booking should be open
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem sx={{ p: 0 }}>
                  <Button component={Link} to={`/bookedRoomInBookings/${booking.bookingId}`} sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent' } }}>Booked Rooms</Button>
                </MenuItem>
                <MenuItem sx={{ p: 0 }}>
                  <Button component={Link} to={`/premiumServicesInBookings/${booking.bookingId}`} sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent' } }}>Premium Services</Button>
                </MenuItem>
                <MenuItem sx={{ p: 0 }}>
                  <Button component={Link} to={`/paymentInBookings/${booking.bookingId}`} sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent' } }}>Payment</Button>
                </MenuItem>
                {/* <MenuItem sx={{ p: 0 }}>
                  <Button sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent' } }} onClick={() => { setOpenMergeDialog(true), setBookingNumber(booking.bookingNo) }}>Merge Booking</Button>
                </MenuItem> */}
                <MenuItem sx={{ p: 0 }}>
                  <Button component={Link} to={`/cancelBookings/${booking.bookingId}`} sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent' } }}>Cancel Booking</Button>
                </MenuItem>
                <MenuItem sx={{ p: 0 }}>
                  <Button component={Link} to={`/checkOutBookings/${booking.bookingId}`} sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent' } }}>Check Out</Button>
                </MenuItem>
                <MenuItem sx={{ p: 0 }}>
                  <Button component={Link} to="/" sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent' } }}>Print Invoice</Button>
                </MenuItem>
              </Menu>

            </Stack>
          ),
        }

      });
      setRows(transformedRows);
      setTimeout(() => {
        setShowDataTableLoader(false)
      }, 1800);
    }
    if (msgToaster) {
      handleOpeningToasterState();
    }
  }, [token, data, msgToaster]);




  if (error) return (
    <ErrorPage
      errorMessage={`${error}`}
      onReload={() => { window.location.reload(), console.log(error, 'dhbj') }}
      statusCode={`${error.status}`}
    />
  );
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;


  return (
    <Box>
      <Grid sx={{ display: 'flex', mb: 4 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Today's Check-In</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <CustomButton variant="outlined" href="bookRoom">
              <RightOutlined />  Book New
            </CustomButton>
          </Stack>
        </Grid>
      </Grid>
      {showDataTableLoader ? <PlaceholderTable /> : rows.length > 0 ? <DynamicDataTable columns={columns} rows={rows} /> : <NoDataFound />}
    </Box>
  );
}

export default TodaysCheckIn
