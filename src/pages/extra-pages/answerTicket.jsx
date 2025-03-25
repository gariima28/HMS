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
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import { AnsweredTicketGetAllApi } from 'api/api'
import { EditOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import { makeStyles } from '@mui/styles';

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


  high: {
    border: '1px solid #eb2222',
    borderRadius: 10,
    fontSize: 12,
    backgroundColor: 'rgba(234, 84, 85, 0.1)',
    color: '#eb2222',
  },
  enable: {
    border: '1px solid #ff9f43',
    borderRadius: 10,
    fontSize: 13,
    backgroundColor: 'rgba(255, 159, 67, 0.1)',
    color: '#ff9f43',
  },

  green: {
    border: '1px solid #28c76f',
    borderRadius: 10,
    fontSize: 13,
    backgroundColor: 'rgba(40, 199, 111, 0.1)',
    color: '#28c76f',

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
const input = {
  width: '100%',
  marginTop: 2,
}

// Style 


const answerTicket = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loader, setLoader] = useState(false)
  const [search, setSearch] = useState('')

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
    MyAnsweredTicketGetAllApi()
  }, [])


  const MyAnsweredTicketGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await AnsweredTicketGetAllApi(search);
      console.log('Answered Ticket DATAAAAAA', response)
      if (response?.status === 200) {
        setRowsData(response?.data?.tickets)
        // toast.success(response?.data?.msg)
        setLoader(false)
        const transformedRows = response?.data?.answerTicket?.map((tickets, index) => ({
          ...tickets,
          priority: (<>
            <Grid sx={{ width: "100px", marginLeft: 5 }}>
              <Typography className={`${tickets?.priority === null ? `${classes.enable}` : `${classes.high}`}`}> {tickets?.priority === null ? 'N-I-R' : tickets?.priority}</Typography>
            </Grid></>),
          dateTime: (
            <><Grid><Typography>{tickets?.createdAt?.dateTime}</Typography> <br />
              <Typography>{tickets?.createdAt?.weekDay}</Typography>
            </Grid></>
          ),
          status: (<>
            <Grid sx={{ width: "100px", marginLeft: 5 }}>
              <Typography className={`${tickets?.status === 'ANSWERED' ? `${classes.green}` : `${classes.closed}`}`}> {tickets?.status}</Typography>
            </Grid></>),
              priority: (<>
                <Grid sx={{ width: "100px", marginLeft: 5 }}>
                  <Typography className={`${tickets?.priority === null ? `${classes.enable}` : `${classes.high}`}`}> {tickets?.priority === null ? 'N-I-R' : tickets?.priority}</Typography>
                </Grid></>),
          action: (
            <Stack justifyContent='end' spacing={2} direction="row">
              <Button variant="outlined" size="small" startIcon={<FundProjectionScreenOutlined />} href={`./replyticket/${tickets.ticketNumber}`}>Details</Button>
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
          <b>Answered Tickets</b>
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
              label="Search input" />
          </Grid>
          <Grid className={classes.searchIcon} onClick={MyAnsweredTicketGetAllApi}>
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
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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


    </>
  )
}

export default answerTicket
