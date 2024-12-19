import React from 'react'
import { Box, Button, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useParams } from 'react-router';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Computer } from '@mui/icons-material';

const CustomEnableButton = styled(Button)(({ status }) => ({
  borderRadius: '50px',
  backgroundColor: status === 'running' ? '#E6F4EA' : '#ffa34c25',
  borderColor: status === 'running' ? '#57C168' : '#ff9f43',
  color: status === 'running' ? '#57C168' : '#ff9f43',
  padding: '2px 26px !important',
  fontSize: '12px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: status === 'running' ? '#D4ECD9' : '#ffa24c38',
    borderColor: status === 'running' ? '#57C168' : '#ff9f43',
    color: status === 'running' ? '#57C168' : '#ff9f43'
  },
}));


const CheckOutInBookings = () => {

  const { id } = useParams();
  // const [rows, setRows] = useState([]);

  const guestInfoData = [
    { key: 'Name', value: 'ol' },
    { key: 'Email', value: 'ol@ol.com' },
    { key: 'Phone', value: '+123' },
    { key: 'Address', value: 'asdasd' },
  ]

  const paymentSummaryData = [
    { key: 'Total Payment', value: '+$1,771.00' },
    { key: 'Payment Received', value: '-$1,771.00' },
    { key: 'Refunded', value: '-$0.00' },
    { key: 'Receivable from User', value: '= $0.00' },
  ]

  const paymentInfoData = [
    { key: 'Total Fare', value: '+$1,610.00' },
    { key: 'Tax Charge', value: '+$161.00' },
    { key: 'Canceled Fare', value: '-$0.00' },
    { key: 'Canceled Tax Charge', value: '-$0.00' },
    { key: 'Extra Service Charge', value: '+$0.00' },
    { key: 'Other Charges', value: '+$0.00' },
    { key: 'Cancellation Fee', value: '+$0.00' },
    { key: 'Total Amount', value: '= $1,771.00' },
  ]


  return (
    <Box>
      {/* Heading */}
      <Grid sx={{ display: 'flex', mb: 3 }}>
        <Grid alignContent='center' sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ color: '#34495e' }}>Check Out Booking</Typography>
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
        <Grid item xs={12} lg={6}>
          <Box sx={{ backgroundColor: '#fff', borderRadius: '10px', p: 1 }}>
            <Grid display='flex' sx={{ p: 0, width: '100%' }}>
              <Typography variant="h5" sx={{ flexGrow: 1, color: '#34495e', fontWeight: 600, my: 1, alignSelf: 'center' }}>Booking Number: {id}</Typography>
              <CustomEnableButton variant="outlined" status='running'> Running </CustomEnableButton>
            </Grid>
            <Grid display='flex' justifyContent='space-between'>
              <Button variant='contained' fullWidth sx={{ mx: 1, backgroundColor: '#1e9ff2', '&:hover': { backgroundColor: '#1e9ff2' } }}>Print Invoice</Button>
              <Button variant='contained' fullWidth sx={{ mx: 1, backgroundColor: '#4634ff', '&:hover': { backgroundColor: '#4634ff' } }}>Go To Payment</Button>
              <Button variant='contained' fullWidth sx={{ mx: 1, backgroundColor: '#000', '&:hover': { backgroundColor: '#000' } }}>Check Out</Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckOutInBookings
