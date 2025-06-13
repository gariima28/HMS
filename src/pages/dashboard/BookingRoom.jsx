import React, { useEffect, useState } from 'react';
import {
    Box, Button, Typography, Grid, Paper, Divider, Chip, Drawer, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, IconButton,
    TextField, Snackbar, Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import useSWR from 'swr';
import CloseIcon from '@mui/icons-material/Close';
import { getAllRoomApiByRoomTypeDash, getBookingDetailsByRoomId } from 'api/api';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import NoDataFound from 'pages/NoDataFound';
import { styled } from '@mui/styles';
dayjs.extend(advancedFormat);

const ServerIP = 'https://www.auth.edu2all.in/hms';
const token = `Bearer ${localStorage.getItem('token')}`;



const AddButton = styled(Button)(({ status }) => ({
    borderRadius: '5px',
    backgroundColor: '#0D6A84',
    borderColor: status === 'enable' ? '#FFD8D8' : '#0D6A84',
    color: '#FFFFFF',
    padding: '14px 20px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#0D6A84',
        borderColor: '#FFD8D8',
        color: '#FFFFFF',
    },
}));


const farePerRoom = 100;

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then((res) => res.data);

const BookingRoom = ({ onOpenDrawer, selectedRooms, setSelectedRooms, checkIn, setCheckIn, checkOut, setCheckOut, showData, setShowData, roomData, setRoomdata }) => {


    const [roomTypeToRoomNos, setRoomTypeToRoomNos] = useState({});
    const [farePerRoom, setFarePerRoom] = useState(1000); // Default fare or fetch from API
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

    console.log(roomData)
    const formattedCheckIn = checkIn ? dayjs(checkIn).format('YYYY-MM-DDTHH:mm:ss').split('T')[0] : null;
    const formattedCheckOut = checkOut ? dayjs(checkOut).format('YYYY-MM-DDTHH:mm:ss').split('T')[0] : null;

    const handleDateChange = () => {
        if (checkIn) {
            const formattedCheckIn = dayjs(checkIn).format('YYYY-MM-DDTHH:mm:ss');
            setCheckIn(formattedCheckIn); // Your existing state for API
        }
        if (checkOut) {
            const formattedCheckOut = dayjs(checkOut).format('YYYY-MM-DDTHH:mm:ss');
            setCheckOut(formattedCheckOut); // Your existing state for API
        }
    };

    useEffect(() => {
        const newSubtotal = selectedRooms.reduce((sum, room) => sum + (room.fare || 0), 0);
        const newTax = newSubtotal * 0.10; // 10% tax
        const newTotal = newSubtotal + newTax;

        setSubtotal(newSubtotal);
        setTax(newTax);
        setTotal(newTotal);
    }, [selectedRooms]);

    const prepareBookingRequest = (roomTypeId, roomNo) => {
        return JSON.stringify({
            roomTypeIds: [roomTypeId],
            roomTypeToRoomNos: {
                [roomTypeId]: [roomNo]
            },
            totalRoom: 1,
            checkInDate: roomData[0]?.checkInDate,
            checkOutDate: roomData[0]?.checkOutDate,
        });
    };

    // const prepareBookingRequest = (roomTypeId, roomNo) => {
    //     return {
    //         roomTypeIds: [roomTypeId],
    //         roomTypeToRoomNos: {
    //             [roomTypeId]: [roomNo]
    //         },
    //         totalRoom: 1,
    //         checkInDate: roomData[0]?.checkInDate,
    //         checkOutDate: roomData[0]?.checkOutDate,
    //     };
    // };

    const handleRoomClick = async (roomId, roomTypeId, roomNo) => {
        try {
            // Check if room is already selected
            const existingIndex = selectedRooms.findIndex(room => room.id === roomId);

            if (existingIndex >= 0) {
                // Remove room if already selected
                setSelectedRooms(prev => prev.filter(room => room.id !== roomId));
                return;
            }

            // Prepare request for single room selection (as object, not stringified)
            const requestDto = prepareBookingRequest(roomTypeId, roomNo);
            console.log("Request data:", requestDto);

            // Call API to get booking details
            const response = await getBookingDetailsByRoomId(requestDto);
            console.log("API response:", response);

            // Update state with API response data
            // Update state with API response data
            setSelectedRooms(prev => [
                ...prev,
                {
                    id: roomId,
                    roomNo,
                    roomTypeId,
                    farePerDay: response.data?.available?.[0]?.farePerDay || farePerRoom,
                    noOfDays: response.data?.numberOfDays || 1,
                    roomType: response.data?.available?.[0]?.roomType,
                    totalFare: response.data?.totalFare,
                    checkInDate: response.data?.checkInDate,
                    checkOutDate: response.data?.checkOutDate,
                    // Include other relevant fields from the response
                    ...response.data?.available?.[0]
                }
            ]);

            // Update fare per room if needed
            if (response.farePerRoom) {
                setFarePerRoom(response.farePerRoom);
            }

        } catch (error) {
            console.error('Error handling room selection:', error);
            // Optionally show error to user
        }
    };

    const getAvailableRooms = async () => {
        // setShowDataLoader(true)
        try {
            const response = await getAllRoomApiByRoomTypeDash(formattedCheckIn, formattedCheckOut);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setRoomdata(response?.data?.data)
                    setShowData(true)
                    setTimeout(() => {
                        // setShowDataLoader(false)
                        //setIsButtonDisabled(true)
                    }, 800);
                } else {
                    console.error('Failed to fetch rooms:', response?.data?.message);
                    setSnackbar({
                        open: true,
                        message: response?.data?.message || 'Failed to fetch rooms',
                        severity: 'error',
                        autoHideDuration: 2000
                    });
                }
            }
        } catch (error) {
            setTimeout(() => {
                //setShowDataLoader(false)
            }, 800);
            console.error('Error fetching available rooms:', error);
        }
    };

    // Usage in your booking function
    const handleBookRooms = () => {
        const requestDto = prepareBookingRequest();
        console.log("Booking request:", requestDto);
        // Call your API with this requestDto
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ py: 3, px: .5 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Booking Room
                </Typography>

                {/* Date Selection */}
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                        <DatePicker
                            label="Check-In"
                            value={checkIn}
                            onChange={(newValue) => setCheckIn(newValue)}
                            slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                            sx={{
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#0D6A84', // Change to your desired green shade
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <DatePicker
                            label="Check-Out"
                            value={checkOut}
                            onChange={(newValue) => setCheckOut(newValue)}
                            slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                            sx={{
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#0D6A84', // Change to your desired green shade
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <AddButton
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ height: '100%', py: 2 }}
                            onClick={getAvailableRooms}
                        >
                            Search Rooms
                        </AddButton>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Room Display */}
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Available Room
                </Typography>

                {!showData ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <NoDataFound />
                        {/* <img
                            src="https://cdn.dribbble.com/users/2087897/screenshots/6019780/media/997c3e30d5cd58620e9b20bb3f8a8040.png"
                            alt="Booking illustration"
                            style={{ maxWidth: '300px' }}
                        /> */}
                        <Typography variant="body1" color="textSecondary">
                            First, please select the check-in and check-out dates
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Box elevation={3} sx={{ py: 2, mt: 2 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Choose Room
                                </Typography>

                                {/* Legend */}
                                <Box display="flex" gap={2} mb={2}>
                                    <Chip label="Booked" sx={{ bgcolor: '#D8D8D8' }} />
                                    <Chip label="Selected" sx={{ bgcolor: '#009327', color: 'white' }} />
                                    <Chip label="Available" sx={{ bgcolor: '#3797D3', color: 'white' }} />
                                </Box>
                                <Typography variant="subtitle1" color="#2C2C2C" gutterBottom sx={{ backgroundColor: "#FFFBF0", p: 1.5, fontWeight: 400, borderBottom: "1px solid #DDDDEBBF", borderTop: "1px solid #DDDDEBBF" }}>
                                    Every room can be select or deselect by a single click. Make sure that selected rooms in each date is equal to the number of rooms you have searched.
                                </Typography>

                                {/* Rooms Table */}
                                <Grid container spacing={2}>
                                    {/* Table Headers */}
                                    <Grid item xs={12}>
                                        <Grid container sx={{ backgroundColor: "#0D6A8426", display: "flex", alignItems: "center", justifyContent: "center", pt: 1, px: 2 }}>
                                            <Grid item xs={12} md={4}>
                                                <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
                                                    Date
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
                                                    Rooms
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
                                                    Booking Details
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* Left Side: Date + Rooms */}
                                    <Grid item xs={12} md={7}>
                                        {roomData.map((room, idx) => (
                                            <Grid container key={idx} spacing={2} mb={2} >
                                                {/* Date Column */}
                                                <Grid item xs={12} md={6}>
                                                    <Typography fontWeight="bold" color="text.secondary">
                                                        {new Date(room.checkInDate).toLocaleDateString()} -
                                                        {new Date(room.checkOutDate).toLocaleDateString()}
                                                    </Typography>
                                                    <Typography fontWeight="bold" color="primary">
                                                        {room.roomType}
                                                    </Typography>
                                                </Grid>

                                                {/* Room Buttons */}
                                                <Grid item xs={12} md={6}>
                                                    <Box display="flex" gap={1} flexWrap="wrap">

                                                        {room.AvaRooms.map((availRoom) => {
                                                            const isSelected = selectedRooms.some(r => r.id === availRoom.roomId);
                                                            return (
                                                                <Button
                                                                    key={availRoom.roomId}
                                                                    variant='contained'
                                                                    color={
                                                                        !availRoom.availableStatus
                                                                            ? 'inherit'
                                                                            : isSelected
                                                                                ? 'success'
                                                                                : 'primary'
                                                                    }
                                                                    disabled={!availRoom.availableStatus}
                                                                    onClick={() => handleRoomClick(
                                                                        availRoom.roomId,
                                                                        room.roomTypeId,
                                                                        availRoom.roomNo
                                                                    )}
                                                                    sx={{
                                                                        minWidth: '50px',
                                                                        ...(availRoom.status === 'booked' && {
                                                                            bgcolor: '#ccc',
                                                                            color: '#333',
                                                                            '&:hover': {
                                                                                bgcolor: '#bbb' // Darker shade on hover
                                                                            }
                                                                        }),
                                                                        ...(isSelected && {
                                                                            bgcolor: '#009327', // Darker success color
                                                                            color: '#fff',
                                                                            '&:hover': {
                                                                                bgcolor: '#1b5e20' // Even darker on hover
                                                                            }
                                                                        }),
                                                                        ...(!isSelected && {
                                                                            bgcolor: '#3797D3', // White background when not selected
                                                                            color: '#fff',  // Dark text
                                                                            border: '1px solid #DDDDEBBF', // Light gray border
                                                                            '&:hover': {
                                                                                bgcolor: '' //
                                                                            }
                                                                        }),
                                                                    }}

                                                                // sx={{
                                                                //     minWidth: '50px',
                                                                //     bgcolor: availRoom.status === 'booked' ? '#ccc' : undefined,
                                                                //     color: availRoom.status === 'booked' ? '#333' : undefined,
                                                                // }}

                                                                >
                                                                    {availRoom.roomNo}
                                                                </Button>
                                                            );
                                                        })}
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    {/* Right Side: Booking Details */}
                                    {/* <Grid item xs={12} md={4}>
                                        <Paper elevation={1} sx={{ p: 2 }}>
                                            <Typography fontWeight="bold" gutterBottom>
                                                Booking Details
                                            </Typography>

                                            <TableContainer>
                                                <Table size="small">
                                                    <TableHead sx={{ backgroundColor: '#e0eff5' }}>
                                                        <TableRow>
                                                            <TableCell><strong>Room No.</strong></TableCell>
                                                            <TableCell><strong>Type</strong></TableCell>
                                                            <TableCell><strong>Fare</strong></TableCell>
                                                            <TableCell><strong>Subtotal</strong></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {selectedRooms.map((room) => {
                                                            // Find room type name
                                                            const roomType = roomData.find(r => r.roomTypeId === room.roomTypeId)?.roomType || 'Unknown';

                                                            return (
                                                                <TableRow key={room.id}>
                                                                    <TableCell>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="error"
                                                                            onClick={() => handleRoomClick(room.id, room.roomTypeId, room.roomNo)}
                                                                        >
                                                                            <CloseIcon fontSize="small" />
                                                                        </IconButton>
                                                                        {room.roomNo}
                                                                    </TableCell>
                                                                    <TableCell>{roomType}</TableCell>
                                                                    <TableCell>₹{room.fare}</TableCell>
                                                                    <TableCell>₹{room.fare}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                            <Divider sx={{ my: 1 }} />
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Sub Total</Typography>
                                                <Typography>₹{subtotal.toFixed(2)}</Typography>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Tax (10%)</Typography>
                                                <Typography>₹{tax.toFixed(2)}</Typography>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between" fontWeight="bold" mt={1}>
                                                <Typography>Paying Amount</Typography>
                                                <Typography>₹{total.toFixed(2)}</Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" gap={1} mt={1}>
                                                <TextField
                                                    value={`₹${total.toFixed(2)}`}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                    size="small"
                                                />
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={onOpenDrawer}
                                                    disabled={selectedRooms.length === 0}
                                                    sx={{ minWidth: '120px' }}
                                                >
                                                    Book Rooms
                                                </Button>
                                            </Box>
                                        </Paper>
                                    </Grid> */}

                                    <Grid item xs={12} md={5}>
                                        <Paper elevation={1} sx={{ p: 2 }}>

                                            <Typography fontWeight="bold" gutterBottom>
                                                Booking Details
                                            </Typography>

                                            <TableContainer>
                                                <Table size="small">
                                                    <TableHead sx={{ backgroundColor: '#E7E7E7' }}>
                                                        <TableRow>
                                                            <TableCell><strong>Room No.</strong></TableCell>
                                                            <TableCell><strong>Type</strong></TableCell>
                                                            <TableCell><strong>Fare/Day</strong></TableCell>
                                                            {/* <TableCell><strong>Days</strong></TableCell> */}
                                                            <TableCell><strong>Subtotal</strong></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {selectedRooms.map((room) => {
                                                            // Calculate subtotal based on days and fare
                                                            const days = room.noOfDays || 1;
                                                            const subtotal = (room.farePerDay || room.fare) * days;

                                                            return (
                                                                <TableRow key={room.id}>
                                                                    <TableCell>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="error"
                                                                            onClick={() => handleRoomClick(room.id, room.roomTypeId, room.roomNo)}
                                                                        >
                                                                            <CloseIcon fontSize="small" />
                                                                        </IconButton>
                                                                        {room.roomNo}
                                                                    </TableCell>
                                                                    <TableCell>{room.roomType || 'Unknown'}</TableCell>
                                                                    <TableCell>₹{room.farePerDay || room.fare}</TableCell>
                                                                    {/* <TableCell>{days}</TableCell> */}
                                                                    <TableCell>₹{subtotal.toFixed(2)}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                            <Divider sx={{ my: 1 }} />
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Sub Total</Typography>
                                                <Typography>₹{selectedRooms.reduce((sum, room) => {
                                                    const days = room.noOfDays || 1;
                                                    return sum + (room.farePerDay || room.fare) * days;
                                                }, 0).toFixed(2)}</Typography>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Tax (10%)</Typography>
                                                <Typography>₹{(selectedRooms.reduce((sum, room) => {
                                                    const days = room.noOfDays || 1;
                                                    return sum + (room.farePerDay || room.fare) * days;
                                                }, 0) * 0.1).toFixed(2)}</Typography>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between" fontWeight="bold" mt={1}>
                                                <Typography>Paying Amount</Typography>
                                                <Typography>₹{(selectedRooms.reduce((sum, room) => {
                                                    const days = room.noOfDays || 1;
                                                    return sum + (room.farePerDay || room.fare) * days;
                                                }, 0) * 1.1).toFixed(2)}</Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" gap={1} mt={1}>
                                                <TextField
                                                    value={`₹${(selectedRooms.reduce((sum, room) => {
                                                        const days = room.noOfDays || 1;
                                                        return sum + (room.farePerDay || room.fare) * days;
                                                    }, 0) * 1.1).toFixed(2)}`}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                    size="small"
                                                />
                                                <AddButton
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={onOpenDrawer}
                                                    disabled={selectedRooms.length === 0}
                                                    sx={{ minWidth: '120px' }}
                                                >
                                                    Book Rooms
                                                </AddButton>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={snackbar.autoHideDuration}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ width: '100%', color: '#fff' }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </LocalizationProvider>
    );
};

export default BookingRoom;
