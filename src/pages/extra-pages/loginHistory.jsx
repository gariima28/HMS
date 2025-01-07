import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import toast, { Toaster } from 'react-hot-toast';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import dayjs from 'dayjs';
import { makeStyles } from '@mui/styles';
import HashLoader from './HashLoaderCom';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import { LoginHistory } from 'api/api'
import { EditOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';


const useStyles = makeStyles({
  searchBar: {
    display: 'flex'
  },

  search: {
    borderRadius: '0px'
  },

  searchIcon: {
    height: 39,
    paddingTop: 6,
    padding: '2px 8px',
    border: '1px solid #4634ff',
    backgroundColor: '#4634ff',
    borderLeft: '0px',
    borderRadius: "0px 3px 3px 0px"
  },

  forHover: {
    '&:hover': {
      color: "#fff",
      backgroundColor: '#4634ff',
    },
  }
});

const loginHistory = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [date, setDate] = React.useState([]);
  const [loader, setLoader] = useState(false);

  console.log('first date', dayjs(date[0]).format('YYYY-MM-DD'))
  console.log('second date', dayjs(date[1]).format('YYYY-MM-DD'))
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [rows, setRows] = React.useState([]);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [rowsData, setRowsData] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [

    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'loginat', label: 'Login at', minWidth: 100 },
    {
      id: 'ip	',
      label: 'IP	',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'location',
      label: 'Location',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'browser_|_os',
      label: 'Browser | OS',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    }
    //   {
    //     id: 'action',
    //     label: 'Action',
    //     minWidth: 170,
    //     align: 'right',
    //     format: (value) => value.toLocaleString('en-US'),
    //   }
  ];

  // const row = [
  //   {
  //     name: 'India', code: 'IN', population: 'India',valid:'grow',
  //     size:
  //       <>
  //         <Button sx={{ marginLeft: 2, height: 30, borderColor: '#4634ff', color: '#4634ff' }} variant="outlined"  href='./guestdetails'>
  //           {/* <AddIcon /> */} Details</Button>
  //       </>
  //   },

  // ];

  // useEffect(() => {
  //   MyReturnPaymentGetAllApi()
  // }, [])

  // const MyReturnPaymentGetAllApi = async () => {
  //   setLoader(true)
  //   try {
  //     const response = await ReturnPaymentReport();
  //     console.log('Return payment data', response)
  //     if (response?.status === 200) {
  //       setRowsData(response?.data?.returnedPayments)
  //       toast.success(response?.data?.message)
  //       setLoader(false)
  //       const transformedRows = response?.data?.returnedPayments?.map((payments, index) => ({
  //         ...payments,  
  //         userName: <>
  //         <Typography>
  //         {payments.userName} <br />
  //         {payments.userEmail}
  //         </Typography>
  //         </>,
  //         date: payments?.date?.split("T")[0],
  //       }))
  //       setRows(transformedRows)
  //     } else {
  //       toast.error(response?.data?.message);
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
          <b>User Login History</b>
        </Grid>

        <Grid sx={{ display: 'flex' }}>
          <Grid className={classes.searchBar}>
            <Grid className={classes.search}>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    height: 39,
                    boxShadow: 'none'
                  },
                }}
                label="Search input" />
            </Grid>
            <Grid className={classes.searchIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
                <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.9" d="m5 27l7.5-7.5M28 13a9 9 0 1 1-18 0a9 9 0 0 1 18 0" />
              </svg>
            </Grid>
          </Grid>
          <Grid sx={{ paddingTop: 0 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{ paddingTop: 0, marginLeft: 1 }} components={['SingleInputDateRangeField']}>
                <DateRangePicker
                  slots={{ field: SingleInputDateRangeField }}
                  name="allowedRange"
                  onChange={(range) => setDate(range)} />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
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
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column?.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Box>
        {/* first  Modals area  */}
        {/* Update modal  */}
        {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={content}>
            <Typography sx={{ fontSize: 24 }}>
              Update Staff
            </Typography>
            <Box>
              <TextField sx={input} required id="outlined-required" label="Name" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
              <TextField sx={{ ...input, marginTop: 3 }} required id="outlined-required" label="Username" defaultValue="" placeholder='Enter UserName' InputLabelProps={{ sx: { fontSize: '15px' } }} />
              <TextField sx={{ ...input, marginTop: 3 }} required id="outlined-required" label="Email" defaultValue="" placeholder='Enter Email' InputLabelProps={{ sx: { fontSize: '15px' } }} />
              <TextField sx={{ ...input, marginTop: 3 }} required id="outlined-required" label="Role" defaultValue="" placeholder='Enter Role' InputLabelProps={{ sx: { fontSize: '15px' } }} />
              <TextField sx={{ ...input, marginTop: 3 }} required id="outlined-required" label="Password" defaultValue="" placeholder='Enter Password' InputLabelProps={{ sx: { fontSize: '15px' } }} />

              <Box sx={{ textAlign: "center", marginTop: 4, width: '100%' }}>
                <Button sx={{ width: '100%' }} variant="contained" disableElevation>
                  Submit
                </Button>
              </Box>

            </Box>
          </Box>
        </Box>
      </Modal> */}
        {/* second  Modals area */}
        {/* confirm modal */}
        {/* <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography sx={{ fontSize: 25 }} id="modal-modal-title" variant="h6" component="h2">
            Confirmation Alert!
          </Typography>
          <hr />
          <Typography sx={{ ml: 2, mt: 2 }} id="modal-modal-description" >
            Are you sure to ban this staff?
          </Typography>
          <Box sx={{ textAlign: "right" }}>
            <Button sx={{backgroundColor:"#eb2222",color:'#fff'}} variant="contained" href="#contained-buttons">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal> */}
        {/* third  Modals area  */}
        {/* Add modal  */}
        {/* <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={content}>
            <Typography sx={{ fontSize: 24 }}>
              Add Staff
            </Typography>
            <Box>
              <TextField sx={input} required id="outlined-required" label="Name" defaultValue="" placeholder='Enter Name' InputLabelProps={{ sx: { fontSize: '15px' } }} />
              <TextField sx={{ ...input, marginTop: 3 }} required id="outlined-required" label="Username" defaultValue="" placeholder='Enter UserName' InputLabelProps={{ sx: { fontSize: '15px' } }} />
              <TextField sx={{ ...input, marginTop: 3 }} required id="outlined-required" label="Email" defaultValue="" placeholder='Enter Email' InputLabelProps={{ sx: { fontSize: '15px' } }} />
              <TextField sx={{ ...input, marginTop: 3 }} required id="outlined-required" label="Role" defaultValue="" placeholder='Enter Role' InputLabelProps={{ sx: { fontSize: '15px' } }} />
              <TextField sx={{ ...input, marginTop: 3 }} required id="outlined-required" label="Password" defaultValue="" placeholder='Enter Password' InputLabelProps={{ sx: { fontSize: '15px' } }} />

              <Box sx={{ textAlign: "center", marginTop: 4, width: '100%' }}>
                <Button sx={{ width: '100%' }} variant="contained" disableElevation>
                  Submit
                </Button>
              </Box>

            </Box>
          </Box>
        </Box>
      </Modal> */}
      </Box>

    </>
  )
}

export default loginHistory
