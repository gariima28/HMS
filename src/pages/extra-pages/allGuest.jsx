import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import HashLoader from './HashLoaderCom';
import { AllguestGetAllApi } from 'api/api'
import toast, { Toaster } from 'react-hot-toast';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { border, borderRadius, fontSize, padding, textAlign, width } from '@mui/system';
import { color } from 'framer-motion';
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
    border: '1px solid #4634ff',
    backgroundColor: '#4634ff',
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

const ban = {
  width: '40%',
  border: '1px solid #ece2df',
  borderRadius:'5px',
  color:'red',
  fontSize:'16px',
  padding:'1px',
  backgroundColor:'#ece2df'
}

const active = {
  width: '40%',
  border: '1px solid #daecea',
  borderRadius:'5px',
  fontSize:'16px',
  color:'#008479',
  padding:'1px',
  backgroundColor:'#daecea'
}

const content = {

}

const input = {
  width: '100%',
  marginTop: 2,
}
// Style 

const allGuest = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loader, setLoader] = useState(false)
  const [search, setSearch] = useState('')

  const [rowsData, setRowsData] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    MyActiveGuestGetAllApi()
  }, [])

  const MyActiveGuestGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await AllguestGetAllApi(search);
      console.log('All Guest DATAAAAAA', response)
      if (response?.status === 200) {
        setRowsData(response?.data?.guest)
        // toast.success(response?.data?.msg)
        setLoader(false)

        const transformedRows = response?.data?.guest.map((guest, index) => ({
          ...guest,
          dateTime: (<><Grid><Typography>{guest?.createdAt?.dateTime}</Typography> <br />
            <Typography>{guest?.createdAt?.weekDay}</Typography>
          </Grid></>),
          status: (<><Grid sx={{textAlign:'-webkit-center'}}><Typography sx={guest?.isActive ? active : ban}>{guest?.isActive ? "Active" : "Ban"}</Typography></Grid></>),
          action: (
            <Stack justifyContent='end' spacing={2} direction="row">
              <Link to={`/guestdetails/${guest.id}`}>
                <Button variant="outlined" size="small"  >
                  <Typography sx={{ paddingTop: .8, paddingRight: .4 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="#1677ff" d="m20 22.09l2.45 1.49l-.65-2.81l2.2-1.88l-2.89-.25L20 16l-1.13 2.64l-2.87.25l2.18 1.88l-.68 2.81zM14.08 21H2a2.074 2.074 0 0 1-2-2V5c.04-1.09.91-1.96 2-2h20c1.09.04 1.96.91 2 2v10.53c-.58-.53-1.25-.92-2-1.19V5H2v14h12.08c-.05.33-.08.66-.08 1s.03.68.08 1M14 17H4v-1.25c0-1.66 3.34-2.5 5-2.5s5 .84 5 2.5zm0-6h4v1h-4zM9 7C7.63 7 6.5 8.13 6.5 9.5S7.63 12 9 12s2.5-1.13 2.5-2.5S10.37 7 9 7m5 2h6v1h-6zm0-2h6v1h-6z" />
                    </svg>
                  </Typography>
                  Details</Button>
              </Link>
            </Stack>
          )
        }))
        setRow(transformedRows)
      } else {
        // toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [

    { id: 'firstName', label: 'User', minWidth: 170 },
    { id: 'email', label: 'Email-Mobile', minWidth: 100 },
    {
      id: 'countryCode',
      label: 'country-Code',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'dateTime',
      label: 'Joined At',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    }
  ];

  const rows = [
    {
      name: 'India', code: 'IN', population: 'India', valid: 'grow',
      size:
        <>
          {/* <Link to={'/guestdetails'}>
        <Button sx={{ marginLeft: 2, height: 30, borderColor: '#4634ff', color: '#4634ff' }} variant="outlined" >
        Details12
        </Button>
        </Link> */}

        </>
    },

  ];


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
          <b>All Guests</b>
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
              label="Search By Email" />
          </Grid>
          <Grid className={classes.searchIcon} onClick={MyActiveGuestGetAllApi}>
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
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  row && row.length > 0 ? (
                    row
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
        <Modal
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
        </Modal>
        {/* second  Modals area  */}
        <Modal
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
              <Button sx={{ backgroundColor: "#eb2222", color: '#fff' }} variant="contained" href="#contained-buttons">
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
        {/* third  Modals area  */}
        <Modal
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
        </Modal>
      </Box>

    </>
  )
}

export default allGuest
