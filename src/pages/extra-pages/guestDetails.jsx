import React, { useEffect } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { borderRadius, margin, padding } from '@mui/system';
import { color } from 'framer-motion';
import { AllActiveguestGetByIdApi } from 'api/api'
import { AllActiveguestUpdateApi } from 'api/api'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    marginTop: 20,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const mainDiv = {
    backgroundColor: "#fff",
    marginTop: 2,
}
const contentDiv = {
    borderRadius: 2,
    padding: 1,

}
const contentDiv2 = {
    borderRadius: 2,
    padding: 2,
    margin: 1,
}
const input = {
    width: '100%',
    marginTop: 2,
}
const forHover = {
    '&:hover': {
        color: "#fff",
        backgroundColor: '#28c76f',
    },
}


const guestDetails = () => {

    const { id } = useParams()
  
    const [rowsData, setRowsData] = React.useState([]);

    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [email, setEmail] = React.useState();
    const [phone, setPhone] = React.useState();
    const [countryCode, setCountryCode] = React.useState();
    const [isPhoneVerified, setIsPhoneVerified] = React.useState(false);
    const [isEmailVerified, setIsEmailVerified] = React.useState(false);
    const [isUserBanned, setIsUserBanned] = React.useState(false);
    const [address, setAddress] = React.useState();
    const [city1, setCity1] = React.useState();
    const [state, setState] = React.useState();
    const [zipCode, setZipCode] = React.useState();
    const [banUser, setBanUser] = React.useState();
    console.log('ban user true false state ',banUser)
    const [country, setCountry] = React.useState();
    const [isActive, setIsActive] = React.useState();


    useEffect(() => {
        MyActiveGuestGetByIdAllApi()
    }, [])

    // Apis 

    // Get By Id 
    const MyActiveGuestGetByIdAllApi = async () => {
        // setLoader(true)
        try {
            const response = await AllActiveguestGetByIdApi(id);
            console.log('Active Guest get by id ', response)
            if (response?.status === 200) {
                setFirstName(response?.data?.guest?.firstName)
                setLastName(response?.data?.guest?.lastName)
                setEmail(response?.data?.guest?.email)
                setPhone(response?.data?.guest?.phone)
                setCountryCode(response?.data?.guest?.countryCode)
                setIsPhoneVerified(response?.data?.guest?.isPhoneVerified)
                setIsEmailVerified(response?.data?.guest?.isEmailVerified)
                setIsUserBanned(response?.data?.guest?.isUserBanned)
                setAddress(response?.data?.guest?.address)
                setCity1(response?.data?.guest?.city)
                setState(response?.data?.guest?.state) 
                setZipCode(response?.data?.guest?.zipCode)
                setBanUser(response?.data?.guest?.isUserBanned)
                setCountry(response?.data?.guest?.country)
                setIsActive(response?.data?.guest?.isActive)
                toast.success(response?.data?.msg)

            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Update api 
    const MyActiveGuestUpdteApiApi = async () => {
        // setLoader(true)

        const formData = new FormData()
        formData.append('firstName',firstName),
        formData.append('lastName', lastName),
        formData.append('email', email),
        formData.append('country', country),
        formData.append('isPhoneVerified', isPhoneVerified),
        formData.append('isEmailVerified', isEmailVerified),
        formData.append('isUserBanned', isUserBanned),
        formData.append('address', address),
        formData.append('city', city1),
        formData.append('state', state),
        formData.append('zipCode', zipCode)
        try {
            const response = await AllActiveguestUpdateApi(id,formData);
            console.log('Active Guest Update api response 000000', response)
            if (response?.status === 200) {
                toast.success(response?.data?.guest?.message)
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
                setCountry('')
                setIsPhoneVerified('')
                setIsEmailVerified('')
                setIsUserBanned('')
                setAddress('')
                setCity1('')
                setState('') 
                setZipCode('')
                setBanUser('')
                // setcountry('')
                setIsActive('')
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid >
                        <Typography sx={{ fontSize: 20 }}>
                            <b>Guest Detail - {`${firstName} ${lastName}`}</b>
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button sx={{ marginLeft: 2, height: 30, borderColor: '#4634ff', color: '#4634ff' }} variant="outlined" >
                            {/* <AddIcon /> */} Login as user</Button>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <Item style={{ backgroundColor: '#f2f6fbe4' }}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1.5, }}>
                                    <Box sx={{ textAlign: 'justify' }}>
                                        <Typography sx={{ fontSize: 15 }}><b>Total Bookings</b></Typography>
                                        <Typography sx={{ fontSize: 18 }}><b>0</b></Typography>
                                    </Box >
                                    <Box sx={{ margin: 'auto', paddingLeft: 12 }}><Typography>Icon</Typography></Box>
                                </Box>

                            </Item>
                        </Grid>
                        <Grid item xs={3} >
                            <Item style={{ backgroundColor: '#f2f6fbe4' }}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1.5, }}>
                                    <Box sx={{ textAlign: 'justify' }}>
                                        <Typography sx={{ fontSize: 15 }}><b>Rinning Bookings</b></Typography>
                                        <Typography sx={{ fontSize: 18 }}><b>0</b></Typography>
                                    </Box >
                                    <Box sx={{ margin: 'auto', paddingLeft: 8 }}><Typography>Icon</Typography></Box>
                                </Box>

                            </Item>
                        </Grid>
                        <Grid item xs={3} >
                            <Item style={{ backgroundColor: '#f2f6fbe4' }}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1.5, }}>
                                    <Box sx={{ textAlign: 'justify' }}>
                                        <Typography sx={{ fontSize: 15 }}><b>Booking request</b></Typography>
                                        <Typography sx={{ fontSize: 18 }}><b>0</b></Typography>
                                    </Box >
                                    <Box sx={{ margin: 'auto', paddingLeft: 8 }}><Typography>Icon</Typography></Box>
                                </Box>

                            </Item>
                        </Grid>
                        <Grid item xs={3} >
                            <Item style={{ backgroundColor: '#f2f6fbe4' }}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1.5, }}>
                                    <Box sx={{ textAlign: 'justify' }}>
                                        <Typography sx={{ fontSize: 15 }}><b>Total Payment</b></Typography>
                                        <Typography sx={{ fontSize: 18 }}><b>0</b></Typography>
                                    </Box >
                                    <Box sx={{ margin: 'auto', paddingLeft: 12 }}><Typography>Icon</Typography></Box>
                                </Box>

                            </Item>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4} >
                            <Item >
                                <Box sx={{ alignItems: 'center' }}>
                                    <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" >Notification</Button>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} >
                            <Item >
                                <Box sx={{ alignItems: 'center' }}>
                                    <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" >Logins</Button>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} >
                            <Item >
                                <Box sx={{ alignItems: 'center' }}>
                                    <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" onClick={(e)=> setIsUserBanned(!isUserBanned)}>Ban User</Button>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={mainDiv}>
                    <Box sx={contentDiv} >
                        <Typography sx={{ fontSize: 20 }}><b>Information of {`${firstName} ${lastName}`}</b></Typography>
                    </Box>
                    <hr />
                    <Box sx={contentDiv2} >
                        <Grid container spacing={1} >
                            <Grid xs={6} >
                                <label>First Name</label>
                                <TextField sx={input} required id="outlined-required"  value={firstName} defaultValue="" onChange={(e)=>setFirstName(e.target.value)} placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                            <Grid xs={6} >
                            <label>Last Name</label>
                                <TextField sx={{ ...input, marginLeft: 1 }} required id="outlined-required" value={lastName} onChange={(e)=>setLastName(e.target.value)} defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                            
                            <Grid xs={6} >
                            <label>Email</label>
                                <TextField sx={input} required id="outlined-required" value={email} onChange={(e)=>setEmail(e.target.value)}  defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                            <Grid xs={6} >
                            <label>Mobile Number</label>
                                <TextField sx={{ ...input, marginLeft: 1 }} required value={phone} onChange={(e)=>setPhone(e.target.value)} id="outlined-required" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                            <Grid xs={12} >
                                <label>Address</label>
                                <TextField sx={input} required id="outlined-required" value={address}  onChange={(e)=>setAddress(e.target.value)}    defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                            <Grid xs={3} >
                                <label>City</label>
                                <TextField sx={{ ...input, width: '95%' }} required id="outlined-required"  value={city1}  onChange={(e)=> setCity1(e.target.value)}  defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                            <Grid xs={3} >
                                <label>State</label>
                                <TextField sx={{ ...input, width: '95%', marginLeft: 1 }} required id="outlined-required"  value={state}  onChange={(e)=> setState(e.target.value)} defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                            <Grid xs={3} >
                                <label>Zip/Postal</label>
                                <TextField sx={{ ...input, width: '95%', marginLeft: 2 }} required id="outlined-required"  value={zipCode}  onChange={(e)=> setZipCode(e.target.value)}  defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>
                            <Grid xs={3} >
                                <label>Country</label>
                                <TextField sx={{ ...input, width: '95%', marginLeft: 3 }} required id="outlined-required"  value={country}  onChange={(e)=> setCountry(e.target.value)}  defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                            </Grid>

                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 2 }} >
                            <Grid xs={6} sx={forHover}>
                                <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} value={isPhoneVerified}    variant="contained" onClick={()=> setIsPhoneVerified(!isPhoneVerified)} > Phone Verified</Button>
                            </Grid>
                            <Grid xs={6} >
                                <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000', marginLeft: 1 }} value={isEmailVerified}  onClick={(e)=> setIsEmailVerified(!isEmailVerified)}  variant="contained" >Email Verified</Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 2 }} >
                            <Grid xs={12} sx={forHover}>
                                <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" onClick={MyActiveGuestUpdteApiApi} >Submit</Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default guestDetails
