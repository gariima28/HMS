import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import { borderRadius, display, margin, padding, textAlign, width } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

import { RoleGetByIdApi } from 'api/api'

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

const editRolesPage = () => {

    const [rowData, setRowData] = useState()
    const [rowName, setRowName] = useState()
    const [allData, setAllData] = useState()
    const [check, setCheck] = useState(false)


    console.log('permissionName12', check)
    const { id } = useParams();

    useEffect(() => {
        // MyRoleGetAllByIdApi();
    }, [id]);

    // const MyRoleGetAllByIdApi = async () => {
    //     try {
    //         const response = await RoleGetByIdApi(id);
    //         console.log('My role  DATAAAAAA by id1234567', response)
    //         if (response?.status === 200) {
    //             setRowData(response?.data?.role?.permissions)
    //             setRowName(response?.data?.role?.roleName)

    //             const hasNotificationPermission = response?.data?.role?.permissions?.map((item) => {
    //                 console.log('array items', item);
    //                 if(item.permissionName){
    //                     setCheck(true)
    //                 }
    //                 return item
    //             });

    //         } else {
    //             toast.error(response?.data?.msg);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    useEffect(() => {

        const MyRoleGetAllByIdApi = async () => {
            try {
                const response = await RoleGetByIdApi(id);
                console.log('My role  DATAAAAAA by id1234567', response)
                if (response?.status === 200) {
                    setRowData(response?.data?.role?.permissions)
                    setRowName(response?.data?.role?.roleName)
                    // const hasNotificationPermission = response.data.role.permissions.some(permission => permission.permissionName === 'Notifications');
                    const hasNotificationPermission = response?.data?.role?.permissions?.some((item) => item.permissionName);
                    console.log('khdbjkbvekjb', hasNotificationPermission)
                    if (hasNotificationPermission) {
                        setCheck(true);
                    }

                } else {
                    toast.error(response?.data?.msg);
                }
            } catch (error) {
                console.log(error)
            }
        }
        MyRoleGetAllByIdApi()
    }, [])

    const handleCheckboxChange = (event) => {
        setCheck(event.target.checked); // Toggle checkbox state
        AddRole(event.target.checked);  // Your function to handle additional logic
    };

    const [addRole, setAddRole] = useState([])
    console.log('add roles in state = ', addRole)

    const AddRole = (checkedState, val) => {
        if (checkedState) {
            setAddRole(oldArray => [...oldArray, val])
            // setCheck(false)
        }
        else {
            setAddRole(oldArray => oldArray.filter(item => item !== val))
        }
        console.log(addRole, 'addRole')
    }

    return (
        <>
            <Box>
                <Typography sx={style}>
                    <b>Edit Role</b>
                </Typography>

                <Box sx={mainBox}>
                    <TextField sx={input} required id="outlined-required" label="Name" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                </Box>
                {/* check box 1 */}
                <Grid sx={myStyle} >
                    <Typography sx={{ fontSize: 20 }}><b>Set Permissions</b></Typography>

                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Admin</Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox checked={check} onChange={handleCheckboxChange} sx={check12} />   <b>Dashboard</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox checked={check} sx={check12} />  <b>Notifications</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox checked={check === 'Read Notification' ? true : false} sx={check12} /> <b> Read Notification </b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Read All Notifications</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Delete All Notifications</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Delete Single Notification</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox checked={check} sx={check12} />  <b> Request Report</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Download Attachment</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Submit Request Report</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>All Staff</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Staff</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Staff Status </b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Login As Staff</b> </Typography>

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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Roles</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Add Role</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Roles </b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Role</b> </Typography>

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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>All Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Active Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Banned Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Email Verified Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Email Unverified Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Mobile Unverified Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Mobile Verified Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>  Guest's Detail</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>  Update Guest Info</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Guests' Notification Single</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Send Guests' Single Notification</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Login As Guest</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Guest's Status</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Guests All Notification</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Send Notifications To All Guests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Guests List</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Guests Segment Count</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Guests Notification Logs</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Amenities</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Amenity</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Amenity Status </b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Beds</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Bed</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Delete Bed </b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* check box 7 */}
                <Grid sx={myStyle2} >
                    <Grid container spacing={20} >
                        <Grid item xs={6} md={2}>
                            <Typography sx={{ fontSize: 18, margin: 2, color: "#5b6e88" }}>Facility
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={10} sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Facilities</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Facility</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Facility Status </b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Room Types</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Create Room Type</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Room Type - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Save Room Type</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Room Type Status</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Room</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Add Room</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Room</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Room Status</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Room Type Status</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Premium Services</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Premium Service</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Premium Service Status</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Book Room - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Book Room</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Merge Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Booking Payment - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Booking Checkout - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Booking Payment</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Booking Checkout</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Booking Invoice</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Handover Key</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Add Extra Charge</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Subtract Extra Charge</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Booking Service Details</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b> Booked Rooms</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Booking Details</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> All Bookings</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Active Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>  Canceled Booking List</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Checked Out Booking List</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Todays Booked Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Todays Checkin Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Todays Checkout Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Refundable Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Checkout Delayed Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Upcoming Booking Checkin</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Upcoming Booking Checkout</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Pending Booking Checkin</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Delayed Booking Checkout</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b> Booking Cancel - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Cancel Full Booking</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Cancel Booked Room</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Day Wise Cancel Booked Room</b> </Typography>

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
                            <Typography sx={{ fontSize: 15, paddingLeft: 10 }}><Checkbox sx={check12} />  <b>Used Premium Services</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Add Premium Service - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Add Premium Service</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2, paddingLeft: 10 }}><Checkbox sx={check12} />  <b>  Delete Premium Service</b> </Typography>
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
                            <Typography sx={{ fontSize: 15, paddingLeft: 10 }}><Checkbox sx={check12} />  <b>Booking Requests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Canceled Booking Requests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Approved Booking Requests</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2, paddingLeft: 10 }}><Checkbox sx={check12} />  <b>  Cancel Booking Request</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Approve Booking Request</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Subscribers</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Send Email To Subscriber - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Remove Subscriber</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>  Send Email To Subscribers</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Automatic Gateways</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Automatic Gateway - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Automatic Gateway</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>  Remove Gateway</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>   Update Status</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Manual Gateways</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Create Gateway - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Create Gateway</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Gateway - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>   Update Gateway</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>  Update Status</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>All Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Pending Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Rejected Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Approved Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Successful Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Initiated Payments</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Payment Detail</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Reject Payment</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Approve Payment</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Login History</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Login IpHistory</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Notification History</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Email Details</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Booking History</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Payments Received</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Payments Returned</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Support Tickets</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Pending Tickets</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Closed Tickets</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Answered Tickets</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>View Ticket</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Reply Ticket</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Close Ticket</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Download Attachment</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Delete Ticket</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b> Language</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Language Store</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Language Delete</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Language Update</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Language Key</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Language Import</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Store Key</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Delete Key</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Key</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b> System Setting</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>General Setting</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update General Settings</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Socialite Credentials</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Socialite Credentials</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>  Update Socialite Credential Status</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>System Configuration</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update System Configuration</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Logo & Favicon</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Logo & Favicon</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Custom Css - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Custom Css</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Sitemap - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Sitemap</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Robot - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Robot</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Cookie Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Cookie</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Maintenance Mode - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Maintenance Page</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Global Email Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Global Email Config</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Global SMS Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Global SMS Config</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Global Push Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Global Push Config</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Notification Template Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Notification Template - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Notification Template</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Email Notification Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Email Notification Config</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Test Email Notification</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>SMS Notification Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Save SMS Notification Config</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Test SMS Notification</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Push Notification Setting - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Save Push Notification Config</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b> Extensions</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Extension</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Notification Status</b> </Typography>

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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b> System Info</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>System Server Info</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>System Optimize</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>System Optimize Clear</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>System Update</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>System Update Process</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>System Update Log</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Seo</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Frontend Manager</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Templates</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Template</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Sections</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Section Content</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Section Elements</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Element SEO - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Remove Content</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Element SEO</b> </Typography>
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
                            <Typography sx={{ fontSize: 15 }}><Checkbox sx={check12} />  <b>Seo</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Frontend Manager</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Templates</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Update Template</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b> Sections</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Section Content</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Section Elements</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Element SEO - Page</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Remove Content</b> </Typography>
                            <Typography sx={{ fontSize: 15, marginLeft: 2 }}><Checkbox sx={check12} />  <b>Update Element SEO</b> </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: "center", marginTop: 4, width: '100%' }}>
                    <Button sx={{ width: '100%' }} variant="contained" disableElevation>
                        Submit
                    </Button>
                </Box>

            </Box>
        </>
    )
}

export default editRolesPage






