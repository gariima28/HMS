import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { border, Box, display, width } from '@mui/system'
import React, { useState } from 'react'
// import Typography from 'themes/typography';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { GeneralPostApi } from 'api/api'
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';

const useStyles = makeStyles({
    container1: {
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: 5
    },

    container2: {
        marginTop: 15
    },
    gridItem: {
        border: '1px solid #5b6e88',
        borderRadius: 4,
        boxShadow: '0px 2px 19px -7px #5b6e88'
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    icon: {
        width: '80px',
        height: '80px',
        border: '1.5px solid #5b6e88',
        padding: 3,
        borderRadius: 4
    },
    content: {
        marginLeft: 18,
        textDecoration: 'none'
    },
    input: {
        width: '100%',
        marginTop: 2,
        marginBottom: 1
    },
    input2: {
        width: '100%',
        marginTop: 2,
        marginBottom: 1,
        color: "#000"
    },
    forHover: {
        '&:hover': {
            color: "#fff",
            backgroundColor: '#4634ff',
        },
    }
});


const generalSettinngPage = () => {
    const classes = useStyles();

    const [title, setTitle] = useState()
    const [checkInTime, setCheckInTime] = useState()
    const [checkOutTime, setCheckOutTime] = useState()
    const [loader, setLoader] = useState(false)
    const [currencySymbol, setCurrencySymbol] = useState()
    const [currency, setCurrency] = useState()
    const [timeZone, setTimeZone] = useState()
    const [siteBaseColor, setSiteBaseColor] = useState()
    const [currencyShowingFormat, setCurrencyShowingFormat] = useState()
    const [perPage, setPerPage] = useState()
    const [taxName, setTaxName] = useState()
    const [taxPercentcharge, setTaxPercentcharge] = useState()
    const [upcomingCheckInList, setUpcomingCheckInList] = useState()
    const [upcomingCheckOutList, setUpcomingCheckOutList] = useState()

    //    Validation
    const [isValidTitleRequired, setIsValidTitleRequired] = useState(false);
    const [isValidCurrencyRequired, setIsValidCurrencyRequired] = useState(false);
    const [isValidCurrencySymbolRequired, setIsValidCurrencySymbolRequired] = useState(false);
    const [isValidTaxNameRequired, setIsValidTaxNameRequired] = useState(false);
    const [isValidTaxPercentRequired, setIsValidTaxPercentRequired] = useState(false);
    const [isValidCheckInListRequired, setIsValidCheckInListRequired] = useState(false);
    const [isValidCheckOutListRequired, setIsValidCheckOutListRequired] = useState(false);

    const FuncValidation = () => {
        let isValid = true;

        // Title
        if (!title || title === "" || !/^[A-Za-z\s]+$/.test(title)) {
            setIsValidTitleRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // Currency
        if (!currency || currency === "" || !/^[A-Za-z\s]+$/.test(currency)) {
            setIsValidCurrencyRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }

        // Currency symbol
        if (!currencySymbol || currencySymbol === "" || !/^[A-Za-z\s]+$/.test(currencySymbol)) {
            setIsValidCurrencySymbolRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }

        // Tax name
        if (!taxName || taxName === "" || !/^[A-Za-z\s]+$/.test(taxName)) {
            setIsValidTaxNameRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }

        // Tax percent
        if (!taxPercentcharge || taxPercentcharge === "" || !/^[0-9]*\.?[0-9]+$/.test(taxPercentcharge)) {
            setIsValidTaxPercentRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // Check in list
        if (!upcomingCheckInList || upcomingCheckInList === "" || !/^[0-9]+$/.test(upcomingCheckInList)) {
            setIsValidCheckInListRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // Check out list
        if (!upcomingCheckOutList || upcomingCheckOutList === "" || !/^[0-9]+$/.test(upcomingCheckOutList)) {
            setIsValidCheckOutListRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }


        return isValid;
    }

    // title
    const handleTitle = (e2) => {
        setTitle(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidTitleRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidTitleRequired(true)
        } else {
            setIsValidTitleRequired(false)
        }
    }
    // currency
    const handleCurrency = (e2) => {
        setCurrency(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidCurrencyRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidCurrencyRequired(true)
        } else {
            setIsValidCurrencyRequired(false)
        }
    }
    // currency symbol
    const handleCurrencySymbol = (e2) => {
        setCurrencySymbol(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidCurrencySymbolRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidCurrencySymbolRequired(true)
        } else {
            setIsValidCurrencySymbolRequired(false)
        }
    }
    //   tax name 
    const handleTaxName = (e2) => {
        setTaxName(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidTaxNameRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidTaxNameRequired(true)
        } else {
            setIsValidTaxNameRequired(false)
        }
    }
    //   tax percent 
    const handleTaxPercent = (e2) => {
        setTaxPercentcharge(e2);
        const nameRegex = /^[0-9]*\.?[0-9]+$/;
        setIsValidTaxPercentRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidTaxPercentRequired(true)
        } else {
            setIsValidTaxPercentRequired(false)
        }
    }
    //   Check in list 
    const handleCheckInList = (e2) => {
        setUpcomingCheckInList(e2);
        const nameRegex =/^[0-9]+$/;
        setIsValidCheckInListRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidCheckInListRequired(true)
        } else {
            setIsValidCheckInListRequired(false)
        }
    }
    //   Check out list 
    const handleCheckOutList = (e2) => {
        setUpcomingCheckOutList(e2);
        const nameRegex =/^[0-9]+$/;
        setIsValidCheckOutListRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidCheckOutListRequired(true)
        } else {
            setIsValidCheckOutListRequired(false)
        }
    }
    //    Validation

    // post api 
    const MyLogoPostApi = async () => {
        if (FuncValidation()) {

            const formData = {
                "siteTitle": title,
                "checkOutTime": checkOutTime,
                "checkInTime": checkInTime,
                "currency": currency,
                "currencySymbol": currencySymbol,
                "currencySymbolFormat": currencyShowingFormat,
                "timeZone": timeZone,
                "taxName": taxName,
                "taxPercent": taxPercentcharge,
                "upComingCheckInList": upcomingCheckInList,
                "upComingCheckOutList": upcomingCheckOutList,

                // "siteBaseColor": siteBaseColor,
                // "roleIdsiteRecordPage": perPage,
                // "currencyFormat": currencyShowingFormat,
                // "hotelId": roleId,
            }
            setLoader(true)

            try {
                const response = await GeneralPostApi(formData);
                // console.log('General setting post api response -----', response)
                if (response?.data?.status === "success") {
                    toast.success(response?.data?.message);
                    setLoader(false)
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (error) {
                console.log(error)
            }
        }

    }



    // time array 
    const timeZones = [
        { value: 'UTC-12:00', label: 'UTC-12:00 - Baker Island Time' },
        { value: 'UTC-11:00', label: 'UTC-11:00 - Samoa Standard Time' },
        { value: 'UTC-10:00', label: 'UTC-10:00 - Hawaii-Aleutian Standard Time' },
        { value: 'UTC-09:00', label: 'UTC-09:00 - Alaska Standard Time' },
        { value: 'UTC-08:00', label: 'UTC-08:00 - Pacific Standard Time' },
        { value: 'UTC-07:00', label: 'UTC-07:00 - Mountain Standard Time' },
        { value: 'UTC-06:00', label: 'UTC-06:00 - Central Standard Time' },
        { value: 'UTC-05:00', label: 'UTC-05:00 - Eastern Standard Time' },
        { value: 'UTC+00:00', label: 'UTC+00:00 - Greenwich Mean Time' },
        { value: 'UTC+01:00', label: 'UTC+01:00 - Central European Time' },
        { value: 'UTC+05:30', label: 'UTC+05:30 - Indian Standard Time' },
        { value: 'UTC+08:00', label: 'UTC+08:00 - China Standard Time' },
        { value: 'UTC+09:00', label: 'UTC+09:00 - Japan Standard Time' },
        { value: 'UTC+10:00', label: 'UTC+10:00 - Australian Eastern Standard Time' },
    ];
    // time array 
    const currencyShowingFormatArray = [
        { value: 'Show cuurrency text and symbol both' },
        { value: 'Show cuurrency text only' },
        { value: 'Show cuurrency symbol only ' },
    ];

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
                <Grid sx={{ marginBottom: 2, fontSize: 20, }}>
                    <b>System Settings</b>
                </Grid>
                <Box className={classes.container1}>
                    <Box>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Site Title* </label>
                                    </Typography>
                                    <TextField className={classes.input} required id="outlined-required" label="" defaultValue="" placeholder='Enter title' onChange={(e) => handleTitle(e.target.value)} />
                                </Box>
                                <Box sx={{ paddingTop: 2 }}>
                                    {isValidTitleRequired && (
                                        <Typography sx={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                            Title is required
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Currency* <span sx={{ color: 'red' }}>*</span></label>
                                    </Typography>
                                    <TextField className={classes.input} required id="outlined-required" label="" defaultValue="" placeholder='Enter currency' onChange={(e) => handleCurrency(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                </Box>
                                <Box sx={{ paddingTop: 2 }}>
                                    {isValidCurrencyRequired && (
                                        <Typography sx={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                            Currency is required
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Currency Symbol* </label>
                                    </Typography>
                                    <TextField className={classes.input} required id="outlined-required" label="" defaultValue="" placeholder='Enter symbol' onChange={(e) => handleCurrencySymbol(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                </Box>
                                <Box sx={{ paddingTop: 2 }}>
                                    {isValidCurrencySymbolRequired && (
                                        <Typography sx={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                            Currency symbol is required
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Timezone* </label>
                                    </Typography>
                                    <TextField
                                        id="outlined-select-timezone"
                                        select
                                        className={classes.input}
                                        label="Select Time Zone"
                                        onChange={(e) => setTimeZone(e.target.value)}>
                                        {timeZones.map((zone) => (
                                            <MenuItem key={zone.value} value={zone.value}>
                                                <Typography>{zone.label}</Typography>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Currency Showing Format* </label>
                                    </Typography>
                                    <TextField
                                        id="outlined-select-timezone"
                                        select
                                        className={classes.input}
                                        label="Select currency format"
                                        onChange={(e) => setCurrencyShowingFormat(e.target.value)}>
                                        {currencyShowingFormatArray.map((format) => (
                                            <MenuItem key={format.value} value={format.value}>
                                                <Typography>{format.value}</Typography>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Tax Name* </label>
                                    </Typography>
                                    <TextField className={classes.input} required id="outlined-required" label="" defaultValue="" placeholder='Enter tax name' onChange={(e) => handleTaxName(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                </Box>
                                <Box sx={{ paddingTop: 2 }}>
                                    {isValidTaxNameRequired && (
                                        <Typography sx={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                            Tax name is required
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Tax Percent Charge* </label>
                                    </Typography>
                                    <TextField className={classes.input} required id="outlined-required" label="" defaultValue="" placeholder='Enter percent' onChange={(e) =>  handleTaxPercent(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                </Box>
                                <Box sx={{ paddingTop: 2 }}>
                                    {isValidTaxPercentRequired && (
                                        <Typography sx={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                            Tax percent is required
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Check-In Time* </label>
                                    </Typography>
                                    <TextField type='time' className={classes.input} required id="outlined-required" label="" defaultValue="" onChange={(e) => setCheckInTime(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Check-out Time* </label>
                                    </Typography>
                                    <TextField type='time' className={classes.input} required id="outlined-required" label="" defaultValue="" onChange={(e) => setCheckOutTime(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Upcoming Check-In List* </label>
                                    </Typography>
                                    <TextField className={classes.input} required id="outlined-required" label="" defaultValue="" placeholder='Enter check-In list' onChange={(e) =>  handleCheckInList(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                </Box>
                                <Box sx={{ paddingTop: 2 }}>
                                    {isValidCheckInListRequired && (
                                        <Typography sx={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                            Check-In list is required
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className={classes}>
                                <Box>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        <label htmlFor="" >Upcoming Check-out List* </label>
                                    </Typography>
                                    <TextField className={classes.input} required id="outlined-required" label="" defaultValue="" placeholder='Enter check-Out list' onChange={(e) => handleCheckOutList(e.target.value)} InputLabelProps={{ sx: { fontSize: '15px' } }} />
                                </Box>
                                <Box sx={{ paddingTop: 2 }}>
                                    {isValidCheckOutListRequired && (
                                        <Typography sx={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                            Check-Out list is required
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sx={{ marginTop: 4, marginBottom: 2 }}>
                            <Button className={classes.forHover} sx={{ width: '100%', backgroundColor: "#4634ff", color: '#fff' }} variant="contained" onClick={MyLogoPostApi} >Submit</Button>
                        </Grid>

                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default generalSettinngPage
