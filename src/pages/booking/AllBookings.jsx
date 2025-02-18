
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, InputLabel, Menu, MenuItem, OutlinedInput, Stack, Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// Date Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AddCircleRounded, ComputerSharp, MoreVertOutlined } from '@mui/icons-material';
import { CaretDownFilled, RightOutlined } from '@ant-design/icons';
import DynamicDataTable from 'components/DynamicDataTable';
import useSWR from 'swr';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import PlaceholderTable from 'components/Skeleton/PlaceholderTable';
import NoDataFound from 'pages/NoDataFound';


// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'http://89.116.122.211:5001'
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

  '&:disabled': {
    backgroundColor: '#7d72fa',
    borderColor: '#7d72fa',
    color: '#fff',
  },

}));

const columns = [
  { id: 'bookingNo', label: 'Booking Number', minWidth: 170 },
  { id: 'guestName', label: 'Guest', minWidth: 100, align: 'center' },
  { id: 'checkInCheckOut', label: 'Check In | Check Out', align: 'center' },
  { id: 'totalAmount', label: 'Total Amount', minWidth: 100, align: 'center' },
  { id: 'totalPaid', label: 'Total Paid', minWidth: 100, align: 'center' },
  { id: 'pendingAmount', label: 'Due', minWidth: 100, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const AllBookings = () => {

  const [rows, setRows] = useState([]);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [showDataTableLoader, setShowDataTableLoader] = useState(false);
  const [issSearched, setIssSearched] = useState(false);

  const isButtonEnabled = checkIn && checkOut;

  const [formInputs, setFormInputs] = useState([{ quantity: 0 }]);

  const [openMergeDialog, setOpenMergeDialog] = React.useState(false);
  const [BookingNumber, setBookingNumber] = React.useState();
  const [msgToaster, setMsgToaster] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openBookingId, setOpenBookingId] = useState(null);

  useEffect(() => {
    console.log("Updated anchorEl:", anchorEl);
    console.log("Updated openBookingId:", openBookingId);
  }, [anchorEl, openBookingId]);


  const handleClick = (event, bookingId) => {
    console.log("Clicked booking:", bookingId);

    // Close menu if the same button is clicked again
    if (openBookingId === bookingId) {
      setAnchorEl(null);
      setOpenBookingId(null);
    } else {
      setAnchorEl(event.currentTarget);
      setOpenBookingId(bookingId);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenBookingId(null);
    console.log(anchorEl, openBookingId)
  };

  const [CheckInDate, setCheckInDate] = useState(checkIn ? checkIn.format('YYYY-MM-DD') : '');
  const [CheckOutDate, setCheckOutDate] = useState(checkOut ? checkOut.format('YYYY-MM-DD') : '');


  // get API
  // const { data, error } = useSWR(`${ServerIP}/booking/getAll?startDate=${checkIn === null ? '' : checkIn}&endDate=${checkOut === null ? '' : checkOut}`, fetcher);

  const { data, error } = useSWR(
    issSearched ? `${ServerIP}/booking/getAll?startDate=${CheckInDate}&endDate=${CheckOutDate}` : `${ServerIP}/booking/getAll`,
    fetcher
  );

  useEffect(() => {
    if (issSearched) {
      setIssSearched(true);
      setCheckInDate(checkIn.format('YYYY-MM-DD'));
      setCheckOutDate(checkOut.format('YYYY-MM-DD'));
    } else {
      setIssSearched(false);
      setCheckInDate('');
      setCheckOutDate('');
    }
  }, [checkIn, checkOut]);


  const addFormFields = () => {
    setFormInputs([...formInputs, { name: '', quantity: '' }]);
  };

  const removeFormFields = (i) => {
    if (formInputs.length > 1) {
      const newFormValues = [...formInputs];
      newFormValues.splice(i, 1);
      setFormInputs(newFormValues);
    }
  };

  useEffect(() => {
    if (data) {
      setShowDataTableLoader(true)
      console.log(data, 'data');
      const transformedRows = data.bookings.map((booking) => {
        const checkInDate = new Date(booking.checkInDate).toISOString().split('T')[0];
        const checkOutDate = new Date(booking.checkOutDate).toISOString().split('T')[0];

        return {
          ...booking,
          checkInCheckOut: `${checkInDate} | ${checkOutDate}`,
          due: booking.pendingAmount,
          status: <CustomEnableButton variant="outlined" status={`${booking.status ? 'running' : 'upcoming'}`}> {booking.status ? 'Running' : 'Upcoming'} </CustomEnableButton>,
          action: (
            <Stack justifyContent='end' spacing={2} direction="row">
              <DetailsButton variant="outlined" size="small" startIcon={<ComputerSharp />} component={Link} to={`/bookingDetailsPage/${booking.bookingId}`}>Details</DetailsButton>
              {/* <MoreButton variant="outlined" size="small" startIcon={<MoreVertOutlined />} color={`${booking.status ? 'error' : 'success'}`} >More</MoreButton> */}

              <MoreButton
                variant="outlined"
                size="small"
                startIcon={<MoreVertOutlined />}
                endIcon={<CaretDownFilled />}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => handleClick(e, booking.bookingId)}
              >
                More
              </MoreButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openBookingId === booking.bookingId && Boolean(anchorEl)}
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
        // setIssSearched(false)
      }, 1800);
    }
    if (msgToaster) {
      handleOpeningToasterState();
    }
  }, [data]);
  const isSmUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));


  if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

  return (
    <Box>
      <Grid sx={{ display: 'flex', mb: 4 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h4">All Bookings</Typography>
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
        <Grid item xs={5} sm={4} md={4} lg={4}>
          <Stack spacing={1}>
            <InputLabel htmlFor="checkIn">Check In</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={checkIn} onClick={(newValue) => { setCheckIn(newValue); setCheckInDate(newValue.format('YYYY-MM-DD')) }} renderInput={(params) => <OutlinedInput {...params} fullWidth />} />
            </LocalizationProvider>
          </Stack>
        </Grid>
        <Grid item xs={5} sm={4} md={4} lg={4}>
          <Stack spacing={1}>
            <InputLabel htmlFor="checkOut">Checkout</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={checkOut} onClick={(newValue) => { setCheckOut(newValue); setCheckOutDate(newValue.format('YYYY-MM-DD')) }} renderInput={(params) => <OutlinedInput {...params} fullWidth />} />
            </LocalizationProvider>
          </Stack>
        </Grid>
        <Grid item xs={2} sm={4} md={4} lg={4} display="flex" alignItems="flex-end">
          <CustomButton variant="outlined" fullWidth sx={{ p: 1 }} disabled={!isButtonEnabled} onClick={()=> setIssSearched(true)}>
            <FilterAltIcon sx={{ color: '#fff' }} /> {isSmUp && <span>&nbsp; Search</span>}
          </CustomButton>
        </Grid>
      </Grid>

      {showDataTableLoader ? <PlaceholderTable /> : rows.length > 0 ?  <DynamicDataTable columns={columns} rows={rows} /> : <NoDataFound />}

      <Dialog open={openMergeDialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" maxWidth="xs" PaperProps={{ sx: { position: "absolute", top: 20, margin: 0, width: '100%' }, }} >
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }} id="customized-dialog-title" > Merging with:{" "}
          <Typography component="span" color="primary" fontWeight="bold"> {BookingNumber} </Typography>
        </DialogTitle>

        <IconButton aria-label="close" onClick={handleClose} sx={(theme) => ({ position: "absolute", right: 8, top: 8, color: theme.palette.grey[500], })} >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          {formInputs.map((element, index) => (
            <Grid display='flex' key={index} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }} >
              <OutlinedInput placeholder="Booking Number *" value={element.bookingNumber || ""} onChange={(e) => handleChange(index, e)} sx={{ width: "100%" }} />
              {index === 0 ?
                <IconButton onClick={addFormFields} sx={{ backgroundColor: "#28c76f", color: "#fff", ml: 1, "&:hover": { backgroundColor: "#1f9d57" }, }} >
                  <AddCircleRounded />
                </IconButton>
                :
                <IconButton onClick={() => removeFormFields(index)} sx={{ backgroundColor: "#eb2222", color: "#fff", ml: 1, "&:hover": { backgroundColor: "#c91d1d" }, }} >
                  <CloseIcon />
                </IconButton>
              }
            </Grid>
          ))}
        </DialogContent>

        <DialogActions>
          <Button variant="contained" fullWidth sx={{ backgroundColor: "#5a32ea", color: "#fff", "&:hover": { backgroundColor: "#482bc8" }, }} >
            Submit
          </Button>
        </DialogActions>
      </Dialog>



    </Box>
  );
}

export default AllBookings
