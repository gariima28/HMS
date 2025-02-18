import { styled } from '@mui/material/styles';
import { Box, Button, Divider, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography, Table, TableBody, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ListIcon from '@mui/icons-material/List';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { SearchRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import useSWR from 'swr';
import axios from 'axios';
import { addBookingAPI, getAvailableRoomApi } from 'api/api';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import AvailableRoomLoader from 'components/Skeleton/AvailableRoomLoader';
import NoDataFound from '../NoDataFound';
import CircularLoader from 'components/Skeleton/CircularLoader';

const ServerIP = 'http://89.116.122.211:5001';
const token = `Bearer ${localStorage.getItem('token')}`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#4634ff',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
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

const RoomKey = styled(Button)(({ status }) => ({
    borderRadius: '3.2px',
    backgroundColor: status === 'selected' ? '#28c76f' : '#4634ff',
    borderColor: status === 'selected' ? '#28c76f' : '#4634ff',
    color: '#fff',
    fontSize: '0.825rem',
    textTransform: 'none',
    '&:hover': {
        backgroundColor:
            status === 'booked'
                ? '#eb2222'
                : status === 'selected'
                    ? '#28c76f'
                    : status === 'available'
                        ? '#4634ff'
                        : '',
        borderColor:
            status === 'booked'
                ? '#eb2222'
                : status === 'selected'
                    ? '#28c76f'
                    : status === 'available'
                        ? '#4634ff'
                        : '',
        color: '#fff',
    },
}));

const inputStyles = (error) => ({
    mb: 2,
    width: '100%',
    boxShadow: 'none',
    backgroundColor: '#fff',
    border: 'none',
    border: error ? '1px solid red' : 'none',
    '&.Mui-focused': {
        borderColor: error ? '#ff4d4f' : '#e0e0e0',
        boxShadow: 'none',
        border: 'none',
    },
    '&:hover': {
        borderColor: error ? '#ff4d4f' : '#e0e0e0',
        border: 'none',
    },
});

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then((res) => res.data);

const BookRoom = () => {

    const navigate = useNavigate()
    const descText =
        'Every room can be selected or deselected by a single click without a booked room. Make sure that selected rooms for each date equal the number of rooms you have searched.';
    const [searchOpen, setSearchOpen] = useState(false);

    const [rooms, setRooms] = useState([]);
    const [roomType, setRoomType] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [noOfRooms, setNoOfRooms] = useState('');

    const [selectedRooms, setSelectedRooms] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);

    const [rows, setRows] = useState([]);
    const [msgToaster, setMsgToaster] = useState('');
    const [showDataLoader, setShowDataLoader] = useState(false);
    const [saveDataLoader, setSaveDataLoader] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [noData, setNoData] = useState(false);

    // Fetch data from API
    const { data, error } = useSWR(`${ServerIP}/roomTypes/getAll`, fetcher);


    useEffect(() => {
        if (data) {
            setRows(data?.roomTypes);
        }
        if (msgToaster) {
            handleOpeningToasterState();
        }
        if (error && error.status === 403) {
            localStorage.removeItem('token')
            window.location.reload()
            navigate('/')
        }
        if (data && data.status === 403) {
            localStorage.removeItem('token')
            window.location.reload()
            navigate('/')
        }
    }, [data, msgToaster]);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            guestName: 'WalkInGuest', // Set the default value for guestName
        },
    });
    // const roomType = watch('roomType', '');
    const guesstName = watch('guestName');


    const handleAddRemoveRoomFromSelected = (roomId) => {
        const roomToRemove = selectedRooms.find((room) => room.roomId === roomId);

        if (roomToRemove) {
            setSelectedRooms(selectedRooms.filter((room) => room.roomId !== roomId));
            setAvailableRooms([...availableRooms, roomToRemove]);
        }
    };

    const handleAddRemoveRoomFromAvailable = (roomId) => {
        if (selectedRooms.length >= noOfRooms) {
            alert(`Please remove the rooms you no longer need before selecting new ones. You can only select up to ${noOfRooms} rooms.`);
            return;
        }
        const roomToAdd = availableRooms.find((room) => room.roomId === roomId);

        if (roomToAdd) {
            setAvailableRooms(availableRooms.filter((room) => room.roomId !== roomId));
            setSelectedRooms([...selectedRooms, roomToAdd]);
        }
    };


    const getAvailableRooms = async () => {
        setShowDataLoader(true)
        try {
            const response = await getAvailableRoomApi(roomType, noOfRooms, checkInDate, checkOutDate);

            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    const rooms = response?.data?.available || [];
                    console.log(rooms)
                    const requiredRooms = parseInt(noOfRooms, 10);
                    setNoData(true);
                    setSelectedRooms(rooms.slice(0, requiredRooms));
                    setAvailableRooms(rooms.slice(requiredRooms));
                    setRooms(rooms);
                    setTimeout(() => {
                        setShowDataLoader(false)
                        setIsButtonDisabled(true)
                    }, 1800);
                } else {
                    console.error('Failed to fetch rooms:', response?.data?.message);
                    setTimeout(() => {
                        setShowDataLoader(false)
                    }, 1800);
                }
            }
        } catch (error) {
            setTimeout(() => {
                setShowDataLoader(false)
            }, 1800);
            console.error('Error fetching available rooms:', error);
        }
    };

    console.log(selectedRooms, availableRooms)

    const NewRoomBooking = async (data) => {
        setSaveDataLoader(true)
        const ids = selectedRooms.map(item => item.roomId);
        try {
            const formData = new FormData();
            ids.forEach((id) => formData.append('roomNumbers[]', id));
            if (data?.guestName === 'WalkInGuest') {
                formData.append('guestName', data?.name)
                formData.append('phone', data?.phone_number)
                formData.append('address', data?.address)
                formData.append('adult', data?.adult)
                formData.append('children', data?.child)
            }
            formData.append('checkInDate', checkInDate)
            formData.append('checkOutDate', checkOutDate)
            formData.append('bookingType', data?.guestName)
            formData.append('email', data?.email)
            formData.append('totalPaid', data?.payingAmount)

            const response = await addBookingAPI(formData);
            if (response.status === 200) {
                if (response?.data?.status === 'success') {
                    setTimeout(() => {
                        setSaveDataLoader(false)
                        navigate('/allBookings');
                    }, 1800);
                }
            } else {
                setTimeout(() => {
                    setSaveDataLoader(false)
                }, 1800);
                console.error('Failed to book room:', response?.data?.message);
            }
        } catch (error) {
            setTimeout(() => {
                setSaveDataLoader(false)
            }, 1800);
            console.error('Error book new rooms:', error);
        }
    };

    const handleRoomTypeChange = (event) => {
        setRoomType(event.target.value);
    };

    const handleCheckInCheckOutDate = (val) => {
        const date0 = dayjs(val[0]?.$d).format('YYYY-MM-DDTHH:mm:ss');
        setCheckInDate(date0);

        const date1 = dayjs(val[1]?.$d).format('YYYY-MM-DDTHH:mm:ss');
        setCheckOutDate(date1);
    }

    useEffect(() => {
        if (roomType && noOfRooms && checkInDate && checkOutDate) {
            setIsButtonDisabled(false); // Enable button when all fields are filled
        } else {
            setIsButtonDisabled(true); // Disable button when any field is missing
        }
    }, [roomType, noOfRooms, checkInDate, checkOutDate]);


    if (error) return <Typography variant="subtitle1">Error loading data</Typography>;
    if (!data) return <Typography variant="subtitle1">Loading Data...</Typography>;

    return (
        <>
            <Box>
                <Grid sx={{ display: 'flex', mb: 4 }}>
                    <Grid alignContent='center' sx={{ flexGrow: 1 }}>
                        <Typography variant="h4">Book Room</Typography>
                    </Grid>
                    <Grid>
                        <Stack justifyContent='start' spacing={2} direction="row">
                            <CustomButton variant="outlined" href="allBookings">
                                <ListIcon /> All Bookings
                            </CustomButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ backgroundColor: '#ffffff', p: 1, mb: 4 }}>
                    <Grid xs={12} sm={6} md={6} lg={3} >
                        <Stack spacing={1}>
                            <InputLabel htmlFor="roomType">Room Type</InputLabel>
                            <Select id='roomType' value={roomType} onChange={handleRoomTypeChange} displayEmpty>
                                <MenuItem value="" disabled>Select One</MenuItem>
                                {rows.map((menuItem) => (
                                    <MenuItem key={menuItem?.roomTypesId} value={menuItem?.roomTypesId}>{menuItem?.roomName}</MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>
                    <Grid xs={12} sm={6} md={6} lg={3} >
                        <Stack spacing={1}>
                            <InputLabel htmlFor="subTitle">Check In - Check Out Date</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateRangePicker slots={{ field: SingleInputDateRangeField }} fullWidth id="subTitle" name="subTitle" onChange={(newValue) => handleCheckInCheckOutDate(newValue)} />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Grid xs={12} sm={6} md={6} lg={3} >
                        <Stack spacing={1}>
                            <InputLabel htmlFor="room">Room</InputLabel>
                            <OutlinedInput id="room" type="number" name="room" placeholder="How many room?" value={noOfRooms} fullWidth onChange={(e) => setNoOfRooms(e.target.value)} />
                        </Stack>
                    </Grid>
                    <Grid alignContent='end' xs={12} sm={6} md={6} lg={3} >
                        <CustomButton variant="outlined" fullWidth sx={{ p: 1 }} onClick={getAvailableRooms} disabled={isButtonDisabled} >
                            <SearchRounded sx={{ rotate: '90deg', me: 5 }} /> Search
                        </CustomButton>
                    </Grid>
                </Grid>
            </Box >
            {showDataLoader
                ?
                <AvailableRoomLoader />
                :
                <Box position='relative' sx={{ boxSizing: 'border-box'}}>
                    {rooms.length > 0 ?
                        <Grid container spacing={3}>
                            {saveDataLoader && <CircularLoader />}
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8} sx={{ mb: 4 }}>
                                    <Grid sx={{ backgroundColor: '#fff', p: 2 }}>
                                        <Grid sx={{ display: 'flex' }}>
                                            <Grid alignContent='center' sx={{ flexGrow: 1 }}>
                                                <Typography variant="h5" gutterBottom>Booking Information</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid container sx={{ p: 1 }}>
                                            <Grid alignContent='center' sx={{ m: 1 }}>
                                                <Typography alignContent='center' variant="subTitle2">
                                                    <CircleIcon sx={{ color: '#eb2222' }} />
                                                    Booked
                                                </Typography>
                                            </Grid>
                                            <Grid alignContent='center' sx={{ m: 1 }}>
                                                <Typography alignContent='center' variant="subTitle2">
                                                    <CircleIcon sx={{ color: '#28c76f' }} /> Selected
                                                </Typography>
                                            </Grid>
                                            <Grid alignContent='center' sx={{ m: 1 }}>
                                                <Typography alignContent='center' variant="subTitle2">
                                                    <CircleIcon sx={{ color: '#4634ff' }} /> Available
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container sx={{ p: 2 }}>
                                            <Typography variant="body1" sx={{ backgroundColor: '#eff8ff', p: 2 }}>{descText}</Typography>
                                        </Grid>
                                        <Grid>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell>Date</StyledTableCell>
                                                            <StyledTableCell align="right">Room</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <StyledTableRow>
                                                            <StyledTableCell component="th" scope="row" sx={{ textWrap: 'nowrap' }}>{checkInDate} - {checkOutDate}</StyledTableCell>
                                                            <StyledTableCell align="left">
                                                                <StyledTableCell align="left">
                                                                    {/* Render selected rooms */}
                                                                    {selectedRooms?.map((item) => (
                                                                        <RoomKey
                                                                            key={item.roomId}
                                                                            status="selected"
                                                                            sx={{ m: 1 }}
                                                                            onClick={() => handleAddRemoveRoomFromSelected(item.roomId)}
                                                                        >
                                                                            {item.roomNo}
                                                                        </RoomKey>
                                                                    ))}

                                                                    {/* Render available rooms */}
                                                                    {availableRooms?.map((item) => (
                                                                        <RoomKey
                                                                            key={item.roomId}
                                                                            status="available"
                                                                            sx={{ m: 1 }}
                                                                            onClick={() => handleAddRemoveRoomFromAvailable(item.roomId)}
                                                                        >
                                                                            {item.roomNo}
                                                                        </RoomKey>
                                                                    ))}
                                                                </StyledTableCell>

                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    </Grid>
                                </Grid>
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
                                                <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="guestName">Guest Type</InputLabel>
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
                                                    <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                                        <Stack spacing={1}>
                                                            <InputLabel htmlFor="name">Name *</InputLabel>
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
                                                <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="email">Email *</InputLabel>
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
                                                                <InputLabel htmlFor="phone_number">Phone Number *</InputLabel>
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
                                                                <InputLabel htmlFor="address">Address *</InputLabel>
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
                                                                <InputLabel htmlFor="adult">Adult</InputLabel>
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
                                                                <InputLabel htmlFor="child">Children</InputLabel>
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
                                                                        <TableCell align='center' p={0}><RoomKey status='selected' onClick={() => handleAddRemoveRoomFromSelected(item.roomId)}>{item.roomNo}</RoomKey></TableCell>
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
                                                        <InputLabel htmlFor="payingAmount">Paying Amount</InputLabel>
                                                        <OutlinedInput {...register('payingAmount', { required: 'Paying amount is required', min: { value: 1, message: 'Amount must be at least 1' }, validate: { isNumeric: value => !isNaN(value) || 'Please enter a valid number', }, })} placeholder="Enter maximum amount limit" sx={inputStyles(errors.payingAmount)} />
                                                        {errors.payingAmount && (
                                                            <Typography color="error" variant="caption">
                                                                {errors.payingAmount.message}
                                                            </Typography>
                                                        )}
                                                    </Stack>
                                                </Grid>
                                                <Grid alignContent='end' xs={12} sx={{ p: 0.7, mt: 2 }} >
                                                    <CustomButton variant="outlined" type='submit' fullWidth sx={{ p: 1 }} onClick={() => setSearchOpen(true)}>
                                                        Book Now
                                                    </CustomButton>
                                                </Grid>
                                            </form>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        noData ? <NoDataFound /> : ''
                    }
                </Box>
            }
        </>
    );
};

export default BookRoom;





























// import { styled } from '@mui/material/styles';
// import { Box, Button, Divider, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import ListIcon from '@mui/icons-material/List';
// // Date Picker
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
// import { SearchRounded } from '@mui/icons-material';
// import { useEffect, useState } from 'react';
// import CircleIcon from '@mui/icons-material/Circle';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import useSWR from 'swr';
// import axios from 'axios';
// import { getAvailableRoomApi } from 'api/api';
// import dayjs from 'dayjs';

// const ServerIP = 'http://89.116.122.211:5001'
// const token = `Bearer ${localStorage.getItem('token')}`;


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: '#4634ff',
//         color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 14,
//     },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//         border: 0,
//     },
// }));

// const CustomButton = styled(Button)(() => ({
//     borderRadius: '3.2px',
//     backgroundColor: '#4634ff',
//     borderColor: '#4634ff',
//     color: '#fff',
//     fontSize: '0.825rem',
//     textTransform: 'none',

//     '&:hover': {
//         backgroundColor: '#4634ff',
//         borderColor: '#4634ff',
//         color: '#fff',
//     },

//     '&:disabled': {
//         backgroundColor: '#7d72fa',
//         borderColor: '#7d72fa',
//         color: '#fff',
//     },
// }));

// const RoomKey = styled(Button)(({ status }) => ({
//     borderRadius: '3.2px',
//     backgroundColor: status === 'selected' ? '#28c76f' : '#4634ff',
//     borderColor: status === 'selected' ? '#28c76f' : '#4634ff',
//     color: '#fff',
//     fontSize: '0.825rem',
//     textTransform: 'none',

//     '&:hover': {
//         backgroundColor: status === 'booked' ? '#eb2222' : status === 'selected' ? '#28c76f' : status === 'available' ? '#4634ff' : '',
//         borderColor: status === 'booked' ? '#eb2222' : status === 'selected' ? '#28c76f' : status === 'available' ? '#4634ff' : '',
//         color: '#fff',
//     },
// }));

// const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);


// const BookRoom = () => {

//     const descText = 'Every room can be select or deselect by a single click without booked room. Make sure that selected rooms in each date is equal to the number of rooms you have searched.'
//     const [searchOpen, setSearchOpen] = useState(false);

//     const [rooms, setRooms] = useState([]);
//     const [roomType, setRoomType] = useState('');
//     const [checkInDate, setCheckInDate] = useState('');
//     const [checkOutDate, setCheckOutDate] = useState('');
//     const [noOfRooms, setNoOfRooms] = useState('');

//     const [selectedRooms, setSelectedRooms] = useState([]);
//     const [availableRooms, setAvailableRooms] = useState([]);

//     console.log(selectedRooms);
//     console.log(availableRooms);

//     const [rows, setRows] = useState([]);
//     const [toaster, setToaster] = useState(false)
//     const [msgToaster, setMsgToaster] = useState('')

//     // get API
//     const { data, error } = useSWR(`${ServerIP}/roomTypes/getAll`, fetcher);

//     useEffect(() => {
//         if (data) {
//             setRows(data?.roomTypes);
//         }
//         if (msgToaster) {
//             handleOpeningToasterState();
//         }
//     }, [token, data, msgToaster]);

//     const handleRoomTypeChange = (event) => {
//         setRoomType(event.target.value);
//     };

//     const handleCheckInCheckOutDate = (val) => {
//         const date0 = dayjs(val[0]?.$d).format('YYYY-MM-DD');
//         setCheckInDate(date0);

//         const date1 = dayjs(val[1]?.$d).format('YYYY-MM-DD');
//         setCheckOutDate(date1);
//     }

//     const getAvailableRooms = async () => {
//         try {
//             var response = await getAvailableRoomApi(roomType, noOfRooms, checkInDate, checkOutDate);
//             console.log(response, 'get available room');
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setRooms(response?.data?.available?.First)
//                     const dataaa = response?.data?.available?.First
//                     const selected = dataaa.slice(0, noOfRooms)
//                     const available = dataaa.slice(noOfRooms)

//                     setSelectedRooms(selected)
//                     setAvailableRooms(available)

//                     console.log(selected, 'selected')
//                     console.log(available, 'available')
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch (error) {
//             console.log('catch');
//         }
//         finally {
//             console.log('finally');
//         }
//     }

//     const handleAddRemoveRoomFromSelected = (room) => {
//         setSelectedRooms((prevSelectedRoom) => {
//             const UpdatedSelectedRooms = prevSelectedRoom.filter((rooomId) => rooomId.id !== room)
//             setAvailableRooms((prevAvailableRooms) => [...prevAvailableRooms, room])
//             return UpdatedSelectedRooms
//         })
//     }

//     const handleAddRemoveRoomFromAvailable = (room) => {
//         setAvailableRooms((prevAvailableRooms) => {
//             const UpdatedAvailableRooms = prevAvailableRooms.filter((rooomId) => rooomId.id !== room)
//             setSelectedRooms((prevSelectedRoom) => {
//                 if (prevSelectedRoom.length < noOfRooms) {
//                     return [...prevSelectedRoom, room]
//                 }
//                 else {
//                     return prevSelectedRoom
//                 }
//             })
//             return UpdatedAvailableRooms
//         })
//     }


//     if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
//     if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

//     return (
//         <Box>
//             <Grid sx={{ display: 'flex', mb: 4 }}>
//                 <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//                     <Typography variant="h4">Book Room</Typography>
//                 </Grid>
//                 <Grid>
//                     <Stack justifyContent='start' spacing={2} direction="row">
//                         <CustomButton variant="outlined" href="allBookings">
//                             <ListIcon /> All Bookings
//                         </CustomButton>
//                     </Stack>
//                 </Grid>
//             </Grid>
//             <Grid container spacing={1} sx={{ backgroundColor: '#ffffff', p: 1, mb: 4 }}>
//                 <Grid xs={12} sm={6} md={6} lg={3} >
//                     <Stack spacing={1}>
//                         <InputLabel htmlFor="roomType">Room Type</InputLabel>
//                         <Select id='roomType' value={roomType} onChange={handleRoomTypeChange} displayEmpty>
//                             <MenuItem value="" disabled>Select One</MenuItem>
//                             {rows.map((menuItem) => (
//                                 <MenuItem key={menuItem?.roomTypesId} value={menuItem?.roomTypesId}>{menuItem?.roomName}</MenuItem>
//                             ))}
//                         </Select>
//                     </Stack>
//                 </Grid>
//                 <Grid xs={12} sm={6} md={6} lg={3} >
//                     <Stack spacing={1}>
//                         <InputLabel htmlFor="subTitle">Check In - Check Out Date</InputLabel>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DateRangePicker slots={{ field: SingleInputDateRangeField }} fullWidth id="subTitle" name="subTitle" onChange={(newValue) => handleCheckInCheckOutDate(newValue)} />
//                         </LocalizationProvider>
//                     </Stack>
//                 </Grid>
//                 <Grid xs={12} sm={6} md={6} lg={3} >
//                     <Stack spacing={1}>
//                         <InputLabel htmlFor="room">Room</InputLabel>
//                         <OutlinedInput id="room" type="text" name="room" placeholder="How many room?" value={noOfRooms} fullWidth onChange={(e) => setNoOfRooms(e.target.value)} />
//                     </Stack>
//                 </Grid>
//                 <Grid alignContent='end' xs={12} sm={6} md={6} lg={3} >
//                     <CustomButton variant="outlined" fullWidth sx={{ p: 1 }} onClick={getAvailableRooms} disabled={noOfRooms === '' || checkInDate === '' || checkOutDate === '' || roomType === ''}>
//                         <SearchRounded sx={{ rotate: '90deg', me: 5 }} /> Search
//                     </CustomButton>
//                 </Grid>
//             </Grid>

//             {rooms.length > 0 &&
//                 <Grid container spacing={3}>
//                     <Grid xs={12} md={8} sx={{ mb: 4 }}>
//                         <Grid sx={{ backgroundColor: '#fff', p: 2 }}>
//                             <Grid sx={{ display: 'flex' }}>
//                                 <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//                                     <Typography variant="h5" gutterBottom>Booking Information</Typography>
//                                 </Grid>
//                             </Grid>
//                             <Divider />
//                             <Grid container sx={{ p: 1 }}>
//                                 <Grid alignContent='center' sx={{ m: 1 }}>
//                                     <Typography alignContent='center' variant="subTitle2">
//                                         <CircleIcon sx={{ color: '#eb2222' }} /> Booked
//                                     </Typography>
//                                 </Grid>
//                                 <Grid alignContent='center' sx={{ m: 1 }}>
//                                     <Typography alignContent='center' variant="subTitle2">
//                                         <CircleIcon sx={{ color: '#28c76f' }} /> Selected
//                                     </Typography>
//                                 </Grid>
//                                 <Grid alignContent='center' sx={{ m: 1 }}>
//                                     <Typography alignContent='center' variant="subTitle2">
//                                         <CircleIcon sx={{ color: '#4634ff' }} /> Available
//                                     </Typography>
//                                 </Grid>
//                             </Grid>
//                             <Grid container sx={{ p: 2 }}>
//                                 <Typography variant="body1" sx={{ backgroundColor: '#eff8ff', p: 2 }}>{descText}</Typography>
//                             </Grid>
//                             <Grid>
//                                 <TableContainer component={Paper}>
//                                     <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                                         <TableHead>
//                                             <TableRow>
//                                                 <StyledTableCell>Date</StyledTableCell>
//                                                 <StyledTableCell align="right">Room</StyledTableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             <StyledTableRow>
//                                                 <StyledTableCell component="th" scope="row" sx={{ textWrap: 'nowrap' }}>{checkInDate} - {checkOutDate}</StyledTableCell>
//                                                 <StyledTableCell align="left">
//                                                     {selectedRooms?.map((item) => (
//                                                         <RoomKey status='selected' sx={{ m: 1 }} onClick={() => handleAddRemoveRoomFromSelected(item.roomId)}>{item.roomNo}</RoomKey>
//                                                     ))}
//                                                     {availableRooms?.map((item) => (
//                                                         <RoomKey status='available' sx={{ m: 1 }} onClick={() => handleAddRemoveRoomFromAvailable(item.roomId)}>{item.roomNo}</RoomKey>
//                                                     ))}
//                                                 </StyledTableCell>
//                                             </StyledTableRow>
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <Grid xs={12} md={4} sx={{ mb: 4 }}>
//                         <Grid sx={{ backgroundColor: '#fff', p: 2 }}>
//                             <Grid sx={{ display: 'flex' }}>
//                                 <Grid alignContent='center' sx={{ flexGrow: 1 }}>
//                                     <Typography variant="h5" gutterBottom>Book Room</Typography>
//                                 </Grid>
//                             </Grid>
//                             <Divider />
//                             <Grid>
//                                 <Grid xs={12} sx={{ mt: 2 }} >
//                                     <Stack spacing={1}>
//                                         <InputLabel htmlFor="hotelName">Guest Type</InputLabel>
//                                         <Select value={roomType} onChange={handleRoomTypeChange} displayEmpty>
//                                             <MenuItem value="" disabled>Select One</MenuItem>
//                                             <MenuItem value={10}>Ten</MenuItem>
//                                             <MenuItem value={20}>Twenty</MenuItem>
//                                             <MenuItem value={30}>Thirty</MenuItem>
//                                         </Select>
//                                     </Stack>
//                                 </Grid>
//                                 <Grid xs={12} sx={{ mt: 2 }} >
//                                     <Stack spacing={1}>
//                                         <InputLabel htmlFor="name">Name *</InputLabel>
//                                         <OutlinedInput id="name" type="text" name="name" placeholder="" fullWidth />
//                                     </Stack>
//                                 </Grid>
//                                 <Grid xs={12} sx={{ mt: 2 }} >
//                                     <Stack spacing={1}>
//                                         <InputLabel htmlFor="name">Email *</InputLabel>
//                                         <OutlinedInput id="name" type="email" name="name" placeholder="" fullWidth />
//                                     </Stack>
//                                 </Grid>
//                                 <Grid xs={12} sx={{ mt: 2 }} >
//                                     <Stack spacing={1}>
//                                         <InputLabel htmlFor="name">Phone Number *</InputLabel>
//                                         <OutlinedInput id="name" type="number" name="name" placeholder="" fullWidth />
//                                     </Stack>
//                                 </Grid>
//                                 <Grid xs={12} sx={{ mt: 2 }} >
//                                     <Stack spacing={1}>
//                                         <InputLabel htmlFor="name">Address *</InputLabel>
//                                         <OutlinedInput id="name" type="text" name="name" placeholder="" fullWidth />
//                                     </Stack>
//                                 </Grid>
//                                 <Grid xs={12} sx={{ mt: 2 }} >
//                                     <Stack spacing={1}>
//                                         <InputLabel htmlFor="name">Paying Amount </InputLabel>
//                                         <OutlinedInput id="name" type="text" name="name" placeholder="" fullWidth />
//                                     </Stack>
//                                 </Grid>
//                                 <Grid xs={12} sx={{ mt: 2, }}>
//                                     <TableContainer>
//                                         <Table aria-label="customized table">
//                                             <TableHead>
//                                                 <TableRow>
//                                                     <TableCell align='center'>Room</TableCell>
//                                                     <TableCell align='center'>Days</TableCell>
//                                                     <TableCell align='center'>Fare</TableCell>
//                                                     <TableCell align='center'>Subtotal</TableCell>
//                                                 </TableRow>
//                                             </TableHead>
//                                             <TableBody>
//                                                 {selectedRooms?.map((item) => (
//                                                     <StyledTableRow>
//                                                         <TableCell align='center' p={0}><RoomKey status='selected' onClick={() => handleAddRemoveRoomFromSelected(item.roomId)}>{item.roomNo}</RoomKey></TableCell>
//                                                         <TableCell align="center">1</TableCell>
//                                                         <TableCell align="center">250 USD</TableCell>
//                                                         <TableCell align="center">250 USD</TableCell>
//                                                     </StyledTableRow>
//                                                 ))}
//                                                 {availableRooms?.map((item) => (
//                                                     <StyledTableRow>
//                                                         <TableCell align='center' p={0}><RoomKey status='available' onClick={() => handleAddRemoveRoomFromAvailable(item.roomId)}>{item.roomNo}</RoomKey></TableCell>
//                                                         <TableCell align="center">1</TableCell>
//                                                         <TableCell align="center">250 USD</TableCell>
//                                                         <TableCell align="center">250 USD</TableCell>
//                                                     </StyledTableRow>
//                                                 ))}
//                                             </TableBody>
//                                         </Table>
//                                     </TableContainer>
//                                 </Grid>
//                                 <Grid alignContent='end' xs={12} sm={6} md={6} lg={3} sx={{ mt: 2 }} >
//                                     <CustomButton variant="outlined" fullWidth sx={{ p: 1 }} onClick={() => setSearchOpen(true)}>
//                                         Book Now
//                                     </CustomButton>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             }
//         </Box>
//     );
// }

// export default BookRoom






// const [selectedRooms, setSelectedRooms] = useState([]); // State for selected rooms
// const [availableRooms, setAvailableRooms] = useState([]); // State for remaining available rooms

// const getAvailableRooms = async () => {
//     try {
//         const response = await getAvailableRoomApi(roomType, noOfRooms, checkInDate, checkOutDate);
//         console.log(response, 'get available room');

//         if (response?.status === 200 && response?.data?.status === 'success') {
//             const allRooms = response?.data?.available?.First || [];

//             let roomsToSelect = noOfRooms;

//             const selected = allRooms.slice(0, roomsToSelect);
//             const remaining = allRooms.slice(roomsToSelect);

//             // Step 3: Update state
//             setSelectedRooms(selected);
//             setAvailableRooms(remaining);

//             console.log("Selected Rooms: ", selected);
//             console.log("Available Rooms: ", remaining);
//         } else {
//             console.log(response?.data?.message);
//         }
//     } catch (error) {
//         console.log('Error fetching rooms:', error);
//     } finally {
//         console.log('Fetch rooms operation complete.');
//     }
// };



// const handleCheckInCheckOutDate = (val) => {
//     const date0 = new Date(val[0]?.$d);
//     const isoString0 = date0.toISOString();
//     setCheckInDate(isoString0);

//     const date1 = new Date(val[1]?.$d);
//     const isoString1 = date1.toISOString();
//     setCheckOutDate(isoString1);
// }

