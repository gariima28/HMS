import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Grid, MenuItem, Stack, TextareaAutosize, TextField, Typography } from '@mui/material'
import { AllStaffGetAllApi } from 'api/api'
import { SendAllStaffMail } from 'api/api'
import HashLoader from './HashLoaderCom';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';


const mainstyle = {
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 2
}
const forHover = {
    '&:hover': {
        color: "#fff",
        backgroundColor: '#4634ff',
    },
}
const conditionClass = {
    color: "#fff",
    backgroundColor: '#28c76f',
}

const btn12 = {
    backgroundColor: "#f2f6fbe4",
    border: "0.5px solid #aaa"
}

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const subscriber = () => {

    const [allData, setAllData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [hideEmail, setHideEmail] = useState(true)
    const [loader, setLoader] = useState(false)
    const [search, setSearch] = useState('')

    const [allStaffMail, setAllStafffMail] = useState();
    const [subject, setSubject] = useState();
    const [textarea, setRextarea] = useState();
    const [startForm, setStartForm] = useState();
    const [perBatch, setPerBatch] = useState();
    const [coolinPeriod, setCoolinPeriod] = useState();

    const [isValidFromDateRequired, setIsValidFromDateRequired] = useState(false);
    const [isValidToDateRequired, setIsValidToDateRequired] = useState(false);
    const [isValidSubjectRequired, setIsValidSubjectRequired] = useState(false);
    const [isValidTextAreaRequired, setIsValidTextAreaRequired] = useState(false);
    const [isValidNumberRequired, setIsValidNumberRequired] = useState(false);
    const [isValidNumberTwoRequired, setIsValidNumberTwoRequired] = useState(false);
    const [isValidNumberThreeRequired, setIsValidNumberThreeRequired] = useState(false);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        MyAllStaffGetAllDataApi()
    }, [])

    // Get all staff 
    const MyAllStaffGetAllDataApi = async () => {
        setLoader(true)
        try {
            const response = await AllStaffGetAllApi(search);
            console.log('My All Stafff get all---------------', response)

            if (response?.status === 200) {
                // toast.success(response?.data?.msg)
                setAllData(response?.data?.staffs)
                setLoader(`false`)

            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // ###### validation ##########
    const [errors, setErrors] = useState({});


    const FuncValidation = () => {
        let isValid = true;

        // Number one
        if (!startForm || startForm === "" || !/^[0-9]+$/.test(startForm)) {
            setIsValidNumberRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // Number two
        if (!perBatch || perBatch === "" || !/^[0-9]+$/.test(perBatch)) {
            setIsValidNumberTwoRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // Number three
        if (!coolinPeriod || coolinPeriod === "" || !/^[0-9]+$/.test(coolinPeriod)) {
            setIsValidNumberThreeRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // Subject
        if (!subject || subject === "" || !/^[A-Za-z\s]+$/.test(subject)) {
            setIsValidSubjectRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // TextArea
        if (!textarea || textarea === "" || !/^[A-Za-z\s]+$/.test(textarea)) {
            setIsValidTextAreaRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        return isValid;
    }

    // Number 1
    const handleNoOne = (e2) => {
        setStartForm(e2);
        const noRegex = /^[0-9]+$/;
        setIsValidNumberRequired(noRegex.test(e2));

        if (e2 === "" || !noRegex.test(e2)) {
            setIsValidNumberRequired(true)
        } else {
            setIsValidNumberRequired(false)
        }
    }
    // Number 2
    const handleNoTwo = (e2) => {
        setPerBatch(e2);
        const noRegex = /^[0-9]+$/;
        setIsValidNumberTwoRequired(noRegex.test(e2));

        if (e2 === "" || !noRegex.test(e2)) {
            setIsValidNumberTwoRequired(true)
        } else {
            setIsValidNumberTwoRequired(false)
        }
    }
    // Number 3
    const handleNoThree = (e2) => {
        setCoolinPeriod(e2);
        const noRegex = /^[0-9]+$/;
        setIsValidNumberThreeRequired(noRegex.test(e2));

        if (e2 === "" || !noRegex.test(e2)) {
            setIsValidNumberThreeRequired(true)
        } else {
            setIsValidNumberThreeRequired(false)
        }
    }
    // Subject
    const handleSubject = (e2) => {
        setSubject(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidSubjectRequired(nameRegex.test(e2));

        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidSubjectRequired(true)
        } else {
            setIsValidSubjectRequired(false)
        }
    }
    // TextArea
    const handleTextArea = (e2) => {
        setRextarea(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidTextAreaRequired(nameRegex.test(e2));

        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidTextAreaRequired(true)
        } else {
            setIsValidTextAreaRequired(false)
        }
    }
    // ###### validation ##########

    // Post Api 
    const MyEventPostApi = async () => {
        if (FuncValidation()) {
            setLoader(true)
            const formData = new FormData()
            formData.append('subject', subject);
            // formData.append('sentMail', allStaffMail);
            formData.append('sentMail', JSON.stringify(allStaffMail));
            formData.append('body', textarea);
            formData.append('coolingPeriod', coolinPeriod);
            formData.append('fromUserId', startForm);
            formData.append('batchUsers', perBatch);

            try {
                const response = await SendAllStaffMail(formData);
                console.log('Mail-post-api', response)
                if (response?.status === 200) {
                    if (response?.data?.status === 200) {
                        toast.success(response?.data?.message);
                        setAllStafffMail('')
                        setSubject('')
                        setRextarea('')
                        setStartForm('')
                        setPerBatch('')
                        setCoolinPeriod('')
                        setLoader(false)
                    } else {
                        toast.error(response?.data?.message);
                    }
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    const SelectEmailHandle = () => {
        const updatedData = allData.map((item, i) => (
            item.email
        )
        );
        setAllStafffMail(updatedData)
    }
    return (
        <>
            <Box>
                {loader && (
                    <HashLoader />
                )
                }
            </Box>
            <Box sx={{ margin: 0, fontSize: 20, display: "flex", justifyContent: "space-between" }}>
                <Grid>

                </Grid>
                <Grid>
                    <Link to='/subscriberPage'>
                        <Button sx={{ marginLeft: 2, height: 39, backgroundColor: '#4634ff', color: '#fff' }} variant="outlined" onClick={''}>
                            <Typography sx={{ paddingTop: .8, paddingRight: .3 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="#fff" d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z" />
                                </svg>
                            </Typography>
                            Back
                        </Button>
                    </Link>
                </Grid>
            </Box>
            <Box>
                <Grid sx={{ margin: 0, fontSize: 20 }}>
                    <b>Email to Subscribers</b>
                </Grid>
            </Box>
            <Box sx={mainstyle} >
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { mt: 4, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                    helperText="Some important text"
                >

                    <Grid>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={selectedValue}
                            onChange={handleChange}
                            placeholder="select"
                            variant="outlined"
                        >
                            <MenuItem value="All Guest" onClick={SelectEmailHandle}>
                                <Typography >All Guest</Typography>
                            </MenuItem>
                            <MenuItem value="Selected Guest">
                                <Typography>Selected Guest</Typography>
                            </MenuItem>
                            <MenuItem value="Pending Payment Guest">
                                <Typography>Pending Payment Guest</Typography>
                            </MenuItem>
                            <MenuItem value="Rejected Payment Guest">
                                <Typography>Rejected Payment Guest</Typography>
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid>
                        <Typography sx={{ marginBottom: -3, fontSize: 14, marginTop: 1 }}> <label>Subject *</label></Typography>
                        <TextField id="outlined-basic" variant="outlined" placeholder='Subject/title' onChange={(e) => handleSubject(e.target.value)} />
                    </Grid>
                    <Grid sx={{ paddingTop: 2 }}>
                        {isValidSubjectRequired && (
                            <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                Subject is required
                            </p>
                        )}
                    </Grid>
                </Box>
                {/* changing state  */}
                <Box>
                    <Grid sx={{ width: 100, marginTop: 1 }}>
                        <label>Message*</label>
                        <TextareaAutosize minRows={6} placeholder="" onChange={(e) => handleTextArea(e.target.value)} />
                    </Grid>
                    <Grid sx={{ paddingTop: 2 }}>
                        {isValidTextAreaRequired && (
                            <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                Message is required
                            </p>
                        )}
                    </Grid>
                </Box>
                {/* changing state  */}
                <Box>
                    <Grid container spacing={1} sx={{ marginTop: 2, paddingLeft: 1 }} >
                        <Grid xs={4} >
                            <TextField sx={{ width: '98%' }} id="outlined-basic" placeholder='Start form user id e.g 1' label="Start Form *" variant="outlined" onChange={(e) => handleNoOne(e.target.value)} />
                            <Grid sx={{ paddingTop: 2 }}>
                                {isValidNumberRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Start Form no is required
                                    </p>
                                )}
                            </Grid>
                        </Grid>


                        <Grid xs={4} >
                            <TextField sx={{ width: '98%' }} id="outlined-basic" label="Per Batch *" placeholder='How many user' variant="outlined" onChange={(e) => handleNoTwo(e.target.value)} />
                            <Grid sx={{ paddingTop: 2 }}>
                                {isValidNumberTwoRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Per batch no is required
                                    </p>
                                )}
                            </Grid>

                        </Grid>
                        <Grid xs={4} >
                            <TextField sx={{ width: '100%' }} id="outlined-basic" label="Cooling Period *" placeholder='Waiting time' variant="outlined" onChange={(e) => handleNoThree(e.target.value)} />
                            <Grid sx={{ paddingTop: 2 }}>
                                {isValidNumberThreeRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Cooling period no is required
                                    </p>
                                )}
                            </Grid>

                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 2 }} >
                            <Grid xs={12} sx={forHover}>
                                <Button sx={{ ...forHover, width: '100%', backgroundColor: "#4634ff", color: '#fff' }} variant="contained" onClick={MyEventPostApi}>Submit</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>


        </>
    )
}

export default subscriber
