import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from "swr";
import axios from 'axios';
import { useParams } from 'react-router';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow'

// import { useForm } from 'react-hook-form';

// const LocalGirjesh = 'http://192.168.20.109:5001';
const ServerIP = 'https://www.auth.edu2all.in/hms'
const token = `Bearer ${localStorage.getItem('token')}`;

// Custom Button CSS using Material UI Styles
const CustomButton = styled(Button)(({ status }) => ({
  borderRadius: '50px',
  backgroundColor: status === 'enable' ? '#E6F4EA' : '#fee5e5',
  borderColor: status === 'enable' ? '#57C168' : 'red',
  color: status === 'enable' ? '#57C168' : 'red',
  padding: '2px 26px',
  fontSize: '12px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: status === 'enable' ? '#D4ECD9' : '#fccfcf',
    borderColor: status === 'enable' ? '#57C168' : 'red',
    color: status === 'enable' ? '#57C168' : 'red'
  },
}));

// Table Columns
const columns = [
  { id: 'sno', label: 'S.No', minWidth: 100 },
  { id: 'roomNo', label: 'Room Number', minWidth: 120 },
  { id: 'roomType', label: 'Room Type', minWidth: 120 },
  { id: 'fare', label: 'Fare', minWidth: 100 },
  { id: 'cancelationFee', label: 'Cancellation Fee', minWidth: 100 },
  { id: 'refundable', label: 'Refundable', minWidth: 100 },
  // { id: 'action', label: 'Action', minWidth: 100, align: 'center' },
];

// API Call when ever data updates 
const fetcher = (url) => axios.get(url, { headers: { Authorization: token } }).then(res => res.data);

const CancelBookingPage = () => {

  const { id } = useParams();
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const [rows, setRows] = useState([]);
  // get API
  const { data, error } = useSWR(`${ServerIP}/booking/getByBookingId/${id}`, fetcher);

  // Function to refresh the data
  const refreshData = () => {
    mutate(`${ServerIP}/booking/getAllPremBooking`);
  };

  // useEffect
  useEffect(() => {
    if (data) {
      // setMsgToaster(data?.message)
    console.log(data?.booking, 'data');
    // const transformedRows = data.booking.map((booking, index) => ({
    //   ...booking,
    //   sno: index + 1,
    //   cost: booking.cost ?? '-',
    //   total: booking.total ?? '-',
    //   addedBy: booking.addedBy ?? '-',
    //   quantity: booking.quantity[0] ?? '-',
    //   service: booking.premiumServiceList ?? '-',
    //   status: <CustomButton variant="outlined" status={`${booking.status ? 'enable' : 'disable'}`}> {booking.status ? 'Enabled' : 'Disabled'} </CustomButton>,
    //   // action: (
    //   //   <Stack justifyContent='end' spacing={2} direction="row">
    //   //     <Stack justifyContent='end' spacing={2} direction="row">
    //   //       <Button variant="outlined" size="small" startIcon={<Edit />} onClick={() => handleDialogState('Update New BedTypes', 'Update', BedType.bedTypeId)}>Edit</Button>
    //   //       <Button variant="outlined" size="small" startIcon={<DeleteOutline />} color="error" onClick={() => handleDeleteButton(BedType?.bedTypeId)}>Delete</Button>
    //   //     </Stack>
    //   //   </Stack>
    //   // ),
    // }));
    // setRows(transformedRows);
    }
  }, [data]);

  if (error) { <Typography variant="subtitle1">- Error loading data</Typography> };
  if (!data) return <Typography variant="subtitle1">Speed is slow from Backend &nbsp; : - &nbsp; Loading Data...</Typography>;

  return (
    <Box>
      {/* Heading */}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h5">Cancel Booking</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Button variant="outlined" onClick={() => handleDialogState('Add New Amenities', 'Create')}>
              + Add New
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Grid sx={{backgroundColor: '#fff', p:3}}>
        {/* Data Table */}
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
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell>1</TableCell>
                <TableCell>{data?.booking?.roomNo}</TableCell>
                <TableCell>{data?.booking?.roomNo}</TableCell>
                <TableCell>{data?.booking?.roomNo}</TableCell>
                <TableCell>{data?.booking?.roomNo}</TableCell>
                <TableCell>{data?.booking?.refundable ? data?.booking?.refundable : 0}</TableCell>
              </TableRow>
              {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id || index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

    </Box>
  );
};

export default CancelBookingPage
