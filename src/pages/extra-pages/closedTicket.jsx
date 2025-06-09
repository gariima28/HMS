import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import toast, { Toaster } from 'react-hot-toast';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import HashLoader from './HashLoaderCom';
import { Link } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import { ClosedTicketGetAllApi } from 'api/api'
import { EditOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import { makeStyles, styled } from '@mui/styles';
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

  enable: {
    border: '1px solid #ff9f43',
    borderRadius: 10,
    fontSize: 12,
    backgroundColor: 'rgba(255, 159, 67, 0.1)',
    color: '#ff9f43',
  },
  closed: {
    border: '1px solid #000',
    borderRadius: 10,
    fontSize: 12,
    backgroundColor: 'rgba(88, 81, 74, 0.1)',
    color: '#000',
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

const DetailsButton = styled(Button)(() => ({
  borderRadius: '20px',
  backgroundColor: 'transparent',
  borderColor: '#0D6A84',
  color: '#0D6A84',
  fontSize: '0.825rem',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#4634ff',
    borderColor: '#4634ff',
    color: '#fff',
  },
}));

// Style 


const closedTicket = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loader, setLoader] = useState(false)

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [rows, setRows] = React.useState([]);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [rowsData, setRowsData] = React.useState([]);

  const [search, setSearch] = useState('')

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
  };

  const columns = [
    { id: 'subject', label: 'Subject', minWidth: 170 },
    { id: 'userEmail', label: 'Submitted By', minWidth: 100 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'priority',
      label: 'Priority',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'dateTime',
      label: 'Last Reply',
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

  useEffect(() => {
    MyPendingTicketGetAllApi()
  }, [page, rowsPerPage])

  const MyPendingTicketGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await ClosedTicketGetAllApi(search, page, rowsPerPage);
      console.log('Closed Ticket DATAAAAAA', response)
      if (response?.status === 200) {

        const { currentPage, totalPages, pageSize, reports, notifications } = response.data;

        setCurrentPage(currentPage);
        setTotalPages(totalPages);
        setPageSize(pageSize);

        const transformedRows = response?.data?.tickets.map((tickets, index) => ({
          ...tickets,
          priority: (<>
            <Grid sx={{ width: "100px", marginLeft: 5 }}>
              <Typography className={`${tickets?.priority === null ? `${classes.enable}` : `${classes.high}`}`}> {tickets?.priority === null ? 'N-I-R' : tickets?.priority}</Typography>
            </Grid></>),
          dateTime: (<><Grid><Typography>{tickets?.createdAt?.dateTime}</Typography></Grid></>),
          status: (<>
            <Grid sx={{ width: "100px", marginLeft: 5 }}>
              <Typography className={`${tickets?.status === 'CLOSED' ? `${classes.closed}` : `${classes.green}`}`}> {tickets?.status}</Typography>
            </Grid></>),
          action: (
            <Stack justifyContent='end' spacing={2} direction="row">
              <Link to={`/replyticket/${tickets.ticketNumber}`}>
                <DetailsButton variant="outlined" size="small" startIcon={<FundProjectionScreenOutlined />} >Details</DetailsButton>
              </Link>
            </Stack>
          )
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
          <b>Closed Tickets</b>
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
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{ backgroundColor: "#0D6A8426" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows && rows.length > 0 ? (
                    rows?.map((row, index) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}
                          sx={{
                            backgroundColor: index % 2 === 0 ? 'transparent' : '#F2F3F6BF',
                            '&:hover': {
                              backgroundColor: '#ffffff' // Keep the same color on hover or adjust as needed
                            }
                          }}
                        >
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

export default closedTicket
