import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Box, Button, Divider, Drawer, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Snackbar, Alert } from '@mui/material';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { gray } from '@ant-design/colors';
import { addBookingAPI } from 'api/api';
import { useNavigate } from 'react-router';




const BookingDrawer = ({ open, onClose, selectedRooms, setSelectedRooms, checkInDate, checkOutDate }) => {
    const navigate = useNavigate()
    const [guestType, setGuestType] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            guestType: 'WalkInGuest', // Set the default value for guestName
        },
    });

    const guesstName = watch('guestName');

    console.log(selectedRooms)

    const NewRoomBooking = async (data) => {
        console.log(selectedRooms, 'selectedRooms');
        const ids = selectedRooms.map(item => {
            console.log(item.roomNo);
            return item?.roomNo
        });

        try {
            const formData = new FormData();
            ids.forEach((id) => formData.append('roomNumbers[]', id));

            // Use dates from the first selected room
            const firstRoom = selectedRooms[0];
            if (!firstRoom) {
                throw new Error('No rooms selected');
            }
            function formatDate(date) {
                const d = new Date(date);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}T00:00:00`;
            }

            if (data?.guestName === 'WalkInGuest') {
                formData.append('guestName', data?.name);
                formData.append('phone', data?.phone_number);
                formData.append('address', data?.address);
                formData.append('adult', data?.adult);
                formData.append('children', data?.child);
            }

            // Use dates from selected room
            formData.append('checkInDate', formatDate(checkInDate));
            formData.append('checkOutDate', formatDate(checkOutDate));
            formData.append('bookingType', data?.guestName);
            formData.append('email', data?.email);
            formData.append('totalPaid', data?.payingAmount);

            const response = await addBookingAPI(formData);
            console.log(response);

            if (response.status === 200 && response?.data?.status === 'success') {
                setSnackbar({
                    open: true,
                    message: 'Room booked successfully!',
                    severity: 'success',
                    autoHideDuration: 3000
                });
                setTimeout(() => {
                    navigate('/')
                    reset();
                    onClose();
                }, 2000);
            } else {
                setSnackbar({
                    open: true,
                    message: response?.data?.message || 'Failed to book room',
                    severity: 'error',
                    autoHideDuration: 3000
                });
                console.error('Failed to book room:', response?.data?.message);
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || 'Error booking rooms',
                severity: 'error',
                autoHideDuration: 3000
            });
            console.error('Error book new rooms:', error);
        }
    };

    // const NewRoomBooking = async (data) => {
    //     // setSaveDataLoader(true)
    //     console.log(selectedRooms, 'selectedRooms')
    //     const ids = selectedRooms.map(item => { console.log(item.roomNo); return item?.roomNo });
    //     console.log(ids, 'idssss')
    //     try {
    //         console.log("try")
    //         const formData = new FormData();
    //         ids.forEach((id) => formData.append('roomNumbers[]', id));
    //         if (data?.guestName === 'WalkInGuest') {
    //             formData.append('guestName', data?.name)
    //             formData.append('phone', data?.phone_number)
    //             formData.append('address', data?.address)
    //             formData.append('adult', data?.adult)
    //             formData.append('children', data?.child)
    //         }
    //         formData.append('checkInDate', checkInDate)
    //         formData.append('checkOutDate', checkOutDate)
    //         formData.append('bookingType', data?.guestName)
    //         formData.append('email', data?.email)
    //         formData.append('totalPaid', data?.payingAmount)

    //         const response = await addBookingAPI(formData);
    //         console.log(response)
    //         if (response.status === 200) {
    //             if (response?.data?.status === 'success') {
    //                 setSnackbar({
    //                     open: true,
    //                     message: 'Room booked successfully!',
    //                     severity: 'success',
    //                     autoHideDuration: 3000
    //                 })
    //                 setTimeout(() => {
    //                     // setSaveDataLoader(false)
    //                     navigate('/allBookings');
    //                 }, 800);
    //             }
    //             else {
    //                 setSnackbar({
    //                     open: true,
    //                     message: response?.data?.message || 'Failed to book room',
    //                     severity: 'error',
    //                     autoHideDuration: 3000
    //                 });
    //                 setTimeout(() => {
    //                     setSaveDataLoader(false)
    //                 }, 800);

    //                 console.error('Failed to book room:', response?.data?.message);
    //             }
    //         } else {
    //             setSnackbar({
    //                 open: true,
    //                 message: response?.data?.message || 'Failed to book room',
    //                 severity: 'error',
    //                 autoHideDuration: 3000
    //             });
    //             setTimeout(() => {
    //                 // setSaveDataLoader(false)
    //             }, 800);
    //             console.error('Failed to book room:', response?.data?.message);
    //         }
    //     } catch (error) {
    //         setTimeout(() => {
    //             // setSaveDataLoader(false)
    //         }, 800);
    //         console.error('Error book new rooms:', error);
    //     }
    //     finally {
    //         setTimeout(() => {
    //             //setSaveDataLoader(false)
    //         }, 800);
    //     }
    // };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 350,
                        paddingTop: 8,
                    },
                }}
            >
                <Grid item xs={12} md={4} sx={{ mb: 4 }}>
                    <Grid sx={{ backgroundColor: '#fff', p: 2 }}>
                        <Grid sx={{ display: 'flex' }}>
                            <Grid alignContent='center' sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" gutterBottom>Book Room</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid>
                            <form onSubmit={handleSubmit(NewRoomBooking)}>
                                <Grid item xs={12} sx={{ p: 0.7, mt: 1 }} >
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="guestName">Guest Type <span style={{ color: 'red' }}> *</span></InputLabel>
                                        <Select value={guesstName} {...register('guestName', { required: 'Guest Type is required' })} displayEmpty sx={inputStyles(errors.guestName)} >
                                            <MenuItem value="" disabled>Select type</MenuItem>
                                            <MenuItem value="WalkInGuest">Walk-In Guest</MenuItem>
                                            <MenuItem value="ExistingGuest">Existing Guest</MenuItem>
                                        </Select>
                                        {errors.guestName && (
                                            <Typography color="error" variant="caption">
                                                {errors.guestName.message}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Grid>
                                {guesstName !== 'ExistingGuest' &&
                                    <Grid xs={12} sx={{ p: 0.7, mt: 1 }}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="name">Name <span style={{ color: 'red' }}> *</span></InputLabel>
                                            <OutlinedInput {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters' }, })} placeholder="Enter your name"
                                                sx={inputStyles(errors.name)} />
                                            {errors.name && (
                                                <Typography color="error" variant="caption">
                                                    {errors.name.message}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Grid>
                                }
                                <Grid xs={12} sx={{ p: 0.7, mt: 1 }}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email">Email <span style={{ color: 'red' }}> *</span></InputLabel>
                                        <OutlinedInput {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }, })} placeholder="Enter your email"
                                            sx={inputStyles(errors.email)} />
                                        {errors.email && (
                                            <Typography color="error" variant="caption">
                                                {errors.email.message}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Grid>
                                {guesstName !== 'ExistingGuest' &&
                                    <>
                                        <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="phone_number">Phone Number <span style={{ color: 'red' }}> *</span></InputLabel>
                                                <OutlinedInput {...register('phone_number', { required: 'Phone number is required', pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }, })} placeholder="Enter your Phone number"
                                                    sx={inputStyles(errors.phone_number)} />
                                                {errors.phone_number && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.phone_number.message}
                                                    </Typography>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="address">Address <span style={{ color: 'red' }}> *</span></InputLabel>
                                                <OutlinedInput {...register('address', { required: 'Address is required', minLength: { value: 3, message: 'Address must be at least 3 characters' }, })} placeholder="Enter address"
                                                    sx={inputStyles(errors.address)} />
                                                {errors.address && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.address.message}
                                                    </Typography>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="adult">Adult <span style={{ color: 'red' }}> *</span></InputLabel>
                                                <OutlinedInput {...register('adult', { required: 'No. of Adults is required', min: 0 })} placeholder="Enter no. of Adults"
                                                    sx={inputStyles(errors.adult)} />
                                                {errors.adult && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.adult.message}
                                                    </Typography>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="child">Children <span style={{ color: 'red' }}> *</span></InputLabel>
                                                <OutlinedInput {...register('child', { required: 'No. of Children is required', min: 0 })} placeholder="Enter no. of Children"
                                                    sx={inputStyles(errors.child)} />
                                                {errors.child && (
                                                    <Typography color="error" variant="caption">
                                                        {errors.child.message}
                                                    </Typography>
                                                )}
                                            </Stack>
                                        </Grid>
                                    </>
                                }
                                <Grid xs={12} sx={{ p: 0.7 }}>
                                    <TableContainer>
                                        <Table aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align='center'>Room</TableCell>
                                                    <TableCell align='center'>Days</TableCell>
                                                    <TableCell align='center'>Fare</TableCell>
                                                    <TableCell align='center'>Subtotal</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {selectedRooms?.map((item) => (
                                                    <StyledTableRow>
                                                        <TableCell align='center' p={0}><RoomKey status='selected' onClick={() => handleAddRemoveRoomFromSelected(item.roomId)}>{item.roomNo}</RoomKey></   TableCell>
                                                        <TableCell align="center">{item?.noOfDays}</TableCell>
                                                        <TableCell align="center">{item?.farePerDay}</TableCell>
                                                        <TableCell align="center">₹ {item?.totalFareRoom}</TableCell>
                                                    </StyledTableRow>
                                                ))}
                                                {/* {availableRooms?.map((item) => (
                                                            <StyledTableRow>
                                                                <TableCell align='center' p={0}><RoomKey status='available' onClick={() => handleAddRemoveRoomFromAvailable(item.roomId)}>{item.roomNo}</RoomKey></TableCell>
                                                                <TableCell align="center">1</TableCell>
                                                                <TableCell align="center">250 USD</TableCell>
                                                                <TableCell align="center">250 USD</TableCell>
                                                            </StyledTableRow>
                                                        ))} */}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="payingAmount">Paying Amount <span style={{ color: 'red' }}> *</span></InputLabel>
                                        <OutlinedInput {...register('payingAmount', { required: 'Paying amount is required', min: { value: 1, message: 'Amount must be at least 1' }, validate: { isNumeric: value => !isNaN(value) || 'Please enter a valid number', }, })} placeholder="Enter maximum amount limit" sx={inputStyles(errors.payingAmount)} />
                                        {errors.payingAmount && (
                                            <Typography color="error" variant="caption">
                                                {errors.payingAmount.message}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid alignContent='end' xs={12} sx={{ p: 0.7, mt: 2 }} >
                                    <CustomButton variant="outlined" type='submit' fullWidth sx={{ p: 1 }}
                                    // onClick={() => setSearchOpen(true)}
                                    >
                                        Book Now
                                    </CustomButton>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Drawer>
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
    )
}

export default BookingDrawer;


const inputStyles = (error) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: error ? 'red' : undefined,
        },
    },
});


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
        cursor: 'not-allowed', // Ensure cursor is not-allowed for disabled state
        pointerEvents: 'auto',

    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: gray, // Light grey for odd rows
    },
    '&:hover': {
        backgroundColor: 'darkgray', // Slightly darker on hover
    },
    '& td, & th': {
        border: 0,
        padding: 1,
    },
}));

const RoomKey = styled(Box)(({ theme, status }) => ({
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: 4,
    backgroundColor: status === 'selected' ? '#1976d2' : '#e0e0e0', // blue or light gray
    color: status === 'selected' ? '#ffffff' : '#000000', // white or black
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.9rem',
    '&:hover': {
        opacity: 0.9,
    },
}));