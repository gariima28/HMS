import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import toast, { Toaster } from 'react-hot-toast';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import HashLoader from './HashLoaderCom';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { makeStyles } from '@mui/styles';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import { BookingActionReport } from 'api/api'
import { EditOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import NoDataFound from 'pages/NoDataFound';


// Style
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

const bookingAction = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loader, setLoader] = useState(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [rows, setRows] = React.useState([]);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [rowsData, setRowsData] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = +event.target.value;
    setRowsPerPage(newSize);
    setPageSize(newSize);
    setPage(1);
  };;

  const columns = [
    { id: 'bookingNo', label: 'Booking No', minWidth: 170 },
    {
      id: 'actionBy',
      label: 'Action By',
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
    },
  ];

  useEffect(() => {
    MyPendingTicketGetAllApi()
  }, [page, rowsPerPage])


  const MyPendingTicketGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await BookingActionReport(search, page, rowsPerPage);
      console.log('Booking Action data', response)
      if (response?.status === 200) {
        const { currentPage, totalPages, pageSize, reports, notifications } = response.data;

        setCurrentPage(currentPage);
        setTotalPages(totalPages);
        setPageSize(pageSize);

        const transformedRows = response?.data?.bookingReport?.map((booking, index) => ({
          ...booking,
          date: booking?.date?.split("T")[0],
          bookingNo: (<>
            <Grid>
              <Typography sx={{ color: '#4634ff', fontWeight: 700 }}>
                <b>{booking.bookingNo}</b>
              </Typography>
            </Grid>
          </>),
        }))

        setRows(transformedRows)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
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
          <b>Booking Situation Report</b>
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
              label="Search by booking no" />
          </Grid>
          <Grid className={classes.searchIcon} onClick={MyPendingTicketGetAllApi}>
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
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{ backgroundColor: "#0D6A84", color: '#fff' }}                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows && rows.length > 0 ? (
                  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}
                        sx={{
                          backgroundColor: index % 2 === 0 ? 'transparent' : '#F2F3F6BF',
                          '&:hover': {
                            backgroundColor: '#ffffff' // Keep the same color on hover or adjust as needed
                          }
                        }}>
                        {columns?.map((column) => {
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
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      <NoDataFound />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {/* <TableBody>
                {
                  rows && rows.length > 0 ? (

                    rows?.map((row, index) => {

                      rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {

                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {columns?.map((column) => {
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

              </TableBody> */}
            </Table>
          </TableContainer>
          <TablePagination
            // rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalPages * rowsPerPage}
            rowsPerPage={rowsPerPage}
            page={page - 1}
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

export default bookingAction
