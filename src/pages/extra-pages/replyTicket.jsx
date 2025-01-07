import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, MenuItem, Stack, TextareaAutosize, TextField, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import toast, { Toaster } from 'react-hot-toast';
import { CloseOutlined, CloudUploadOutlined, DeleteOutlined, EditOutlined, RedEnvelopeFilled, UserAddOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { border, borderRadius, display, padding, textAlign } from '@mui/system';
import { color } from 'framer-motion';
import { PendingTicketUpdateApi } from 'api/api'
import { PendingCloseTicketApi } from 'api/api'
import { PendingReplyTicketApi } from 'api/api'
import { GetTicketByIdApi } from 'api/api'


const mainstyle = {
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 2,
    marginTop: 2
}
const open = {
    border: "1px solid #28c76f",
    color: '#28c76f',
    borderRadius: 20,
    padding: .1,
    paddingLeft: 1,
    paddingRight: 1,
    marginTop: .5,
    marginRight: 1.5
}
const content = {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    border: '1px solid #aaa',
    marginTop: 4,
}

const replyTicket = () => {

    const { id } = useParams()

    console.log('ticket number------------', id)

    const token = localStorage.getItem('token')

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState();
    const [status, setStatus] = React.useState();
    const [status1, setStatus1] = React.useState();
    const [mainData, setMainData] = React.useState();
    const [description, setDescription] = React.useState();
    const [showTicketNo, setShowTicketNo] = React.useState();
    console.log('status', status1)

    const [rows, setRows] = React.useState([]);
    const [rowsData, setRowsData] = React.useState([]);

    const [hideFile, setHideFile] = React.useState(false);
    const [message, setMessage] = React.useState();

    const [file1, setFile1] = React.useState(null);
    const [file2, setFile2] = React.useState(null);
    const [file3, setFile3] = React.useState(null);
    const [file4, setFile4] = React.useState(null);
    const [file5, setFile5] = React.useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(()=>{
        MyGetTicketByIdApi()
    },[mainData])

    // update api 
    const MyPendingTicketUpdateApi = async () => {
        const formData = new FormData()
        formData.append('file1', file1)
        formData.append('file2', file2)
        formData.append('file3', file3)
        formData.append('file4', file4)
        formData.append('file5', file5)
        formData.append('status', status1)
        try {
            const response = await PendingTicketUpdateApi(id, formData);
            console.log('Update response in pending api', response)
            if (response?.status === 200) {
                toast.success(response?.data?.message)
                setHideFile(false)
                MyGetTicketByIdApi()
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Reply ticket update api 
    const MyReplyTicketUpdateApi = async () => {
        const formData = new FormData()
        formData.append('reply', message)
        try {
            const response = await PendingReplyTicketApi(id, formData);
            console.log('Reply Ticket Response', response)
            if (response?.status === 200) {
                toast.success(response?.data?.message)
                setMessage('')
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        } 
    }

    
    // Close ticket api 
    const MyPendingCloseTicketApi = async () => {
        try {
            const response = await PendingCloseTicketApi(id);
            console.log('Close Ticket Response909090909', response)
            if (response?.status === 200) {
                setData(response?.data?.message)
                setStatus(response?.data?.status)
                MyGetTicketByIdApi()
                toast.success(response?.data?.message)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Get ticket by id api 
    const MyGetTicketByIdApi = async () => {
        try {
            const response = await GetTicketByIdApi(id);
            console.log('Get Ticket by id Response--', response)
            if (response?.status === 200) {
                setMainData(response?.data?.ticket?.status)
                setDescription(response?.data?.ticket?.description)
                setShowTicketNo(response?.data?.ticket?.ticketNumber)
                toast.success(response?.data?.message)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const currencies = [
        {
            value: 'OPEN',
            label: '$',
        },
        {
            value: 'CLOSED',
            label: '$',
        },
        {
            value: 'PENDING',
            label: '$',
        },
        {
            value: 'PENCLOSEDDING',
            label: '$',
        },
        {
            value: 'RESOLVED',
            label: '$',
        },
        {
            value: 'ANSWERED',
            label: '$',
        },
    ];
    return (
        <>
            <Box sx={{ margin: 0, fontSize: 20, display: "flex", justifyContent: "space-between" }}>
                <Grid>
                    <b>Reply Ticket</b>
                </Grid>
                <Grid>
                    <Button sx={{ marginLeft: 2, height: 39 }} variant="outlined" href='/allticket'> Back</Button>
                </Grid>
            </Box>
            <Box sx={mainstyle}>
                <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid >
                        <Typography sx={{ fontSize: 18, display: 'flex' }}><Typography sx={open}>{mainData === "CLOSED" ? 'Closed' : 'Open'}</Typography> <b>[ {showTicketNo} ] {description}</b></Typography>
                    </Grid>
                    <Grid>
                        <Button sx={{ marginLeft: 2, height: 33, backgroundColor: "red", borderColor: 'red', color: '#fff' }} variant="outlined" startIcon={<CloseOutlined />} onClick={MyPendingCloseTicketApi} disabled={mainData === "CLOSED" ? true : false}> Close Button</Button>
                    </Grid>
                </Grid>

                <Grid sx={{ width: 100, marginTop: 2, }}>
                    <label>Message*</label>
                    <TextareaAutosize minRows={6} placeholder="" value={message} onChange={(e) => setMessage(e.target.value)} />
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                    <Grid >
                        <Button sx={{ height: 33, backgroundColor: "Black", borderColor: 'blue', color: '#fff' }} variant="outlined" startIcon={<UserAddOutlined />} onClick={() => setHideFile(!hideFile)}>Add Attachment</Button>
                        <Typography sx={{ color: '#1e9ff2', paddingTop: 1 }}>Max 5 files can be uploaded | Maximum upload size is 256MB | Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx</Typography>
                    </Grid>
                    <Grid>
                        <Button sx={{ height: 33, backgroundColor: "blue", borderColor: '', color: '#fff', paddingLeft: 8, paddingRight: 8 }} variant="outlined" startIcon={<RedEnvelopeFilled />} onClick={MyReplyTicketUpdateApi} disabled={mainData === "CLOSED" ? true : false}>Reply</Button>
                        <Toaster />
                    </Grid>
                </Grid>
                {
                    hideFile ? (
                        <Grid>
                            <Grid>
                                <Grid sx={''} >
                                    <TextField sx={{ width: "25%", marginTop: 2 }} id="outlined-basic" type='file' variant="outlined" helperText="Supported Files:.png, .jpg, .jpeg" onChange={(e) => setFile1(e.target.files[0])} />
                                    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <label>Status</label>
                                        <TextField sx={{ width: '100%' }} id="outlined-select-currency" onChange={(e) => setStatus1(e.target.value)} select label="" defaultValue="EUR"
                                        //   helperText="Please select your currency"
                                        >
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.value}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid sx={{ marginTop: 2 }}>
                                    <Button sx={{ height: 33, backgroundColor: "blue", borderColor: '', color: '#fff', paddingLeft: 8, paddingRight: 8 }} variant="outlined" startIcon={<CloudUploadOutlined />} onClick={MyPendingTicketUpdateApi}>Upload</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        null
                    )
                }

                <Grid sx={content}>
                    <Grid sx={{ borderRight: '1px solid #aaa', padding: 4 }}>
                        <Typography sx={{ fontSize: 18 }}><b>Demo Test</b></Typography>
                        {/* <a href="">@Demo Test</a>
                        <Grid sx={{ marginTop: 1 }}>
                            <Button sx={{ height: 26, backgroundColor: 'red', color: '#fff', borderColor: 'red' }} variant="outlined" href='./PendingTicket' startIcon={<DeleteOutlined />}> Delete</Button>
                        </Grid> */}
                    </Grid>

                    <Grid sx={{ padding: 4 }}>
                        <Typography sx={{ fontSize: 18 }}>Posted on Monday, 02nd September 2024 @ 06:03 am</Typography>
                        <Typography>Message</Typography>
                    </Grid>
                </Grid>
            </Box>



        </>
    )
}

export default replyTicket
