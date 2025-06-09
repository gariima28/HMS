import { Grid, Typography, Stack, Button, Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { styled } from '@mui/material/styles';
import ListIcon from '@mui/icons-material/List';
import { MoreVertOutlined } from '@mui/icons-material';
import { CaretDownFilled } from '@ant-design/icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useSWR from 'swr';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const CustomButton = styled(Button)(() => ({
    borderRadius: '3.2px',
    backgroundColor: '#0D6A84',
    borderColor: '#0D6A84',
    color: '#fff',
    fontSize: '0.825rem',
    textTransform: 'none',

    '&:hover': {
        backgroundColor: '#0D6A84',
        borderColor: '#0D6A84',
        color: '#fff',
    },
}));

const MoreButton = styled(Button)(() => ({
    borderRadius: '3.2px',
    backgroundColor: '#0D6A84',
    borderColor: '#0D6A84',
    color: '#fff',
    fontSize: '0.825rem',
    textTransform: 'none',

    '&:hover': {
        backgroundColor: '#0D6A84',
        borderColor: '#0D6A84',
        color: '#fff',
    },
}));

const ServerIP = 'https://www.auth.edu2all.in/hms'
const token = `Bearer ${localStorage.getItem('token')}`;

const columns = [
    { id: 'bookedFor', label: 'Booked For', minWidth: 300 },
    { id: 'roomType', label: 'Room Type', minWidth: 300 },
    { id: 'roomNum', label: 'Room Numbers', minWidth: 50 },
];

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const BookingDetailsPage = () => {
    let { id } = useParams();
    const [rows, setRows] = useState([]);

    // get API
    const { data, error } = useSWR(`${ServerIP}/booking/getByBookingId/${id}`, fetcher);
    const { data: paymentsData } = useSWR(`${ServerIP}/payment/getAllPayments?bookingId=${id}`, fetcher);
    const { data: preServiceData } = useSWR(`${ServerIP}/preServ/getById/${id}`, fetcher);

    console.log(preServiceData);
    console.log(paymentsData);

    // get API
    const { data: bookedRoomData, error: bookedRoomError } = useSWR(`${ServerIP}/booking/getBookedRoomByBookingId/${id}`, fetcher);

    useEffect(() => {
        if (bookedRoomData) {
            console.log(bookedRoomData, 'data');
            const transformedRows = bookedRoomData?.data?.rooms?.map((bookedRooms) => ({
                ...bookedRooms,
                // roomNum: <RoomButton variant="outlined" status='roomNo'><Typography variant='h6'>{bookedRooms.roomNo}</Typography><Typography variant='h6'>{bookedRooms.roomType}</Typography></RoomButton>,
                // action: <CustomEnableButton variant="outlined" disabled={true} status='cancel'>Cancel Booking </CustomEnableButton>,
            }));
            setRows(transformedRows);
        }
    }, [token, data]);

    const dataa = [
        { bookedFor: '01 Nov, 2024', roomType: 'Murphy', roomNo: '301', charges: '$230.00' },
        { bookedFor: '02 Nov, 2024', roomType: 'Murphy', roomNo: '301', charges: '$230.00' },
        { bookedFor: '03 Nov, 2024', roomType: 'Murphy', roomNo: '301', charges: '$230.00' },
        { bookedFor: '04 Nov, 2024', roomType: 'Murphy', roomNo: '301', charges: '$230.00' },
    ]

    const paymentRecieved = [
        { time: '12 Jun, 2024 03:40 AM', paymentType: 'Cash Payment', charges: '$1,771.00' },
    ]

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event);
        console.log(event)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let days = dayjs(data?.booking?.checkOutDate).diff(dayjs(data?.booking?.checkInDate), 'day');
    days = days === 0 ? 1 : days;
    const perDayFare = data?.booking?.roomFare / days;
    const checkInDate = data?.booking?.checkInDate?.split("T")[0];
    const checkOutDate = data?.booking?.checkOutDate?.split("T")[0];
    const totalFare = bookedRoomData?.data?.rooms?.reduce((sum) => {
        return sum + (days * perDayFare);
    }, 0);

    return (
        <Grid container rowGap={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid sx={{ display: 'flex', mb: 4 }}>
                <Grid alignContent='center' sx={{ flexGrow: 1 }}>
                    <Typography variant="h4">Booking Details</Typography>
                </Grid>
                <Grid>
                    <Stack justifyContent='start' spacing={2} direction="row">
                        <CustomButton variant="outlined" href="bookRoom">
                            <ListIcon /> &nbsp; All Bookings
                        </CustomButton>
                        <MoreButton variant="outlined" size="small" startIcon={<MoreVertOutlined />} endIcon={<CaretDownFilled />} id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={(e) => handleClick(e.currentTarget)}>More</MoreButton>
                        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
                            <MenuItem sx={{ p: 0 }}> <Button href={`/bookedRoomInBookings/${id}`} sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent', }, }}> Booked Rooms </Button> </MenuItem>
                            <MenuItem sx={{ p: 0 }}> <Button href={`/premiumServicesInBookings/${id}`} sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent', }, }}> Premium Services </Button> </MenuItem>
                            <MenuItem sx={{ p: 0 }}> <Button href={`/paymentInBookings/${id}`} sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent', }, }}> Payment </Button> </MenuItem>
                            <MenuItem sx={{ p: 0 }}>
                                <Button href={`/cancelBookings/${id}`} sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent' } }}>Cancel Booking</Button>
                            </MenuItem>
                            <MenuItem sx={{ p: 0 }}>
                                <Button href={`/checkOutBookings/${id}`} sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent' } }}>Check Out</Button>
                            </MenuItem>
                            <MenuItem sx={{ p: 0 }}> <Button href='/' sx={{ backgroundColor: 'transparent', color: '#000', '&:hover': { color: '#000', backgroundColor: 'transparent', }, }}> Print Invoice </Button> </MenuItem>
                        </Menu>
                    </Stack>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container columnSpacing={2}>
                    <Grid item xs={12} lg={4}>
                        <Box sx={{ backgroundColor: '#fff', borderRadius: '10px', p: 2 }}>
                            <Grid mb={2}>
                                <Typography variant='h6'>Guest Type</Typography>
                                <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.bookingType || '-'}</Typography>
                            </Grid>
                            <Grid mb={2}>
                                <Typography variant='h6'>Name</Typography>
                                <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.guestName || '-'}</Typography>
                            </Grid>
                            <Grid mb={2}>
                                <Typography variant='h6'>Email</Typography>
                                <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.guestEmail || '-'}</Typography>
                            </Grid>
                            <Grid mb={2}>
                                <Typography variant='h6'>Mobile</Typography>
                                <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.phoneNo || '-'}</Typography>
                            </Grid>
                            <Grid mb={2}>
                                <Typography variant='h6'>Address</Typography>
                                <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.address || '-'}</Typography>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Box sx={{ backgroundColor: '#fff', display: 'flex', borderRadius: '10px', p: 2 }}>
                            <Grid flexGrow={1}>
                                <Grid mb={2}>
                                    <Typography variant='h6'>Booking No.</Typography>
                                    <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.bookingNo || '-'}</Typography>
                                </Grid>
                                <Grid mb={2}>
                                    <Typography variant='h6'>Total Room</Typography>
                                    <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.totalRoom || '-'}</Typography>
                                </Grid>
                                <Grid mb={2}>
                                    <Typography variant='h6'>Total Charge</Typography>
                                    <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.totalAmount || '-'}</Typography>
                                </Grid>
                                <Grid mb={2}>
                                    <Typography variant='h6'>Paid Amount</Typography>
                                    <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.totalPaid || '-'}</Typography>
                                </Grid>
                                <Grid mb={2}>
                                    <Typography variant='h6'>Receivable from User</Typography>
                                    <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.pendingAmount || '-'}</Typography>
                                </Grid>
                            </Grid>
                            <Grid>
                                <Grid mb={2}>
                                    <Typography variant='h6'>Booked At</Typography>
                                    <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.bookingAt || '-'}</Typography>
                                </Grid>
                                <Grid mb={2}>
                                    <Typography variant='h6'>Check-In</Typography>
                                    <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.checkInDate.split('T')[0] || '-'}</Typography>
                                </Grid>
                                <Grid mb={2}>
                                    <Typography variant='h6'>Checkout</Typography>
                                    <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.checkOutDate.split('T')[0] || '-'}</Typography>
                                </Grid>
                                <Grid mb={2}>
                                    <Typography variant='h6'>Checked-In At</Typography>
                                    <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.checkInDate.split('T')[1] || '-'}</Typography>
                                </Grid>
                                <Grid mb={2}>
                                    <Typography variant='h6'>Checked Out At</Typography>
                                    <Typography variant='h6' sx={{ color: '#5b6e88' }}>{data?.booking?.checkOutDate.split('T')[1] || '-'}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Accordion defaultExpanded sx={{

                    boxShadow: 'none', border: '1px solid #e8e8e8', '&.MuiAccordion-root': { '&:first-of-type': { borderTopLeftRadius: '0px !important', borderTopRightRadius: '0px !important', }, '&:last-of-type': { borderBottomLeftRadius: '0px !important', borderBottomRightRadius: '0px !important', }, },
                }} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" sx={{ minHeight: '48px !important', '&.Mui-expanded': { minHeight: '48px !important', backgroundColor: '#0D6A84', color: '#fff', }, '&:not(.Mui-expanded)': { backgroundColor: '#fff', color: '#000', }, '& .MuiAccordionSummary-expandIconWrapper': { color: '#fff', '&:not(.Mui-expanded)': { color: '#000', }, }, '& .MuiAccordionSummary-content': { margin: '0px !important', '&.Mui-expanded': { margin: '0px !important', }, }, }} >
                        <Typography variant='h5' fontWeight='bolder'>Booked Rooms</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <TableContainer component={Paper} elevation={0}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#d9d9d9' }}>
                                        <TableCell align="center" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Booked For</TableCell>
                                        <TableCell align="center" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Room Type</TableCell>
                                        <TableCell align="center" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Room No.</TableCell>
                                        <TableCell align="right" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Fare / Night</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookedRoomData?.data?.rooms?.map((row, index) => (
                                        <TableRow
                                            key={row.roomNo}
                                            sx={{
                                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                                            }}
                                        >
                                            <TableCell align="center" sx={{ fontWeight: '600', color: '#5b6e88 !important' }}>{checkInDate}-{checkOutDate}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: '600', color: '#5b6e88 !important' }}>{row.roomType}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: '600', color: '#5b6e88 !important' }}>{row.roomNo}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: '600', color: '#5b6e88 !important' }}>{perDayFare}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell align="right" sx={{ fontWeight: '900', color: '#5b6e88 !important' }}>Total Fare</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: '900', color: '#5b6e88 !important' }}>${totalFare}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <Accordion defaultExpanded sx={{ boxShadow: 'none', border: '1px solid #e8e8e8', '&.MuiAccordion-root': { '&:first-of-type': { borderTopLeftRadius: '0px !important', borderTopRightRadius: '0px !important', }, '&:last-of-type': { borderBottomLeftRadius: '0px !important', borderBottomRightRadius: '0px !important', }, }, }} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" sx={{ display: "flex", justifyContent: "space-between   ", minHeight: '48px !important', '&.Mui-expanded': { minHeight: '48px !important', backgroundColor: '#0D6A84', color: '#fff', }, '&:not(.Mui-expanded)': { backgroundColor: '#f5f5f5', color: '#000', }, '& .MuiAccordionSummary-expandIconWrapper': { color: '#fff', '&:not(.Mui-expanded)': { color: '#000', }, }, '& .MuiAccordionSummary-content': { margin: '0px !important', '&.Mui-expanded': { margin: '0px !important', }, }, }} >
                        <Typography variant="h5" fontWeight="bolder">
                            Premium Services
                        </Typography>
                        <Button sx={{ color: 'white !important', border: "none" }} variant="outlined" component={Link} to={`/addService/${id}`}>
                            + Add New
                        </Button>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 2.5, textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="bolder" sx={{ color: '#5b6e88 !important' }}>
                            No Extra Service Used !!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <Accordion defaultExpanded sx={{ boxShadow: 'none', border: '1px solid #e8e8e8', '&.MuiAccordion-root': { '&:first-of-type': { borderTopLeftRadius: '0px !important', borderTopRightRadius: '0px !important', }, '&:last-of-type': { borderBottomLeftRadius: '0px !important', borderBottomRightRadius: '0px !important', }, }, }} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" sx={{ minHeight: '48px !important', '&.Mui-expanded': { minHeight: '48px !important', backgroundColor: '#0D6A84', color: '#fff', }, '&:not(.Mui-expanded)': { backgroundColor: '#fff', color: '#000', }, '& .MuiAccordionSummary-expandIconWrapper': { color: '#fff', '&:not(.Mui-expanded)': { color: '#000', }, }, '& .MuiAccordionSummary-content': { margin: '0px !important', '&.Mui-expanded': { margin: '0px !important', }, }, }} >
                        <Typography variant='h5' fontWeight='bolder'>Payments Recieved</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <TableContainer component={Paper} elevation={0}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#d9d9d9' }}>
                                        <TableCell align="left" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Time</TableCell>
                                        <TableCell align="center" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Payment Type</TableCell>
                                        <TableCell align="right" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paymentsData?.payments?.map((row, index) => (
                                        <TableRow
                                            key={row.room}
                                            sx={{
                                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                                            }}
                                        >
                                            <TableCell align="left" sx={{ fontWeight: '600', color: '#5b6e88 !important' }}>
                                                {new Date(row.paymentDate).toLocaleString()}
                                            </TableCell>

                                            <TableCell align="center" sx={{ fontWeight: '600', color: '#5b6e88 !important' }}>{row.paymentType}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: '600', color: '#5b6e88 !important' }}>{row.recievedAmout || 0} </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="right" sx={{ fontWeight: '900', color: '#5b6e88 !important' }}>Total Fare</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: '900', color: '#5b6e88 !important' }}>{paymentsData?.payments?.reduce((total, row) => total + Number(row.recievedAmout), 0)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <Accordion defaultExpanded sx={{ boxShadow: 'none', border: '1px solid #e8e8e8', '&.MuiAccordion-root': { '&:first-of-type': { borderTopLeftRadius: '0px !important', borderTopRightRadius: '0px !important', }, '&:last-of-type': { borderBottomLeftRadius: '0px !important', borderBottomRightRadius: '0px !important', }, }, }} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" sx={{ minHeight: '48px !important', '&.Mui-expanded': { minHeight: '48px !important', backgroundColor: '#0D6A84', color: '#fff', }, '&:not(.Mui-expanded)': { backgroundColor: '#fff', color: '#000', }, '& .MuiAccordionSummary-expandIconWrapper': { color: '#fff', '&:not(.Mui-expanded)': { color: '#000', }, }, '& .MuiAccordionSummary-content': { margin: '0px !important', '&.Mui-expanded': { margin: '0px !important', }, }, }}>
                        <Typography variant='h5' fontWeight='bolder'>Payments Returned</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <TableContainer component={Paper} elevation={0}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#d9d9d9' }}>
                                        <TableCell align="left" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Time</TableCell>
                                        <TableCell align="center" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Payment Type</TableCell>
                                        <TableCell align="right" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paymentsData?.payments?.map((row, index) => (
                                        <TableRow
                                            key={row.room}
                                            sx={{
                                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                                            }}
                                        >
                                            <TableCell align="left" sx={{ fontWeight: '600', color: '#5b6e88 !important' }}>{row.paymentDate}</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: '600', color: '#5b6e88 !important' }}>{row.paymentType}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: '600', color: '#5b6e88 !important' }}>{row.refundAmount}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="right" sx={{ fontWeight: '900', color: '#5b6e88 !important' }}>Total Fare</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: '900', color: '#5b6e88 !important' }}>{paymentsData?.payments?.reduce((total, row) => total + Number(row.refundAmout), 0)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <Accordion defaultExpanded sx={{ boxShadow: 'none', border: '1px solid #e8e8e8', '&.MuiAccordion-root': { '&:first-of-type': { borderTopLeftRadius: '0px !important', borderTopRightRadius: '0px !important', }, '&:last-of-type': { borderBottomLeftRadius: '0px !important', borderBottomRightRadius: '0px !important', }, }, }} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" sx={{ minHeight: '48px !important', '&.Mui-expanded': { minHeight: '48px !important', backgroundColor: '#0D6A84', color: '#fff', }, '&:not(.Mui-expanded)': { backgroundColor: '#fff', color: '#000', }, '& .MuiAccordionSummary-expandIconWrapper': { color: '#fff', '&:not(.Mui-expanded)': { color: '#000', }, }, '& .MuiAccordionSummary-content': { margin: '0px !important', '&.Mui-expanded': { margin: '0px !important', }, }, }} >
                        <Typography variant='h5' fontWeight='bolder'>Payment Info</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <TableContainer component={Paper} elevation={0}>
                            <Table aria-label="simple table">
                                {/* <TableHead>
                                    <TableRow >
                                        <TableCell align="left" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Time</TableCell>
                                        <TableCell align="right" fontWeight='bolder' sx={{ color: '#5b6e88 !important' }}>Amount</TableCell>
                                    </TableRow>
                                </TableHead> */}
                                <TableBody>
                                    {paymentsData?.payments?.map((row, index) => (
                                        <>
                                            <TableRow key={row.room} sx={{ backgroundColor: '#ffffff', }} >
                                                <TableCell sx={{ fontWeight: '600', color: '#5b6e88 !important', p: 0 }}>
                                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #00000020', p: 0.9 }}>
                                                        <Typography>Total Fare</Typography>
                                                        <Typography>{row.totalAmount}</Typography>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={row.room} sx={{ backgroundColor: '#f9f9f9' }}>
                                                <TableCell sx={{ fontWeight: '600', color: '#5b6e88 !important', p: 0 }}>
                                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #00000020', p: 0.9 }}>
                                                        <Typography>Tax Charge (10.00%)</Typography>
                                                        <Typography>+{row.tax}</Typography>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={row.room} sx={{ backgroundColor: '#ffffff', }}>
                                                <TableCell sx={{ fontWeight: '600', color: '#5b6e88 !important', p: 0 }}>
                                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #00000020', p: 0.9 }}>
                                                        <Typography>Canceled Tax</Typography>
                                                        <Typography>-{row.cancelTax}</Typography>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={row.room} sx={{ backgroundColor: '#f9f9f9' }} >
                                                <TableCell sx={{ fontWeight: '600', color: '#5b6e88 !important', p: 0 }}>
                                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #00000020', p: 0.9 }}>
                                                        <Typography>Canceled Tax Charge</Typography>
                                                        <Typography>-{row.cancelTaxCharge}</Typography>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={row.room} sx={{ backgroundColor: '#ffffff', }} >
                                                <TableCell sx={{ fontWeight: '600', color: '#5b6e88 !important', p: 0 }}>
                                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #00000020', p: 0.9 }}>
                                                        <Typography>Extra Service Charge</Typography>
                                                        <Typography>+{row.extraService}</Typography>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={row.room} sx={{ backgroundColor: '#f9f9f9' }} >
                                                <TableCell sx={{ fontWeight: '600', color: '#5b6e88 !important', p: 0 }}>
                                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #00000020', p: 0.9 }}>
                                                        <Typography fontWeight={900} sx={{ color: '#5b6e88 !important' }}>Total Amount</Typography>
                                                        <Typography fontWeight={900} sx={{ color: '#5b6e88 !important' }}>{(
                                                            Number(row.totalAmount || 0) +
                                                            Number(row.tax || 0) -
                                                            Number(row.cancelTax || 0) -
                                                            Number(row.cancelTaxCharge || 0) +
                                                            Number(row.extraService || 0)
                                                        ).toFixed(2)}</Typography>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={row.room} sx={{ backgroundColor: '#ffffff', }} >
                                                <TableCell sx={{ fontWeight: '600', color: '#5b6e88 !important', p: 0 }}>
                                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #00000020', p: 0.9 }}>
                                                        <Typography>Payment Received</Typography>
                                                        <Typography>${row.recievedAmount}</Typography>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={row.room} sx={{ backgroundColor: '#f9f9f9' }} >
                                                <TableCell sx={{ fontWeight: '600', color: '#5b6e88 !important', p: 0 }}>
                                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #00000020', p: 0.9 }}>
                                                        <Typography>Refunded</Typography>
                                                        <Typography>${row.refundAmount}</Typography>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={row.room} sx={{ backgroundColor: '#ffffff', }} >
                                                <TableCell sx={{ fontWeight: '600', color: '#5b6e88 !important', p: 0 }}>
                                                    <Grid sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #00000020', p: 0.9 }}>
                                                        <Typography fontWeight={900} sx={{ color: '#28c76f !important' }}>Receivable from User</Typography>
                                                        <Typography fontWeight={900} sx={{ color: '#28c76f !important' }}>$0.00</Typography>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid >
    );
}

export default BookingDetailsPage
