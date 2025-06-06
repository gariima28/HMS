import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ServerIP = 'https://www.auth.edu2all.in/hms';
const token = `Bearer ${localStorage.getItem('token')}`;

const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);


// const AvailableRooms = ({ selectedRooms, setSelectedRooms, onOpenDrawer }) => {

//     const [rooms, setRooms] = useState([]);

//     const { data: allAvRooms, error, isLoading } = useSWR(
//         `${ServerIP}/booking/getAllAvRoom`,
//         fetcher,
//         { revalidateOnFocus: true, revalidateOnMount: true }
//     );

//     console.log(allAvRooms)

//     const isAnyRoomSelected = rooms.some(room => room.status === 'selected');

//     const handleRoomClick = (roomId) => {
//         const updatedRooms = rooms.map(room => {
//             if (room.id === roomId && room.status !== 'booked') {
//                 return {
//                     ...room,
//                     status: room.status === 'selected' ? 'available' : 'selected'
//                 };
//             }
//             return room;
//         });

//         setRooms(updatedRooms);

//         // Extract newly selected rooms
//         const newlySelected = updatedRooms
//             .filter(r => r.status === 'selected')
//             .map(r => ({ roomId: r.roomId, roomNo: r.id }));

//         setSelectedRooms(newlySelected); // <-- keep parent in sync
//     };


//     useEffect(() => {
//         // Add null check and loading state handling
//         if (allAvRooms && allAvRooms.rooms && allAvRooms.rooms.length > 0) {
//             const transformedRooms = allAvRooms.rooms.map(room => ({
//                 id: room.roomNo,
//                 roomId: room.roomId,
//                 status: room.availableStatus ? 'available' : 'booked',
//                 roomType: room.roomType,
//             }));
//             setRooms(transformedRooms);
//         }
//     }, [allAvRooms]);

//     // Handle loading and error states




//     const getRoomColor = (status) => {
//         switch (status) {
//             case 'booked': return 'error';
//             case 'selected': return 'primary';
//             case 'available': return 'success';
//             default: return 'default';
//         }
//     };

//     console.log(rooms)

//     return (
//         <>
//             <Grid>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//                     <Button variant="contained" >
//                         Available Rooms
//                     </Button>

//                     <Button variant="contained" disabled={!rooms.some(room => room.status === 'selected')}
//                         onClick={() => {

//                         }}>
//                         Book Room
//                     </Button>
//                 </Box>

//                 <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
//                     <Chip label="Booked" color="error" size="small" />
//                     <Chip label="Selected" color="primary" size="small" />
//                     <Chip label="Available" color="success" size="small" />
//                 </Box>
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                     Every room can be selected or deselected by a single click (except booked rooms).
//                     Ensure selected rooms match your search criteria.
//                 </Typography>
//             </Grid>

//             <Grid>
//                 <Typography variant="subtitle1" sx={{ mb: 2 }}>
//                     Date: 29 Mar, 2025 - 30 Mar, 2025
//                 </Typography>

//                 <Grid container spacing={2} sx={{ mb: 2 }}>
//                     {rooms.map((room) => (
//                         <Grid item xs={3} sm={2} md={1.5} key={room.id}>
//                             <Button
//                                 fullWidth
//                                 variant={room.status === 'selected' ? 'contained' : 'outlined'}
//                                 color={getRoomColor(room.status)}
//                                 onClick={() => handleRoomClick(room.id)}
//                                 disabled={room.status === 'booked'}
//                                 sx={{
//                                     minWidth: 0,
//                                     height: '50px',
//                                     borderRadius: '4px'
//                                 }}
//                             >
//                                 {room.id}
//                             </Button>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Grid>

//             <Grid>
//                 {/* <Button onClick={onClose}>Cancel</Button> */}
//                 {/* <Button
//                     variant="contained"
//                     onClick={() => {
//                         const selected = rooms
//                             .filter(r => r.status === 'selected')
//                             .map(r => ({ roomId: r.roomId, roomNo: r.id }));
//                         onConfirm(selected);

//                     }}
//                 >
//                     Confirm Selection
//                 </Button> */}
//             </Grid>
//         </>
//     );
// }

const AvailableRooms = ({ selectedRooms, setSelectedRooms, onOpenDrawer }) => {
    const [rooms, setRooms] = useState([]);

    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());

    const { data: allAvRooms, error, isLoading } = useSWR(
        `${ServerIP}/booking/getAllAvRoom`,
        fetcher,
        { revalidateOnFocus: true, revalidateOnMount: true }
    );

    const isAnyRoomSelected = rooms.some(room => room.status === 'selected');

    const handleRoomClick = (roomId) => {

        const days =
            checkInDate && checkOutDate
                ? Math.max(Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)), 1)
                : 1;

        const updatedRooms = rooms.map(room => {
            if (room.id === roomId && room.status !== 'booked') {
                return {
                    ...room,
                    status: room.status === 'selected' ? 'available' : 'selected'
                };
            }
            return room;
        });

        setRooms(updatedRooms);

        // Update parent state with selected rooms
        const newlySelected = updatedRooms
            .filter(r => r.status === 'selected')
            .map(r => ({ roomId: r.roomId, roomNo: r.id }));

        setSelectedRooms(newlySelected);
    };

    useEffect(() => {
        if (allAvRooms && allAvRooms.rooms?.length > 0) {
            const transformedRooms = allAvRooms.rooms.map(room => ({
                id: room.roomNo,
                roomId: room.roomId,
                status: room.availableStatus ? 'available' : 'booked',
                roomType: room.roomType,
            }));
            setRooms(transformedRooms);
        }
    }, [allAvRooms]);

    const getRoomColor = (status) => {
        switch (status) {
            case 'booked': return 'error';
            case 'selected': return 'primary';
            case 'available': return 'success';
            default: return 'default';
        }
    };

    return (
        <>
            <Grid>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                    <Button variant="contained">Available Rooms</Button>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <DatePicker
                                label="Check-In"
                                value={checkInDate}
                                onChange={(newValue) => setCheckInDate(newValue)}
                                slotProps={{ textField: { size: 'small' } }}
                            />
                            <DatePicker
                                label="Check-Out"
                                value={checkOutDate}
                                onChange={(newValue) => setCheckOutDate(newValue)}
                                slotProps={{ textField: { size: 'small' } }}
                                minDate={checkInDate}
                            />
                        </Box>
                    </LocalizationProvider>

                    <Button
                        variant="contained"
                        disabled={!isAnyRoomSelected}
                        onClick={onOpenDrawer}
                    >
                        Book Room
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Chip label="Booked" color="error" size="small" />
                    <Chip label="Selected" color="primary" size="small" />
                    <Chip label="Available" color="success" size="small" />
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Every room can be selected or deselected by a single click (except booked rooms).
                    Ensure selected rooms match your search criteria.
                </Typography>
            </Grid>

            <Grid>
                <Grid container spacing={2} sx={{ my: 2 }}>
                    {rooms.map((room) => (
                        <Grid item xs={3} sm={2} md={1.5} key={room.id}>
                            <Button
                                fullWidth
                                variant={room.status === 'selected' ? 'contained' : 'outlined'}
                                color={getRoomColor(room.status)}
                                onClick={() => handleRoomClick(room.id)}
                                disabled={room.status === 'booked'}
                                sx={{
                                    minWidth: 0,
                                    height: '50px',
                                    borderRadius: '4px'
                                }}
                            >
                                {room.id}-{room.roomType}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

export default AvailableRooms;


