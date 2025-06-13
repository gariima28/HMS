import { Box, Button, Grid, InputLabel, MenuItem, TextareaAutosize, TextField, Typography, } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import { border, borderColor, borderRadius, margin, padding, width } from '@mui/system';
import { color } from 'framer-motion';
import HashLoader from './HashLoaderCom';
import { ReportAndRequestPostApi } from 'api/api'
import { ReportAndRequestGetAllApi } from 'api/api'
import NoDataFound from 'pages/NoDataFound';

// Style 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
};
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
const content = {

}
const inputMargin = {
    marginTop: -10
}
const input = {
    width: '100%',
    marginTop: 2,
    marginBottom: 1
}
const bothButton = {
    marginLeft: 2,
    height: 39,
    color: '#ff9f43',
    borderColor: " #ff9f43"
}
const forHover = {
    '&:hover': {
        color: "#fff",
        backgroundColor: '#ff9f43',
        borderColor: '#ff9f43'
    },
}
const forHover2 = {
    '&:hover': {
        color: "#fff",
        backgroundColor: '#28c76f',
        borderColor: '#28c76f'
    },
}
// Style 

const reportRequest = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loader, setLoader] = useState(false)

    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [open3, setOpen3] = useState(false);
    const [show, setShow] = useState(true);

    const [type, setType] = useState();
    const [message, setMessage] = useState();

    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);



    const [row, setRow] = useState([]);
    const [rowsData, setRowsData] = React.useState([]);
    const [InValidMessageError, setInValidMessageError] = useState(false);

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    const navigate = useNavigate()
    const columns = [

        { id: 'type', label: 'Type', minWidth: 140 },
        { id: 'message', label: 'Message', minWidth: 100 },
        { id: 'status', label: 'Status', minWidth: 140, align: 'center', format: (value) => value.toLocaleString('en-US'), },

    ];

    const rows = [
        {
            name: 'India', code: 'IN', population: 'India',
            action:
                <>
                    <Button sx={{ marginLeft: 2, height: 30, borderColor: '#4634ff', color: '#4634ff' }} variant="outlined" onClick={handleOpen}>
                        Edit</Button>
                    <Button sx={{ marginLeft: 2, height: 30, borderColor: '#eb2222', color: '#eb2222' }} variant="outlined" onClick={handleOpen2}>
                        Ban</Button>
                    <Button sx={{ marginLeft: 2, height: 30, borderColor: '#10163a', color: '#10163a' }} variant="outlined">
                        Login</Button>
                </>
        }
    ];

    // Validation 

    const FuncValidate = () => {
        const isValid = true
        if (!message || message === "" || !/^[A-Za-z\s]+$/.test(message)) {
            setInValidMessageError(true)
            setLoader(false)
            isValid(false)
        }
        return isValid
    }

    const handleMessage = (e2) => {
        setMessage(e2)
        const nameRegex = /^[A-Za-z\s]+$/;
        setInValidMessageError(nameRegex.test(e2))
        if (e2 === '' || !nameRegex.test(e2)) {
            setInValidMessageError(true)
        } else {
            setInValidMessageError(false)
        }
    }
    // Validation 

    useEffect(() => {
        MyReportRequestGetAllApi();
    }, [page, rowsPerPage]);

    const offcanvasRef = useRef(null);

    // post api 
    const MyReportAndRequestPostApi = async () => {
        if (FuncValidate()) {
            const formData = new FormData()
            formData.append('type', type);
            formData.append('message', message);

            setLoader(true)
            try {
                const response = await ReportAndRequestPostApi(formData);
                console.log('Report and request post api response', response)
                if (response?.data?.status === "success") {
                    toast.success(response?.data?.message);
                    MyReportRequestGetAllApi()
                    setLoader(false)
                    setOpen3(false)
                    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
                    offcanvasInstance.hide();
                    setShow(false)
                    setTimeout(() => {
                        setShow(true)
                    }, 0.5)
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        const newSize = +event.target.value;
        setRowsPerPage(newSize);
        setPageSize(newSize);
        setPage(1);
    };

    // Get all 
    const MyReportRequestGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await ReportAndRequestGetAllApi(page, rowsPerPage);
            console.log('Report and request DATAAAAAA', response)
            if (response?.status === 200) {
                const { currentPage, totalPages, pageSize, reports, notifications } = response.data;

                setCurrentPage(currentPage);
                setTotalPages(totalPages);
                setPageSize(pageSize);

                const transformedRows = response?.data?.reports.map((reports, index) => ({
                    ...reports,
                    //   dateTime: (<><Grid><Typography>{reports?.dateTime?.split("T")[0]}</Typography> <br />
                    //   </Grid></>),
                    //   action: (
                    //     <Stack justifyContent='end' spacing={2} direction="row">
                    //       <Button variant="outlined" size="small" startIcon={<FundProjectionScreenOutlined />} onClick={() => {
                    //         handleOpen3();
                    //         MyNotificationGetByIdApi(notifications.id);
                    //       }}>Details</Button>
                    //     </Stack>
                    //   )

                }))
                setRow(transformedRows)
            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoader(false);
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
            </Box>

            <Box sx={{ margin: 0, fontSize: 20, display: "flex", justifyContent: "space-between" }}>
                <Grid>
                    <b>Your Listed Report & Request</b>
                </Grid>
                <Grid>
                    <Button sx={{ ...forHover, borderColor: '#ff9f43', backgroundColor: "#fff", color: '#ff9f43', marginRight: 1 }} variant="outlined" onClick={handleOpen3}> {/* <AddIcon /> */}Report a bug</Button>
                    <Button sx={{ ...forHover2, borderColor: '#0D6A84', backgroundColor: "#fff", color: '#0D6A84' }} variant="outlined" onClick={() => window.open('https://www.scriza.in','_blank')}> {/* <AddIcon /> */}Request for Support</Button>
                </Grid>
            </Box>
            <Box sx={{ marginTop: 5 }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns?.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                            sx={{ backgroundColor: "#0D6A84", color:'#fff' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    row && row.length > 0 ? (
                                        row?.map((item, index) => {
                                            return (

                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    {columns?.map((column) => {
                                                        const value = item[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}

                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })
                                    )
                                        :
                                        (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} align="center">
                                                    <NoDataFound />
                                                </TableCell>
                                            </TableRow>
                                        )
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={totalPages * rowsPerPage} 
                        rowsPerPage={rowsPerPage}
                        page={page - 1} 
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    
                    {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={rows.length}
                        // count={totalPages}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                </Paper>
            </Box>


            {
                show && (
                    <Box>
                        <Modal
                            open={open3}
                            onClose={handleClose3}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            ref={offcanvasRef}
                        >
                            <Box sx={style}>
                                <Box sx={content}>
                                    <Typography sx={{ fontSize: 24, marginBottom: 2 }}>
                                        Add Staff
                                    </Typography>
                                    <Box>
                                        <Typography sx={{ marginBottom: -1 }}>
                                            <label htmlFor="" >Type <span sx={{ color: 'red' }}>*</span></label>
                                        </Typography>
                                        <TextField id="outlined-select-currency" sx={{ ...input, color: "#000" }} select label="Type" onChange={(e) => setType(e.target.value)} helperText="" >
                                            <MenuItem value="Report Bugs">
                                                <Typography>Report Bug</Typography>
                                            </MenuItem>
                                            <MenuItem value="Pending Payment Guest">
                                                <Typography>Feature Request</Typography>
                                            </MenuItem>
                                        </TextField>
                                        <Typography sx={{ marginBottom: 1 }}>
                                            <label htmlFor="" >Message <span sx={{ color: 'red' }}>*</span></label>
                                        </Typography>

                                        <Typography sx={{ width: '100%' }}>
                                            <TextareaAutosize
                                                minRows={6}
                                                placeholder="Write here"
                                                onChange={(e) => handleMessage(e.target.value)}
                                            />
                                        </Typography>
                                        <Box >
                                            {
                                                InValidMessageError && (
                                                    <Typography sx={{ color: 'red', fontSize: 14, }}>
                                                        Message is required
                                                    </Typography>
                                                )
                                            }
                                        </Box>
                                        <Box sx={{ textAlign: "center", marginTop: 4, width: '100%' }}>
                                            <Button sx={{ width: '100%' }} variant="contained" disableElevation onClick={MyReportAndRequestPostApi}>
                                                Submit
                                            </Button>
                                            <Toaster />
                                        </Box>

                                    </Box>
                                </Box>
                            </Box>
                        </Modal>
                    </Box>

                )


            }



        </>
    )
}

export default reportRequest
