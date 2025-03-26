import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import toast, { Toaster } from 'react-hot-toast';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import { PendingTicketGetAllApi } from 'api/api'
import { EditOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
// import { LicenseInfo } from '@mui/x-license-pro';
import { NotificationHistory } from 'api/api'
import { NotificationHistoryGetById } from 'api/api'
import HashLoader from './HashLoaderCom';
import { border, borderBottom, display, fontSize, textAlign } from '@mui/system';
import { color } from 'framer-motion';
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
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  textAlign: 'center',
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
const text = {
  borderBottom: '1px solid #aaa',
  color: '#008479',
  fontSize: 18
}
const content = {
  // display:'flex',
  // justifyContent:' center',
  alignItem: 'center'
}
const input = {
  width: '100%',
  marginTop: 2,
}

// Style 

const notificationHistory = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState([]);
 
  // console.log('first date', dayjs(date[0]).format('YYYY-MM-DD'))
  // console.log('second date', dayjs(date[1]).format('YYYY-MM-DD'))
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => (true);
  const handleClose2 = () => setOpen2(false);
  const [rows, setRows] = React.useState([]);
  const [loader, setLoader] = useState(false);

  const [open3, setOpen3] = React.useState(false);
  const handleClose3 = () => setOpen3(false);
  const [rowsData, setRowsData] = React.useState([]);
  const [message, setMessage] = React.useState();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  console.log('from date', fromDate)
  console.log('to date', toDate)
  
  const handleOpen3 = () => {
    setOpen3(true);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [

    { id: 'userName', label: 'User', minWidth: 170 },
    { id: 'dateTime', label: 'Sent', minWidth: 100 },
    {
      id: 'sender',
      label: 'Sender	',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'subject',
      label: 'Subject',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    }
  ];

  useEffect(() => {
    MyNotificationGetAllApi()
  }, [fromDate,toDate])

  // Get all 
  const MyNotificationGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await NotificationHistory(search,fromDate, toDate);
      console.log('Notification history DATAAAAAA', response)
      if (response?.status === 200) { 
        setRowsData(response?.data?.notifications)
        // toast.success(response?.data?.msg)
        setLoader(false)
        const transformedRows = response?.data?.notifications.map((notifications, index) => ({
          ...notifications,
          dateTime: (<><Grid><Typography>{notifications?.dateTime?.split("T")[0]}</Typography> <br />
          </Grid></>),
          userName: (<><Grid><Typography>{notifications?.userName} <br /></Typography>
            <Typography sx={{color:'#4634ff', fontSize:16}}>{notifications?.userEmail}</Typography>
          </Grid></>),
          action: (
            <Stack justifyContent='end' spacing={2} direction="row">
              <Button variant="outlined" size="small" startIcon={<FundProjectionScreenOutlined />} onClick={() => {
                handleOpen3();
                MyNotificationGetByIdApi(notifications.id);
              }}>Details</Button>
            </Stack>
          )
        }))
        setRows(transformedRows)
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Get By Id 
  const MyNotificationGetByIdApi = async (id) => {
    setLoader(true)
    try {
      const response = await NotificationHistoryGetById(id);
      // console.log('Notification Get By Id DATAAAAAA', response)
      if (response?.status === 200) {
        setMessage(response?.data?.message)
        toast.success(response?.data?.msg)
        setLoader(false)
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }
    // Date filter
    const handleDateChange = (dates) => {
      if (dates && dates[0] && dates[1]) {
        setFromDate(dates[0].format('YYYY-MM-DD'));
        setToDate(dates[1].format('YYYY-MM-DD'));
      }
    };

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
          <b>Notification History</b>
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
                value={search}
                onChange={handleChange}
                label="Search by email" />
            </Grid>
            <Grid className={classes.searchIcon} onClick={MyNotificationGetAllApi}>
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
                  onChange={handleDateChange} />
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
                {
                  rows && rows.length > 0 ? (
                    rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          {columns?.map((column) => {
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
        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={content}>
              <Typography sx={{ fontSize: 24 }}>
                Notification message
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography sx={text}>{message}</Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>

    </>
  )
}

export default notificationHistory
