import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, InputLabel, Menu, MenuItem, OutlinedInput, Stack, Typography } from '@mui/material';
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
  { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const AllBookings = () => {

  const [rows, setRows] = useState([]);

  const [openBookingId, setOpenBookingId] = useState(null);
  const [formInputs, setFormInputs] = useState([{ quantity: 0 }]);

  const [openMergeDialog, setOpenMergeDialog] = React.useState(false);
  const [BookingNumber, setBookingNumber] = React.useState();
  const [msgToaster, setMsgToaster] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event, bookingId) => {
    setAnchorEl(event.currentTarget);
    setOpenBookingId(bookingId); // Store the bookingId for the open dropdown
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenBookingId(null); // Reset the open bookingId when the menu closes
  };

  // get API
  const { data, error } = useSWR(`${ServerIP}/booking/getAll`, fetcher);

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
      console.log(data, 'data');
      const transformedRows = data.bookings.map((booking) => {
        const checkInDate = new Date(booking.checkInDate).toISOString().split('T')[0];
        const checkOutDate = new Date(booking.checkOutDate).toISOString().split('T')[0];

        return {
          ...booking,
          checkInCheckOut: `${checkInDate} | ${checkOutDate}`,
          // image: booking.icon === null ? '-' : booking.icon.split('/').pop(),
          status: <CustomEnableButton variant="outlined" status={`${booking.status ? 'running' : 'upcoming'}`}> {booking.status ? 'Running' : 'Upcoming'} </CustomEnableButton>,
          action: (
            <Stack justifyContent='end' spacing={2} direction="row">
              <DetailsButton variant="outlined" size="small" startIcon={<ComputerSharp />} href={`bookingDetailsPage/${booking.bookingId}`}>Details</DetailsButton>
              {/* <MoreButton variant="outlined" size="small" startIcon={<MoreVertOutlined />} color={`${booking.status ? 'error' : 'success'}`} >More</MoreButton> */}

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
                <MenuItem sx={{ p: 0 }}>
                  <Button sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent' } }} onClick={() => { setOpenMergeDialog(true), setBookingNumber(booking.bookingNo) }}>Merge Booking</Button>
                </MenuItem>
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
    }
    if (msgToaster) {
      handleOpeningToasterState();
    }
  }, [token, data, msgToaster, openBookingId]);


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
        <Grid xs={12} sm={6} md={6} lg={3} >
          <Stack spacing={1}>
            <InputLabel htmlFor="Keywords">Keywords</InputLabel>
            <OutlinedInput id="Keywords" type="text" name="roomType" placeholder="" fullWidth />
          </Stack>
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={3} >
          <Stack spacing={1}>
            <InputLabel htmlFor="subTitle">Check In </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </Stack>
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={3} >
          <Stack spacing={1}>
            <InputLabel htmlFor="subTitle">Checkout </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
              {/* <DemoContainer components={['DatePicker']}>
              </DemoContainer> */}
            </LocalizationProvider>
          </Stack>
        </Grid>
        <Grid alignContent='end' xs={12} sm={6} md={6} lg={3} >
          <CustomButton variant="outlined" fullWidth sx={{ p: 1 }}>
            <FilterAltIcon sx={{ color: '#fff' }} /> &nbsp; Search
          </CustomButton>
        </Grid>
      </Grid>
      <DynamicDataTable columns={columns} rows={rows} />

      {/* Merge Dialog */}
      <Dialog
        open={openMergeDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        PaperProps={{
          sx: { position: "absolute", top: 20, margin: 0 },
        }}
      >
        {/* Dialog Title */}
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: "bold" }}
          id="customized-dialog-title"
        >
          Merging with:{" "}
          <Typography component="span" color="primary" fontWeight="bold">
            {BookingNumber}
          </Typography>
        </DialogTitle>

        {/* Close Icon */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        {/* Dialog Content */}
        <DialogContent dividers>
          {/* Dynamic Fields */}
          {formInputs.map((element, index) => (
            <Grid
              display='flex'
              key={index}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <OutlinedInput
                placeholder="Booking Number *"
                value={element.bookingNumber || ""}
                onChange={(e) => handleChange(index, e)}
                sx={{ width: "100%" }}
              />
              {index===0 ?
                <IconButton
                  onClick={addFormFields}
                  sx={{
                    backgroundColor: "#28c76f",
                    color: "#fff",
                    ml: 1,
                    "&:hover": { backgroundColor: "#1f9d57" },
                  }}
                >
                  <AddCircleRounded />
                </IconButton>
                
                :
                <IconButton
                  onClick={() => removeFormFields(index)}
                  sx={{
                    backgroundColor: "#eb2222",
                    color: "#fff",
                    ml: 1,
                    "&:hover": { backgroundColor: "#c91d1d" },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              }
            </Grid>
          ))}
        </DialogContent>

        {/* Submit Button */}
        <DialogActions>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#5a32ea",
              color: "#fff",
              "&:hover": { backgroundColor: "#482bc8" },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>



    </Box>
  );
}

export default AllBookings
