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
import { LogInHistory } from 'api/api'
import { EditOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { filter } from 'lodash';

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
  console.log('my date', date)
  const [loader, setLoader] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  console.log('from date', fromDate)
  console.log('to date', toDate)
  const [search, setSearch] = useState('');

  // console.log('first date', dayjs(date[0]).format('YYYY-MM-DD'))
  // console.log('second date', dayjs(date[1]).format('YYYY-MM-DD'))
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

    { id: 'userName', label: 'User', minWidth: 170 },
    { id: 'loginAt', label: 'Login at', minWidth: 100 },
    {
      id: 'systemIP',
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
      id: 'browser',
      label: 'Browser | OS',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    }
  ];

  useEffect(() => {
    LogInHistoryGetAllApi()
  }, [fromDate,toDate])

  const LogInHistoryGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await LogInHistory(search,fromDate,toDate);
      console.log('Login history data', response)
      if (response?.status === 200) {
        setRowsData(response?.data?.returnedPayments)
        // toast.success(response?.data?.message)
        setLoader(false)
        const transformedRows = response?.data?.loginModal?.map((item, index) => ({
          ...item,
          userName: <>
            <Typography>
              {item.userName} <br />
              <Typography sx={{ color: '#4634ff' }}>@{item.email}</Typography>
            </Typography>
          </>,
          location: <>
            {
              <Typography sx={''}>
                {(item.location)?.length > 20 ? item?.location.substring(0, 20) + '....' : item.location}
                {(item.location)?.length > 20 ?
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit">{item.location}</Typography>
                      </React.Fragment>
                    }
                  >
                    <Button >More</Button>
                  </HtmlTooltip>
                  :
                  ''
                }
              </Typography>
            }
          </>,
          systemIP: <>
            {
              <Typography sx={{ color: '#4634ff' }}>{item.systemIP ? `@${item.systemIP}` : ''}</Typography>
            }
          </>,
          date: item?.date?.split("T")[0],
        }))
        setRows(transformedRows)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Tootip area
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

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
                value={search}
                onChange={handleChange}
                label="Search by email" />
            </Grid>
            <Grid className={classes.searchIcon} onClick={LogInHistoryGetAllApi}>
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
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>


      <Box>
      </Box>

    </>
  )
}


export default loginHistory
