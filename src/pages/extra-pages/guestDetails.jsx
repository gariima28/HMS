import React, { useEffect, useState, useRef } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { borderRadius, margin, padding } from '@mui/system';
import { color } from 'framer-motion';
import { AllActiveguestGetByIdApi } from 'api/api'
import { AllActiveguestUpdateApi } from 'api/api'
import Modal from '@mui/material/Modal';
import { BanApi } from 'api/api'
import HashLoader from './HashLoaderCom';

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
        backgroundColor: '#4634ff',
        borderRadius: 1
    },
}
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
};

const guestDetails = () => {

    const { id } = useParams()

    const [rowsData, setRowsData] = React.useState([]);
    const [loader, setLoader] = useState(false)

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [countryCode, setCountryCode] = React.useState('');
    const [isPhoneVerified, setIsPhoneVerified] = React.useState(false);
    const [isEmailVerified, setIsEmailVerified] = React.useState(false);
    const [isUserBanned, setIsUserBanned] = React.useState(false);
    const [address, setAddress] = React.useState('');
    const [city1, setCity1] = React.useState('');
    const [state, setState] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    const [banUser, setBanUser] = React.useState();
    const [isActive, setIsActive] = React.useState('');
    const [country, setCountry] = React.useState('');

    const handleClose2 = () => setOpen2(false);
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);

    const [validFirstName, setValidFirstName] = React.useState(false);
    const [validLastName, setValidLastName] = React.useState(false);
    const [validEmail, setValidEmail] = React.useState(false);
    const [validPhone, setValidPhone] = React.useState(false);
    const [validAddress, setValidAddress] = React.useState(false);
    const [validCity, setValidCity] = React.useState(false);
    const [validState, setValidState] = React.useState(false);
    const [validZipPortal, setValidZipPortal] = React.useState(false);
    const [validCountryName, setValidCountryName] = React.useState(false);


    useEffect(() => {
        MyActiveGuestGetByIdAllApi()
    }, [])

    const navigate = useNavigate()
    const offcanvasRef33 = useRef(null);

    // Validation  

    const validateFunction = () => {
        let IsValid = true

        const nameRegex = /^[A-Za-z\s]+$/;
        if (!firstName || firstName === "" || !nameRegex.test(firstName)) {
            IsValid = false
            setLoader(false)
            setValidFirstName(true)
        } else {
            setValidFirstName(false)
        }

        const lastNameRegex = /^[A-Za-z\s]+$/;
        if (!lastName || lastName === "" || !lastNameRegex.test(lastName)) {
            IsValid = false
            setLoader(false)
            setValidLastName(true)
        } else {
            setValidLastName(false)
        }

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || email === "" || !regexEmail.test(email)) {
            IsValid = false
            setLoader(false)
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
        const regexPhone = /^\d{10}$/;
        if (!phone || phone === "" || !regexPhone.test(phone)) {
            IsValid = false
            setLoader(false)
            setValidPhone(true)
        } else {
            setValidPhone(false)
        }
        const regexAddress = /^[a-zA-Z0-9\s,.-]+$/;
        if (!address || address === "" || !regexAddress.test(address)) {
            IsValid = false
            setLoader(false)
            setValidAddress(true)
        } else {
            setValidAddress(false)
        }
        const cityNameRegex = /^[A-Za-z\s]+$/;
        if (!city1 || city1 === "" || !cityNameRegex.test(city1)) {
            IsValid = false
            setLoader(false)
            setValidCity(true)
        } else {
            setValidCity(false)
        }
        const stateNameRegex = /^[A-Za-z\s]+$/;
        if (!state || state === "" || !stateNameRegex.test(state)) {
            IsValid = false
            setLoader(false)
            setValidState(true)
        } else {
            setValidState(false)
        }
        const pinCodeRegex = /^\d{6}$/;
        if (!zipCode || zipCode === "" || !pinCodeRegex.test(zipCode)) {
            IsValid = false
            setLoader(false)
            setValidZipPortal(true)
        } else {
            setValidZipPortal(false)
        }

        const countryNameRegex = /^[A-Za-z\s]+$/;
        if (!country || country === "" || !countryNameRegex.test(country)) {
            IsValid = false
            setLoader(false)
            setValidCountryName(true)
        } else {
            setValidCountryName(false)
        }


        return IsValid
    }

    const HandleFirstName = (e) => {
        setFirstName(e)
        const nameRegex = /^[A-Za-z\s]+$/;
        setValidFirstName(nameRegex.test(e))
        if (e === '' || !nameRegex.test(e)) {
            setValidFirstName(true)
        } else {
            setValidFirstName(false)
        }
    }
    const HandleLastName = (e) => {
        setLastName(e)
        const nameRegex = /^[A-Za-z\s]+$/;
        setValidLastName(nameRegex.test(e))
        if (e === '' || !nameRegex.test(e)) {
            setValidLastName(true)
        } else {
            setValidLastName(false)
        }
    }
    const HandleEmail = (e) => {
        setEmail(e)
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setValidEmail(regexEmail.test(e))
        if (e === '' || !regexEmail.test(e)) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }
    const HandlePhone = (e) => {
        setPhone(e)
        const regexPhone = /^\d{10}$/;

        setValidPhone(regexPhone.test(e))
        if (e === '' || !regexPhone.test(e)) {
            setValidPhone(true)
        } else {
            setValidPhone(false)
        }
    }
    const HandleAddress = (e) => {
        setAddress(e)
        const regexAddress = /^[a-zA-Z0-9\s,.-]+$/;

        setValidAddress(regexAddress.test(e))
        if (e === '' || !regexAddress.test(e)) {
            setValidAddress(true)
        } else {
            setValidAddress(false)
        }
    }
    const HandleCity = (e) => {
        setCity1(e)
        const nameRegex = /^[A-Za-z\s]+$/;
        setValidCity(nameRegex.test(e))
        if (e === '' || !nameRegex.test(e)) {
            setValidCity(true)
        } else {
            setValidCity(false)
        }
    }
    const HandleState = (e) => {
        setState(e)
        const nameRegex = /^[A-Za-z\s]+$/;
        setValidState(nameRegex.test(e))
        if (e === '' || !nameRegex.test(e)) {
            setValidState(true)
        } else {
            setValidState(false)
        }
    }
    const HandleZipPortal = (e) => {
        setZipCode(e)
        const pinCodeRegex = /^\d{6}$/;
        setValidZipPortal(pinCodeRegex.test(e))
        if (e === '' || !pinCodeRegex.test(e)) {
            setValidZipPortal(true)
        } else {
            setValidZipPortal(false)
        }
    }
    const HandleCountry = (e) => {
        setCountry(e)
        const nameRegex = /^[A-Za-z\s]+$/;
        setValidCountryName(nameRegex.test(e))
        if (e === '' || !nameRegex.test(e)) {
            setValidCountryName(true)
        } else {
            setValidCountryName(false)
        }
    }

    // Validation  

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
                // toast.success(response?.data?.msg)

            } else {
                // toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Ban Ap 
    const MyBanApi = async () => {
        // setLoader(true)
        try {
            const response = await BanApi(id, true);
            console.log('Ban api response ', response)
            if (response?.status === 200) {
                toast.success(response?.data?.message)
                setOpen2(false)
                setTimeout(() => {
                    navigate('/bannedguest')
                }, 1000)
            } else {
                // toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Update api 
    const MyActiveGuestUpdteApiApi = async () => {
        if (validateFunction()) {
            setLoader(true)
            const formData = new FormData()
            formData.append('firstName', firstName),
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
                const response = await AllActiveguestUpdateApi(id, formData);
                console.log('Active Guest Update api response 000000', response)
                if (response?.status === 200) {
                    toast.success(response?.data?.message)
                    // setFirstName('')
                    // setLastName('')
                    // setEmail('')
                    // setPhone('')
                    // setCountry('')
                    // setIsPhoneVerified('')
                    // setIsEmailVerified('')
                    // setIsUserBanned('')
                    // setAddress('')
                    // setCity1('')
                    // setState('')
                    // setZipCode('')
                    // setBanUser('')
                    setIsActive('')
                    setLoader(false)
                    // setcountry('')
                    setTimeout(() => {
                        navigate('/allguest')
                    }, 1000)
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Box>
                <Box>
                    {
                        loader && (
                            <HashLoader />
                        )
                    }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid >
                        <Typography sx={{ fontSize: 20 }}>
                            <b>Guest Detail - {`${firstName} ${lastName}`}</b>
                        </Typography>
                    </Grid>
                    {/* <Grid>
                        <Button sx={{ marginLeft: 2, height: 30, borderColor: '#4634ff', color: '#4634ff' }} variant="outlined" >
                             Login as user</Button>
                    </Grid> */}
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

                        {/* <Grid item xs={4} >
                            <Item >
                                <Box sx={{ alignItems: 'center' }}>
                                    <Button sx={{width: '100%', backgroundColor: "#4634ff", color: '#fff' }}  variant="contained" >Notification</Button>
                                   
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={4} >
                            <Item >
                                <Box sx={{ alignItems: 'center' }}>
                                    <Button sx={{width: '100%', backgroundColor: "#4634ff", color: '#fff' }}  variant="contained" >Logins</Button>
                                    
                                </Box>
                            </Item>
                        </Grid> */}

                        <Grid item xs={12} >
                            <Item >
                                <Box sx={{ alignItems: 'center' }}>
                                    <Button sx={{ width: '100%', backgroundColor: "#0D6A84", color: '#fff' }} variant="contained" onClick={handleOpen2}>Ban User</Button>
                                    {/* <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" onClick={(e) => setIsUserBanned(!isUserBanned)}>Ban User</Button> */}
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
                                <TextField sx={input} required id="outlined-required" value={firstName} defaultValue="" onChange={(e) => HandleFirstName(e.target.value)} placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                <Box>
                                    {
                                        validFirstName && (
                                            <Typography sx={{ color: 'red', fontSize: 15 }}>Valid name is required</Typography>
                                        )
                                    }
                                </Box>
                            </Grid>
                            <Grid xs={6} >
                                <label sx={{ paddingLeft: 10 }}>Last Name</label>
                                <TextField sx={{ ...input, marginLeft: 1 }} required id="outlined-required" value={lastName} onChange={(e) => HandleLastName(e.target.value)} defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                <Box>
                                    {
                                        validLastName && (
                                            <Typography sx={{ color: 'red', fontSize: 15, marginLeft: 1 }}>Valid name is required</Typography>
                                        )
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>

                            <Grid xs={6} >
                                <label>Email</label>
                                <TextField sx={input} required id="outlined-required" value={email} onChange={(e) => HandleEmail(e.target.value)} defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                <Box>
                                    {
                                        validEmail && (
                                            <Typography sx={{ color: 'red', fontSize: 15 }}>Valid email is required</Typography>
                                        )
                                    }
                                </Box>
                            </Grid>

                            <Grid xs={6} >
                                <label>Mobile Number</label>
                                <TextField sx={{ ...input, marginLeft: 1 }} required value={phone} onChange={(e) => HandlePhone(e.target.value)} id="outlined-required" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />

                                <Box>
                                    {
                                        validPhone && (
                                            <Typography sx={{ color: 'red', fontSize: 15 }}>Valid phone is required</Typography>
                                        )
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                            <Grid xs={12} >
                                <label>Address</label>
                                <TextField sx={input} required id="outlined-required" value={address} onChange={(e) => HandleAddress(e.target.value)} defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                <Box>
                                    {
                                        validAddress && (
                                            <Typography sx={{ color: 'red', fontSize: 15 }}>Valid address is required</Typography>
                                        )
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                            <Grid xs={3} >
                                <label>City</label>
                                <TextField sx={{ ...input, width: '95%' }} required id="outlined-required" value={city1} onChange={(e) => HandleCity(e.target.value)} defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                <Box>
                                    {
                                        validCity && (
                                            <Typography sx={{ color: 'red', fontSize: 15 }}>Valid city is required</Typography>
                                        )
                                    }
                                </Box>
                            </Grid>
                            <Grid xs={3} >
                                <label>State</label>
                                <TextField sx={{ ...input, width: '95%', marginLeft: 1 }} required id="outlined-required" value={state} onChange={(e) => HandleState(e.target.value)} defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                <Box>
                                    {
                                        validState && (
                                            <Typography sx={{ color: 'red', fontSize: 15, marginLeft: 1 }}>Valid state is required</Typography>
                                        )
                                    }
                                </Box>
                            </Grid>
                            <Grid xs={3} >
                                <label>Zip/Postal</label>
                                <TextField sx={{ ...input, width: '95%', marginLeft: 2 }} required id="outlined-required" value={zipCode} onChange={(e) => HandleZipPortal(e.target.value)} defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />

                                <Box>
                                    {
                                        validZipPortal && (
                                            <Typography sx={{ color: 'red', fontSize: 15, marginLeft: 2 }}>Valid pinCode is required</Typography>
                                        )
                                    }
                                </Box>
                            </Grid>
                            <Grid xs={3} >
                                <label>Country</label>
                                <TextField sx={{ ...input, width: '95%', marginLeft: 2 }} required id="outlined-required" value={country} onChange={(e) => HandleCountry(e.target.value)} defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                <Box>
                                    {
                                        validCountryName && (
                                            <Typography sx={{ color: 'red', fontSize: 15, marginLeft: 1.7 }}>Valid country name is required</Typography>
                                        )
                                    }
                                </Box>
                            </Grid>

                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 2 }} >
                            <Grid xs={6} sx={forHover}>
                                <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} value={isPhoneVerified} variant="contained" onClick={() => setIsPhoneVerified(!isPhoneVerified)} > Phone Verified</Button>
                            </Grid>
                            <Grid xs={6} >
                                <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000', marginLeft: 1 }} value={isEmailVerified} onClick={(e) => setIsEmailVerified(!isEmailVerified)} variant="contained" >Email Verified</Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 2 }} >
                            <Grid xs={12} sx={forHover}>
                                <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" onClick={MyActiveGuestUpdteApiApi} >Submit</Button>
                            </Grid>
                            {/* <Toaster /> */}
                        </Grid>

                    </Box>
                </Box>

            </Box>
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                ref={offcanvasRef33}
            >
                <Box sx={style2}>
                    <Typography sx={{ fontSize: 25, color: 'red' }} id="modal-modal-title" variant="h6" component="h2">
                        Confirmation Alert!
                    </Typography>
                    <hr />
                    <Typography sx={{ ml: 2, mt: 2 }} id="modal-modal-description" >
                        Are you sure to <b>Ban</b> this Guest?
                    </Typography>
                    <Box sx={{ textAlign: "right", marginTop: 2 }}>
                        <Button sx={{ backgroundColor: "#4634ff", color: '#fff' }} variant="contained" href="#contained-buttons" onClick={MyBanApi}>
                            Submit
                        </Button>
                        <Toaster />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default guestDetails
