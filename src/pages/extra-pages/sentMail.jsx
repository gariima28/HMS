import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Grid, MenuItem, Stack, TextareaAutosize, TextField, Typography } from '@mui/material'
import { AllStaffGetAllApi } from 'api/api'
import { SendAllStaffMail } from 'api/api'
import toast, { Toaster } from 'react-hot-toast';


const mainstyle = {
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 2
}
const forHover = {
    '&:hover': {
        color: "#fff",
        backgroundColor: '#28c76f',
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

const sentMail = () => {
    const [allData, setAllData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [hideEmail, setHideEmail] = useState(true)

    const [allStaffMail, setAllStafffMail] = useState();
    const [subject, setSubject] = useState();
    const [textarea, setRextarea] = useState();
    const [startForm, setStartForm] = useState();
    const [perBatch, setPerBatch] = useState();
    const [coolinPeriod, setCoolinPeriod] = useState();

    // console.log('subject', subject)
    // const [startForm, setStartForm] = useState();

    console.log('my all emails', allStaffMail)

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        MyAllStaffGetAllDataApi()
    }, [])

    // Get all in role 
    const MyAllStaffGetAllDataApi = async () => {
        try {
            const response = await AllStaffGetAllApi();
            console.log('My All Stafff get all---------------', response)

            if (response?.status === 200) {
                toast.success(response?.data?.msg)
                setAllData(response?.data?.staffs)

            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Post Api 
    const MyEventPostApi = async () => {
        // setLoader(true)
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
                    toast.success('Success',response?.data?.success,'Mails');
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
                <Grid sx={{ margin: 0, fontSize: 20 }}>
                    <b>Email to Subscribers</b>
                </Grid>
            </Box>
            <Box sx={mainstyle} >
                {/* <Grid sx={{ display: 'flex' }}>
                    <Grid sx={{ ...btn12, ...(hideEmail === true ? conditionClass : btn12) }} >
                        <Button variant="" disableElevation onClick={() => setHideEmail(true)}> Send Via Email </Button>
                    </Grid>
                    <Grid sx={{ ...btn12, marginLeft: 1, ...(hideEmail === false ? conditionClass : btn12) }}>
                        <Button variant="" onClick={() => setHideEmail(false)}> Send Via FireBase </Button>
                    </Grid>
                </Grid> */}
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
                        <TextField id="outlined-basic" variant="outlined" placeholder='Subject/title' helperText="" onChange={(e) => setSubject(e.target.value)} />
                    </Grid>

                </Box>
                {/* changing state  */}
                <Box>
                    <Grid sx={{ width: 100, marginTop: 1 }}>
                        <label>Message*</label>
                        <TextareaAutosize minRows={6} placeholder="" onChange={(e) => setRextarea(e.target.value)} />
                    </Grid>
                </Box>
                {/* changing state  */}
                <Box>
                    <Grid container spacing={1} sx={{ marginTop: 2, paddingLeft: 1 }} >
                        <Grid xs={4} >
                            <TextField sx={{ width: '98%' }} id="outlined-basic" placeholder='Start form user id e.g 1' label="Start Form *" variant="outlined" onChange={(e) => setStartForm(e.target.value)} />
                        </Grid>
                        <Grid xs={4} >
                            <TextField sx={{ width: '98%' }} id="outlined-basic" label="Per Batch *" placeholder='How many user' variant="outlined" onChange={(e) => setPerBatch(e.target.value)} />
                        </Grid>
                        <Grid xs={4} >
                            <TextField sx={{ width: '100%' }} id="outlined-basic" label="Cooling Period *" placeholder='Waiting time' variant="outlined" onChange={(e) => setCoolinPeriod(e.target.value)} />
                        </Grid>
                        <Grid container spacing={1} sx={{ marginTop: 2 }} >
                            <Grid xs={12} sx={forHover}>
                                <Button sx={{ ...forHover, width: '100%', backgroundColor: "#f2f6fbe4", color: '#000' }} variant="contained" onClick={MyEventPostApi}>Submit</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>


        </>
    )
}

export default sentMail
