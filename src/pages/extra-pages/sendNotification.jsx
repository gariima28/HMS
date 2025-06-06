import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Grid, MenuItem, Stack, TextareaAutosize, TextField, Typography } from '@mui/material'
import { AllStaffGetAllApi } from 'api/api'
import { SendAllStaffMail } from 'api/api'
import HashLoader from './HashLoaderCom';
import toast, { Toaster } from 'react-hot-toast';
import { styled } from '@mui/styles';


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
    backgroundColor: '#4634ff',
}
const btn12 = {
    backgroundColor: "#f2f6fbe4",
    border: "0.5px solid #aaa"
}

const AddButton = styled(Button)(({ status }) => ({
    borderRadius: '5px',
    backgroundColor: '#0D6A84',
    borderColor: '#0D6A84',
    color: '#FFFFFF',
    padding: '8px 20px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#0D6A84',
        borderColor: '#0D6A84',
        color: '#ffffff',
    },
}));

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



const sendNotification = () => {

    const [allData, setAllData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [hideEmail, setHideEmail] = useState(true)
    const [loader, setLoader] = useState(false)
    const [allStaffMail, setAllStafffMail] = useState();
    const [subject, setSubject] = useState();
    const [textarea, setRextarea] = useState();
    const [startForm, setStartForm] = useState();
    const [perBatch, setPerBatch] = useState();
    const [search, setSearch] = useState('');

    const [coolinPeriod, setCoolinPeriod] = useState();
    const [isValidFromDateRequired, setIsValidFromDateRequired] = useState(false);
    const [isValidToDateRequired, setIsValidToDateRequired] = useState(false);
    const [isValidSubjectRequired, setIsValidSubjectRequired] = useState(false);
    const [isValidTextAreaRequired, setIsValidTextAreaRequired] = useState(false);
    const [isValidNumberRequired, setIsValidNumberRequired] = useState(false);
    const [isValidNumberTwoRequired, setIsValidNumberTwoRequired] = useState(false);
    const [isValidNumberThreeRequired, setIsValidNumberThreeRequired] = useState(false);

    console.log('my all emails', allStaffMail)

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        MyAllStaffGetAllDataApi()
    }, [])

    // Get all in role 
    const MyAllStaffGetAllDataApi = async () => {
        setLoader(true)
        try {
            const response = await AllStaffGetAllApi(search);
            // console.log('My All Stafff get all---------------', response)
            if (response?.status === 200) {
                // toast.success(response?.data?.msg)
                setAllData(response?.data?.staffs)
                setLoader(false)

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
                    if (response?.data?.status === "success") {
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
        const updatedData = allData?.map((item, i) => (
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
            <Box>
                <Grid sx={{ margin: 0, fontSize: 20 }}>
                    <b>Notification to Verified Guests</b>
                </Grid>
            </Box>
            <Box sx={mainstyle} >
                <Grid sx={{ display: 'flex' }}>
                    <Grid sx={{ ...btn12, ...(hideEmail === true ? conditionClass : btn12) }} >
                        <AddButton variant="" disableElevation onClick={() => setHideEmail(true)}> Send Via Email </AddButton>
                    </Grid>
                    <Grid sx={{ ...btn12, marginLeft: 1, ...(hideEmail === false ? conditionClass : btn12) }}>
                        <AddButton variant="" onClick={() => setHideEmail(false)}> Send Via FireBase </AddButton>
                    </Grid>
                </Grid>
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
                {
                    hideEmail ? (
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


                    ) :
                        (
                            <Box
                                component="form"
                                sx={{ '& .MuiTextField-root': { mt: 4, width: '100%' } }}
                                noValidate
                                autoComplete="off"
                            >
                                <Grid>
                                    <Typography sx={{ marginBottom: -3, fontSize: 14, marginTop: 1 }}> <label>File*</label></Typography>
                                    <TextField id="outlined-basic" type='file' variant="outlined" helpertext="Supported Files:.png, .jpg, .jpeg" />
                                </Grid>
                                <Grid sx={{ width: 100, marginTop: 1 }}>
                                    <label>Message*</label>
                                    <TextareaAutosize minRows={6} placeholder="" />
                                </Grid>

                            </Box>
                        )
                }
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
                                <Button sx={{ ...forHover, width: '100%', backgroundColor: "#0D6A84", color: '#fff' }} variant="contained" onClick={MyEventPostApi}>Submit</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>


        </>
    )

}

export default sendNotification
