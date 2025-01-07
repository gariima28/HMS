import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, InputAdornment, InputLabel, OutlinedInput, Snackbar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Computer } from '@mui/icons-material';
import useSWR, { mutate } from 'swr';
import { getAllPaymentDetailsByBookingId, postPaymentByBookingId } from 'api/api';
import { useForm } from 'react-hook-form';

const inputStyles = (error) => ({
  p: 0,
  mb: 2,
  width: '100%',
  boxShadow: 'none',
  backgroundColor: '#fff',
  border: 'none',
  border: error ? '1px solid red' : 'none',
  '&.Mui-focused': {
    borderColor: error ? '#ff4d4f' : '#e0e0e0',
    boxShadow: 'none',
    border: 'none',
  },
  '&:hover': {
    borderColor: error ? '#ff4d4f' : '#e0e0e0',
    border: 'none',
  },
});

const PaymentInBookings = () => {

  const navigate = useNavigate()
  const { id } = useParams();
  const [guestInfoData, setguestInfoData] = useState([]);
  const [paymentSummaryData, setpaymentSummaryData] = useState([]);
  const [paymentInfoData, setpaymentInfoData] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  useEffect(() => {
    refreshData();
  }, [id])

  const refreshData = async () => {
    try {
      const response = await getAllPaymentDetailsByBookingId(id);

      if (response?.status === 200 && response?.data?.status === 'success') {
        setguestInfoData(response?.data?.bookingDetails?.guestInfoData)
        setpaymentSummaryData(response?.data?.bookingDetails?.paymentSummaryData)
        setpaymentInfoData(response?.data?.bookingDetails?.paymentInfoData)
      } else {
        console.error('Failed to fetch rooms:', response?.data?.message);
      }
    } catch (error) {
      console.error('Error fetching available rooms:', error);
    }
  };

  const doPayment = async (data) => {
    try {
      const formData = new FormData();
      formData.append('amount', data?.payingAmount)
      const response = await postPaymentByBookingId(id, formData);

      if (response?.status === 200 && response?.data?.status === 'success') {
        handleSnackbarMessage(response?.data?.message, 'success');
        setTimeout(() => {
          navigate('/allBookings')
        }, 1000);
      } else {
        console.error('Failed to fetch rooms:', response?.data?.message);
      }
    } catch (error) {
      console.error('Error fetching available rooms:', error);
    }
  };

  const handleSnackbarMessage = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };


  return (
    <Box>
      {/* Heading */}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ color: '#34495e' }}>Bill Payment</Typography>
        </Grid>
        <Grid>
          <Stack justifyContent='start' spacing={2} direction="row">
            <Button variant="contained" sx={{ backgroundColor: '#28c76f', color: '#fff', '&:hover': { backgroundColor: '#28c76f', color: '#fff' } }}>
              + Add Extra Charges
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#eb2222', color: '#fff', '&:hover': { backgroundColor: '#eb2222', color: '#fff' } }}>
              - Subtract Extra Charges
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Grid container rowSpacing={3} columnSpacing={2}>
        {guestInfoData.length !== 0 &&
          <Grid item xs={12} lg={6}>
            <Box sx={{ backgroundColor: '#fff', borderRadius: '10px', p: 1 }}>
              <Typography variant="h5" sx={{ color: '#34495e', fontWeight: 600, my: 1 }}>Guest Info</Typography>
              <TableContainer >
                <Table aria-label="simple table" sx={{ border: '1px solid #f1f1f1' }}>
                  <TableBody>
                    {guestInfoData?.map((data) => (
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" sx={{ color: '#34495e', fontWeight: 900 }}>{data?.key}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6" sx={{ color: '#34495e' }}>{data?.value}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        }
        {paymentSummaryData.lebgth !== 0 &&
          <Grid item xs={12} lg={6}>
            <Box sx={{ backgroundColor: '#fff', borderRadius: '10px', p: 1 }}>
              <Typography variant="h5" sx={{ color: '#34495e', fontWeight: 600, my: 1 }}>Guest Info</Typography>
              <TableContainer >
                <Table aria-label="simple table" sx={{ border: '1px solid #f1f1f1' }}>
                  <TableBody>
                    {paymentSummaryData?.map((data) => (
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" sx={{ color: '#34495e', fontWeight: 900 }}>{data?.key}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6" sx={{ color: '#34495e' }}>{data?.value}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        }
        {paymentInfoData.lebgth !== 0 &&
          <Grid item xs={12} lg={6}>
            <Box sx={{ backgroundColor: '#fff', borderRadius: '10px', p: 1 }}>
              <Grid display='flex' sx={{ p: 0, width: '100%' }}>
                <Typography variant="h5" sx={{ flexGrow: 1, color: '#34495e', fontWeight: 600, my: 1, alignSelf: 'center' }}>Payment Info</Typography>
                <Button variant='contained' sx={{ my: 1, py: 0.4, backgroundColor: '#4634ff', '&:hover': { backgroundColor: '#4634ff' } }}><Computer fontSize='20px' sx={{ mr: 1 }} />View Details</Button>
              </Grid>
              <TableContainer >
                <Table aria-label="simple table" sx={{ border: '1px solid #f1f1f1' }}>
                  <TableBody>
                    {paymentInfoData?.map((data) => (
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" sx={{ color: '#34495e', fontWeight: 900 }}>{data?.key}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6" sx={{ color: '#34495e' }}>{data?.value}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        }
        <Grid item xs={12} lg={6}>
          <Box sx={{ backgroundColor: '#fff', borderRadius: '10px', p: 1 }}>

            <form onSubmit={handleSubmit(doPayment)}>
              <Typography variant="h5" sx={{ color: '#34495e', fontWeight: 600, my: 1 }}>Receive Payment</Typography>
              <Typography variant="h5" sx={{ color: '#28c76f', fontWeight: 600, my: 1, textAlign: 'center' }}>Receivable Amount: $0.00</Typography>
              {/* <OutlinedInput fullWidth
                id="outlined-adornment-amount" sx={{ p: 0 }}
                endAdornment={<InputAdornment position="start" sx={{ backgroundColor: '#e9ecef !important', px: 1.4, py: 2.5, m: 0 }}>USD</InputAdornment>}
              /> */}

              <Grid xs={12} sx={{ p: 0.7, mt: 1 }} >
                <Stack spacing={1}>
                  <OutlinedInput endAdornment={<InputAdornment position="start" sx={{ backgroundColor: '#e9ecef !important', px: 1.4, py: 2.5, m: 0 }}>USD</InputAdornment>}
                    {...register('payingAmount', { required: 'Paying amount is required', min: { value: 1, message: 'Amount must be at least 1' }, validate: { isNumeric: value => !isNaN(value) || 'Please enter a valid number', }, })} placeholder="Enter maximum amount limit" sx={inputStyles(errors.payingAmount)} />
                  {errors.payingAmount && (
                    <Typography color="error" variant="caption">
                      {errors.payingAmount.message}
                    </Typography>
                  )}
                </Stack>
              </Grid>
              <Button variant='contained' type='submit' fullWidth sx={{ my: 2, backgroundColor: '#4634ff', '&:hover': { backgroundColor: '#4634ff' }, '&.Mui-disabled': { backgroundColor: '#4634ff', opacity: 0.5 } }}>Submit</Button>
            </form>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity} sx={{ width: '100%', color: '#fff' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentInBookings
