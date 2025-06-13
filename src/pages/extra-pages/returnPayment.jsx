import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import toast, { Toaster } from 'react-hot-toast';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import HashLoader from './HashLoaderCom';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import { ReturnPaymentReport } from 'api/api'
import { EditOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import { makeStyles } from '@mui/styles';
import NoDataFound from 'pages/NoDataFound';

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
    border: '1px solid #0D6A84',
    backgroundColor: '#0D6A84',
    borderLeft: '0px',
    borderRadius: "0px 3px 3px 0px"
  },

});

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
const input = {
  width: '100%',
  marginTop: 2,
}
// Style 

const returnPayment = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [loader, setLoader] = useState(false);

  const [open2, setOpen2] = React.useState(false);

  const [rows, setRows] = React.useState([]);

  const [open3, setOpen3] = React.useState(false);

  const [rowsData, setRowsData] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [

    { id: 'bookingNo', label: 'Booking No', minWidth: 170 },
    { id: 'userName', label: 'User', minWidth: 100 },
    {
      id: 'pendingAmount',
      label: 'Amount	',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'issuedBy',
      label: 'Issued By',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'date',
      label: 'Date',
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

  useEffect(() => {
    MyReturnPaymentGetAllApi()
  }, [])

  const MyReturnPaymentGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await ReturnPaymentReport(search);
      console.log('Return payment data', response)
      if (response?.status === 200) {
        setRowsData(response?.data?.returnedPayments)
        // toast.success(response?.data?.message)
        setLoader(false)
        const transformedRows = response?.data?.returnedPayments?.map((payments, index) => ({
          ...payments,
          userName: <>
            <Typography>
              {payments.userName} <br />
              <Typography sx={{ color: '#0D6A84' }}>
                <b>{`@${payments.userEmail}`}</b>
              </Typography>
            </Typography>
          </>,
          date: payments?.date?.split("T")[0],
        }))
        setRows(transformedRows)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const trimmedValue = e.target.value.trimStart();
    setSearch(trimmedValue);
  };
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
          <b>Returned Payments History</b>
        </Grid>
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
              value={search}
              onChange={handleChange}
              label="Search by email" />
          </Grid>
          <Grid className={classes.searchIcon} onClick={MyReturnPaymentGetAllApi}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
              <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.9" d="m5 27l7.5-7.5M28 13a9 9 0 1 1-18 0a9 9 0 0 1 18 0" />
            </svg>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: 5 }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{ backgroundColor: "#0D6A84", color: '#fff' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows && rows.length > 0 ? (
                    rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}
                          sx={{
                            backgroundColor: index % 2 === 0 ? 'transparent' : '#F2F3F6BF',
                            '&:hover': {
                              backgroundColor: '#ffffff' // Keep the same color on hover or adjust as needed
                            }
                          }}>
                          {columns.map((column) => {
                            const value = row[column.id];
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
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows?.length}
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

export default returnPayment
