import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { borderRadius, display, margin, padding, textAlign, width } from '@mui/system'
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';

import { RolePostApi } from 'api/api'
import { GetAllApi } from 'api/api'

const style = {
    fontSize: 20
}

const mainBox = {
    backgroundColor: '#fff',
    margin: 1,
    padding: 3,
    borderRadius: 2
}

const myStyle = {
    backgroundColor: '#fff',
    marginLeft: 1,
    padding: 2,
    borderRadius: 2
}
const myStyle2 = {
    backgroundColor: '#fff',
    marginLeft: 1,
    padding: 2,
    marginTop: 2,
    borderRadius: 2,
}
const input = {
    width: '100%',
}
const check12 = {
    width: 2
}

const addRolesPage = () => {

    const [name, setName] = useState()
    const [loader, setLoader] = useState(false)
    const [addRole, setAddRole] = useState([])

    const AddRole = (checkedState, val) => {
        if (checkedState) {
            setAddRole(oldArray => [...oldArray, val])
        }
        else {
            setAddRole(oldArray => oldArray.filter(item => item !== val))
        }
    }

    // post api 
    const MyOnlinePostApi = async () => {
        setLoader(true)
        const formData = {
            "roleName": name,
            "pagePermissions": addRole,
            "removePermissions": [
                "string"
            ]
        }
        try {
            const response = await RolePostApi(formData);
            console.log('response of add role api', response)
            if (response?.data?.status === "success") {
                toast.success(response?.data?.message);
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
                setShow12(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box>
                {
                    loader && (
                        <HashLoader />
                    )
                }
                <Typography sx={style}>
                    <b>Add New Role</b>
                </Typography>

                <Box sx={mainBox}>
                    <TextField sx={input} required id="outlined-required" label="Name" defaultValue="" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                </Box>
                {/* check box 1 */}
                <Grid sx={myStyle} >
                    <Typography sx={{ fontSize: 20 }}><b>Set Permissions</b></Typography>
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Admin</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}> <Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Dashboard')} /> <b>Dashboard</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Notifications')} />  <b>Notifications</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Read Notification')} />  <b> Read Notification </b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Read All Notifications')} />  <b>Read All Notifications</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Delete All Notifications')} />  <b>Delete All Notifications</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Delete Single Notification')} />  <b>Delete Single Notification</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Request Report')} />  <b> Request Report</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Download Attachment')} />  <b> Download Attachment</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Submit Request Report')} />  <b> Submit Request Report</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 2 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Staff
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'All Staff')} />  <b>All Staff</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Staff')} />  <b>Save Staff</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Staff Status')} />  <b> Update Staff Status </b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Login As Staff')} />  <b>Login As Staff</b> </Typography>

                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 3 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Roles
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Roles')} />  <b>Roles</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Add Role')} />  <b>Add Role</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Update Roles')} />  <b> Update Roles </b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Role')} />  <b>Save Role</b> </Typography>

                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 4 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>ManageUsers
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'All Guests')} />  <b>All Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Active Guests')} />  <b>Active Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Banned Guests')} />  <b> Banned Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Email Verified Guests')} />  <b>Email Verified Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Email Unverified Guests')} />  <b>Email Unverified Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Mobile Unverified Guest')} />  <b> Mobile Unverified Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Mobile Verified Guests')} />  <b> Mobile Verified Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Guests Detail')} />  <b>  Guest's Detail</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Guest Info')} />  <b>  Update Guest Info</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Guests Notification Single')} />  <b> Guests Notification Single</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Send Guests Single Notification')} />  <b> Send Guests Single Notification</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Login As Guest')} />  <b> Login As Guest</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Guests Status')} />  <b>Update Guest's Status</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Guests All Notification')} />  <b>Guests All Notification</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Send Notifications To All Guests')} />  <b> Send Notifications To All Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Guests List')} />  <b> Guests List</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Guests Segment Count')} />  <b> Guests Segment Count</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Guests Notification Logs')} />  <b> Guests Notification Logs</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 5 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Amenities
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Amenities')} />  <b>Amenities</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Amenity')} />  <b>Save Amenity</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Amenity Status')} />  <b> Update Amenity Status </b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 6 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>BedType
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Beds')} />  <b>Beds</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Bed')} />  <b>Save Bed</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Delete Bed')} />  <b> Delete Bed </b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 7 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Facility</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Facilities')} />  <b>Facilities</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Facility')} />  <b>Save Facility</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Facility Status')} />  <b> Update Facility Status </b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 8 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>RoomType
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Room Types')} />  <b>Room Types</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Create Room Type')} />  <b>Create Room Type</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Room Type - Page')} />  <b> Update Room Type - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Save Room Type')} />  <b> Save Room Type</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Room Type Status')} />  <b> Update Room Type Status</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 9 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Room
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Room ')} />  <b>Room</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Add Room')} />  <b>Add Room</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Room')} />  <b> Update Room</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Room Status')} />  <b> Update Room Status</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Room Type Status')} />  <b> Update Room Type Status</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 10 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>PremiumService
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Premium Services')} />  <b>Premium Services</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Premium Service')} />  <b>Save Premium Service</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Premium Service Status')} />  <b> Update Premium Service Status</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 11 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>BookRoom</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Book Room - Page')} />  <b>Book Room - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Book Room')} />  <b>Book Room</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 12 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>ManageBooking</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Merge Booking')} />  <b>Merge Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Booking Payment - Page')} />  <b>Booking Payment - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Booking Checkout - Page')} />  <b> Booking Checkout - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Booking Payment')} />  <b>Booking Payment</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Booking Checkout')} />  <b> Booking Checkout</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Booking Invoice')} />  <b> Booking Invoice</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Handover Key')} />  <b>Handover Key</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Add Extra Charge')} />  <b>Add Extra Charge</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Subtract Extra Charge')} />  <b>Subtract Extra Charge</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Booking Service Details')} />  <b>Booking Service Details</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 13 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Booking</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Booked Rooms')} />  <b> Booked Rooms</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Booking Details')} />  <b> Booking Details</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'All Bookings')} />  <b> All Bookings</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Active Booking')} />  <b>Active Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, '  Canceled Booking List')} />  <b>  Canceled Booking List</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Checked Out Booking List')} />  <b> Checked Out Booking List</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Todays Booked Booking')} />  <b>Todays Booked Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Todays Checkin Booking')} />  <b>Todays Checkin Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Todays Checkout Booking')} />  <b>Todays Checkout Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Refundable Booking')} />  <b>Refundable Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Checkout Delayed Booking')} />  <b>Checkout Delayed Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Upcoming Booking Checkin')} />  <b>Upcoming Booking Checkin</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Upcoming Booking Checkout')} />  <b>Upcoming Booking Checkout</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Pending Booking Checkin')} />  <b>Pending Booking Checkin</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Delayed Booking Checkout')} />  <b>Delayed Booking Checkout</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 14 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>CancelBooking</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Booking Cancel - Page')} />  <b> Booking Cancel - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Cancel Full Booking')} />  <b> Cancel Full Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Cancel Booked Room')} />  <b> Cancel Booked Room</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Day Wise Cancel Booked Room')} />  <b> Day Wise Cancel Booked Room</b> </Typography>

                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 15     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>BookingPremiumService</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15, paddingLeft: 10 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' sed Premium Service')} />  <b>Used Premium Services</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Add Premium Service - Page')} />  <b>Add Premium Service - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Add Premium Service')} />  <b> Add Premium Service</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2, paddingLeft: 10 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Delete Premium Servic')} />  <b>  Delete Premium Service</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 16     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>ManageBookingRequest</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15, paddingLeft: 10 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Booking Requests')} />  <b>Booking Requests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Canceled Booking Requests')} />  <b>Canceled Booking Requests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Approved Booking Requests')} />  <b> Approved Booking Requests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2, paddingLeft: 10 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Cancel Booking Request')} />  <b>  Cancel Booking Request</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Approve Booking Request')} />  <b> Approve Booking Request</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 17     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Subscriber</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Subscribers')} />  <b>Subscribers</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Send Email To Subscriber - Page')} />  <b>Send Email To Subscriber - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Remove Subscriber')} />  <b> Remove Subscriber</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Send Email To Subscribers')} />  <b>  Send Email To Subscribers</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 18     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>AutomaticGateway</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Automatic Gateways')} />  <b>Automatic Gateways</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Automatic Gateway - Page')} />  <b>Update Automatic Gateway - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Automatic Gateway')} />  <b> Update Automatic Gateway</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, '  Remove Gateway')} />  <b>  Remove Gateway</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Update Status')} />  <b>   Update Status</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 18     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>ManualGateway</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Manual Gateways')} />  <b>Manual Gateways</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Create Gateway - Page')} />  <b>Create Gateway - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Create Gateway')} />  <b> Create Gateway</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Gateway - Page')} />  <b> Update Gateway - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Gateway')} />  <b>   Update Gateway</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Status')} />  <b>  Update Status</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 19     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Deposit</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'All Paymente')} />  <b>All Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Pending Payments')} />  <b>Pending Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Rejected Payments')} />  <b> Rejected Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Approved Payments')} />  <b>Approved Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Successful Payments')} />  <b> Successful Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Initiated Payments')} />  <b>Initiated Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Payment Detail')} />  <b>Payment Detail</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Reject Payment')} />  <b>Reject Payment</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Approve Payment')} />  <b>Approve Payment</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 20     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Report</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Login History')} />  <b>Login History</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Login IpHistory')} />  <b>Login IpHistory</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Notification History')} />  <b> Notification History</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Email Details')} />  <b>Email Details</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Booking History')} />  <b> Booking History</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Payments Received')} />  <b>Payments Received</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Payments Returned')} />  <b>Payments Returned</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 21     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>SupportTicket</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Support Tickets')} />  <b>Support Tickets</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Pending Tickets')} />  <b>Pending Tickets</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Closed Ticketsy')} />  <b> Closed Tickets</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Answered Tickets')} />  <b>Answered Tickets</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'View Ticket')} />  <b>View Ticket</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Reply Ticket')} />  <b> Reply Ticket</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Close Ticket')} />  <b>Close Ticket</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Download Attachment')} />  <b>Download Attachment</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Delete Ticket')} />  <b>Delete Ticket</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 22     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Language</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Language')} />  <b> Language</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Language Store')} />  <b>Language Store</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Language Delete')} />  <b> Language Delete</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Language Update')} />  <b> Language Update</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Language Key')} />  <b> Language Key</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Language Import')} />  <b> Language Import</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Store Key')} />  <b>Store Key</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' Delete Key')} />  <b> Delete Key</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Key')} />  <b>Update Key</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 23     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>GeneralSetting</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, ' System Setting')} />  <b> System Setting</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'General Setting')} />  <b>General Setting</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update General Settings')} />  <b> Update General Settings</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Socialite Credentials')} />  <b>Socialite Credentials</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Socialite Credentials')} />  <b>Update Socialite Credentials</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Socialite Credential Status')} />  <b>  Update Socialite Credential Status</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'System Configuration')} />  <b>System Configuration</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update System Configuration')} />  <b> Update System Configuration</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Logo & Favicon')} />  <b>Logo & Favicon</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Logo & Favicon')} />  <b>Update Logo & Favicon</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Custom Css - Page')} />  <b>Custom Css - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Custom Css')} />  <b>Update Custom Css</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Sitemap - Page')} />  <b>Sitemap - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Sitemap')} />  <b>Update Sitemap</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Robot - Pag')} />  <b>Robot - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Robot')} />  <b>Update Robot</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Cookie Setting - Pag')} />  <b>Cookie Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Cookie')} />  <b>Update Cookie</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'maintenance Mode - Page<')} />  <b>Maintenance Mode - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, '>Update Maintenance Page')} />  <b>Update Maintenance Page</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 24     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Notification</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Global Email Setting - Page')} />  <b>Global Email Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Global Email Config')} />  <b>Save Global Email Config</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Global SMS Setting - Page')} />  <b> Global SMS Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Global SMS Config')} />  <b>Save Global SMS Config</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Global Push Setting - Page')} />  <b>Global Push Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Global Push Config')} />  <b>Save Global Push Config</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Notification Template Setting - Page')} />  <b>Notification Template Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Notification Template - Page')} />  <b>Update Notification Template - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Notification Template')} />  <b> Update Notification Template</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Email Notification Setting - Page')} />  <b>Email Notification Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Email Notification Config')} />  <b>Save Email Notification Config</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Test Email Notification')} />  <b>Test Email Notification</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'SMS Notification Setting - Page')} />  <b>SMS Notification Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save SMS Notification Config')} />  <b> Save SMS Notification Config</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Test SMS Notification')} />  <b>Test SMS Notification</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Push Notification Setting - Page')} />  <b>Push Notification Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Save Push Notification Config')} />  <b>Save Push Notification Config</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 25     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Extension</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Extensions')} />  <b> Extensions</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Extension')} />  <b>Update Extension</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Notification Status')} />  <b>Update Notification Status</b> </Typography>

                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 26     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>System</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'System Info')} />  <b> System Info</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'System Server Info')} />  <b>System Server Info</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'System Optimize')} />  <b>System Optimize</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'System Optimize Clear')} />  <b>System Optimize Clear</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'System Update')} />  <b>System Update</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'System Update Process')} />  <b>System Update Process</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'System Update Log')} />  <b>System Update Log</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 27     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Frontend</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Seo')} />  <b>Seo</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Frontend Manager')} />  <b>Frontend Manager</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Templates')} />  <b>Templates</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Template')} />  <b> Update Template</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Sections')} />  <b> Sections</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Section Content')} />  <b>Update Section Content</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Section Elements')} />  <b>Section Elements</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Element SEO - Page')} />  <b>Element SEO - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Remove Content')} />  <b>Remove Content</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Element SEO')} />  <b>Update Element SEO</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 28     */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>PageBuilder</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Seo')} />  <b>Seo</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Frontend Manager')} />  <b>Frontend Manager</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Templates')} />  <b>Templates</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Template')} />  <b> Update Template</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Sections')} />  <b> Sections</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Section Content')} />  <b>Update Section Content</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Section Elements')} />  <b>Section Elements</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Element SEO - Page')} />  <b>Element SEO - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Remove Content')} />  <b>Remove Content</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} onClick={(e) => AddRole(e.target.checked, 'Update Element SEO')} />  <b>Update Element SEO</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: "center", marginTop: 4, width: '100%' }}>
                    <Button sx={{ width: '100%', backgroundColor: "#0D6A84" }} variant="contained" disableElevation onClick={MyOnlinePostApi}>
                        Submit
                    </Button>
                    <Toaster />
                </Box>

            </Box>
        </>
    )
}

export default addRolesPage
